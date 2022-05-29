// import {ThemeProvider} from '@mui/material';
// import {CssBaseline} from '@mui/material';
import theme from './Theme';
import { useState,useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './component/Home/Home';
import Definition from './component/definition/Definition';
import Bookmark from './component/Bookmark/Bookmark';

const  App = ()=> {
  const [bookmarks, setbookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks'))|| {});

  // calling useffect as we need to handle addboomark and removebookmark feature..

  useEffect(()=>{
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  },[bookmarks]);

  const addBookmarks = (word,definition)=>{
    setbookmarks((oldbookmarks)=> ({
      ...oldbookmarks,[word]:definition
    }))
  }


  const removeBookmark=(word) => setbookmarks((oldbookmarks)=>{
  // create copy of old bookmark
  const temp={...oldbookmarks};
  delete temp[word];
  return temp;
  });

  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Home />} />
       <Route path="/search/:word" element={<Definition  bookmarks={bookmarks}   addBookmarks={addBookmarks}  removeBookmark={removeBookmark} />} />  
        <Route path="/bookmarks" element={<Bookmark  bookmarks={bookmarks}  />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
