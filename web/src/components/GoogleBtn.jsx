import React from 'react'

function GoogleBtn() {
  return <a href={`${import.meta.env.API_URL}/auth/google`} className="icon-btn">
    <img src="../images/google.png" alt="sign in wih Google" />
  </a>
}

export default GoogleBtn
