import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { IconButton } from "@mui/material";
import './Home.css';
import Footer from '../Footer';


const Home = () => {
  const [word, setword] = useState('');

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    // //  formatting checking
    const trimout = word.trim().toLowerCase();
    // // this will check for lengtNh and for the space if entered.
    if (!trimout || trimout.split(" ").length > 1) return;
    navigate(`/search/${trimout}`);
  }
  return (
    <>
      <div class="container-fluids col-xs-3 col-lg-10 col-md-10 col-sm-10  text-center shadow px-5 py-5 mx-5 my-5 bg-light">
        <div class="">
          <div class="card-title">
            <h1 class="text-center">
              Dictionary
            </h1>
            </div>

           <div className="card-body">
             <form>
              <fieldset>

                <div className="form-group">
                  <label for="exampleInput" className="form-label mt-4">Search  a meaning</label>
                  <input type="text" value={word}
                    onChange={(e) => setword(e.target.value)}
                    className="form-control" aria-describedby="textHelp"
                    placeholder="Serch Something..." />
                  <small id="textHelp" className="form-text text-muted">You'll have nice experience..</small>
                </div>
                  <div className="d-inline" > 
                  <IconButton  onClick={handlesubmit} sx={{
                  borderRadius: 5,
                  p: 2,
                  color: '#fff',
                  background: 'black',
                  height:'50px',
                  marginRight:'10px',
                  boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
                }}>
                 Search 
                </IconButton>
               
                <IconButton to="/bookmarks" component={Link} sx={{
                  borderRadius: 5,
                  p: 2,
                  color: '#fff',
                  background: 'black',
                  height:'50px',
                  boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
                }}>
                  <BookmarkIcon />
                </IconButton>
                </div>
               
              </fieldset>
            </form>
           </div>
          


          </div>
        </div>
        <Footer/>
    </>

  )
}

export default Home;