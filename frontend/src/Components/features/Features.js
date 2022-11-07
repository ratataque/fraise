import React from 'react'
import image2 from "../../assets/image2.png";
import "./Features.css"


function Features() {
  return (
    <div className='header-bg'>
      <h1 className='title'>
        Fonctionnalités
      </h1>
      <div className="image">
          <img src={image2} alt="image2" />
      </div>
    </div>
  )
}

export default Features
