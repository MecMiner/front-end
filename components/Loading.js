import { useState, useEffect } from "react";
import React from 'react';

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }, []);
  
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      );
    }
  
    return null;
  };
export default Loading;
