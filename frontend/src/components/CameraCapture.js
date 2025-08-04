import React, { useEffect, useRef, useState } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        alert('Error accessing camera: ' + error.message);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [enabled]);

  const handleCapture = () => {
    if (!videoRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    const imageData = canvasRef.current.toDataURL('image/png');

    onCapture(imageData);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!enabled && (
        <button onClick={() => setEnabled(true)}>Start Camera</button>
      )}
      {enabled && (
        <>
          <video ref={videoRef} style={{ width: 300, borderRadius: 10 }}></video>
          <br />
          <button onClick={handleCapture} style={{ marginTop: 10 }}>Capture Photo</button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
    </div>
  );
};

export default CameraCapture;