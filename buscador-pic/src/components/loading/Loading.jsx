import React from 'react';
import LoadingImg from './../../images/loading.gif';

const Loading = (props) => {
  return (
    <div className='loading-wrap'>
      <img className='loading-img' src={LoadingImg} alt='' />
    </div>  
  )
}

export default Loading;