import React from 'react';
import ApiPic from './../../apiPic/apiPic';

const Loading = (props) => {
  return (
    <div className='loading-wrap'>
      <img className='loading-img' src={ApiPic.getLoadingImageUrl()} alt='' />
    </div>  
  )
}

export default Loading;