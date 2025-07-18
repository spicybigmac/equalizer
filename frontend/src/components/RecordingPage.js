import { useState, useRef } from 'react';

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const RecordingPage = ({ onFinishRecording }) => {
    const [permission, setPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const timerIntervalRef = useRef(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStream.current = stream;
                setPermission(true);
            } catch (err) {
                alert("Microphone permission denied. Please allow microphone access in your browser settings.");
                console.error(err);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        setSeconds(0);

        const recorder = new MediaRecorder(mediaStream.current);
        mediaRecorder.current = recorder;
        mediaRecorder.current.start();

        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            audioChunks.current.push(event.data);
        };

        timerIntervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        setIsRecording(false);
        clearInterval(timerIntervalRef.current);
        
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            onFinishRecording(audioBlob);
        };
        mediaRecorder.current.stop();
    };

    const renderContent = () => {
        if (!permission) {
            return (
                <button className="cta-button" onClick={getMicrophonePermission}>
                    Grant Microphone Access
                </button>
            );
        }

        if (isRecording) {
            return (
                <button className="cta-button stop-button" onClick={stopRecording}>
                    Stop & Analyze
                </button>
            );
        }

        return (
            <button className="cta-button" onClick={startRecording}>
                Start Recording
            </button>
        );
    };

    return (
        <div className="page-box">
            <div className="hero-icon" style={{ animation: isRecording ? 'pulse-icon 1.5s infinite' : 'none' }}>🎤</div>
            <h2 className="page-title">{isRecording ? 'Recording...' : 'Ready when you are.'}</h2>
            
            <div className="timer-display">{formatTime(seconds)}</div>

            <p className="page-instructions">
                {isRecording 
                    ? "Read a sentence or two clearly. Press stop when you're finished."
                    : "Press the start button below to begin recording your voice."
                }
            </p>

            <div className="button-group">
                {renderContent()}
            </div>
        </div>
    );
};

export default RecordingPage;