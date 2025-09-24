const startCamera = async () => {
    if (isLoadingModels || isCameraOn) return;
    try {
      setFeedback({ message: 'Acessando sua câmera...', status: 'info' });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        setFeedback({ message: 'Câmera ligada. Posicione o rosto.', status: 'info' });
      }
    } catch (error) {
      console.error('[ERRO AO ACESSAR CÂMERA]', error);
      setFeedback({ message: 'Não foi possível acessar a câmera.', status: 'error' });
    }
  };
