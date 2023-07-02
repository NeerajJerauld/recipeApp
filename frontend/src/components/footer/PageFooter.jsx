import React from 'react'
import linkedin from './linkedin.png'
import facebook from './facebook.png'
import twitter from './twitter.png'
import instagram from './instagram.png'
import google from './google.png'
import './PageFooterStyle.css'

let footer = (
    <footer class="footer">
    <div class="footer-content" style={{width:'100%'}}>
      <div class="social-media">
        <a href="#"><img src= {linkedin} alt="LinkedIn" /></a>
        <a href="#"><img src= {twitter} alt="Twitter" /></a>
        <a href="#"><img src= {instagram} alt="Instagram" /></a>
        <a href="#"><img src= {google} alt="Google" /></a>
        <a href="#"><img src= {facebook} alt="Facebook" /></a>
      </div>
      <p>&copy; 2023 NJ Corp. All rights reserved.</p>
    </div>
  </footer>
)
const PageFooter = () => {
  return (
    footer
  )
}

export default PageFooter