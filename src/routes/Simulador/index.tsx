import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';

type Status = 'success' | 'error' | 'warning' | 'info';
type FeedbackMessage = {
  message: string;
  status: Status;
};

const IDEAL_FACE_WIDTH_PERCENTAGE_MIN = 0.30;
const IDEAL_FACE_WIDTH_PERCENTAGE_MAX = 0.70;
const MAX_CENTER_OFFSET_PERCENTAGE = 0.20;
const MAX_TILT_DIFFERENCE_PX = 20;

const FaceApiSimulator: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackMessage>({
    message: 'Sistema pronto.',
    status: 'info',
  });

  const statusClasses: Record<Status, { border: string; text: string }> = {
    info: { border: 'border-gray-500', text: 'text-gray-800' },
    success: { border: 'border-green-600', text: 'text-green-600' },
    warning: { border: 'border-amber-500', text: 'text-amber-500' },
    error: { border: 'border-red-600', text: 'text-red-600' },
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      setFeedback({ message: 'Carregando modelos de IA...', status: 'info' });
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        console.log('[DEBUG] Modelos da face-api.js carregados com sucesso!');
        setFeedback({ message: 'Modelos carregados. Ligue a câmera para começar.', status: 'info' });
      } catch (error) {
        console.error('[ERRO CRÍTICO NO SETUP]', error);
        setFeedback({ message: 'Erro ao carregar modelos.', status: 'error' });
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
    
    return () => stopCamera();
  }, []);

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
