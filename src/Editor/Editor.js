import React from 'react';


function OtherApp() {
    return (
      <iframe 
        src="http://localhost:3005" 
        title="Editor" 
        style={{ 
          border: 'none', 
          height: '100vh', 
          width: '100vw' 
        }} 
        allowFullScreen 
      />
    );
  }
export default OtherApp;