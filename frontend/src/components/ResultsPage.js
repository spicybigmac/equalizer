import { useEffect, useState } from 'react';

const ScoreBar = ({ score, title, delay }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100 + delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`score-bar-item ${isAnimated ? 'animate' : ''}`}>
            <div className="score-bar-header">
                <div className="score-bar-title">{title}</div>
                <div className="score-bar-value">{score}%</div>
            </div>
            <div className="score-bar-track">
                <div 
                    className="score-bar-fill" 
                    style={{ '--score-percent': `${score}%` }}
                ></div>
            </div>
        </div>
    );
};

const ResultsPage = ({ results, audioURL, onTryAgain }) => {
    
    return (
        <div className="results-page-box">
            <h1 className="page-title text-gradient">Your Analysis Results</h1>

            <section className="results-section gradient-box audio-player-section">
                <h3>Your Recording</h3>
                <audio controls src={audioURL} className="audio-player">
                    Your browser does not support the audio element.
                </audio>
            </section>
            
            <section className="results-section gradient-box">
                 <h3>Score Breakdown</h3>
                 <div className="score-bar-grid">
                    <ScoreBar score={results.phonemeScore} title="Phoneme Accuracy" delay={0.1} />
                    <ScoreBar score={results.fluencyScore} title="Fluency & Pacing" delay={0.2} />
                    <ScoreBar score={results.intonationScore} title="Intonation Match" delay={0.3} />
                    <ScoreBar score={results.connectionScore} title="Connected Speech" delay={0.4} />
                </div>
            </section>
            
            <section className="results-section gradient-box">
                <div className="results-grid">
                    <div className="summary-box">
                        <h3><span role="img" aria-label="check mark">✅</span> Strengths</h3>
                        <p>{results.strengths}</p>
                    </div>
                    <div className="summary-box">
                        <h3><span role="img" aria-label="light bulb">💡</span> Areas for Improvement</h3>
                        <p>{results.weaknesses}</p>
                    </div>
                </div>
            </section>

            <section className="results-section gradient-box">
                 <div className="summary-box full-width">
                    <h3><span role="img" aria-label="rocket">🚀</span> Your Personalized Next Steps</h3>
                    <ol className="actionable-steps-list">
                        {results.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="results-section gradient-box">
                 <div className="summary-box full-width">
                    <h3><span role="img" aria-label="magnifying glass">🔍</span> Detailed Pronunciation Breakdown</h3>
                    {results.incorrectWords && results.incorrectWords.length > 0 ? (
                        <table className="corrections-table">
                            <thead>
                                <tr>
                                    <th>You Said (Phonetic)</th>
                                    <th>Correct (Phonetic)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.incorrectWords.map((wordPair, index) => (
                                    <tr key={index}>
                                        <td className="spoken-word">{wordPair[0]}</td>
                                        <td className="correct-word">{wordPair[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-errors-message">Great job! No significant pronunciation errors were detected.</p>
                    )}
                </div>
            </section>

            <button className="cta-button" onClick={onTryAgain} style={{marginTop: '2rem'}}>
                Record Another
            </button>
        </div>
    );
};

export default ResultsPage;