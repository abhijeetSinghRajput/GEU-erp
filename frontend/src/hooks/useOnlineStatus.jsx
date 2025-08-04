import { useEffect, useState } from 'react';



const useOnlineStatus = () => {
  const [status, setStatus] = useState({
    isOnline: navigator.onLine,
    isOffline: !navigator.onLine,
    lastOnline: navigator.onLine ? new Date() : undefined
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus({
        isOnline: true,
        isOffline: false,
        lastOnline: new Date()
      });
    };

    const handleOffline = () => {
      setStatus(prev => ({
        isOnline: false,
        isOffline: true,
        lastOnline: prev.lastOnline
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};

export default useOnlineStatus;