import React from 'react'

const Footer = () => {
  return (
    <>
      <footer class="footer p-10 bg-primary text-neutral">
        <div>
          <span class="footer-title text-2xl">PokeDoc</span> 
        </div> 
        <div>
          <span class="footer-title">Links</span> 
          <a class="link link-hover" href="/dashboard">Home</a>
          <a class="link link-hover" href="/sign_up">Sign up</a>
          <a class="link link-hover" href="/log_in">Log in</a>
        </div> 
        <div>
          <span class="footer-title">Created By</span> 
          <a class="link link-hover" href="https://www.linkedin.com/in/wilfredomejiapalma/">@WilfredoMejiaPalma</a>
        </div>
      </footer>
    </>
  )
}

export default Footer