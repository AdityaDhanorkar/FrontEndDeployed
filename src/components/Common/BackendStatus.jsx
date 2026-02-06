import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [isBackendRunning, setIsBackendRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://16.170.233.222:8080/api/health/ping');
      setIsBackendRunning(response.ok);
    } catch (error) {
      setIsBackendRunning(false);
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isChecking) return null;

  if (!isBackendRunning) {
    return (
      <div className="alert alert-danger m-0">
        <div className="d-flex align-items-center">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <span className="me-auto">
            <strong>Backend Server Not Running!</strong> Start: mvnw spring-boot:run
          </span>
          <button className="btn btn-sm btn-outline-danger" onClick={checkBackendStatus}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alert alert-success m-0">
      <div className="d-flex align-items-center">
        <i className="fas fa-check-circle me-2"></i>
        <span>Backend server running - Database active!</span>
      </div>
    </div>
  );
};

export default BackendStatus;