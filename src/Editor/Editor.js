import React from 'react';

//const url = `http://localhost:8190/myapp?myParam=${myParamValue}`;
function OtherApp() {
  const selectedClass = localStorage.getItem('selectedClass');
  console.log(selectedClass);
  const url = `http://localhost:8190/myapp?myParam=${selectedClass}`;
    return (
      
      <iframe 
        src={url}
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