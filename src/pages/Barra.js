
import React, { useState, useEffect } from 'react';
import { Container, ProgressBar } from 'react-bootstrap';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ProgressBar now={progress} label={`${progress}%`} style={{ width: '50%' }} />
    </Container>
  );
};

export default LoadingPage;



