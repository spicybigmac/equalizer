const FeatureCard = ({ title, description, icon }) => (
    <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

function LandingPage(props) {
    const openVideo = () => window.open("https://www.youtube.com/")
    return (
        <>
            <section id="home" className="hero-section">
                {/* <div className="hero-icon">🎤</div> */}
                <h1 className="main-title text-gradient">Perfect Your Pronunciation</h1>
                <p className="subtitle">
                    Professional English pronunciation coaching, without the barriers.
                    <br/>
                    Equalizer makes perfecting your pronunciation is as easy as 1, 2, 3.
                </p>
                <div className="button-group">
                    <button className="cta-button" onClick={props.onNavigateToRecording}>Try It Free</button>
                    <button className="cta-button secondary" onClick={openVideo}>Watch Demo</button>
                </div>
            </section>

            <section id="features" className="features-section">
                <h2 className="text-gradient">Equalize the playing field.</h2>
                    <p className="section-intro">
                        Today's work world values communication over all else, and clear English speaking is key so securing your position. Don't let imprecise pronunciation be a barrier in your opportunities.
                    </p>
                    <div className="features-grid">
                        <FeatureCard 
                            icon="" 
                            title="In-Depth Analysis" 
                            description="Equalizer provides feedback for phoneme accuracy, fluency, intonation, and connection, giving you a score and actionable feedback for each." 
                        />
                        <FeatureCard 
                            icon="" 
                            title="Instant Feedback" 
                            description="Get coaching whenever you want, wherever you are. Your language learning journey should belong to you." 
                        />
                        <FeatureCard 
                            icon="" 
                            title="Accessible Pricing" 
                            description="Equalizer is currently 100% free to use, making precise English pronunciation accessible to everyone." 
                        />
                    </div>
            </section>
            
            <section id="contact" className="contact-section">
                <h2 className="text-gradient">Let's Talk</h2>
                    <p className="section-intro">
                        Whether you're a language learner, educator, or institution, we'd love to connect.
                    </p>
                    <form className="contact-form">
                        <input type="email" placeholder="email@example.com" required />
                        <button type="submit" className="cta-button">Get In Touch</button>
                    </form>
                    <div className="footer-links">
                        <span>read love bullet</span>
                    </div>
            </section>
        </>
    );
};

export default LandingPage;