import { useState } from 'react';
import './App.css';

import LandingPage from './components/LandingPage';
import RecordingPage from './components/RecordingPage';
import ProcessingPage from './components/ProcessingPage';
import ResultsPage from './components/ResultsPage';

const BackgroundEqualizer = () => {
    const bars = Array.from({ length: 60 }, (_, i) => {
        const duration = (Math.random() * (1 - 0.5) + 0.5).toFixed(2);
        const delay = (Math.random() * -2.0).toFixed(2);
        const barStyle = { animationDuration: `${duration}s`, animationDelay: `${delay}s` };
        return <div key={i} className="bar" style={barStyle}></div>;
    });
    return <div className="background-equalizer">{bars}</div>;
};

function App() {
    const [view, setView] = useState('landing');
    const [resultsData, setResultsData] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const navigateToRecording = () => setView('recording');

    const startProcessing = async (audioBlob) => {
        setView('processing');

        const formData = new FormData();
        formData.append("audio_file", audioBlob, "recording.wav");

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        try {
            const response = await fetch("http://127.0.0.1:8000/processAudio", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'The link could not be processed.');
            }

            const data = await response.json();

            setResultsData(data);
            setView('results');

        } catch (error) {
            console.error("Error during processing:", error);
            alert("Sorry, there was an error processing your recording. Please try again.");
            setView('recording');
        }
    };

    const resetApp = () => setView('landing');

    const renderView = () => {
        switch (view) {
            case 'recording':
                return <RecordingPage onFinishRecording={startProcessing} />;
            case 'processing':
                return <ProcessingPage />;
            case 'results':
                return <ResultsPage results={resultsData} audioURL={audioURL} onTryAgain={resetApp} />;
            case 'landing':
            default:
                return <LandingPage onNavigateToRecording={navigateToRecording} />;
        }
    };

    return (
        <div className={`app-wrapper view-${view}`}>
            <BackgroundEqualizer />
            
            <header className="sticky-header">
                <div className="header-content">
                    <div className="logo text-gradient" onClick={resetApp} style={{cursor: 'pointer'}}>Equalizer</div>

                    <nav>
                        <button className="header-button" onClick={navigateToRecording}>Sign In</button>
                        <button className="header-button primary" onClick={navigateToRecording}>Sign Up Free</button>
                    </nav>
                </div>
            </header>

            <main className={`main-content ${view === 'recording' || view === 'processing' || view === 'results' ? 'is-centered' : ''}`}>
                {renderView()}
            </main>
        </div>
    );
}

export default App;