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
            const MODEL_URL = `${import.meta.env.BASE_URL}models`;
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

    const stopCamera = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsCameraOn(false);
        setFeedback({ message: 'Câmera desligada.', status: 'info' });
    };

    const handleVideoPlay = () => {
        console.log('[DEBUG] Vídeo iniciado. Começando detecção em loop.');
        intervalRef.current = setInterval(async () => {
            const video = videoRef.current;
            if (video && !video.paused && !video.ended) {
                const detection = await faceapi
                    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks();

                if (detection) {
                    analyzePosition(detection);
                } else {
                    setFeedback({ message: 'Nenhum rosto detectado...', status: 'error' });
                }
            }
        }, 200);
    };

    const analyzePosition = (detection: faceapi.WithFaceLandmarks<faceapi.WithFaceDetection<{}>>) => {
        const { width } = detection.detection.box;
        const { landmarks } = detection;
        const videoWidth = videoRef.current?.videoWidth || 640;

        const faceWidthPercentage = width / videoWidth;
        if (faceWidthPercentage < IDEAL_FACE_WIDTH_PERCENTAGE_MIN) {
            return setFeedback({ message: 'Aproxime-se da câmera', status: 'warning' });
        }
        if (faceWidthPercentage > IDEAL_FACE_WIDTH_PERCENTAGE_MAX) {
            return setFeedback({ message: 'Afaste-se um pouco', status: 'warning' });
        }

        const faceCenterX = detection.detection.box.x + width / 2;
        const offsetX = Math.abs(faceCenterX - videoWidth / 2) / videoWidth;
        if (offsetX > MAX_CENTER_OFFSET_PERCENTAGE) {
            return setFeedback({ message: 'Centralize seu rosto', status: 'warning' });
        }

        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const leftEyeCenterY = leftEye.reduce((sum, pos) => sum + pos.y, 0) / leftEye.length;
        const rightEyeCenterY = rightEye.reduce((sum, pos) => sum + pos.y, 0) / rightEye.length;

        if (Math.abs(leftEyeCenterY - rightEyeCenterY) > MAX_TILT_DIFFERENCE_PX) {
            return setFeedback({ message: 'Mantenha a cabeça reta', status: 'warning' });
        }

        return setFeedback({ message: 'Posicionamento ideal!', status: 'success' });
    };

    return (
        <div className="flex flex-col items-center justify-center font-sans bg-slate-100 p-5 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-5 text-slate-800">
                Simulador de Posicionamento
            </h2>

            <div className="relative w-full max-w-2xl aspect-[4/3] rounded-md overflow-hidden shadow-md bg-gray-900 flex items-center justify-center">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    onPlay={handleVideoPlay}
                    className={`w-full h-full object-cover -scale-x-100 ${!isCameraOn && 'hidden'}`}
                />
                {!isCameraOn && (
                    <div className="text-white text-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                        <p className="mt-2 text-lg">A câmera está desligada.</p>
                    </div>
                )}
            </div>

            <div className="w-full max-w-2xl mt-4">
                <button
                    onClick={isCameraOn ? stopCamera : startCamera}
                    disabled={isLoadingModels}
                    className="w-full px-4 py-3 text-lg font-bold text-white rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: isCameraOn ? '#d9534f' : '#5cb85c' }}
                >
                    {isLoadingModels ? 'Carregando...' : (isCameraOn ? 'Desligar Câmera' : 'Ligar Câmera')}
                </button>
            </div>

            <div
                className={`mt-5 w-full max-w-2xl text-center bg-white p-3 rounded-md border-2 transition-colors duration-300 ${statusClasses[feedback.status].border}`}
            >
                <p className={`text-lg font-bold transition-colors duration-300 ${statusClasses[feedback.status].text}`}>
                    {feedback.message}
                </p>
            </div>
        </div>
    );
};

export default FaceApiSimulator;
