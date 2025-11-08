import { useState, useRef, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { Camera, CameraOff, Lightbulb, Monitor, Wifi } from 'lucide-react';

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

    useEffect(() => {
        document.title = 'AuraMed | Simulador';
        return () => {
            document.title = 'AuraMed';
        };
    }, []);

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
        <div className="flex flex-col items-center justify-center font-sans p-5 rounded-lg shadow-xl">
            <h1 className="text-4xl font-bold mb-5 text-tx-primary text-center">
                Simulador de Posicionamento
            </h1>
            <p className="text-lg text-tx-secondary text-center max-w-150 mb-10">Teste sua câmera antes da consulta real. Receba feedback em tempo real para garantir a melhor experiência.</p>

            <div className='flex flex-col md:flex-row gap-4 '>
                <div className='border-2 border-gray-300 p-5 rounded-lg'>
                    <div className='flex items-center gap-3 mb-4'>
                        <Camera className='h-8 w-8 text-primary-600' />
                        <h2 className='text-xl font-semibold text-tx-primary'>Teste de Câmera</h2>
                    </div>
                    <div className="relative w-full max-w-2xl aspect-[4/3] rounded-md overflow-hidden shadow-md bg-gray-700 flex items-center justify-center">
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
                                <CameraOff className='h-12 w-12 text-gray-200 mx-auto' />
                                <p className="mt-2 text-lg">Clique em "Ligar Câmera" para começar</p>
                            </div>
                        )}
                    </div>

                    <div className="w-full max-w-2xl mt-4">
                        <button
                            onClick={isCameraOn ? stopCamera : startCamera}
                            disabled={isLoadingModels}
                            className="w-full px-4 py-3 text-lg font-bold text-white rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: isCameraOn ? '#B71D19' : '#177E17' }}
                        >
                            {isLoadingModels ? 'Carregando...' : (isCameraOn ? 'Desligar Câmera' : 'Ligar Câmera')}
                        </button>
                    </div>
                </div>

                <div>
                    <div
                        className={`flex flex-col items-center justify-center w-full md:h-20 max-w-2xl text-center bg-white p-3 rounded-md border-2 transition-colors duration-300 ${statusClasses[feedback.status].border}`}
                    >
                        <h2 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${statusClasses[feedback.status].text}`}>
                            {feedback.message}
                        </h2>
                    </div>

                    <div className='border-2 border-gray-300 p-8 rounded-lg mt-4'>
                        <h2 className='text-xl font-semibold text-tx-primary mb-6'>Lista de Verificação</h2>
                        <div className='flex items-start gap-4 mb-4'>
                            <Monitor className='h-6 w-6 text-primary-600' />
                            <div>
                                <h3 className='text-lg text-tx-primary font-medium'>Posição da tela</h3>
                                <p className='text-md text-tx-secondary'>A câmera deve estar na altura dos seus olhos</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-4 mb-4'>
                            <Lightbulb className='h-6 w-6 text-primary-600' />
                            <div>
                                <h3 className='text-lg text-tx-primary font-medium'>Iluminação</h3>
                                <p className='text-md text-tx-secondary'>Certifique-se de ter luz suficiente no rosto</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-4 mb-4'>
                            <Wifi className='h-6 w-6 text-primary-600' />
                            <div>
                                <h3 className='text-lg text-tx-primary font-medium'>Conexão</h3>
                                <p className='text-md text-tx-secondary'>Use Wi-Fi sempre que possível</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FaceApiSimulator;
