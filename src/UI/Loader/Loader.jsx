import React from 'react';
import cl from './Loader.module.css';

const Loader = () => {
  return (
    <div className={cl.container}>
      <div className={cl.box}>
        <div className={cl.cube}></div>
      </div>
    </div>
  );
};

export default Loader;
