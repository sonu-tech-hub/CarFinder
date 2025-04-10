// create a lo`ading spinner component
import React from 'react';

const LoadingSpinner = () => {
    return (    
        <div className="flex items-center justify-center h-screen">    
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>    
        </div>    
    );    
};    
export default LoadingSpinner;