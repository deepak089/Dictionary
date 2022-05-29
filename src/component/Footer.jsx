import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <p class="love" style={{ 
    backgroundColor : "grey",
    borderTop:"2px solid wht=ite",
    position: "fixed",
    textAlign:'center', 
    width: '100%',
    bottom: '0',
    color: 'white',
    fontSize: '20px'}}
    >Made with <FavoriteIcon/> By Deepak chandra</p>
  )
}

export default Footer;