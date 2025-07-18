const ProcessingPage = () => {
    return (
        <div className="page-box gradient-box">
            <div className="processing-icon">🧠</div>
            <h2 className="page-title">Analyzing...</h2>
            <p className="page-instructions">
                Our AI is listening carefully to your recording.
                <br />
                This will just take a moment.
            </p>
            <div className="loader"></div>
        </div>
    );
};

export default ProcessingPage;