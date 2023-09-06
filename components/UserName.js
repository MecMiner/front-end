import React from 'react';

const Name = ({name}) => {
  return (
      <div className="name" style={{textAlign: 'center'}}>
        <span className="value"> {name} </span>
      <style jsx>{`
        .name {       
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Name;