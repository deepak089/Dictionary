import React, { useEffect, useState,Fragment  } from 'react';
import { IconButton, Stack, Typography, Box, Divider, Badge, CircularProgress } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';


const Definition = ({ addBookmarks, bookmarks, removeBookmark }) => {


  // used to get the url parameters... 
  const { word } = useParams();
  const navigate = useNavigate();
  // loader spinner
  const [loading, setloading] = useState(true);
  // checking for word exist or not...
  const [exists, setexists] = useState(true);

  // handle audio part....
  const [audio, setaudio] = useState(null);




  // as returned data is in array 
  const [definition, setdefinition] = useState([]);
  // as soon as word searched go for defintion details..



  // checking for word is bookmarked or not...
  const isbookmarked = Object.keys(bookmarks).includes(word);



  // making function just to keep track of all the data..
  const UpdateState = (data) => {
    setdefinition(data);
    // make loader false as we get response here..
    setloading(false);
    // grabb the audio data...
    const phone = data[0].phonetics
    // if nothing return null...
    if (!phone.length) return;
    // editing the protocol.... 
    const url = phone[0].audio.replace('//ssl', 'https://ssl');
    // setting the audio element

    setaudio(new Audio(url));

  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        UpdateState(res.data);



      }
      catch (error) {
        setexists(false);
      }

    }
    // if already bookmarked than whole page from localstorage...
    if (!isbookmarked) fetch()
    else {
      UpdateState(bookmarks[word])
    }
  }, [])

  if (!exists) return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width:'200px',
    alignItem: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}>
    <h1>Word not Found...</h1>
    <button className="btn btn-danger" onClick={() => navigate(-1)} >Go Back</button>
    
  </Box>

  if (loading) return <Box >
    <CircularProgress sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'center',
    height: '100vh'
  }} />
  </Box>

  return (

    <div class="container-fluids col-xs-3  col-lg-10 col-md-10 col-sm-10 text-center shadow px-5 py-5 mx-5 my-5 bg-light">
      <div class="card-title">
        <h1 class="text-center">
          <Stack direction="row" justifyContent="space-between">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{
                color: '#fff',
                height: '50px',
                width: '50px',
                p: '2',
                marginRight: '10px',
              }} />
            </IconButton>

            <IconButton onClick={() => isbookmarked ? removeBookmark(word) : addBookmarks(word, definition)}>
              {isbookmarked ? <BookmarkIcon sx={{
                color: '#fff',
                height: '50px',
                width: '50px',
                p: '2',
                marginRight: '10px',
              }} /> : <BookmarkBorderIcon sx={{
                color: '#fff',
                height: '50px',
                width: '50px',
                p: '2',
                marginRight: '10px',
              }} />}
            </IconButton>
          </Stack>  </h1>
      </div>

      <div className="card-body">
        <form>
          <fieldset>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
              mt: 3,
              background: 'linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)',
              boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
              px: 4,
              py: 5,
              color: 'white',
              borderRadius: 2,
            }} >

              <Typography sx={{ textTransform: 'capitalize' }} variant="h5">{word}</Typography>
              <IconButton onClick={() => audio.play()} sx={{
                borderRadius: 5,
                p: 2,
                color: '#fff',
                background: 'black',
                height: '20px',
                width: '20px',
                boxShadow: '0px 10px 10px rgba(221, 114, 80, 0.2)',
              }}>
                <AudiotrackIcon />
              </IconButton>
            </Stack>

            {definition.map((def, idx) =>
              <Fragment  key={idx}>
                <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                {def.meanings.map(meaning =>
                  <Box key={Math.random()} sx={{
                    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                    backgroundColor: '#fff',
                    p: 2,
                    borderRadius: 2,
                    mt: 3
                  }}>
                    <Typography sx={{ textTransform: 'capitalize' }} color="GrayText" variant="subtitle1">{meaning.partOfSpeech}</Typography>
                    {meaning.definitions.map((definition, idx) => <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={definition.definition}>{meaning.definitions.length > 1 && `${idx + 1}. `} {definition.definition}</Typography>)}
                  </Box>
                )}
              </Fragment >
            )}

          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Definition