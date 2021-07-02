import React from 'react'

function FacebookBtn() {
  return <a href={`${import.meta.env.API_URL}/auth/facebook`}
    className="icon-btn">
    <img src="../images/facebook.svg" alt="login with Facebook" />
  </a>
}

export default FacebookBtn
