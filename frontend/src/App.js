import './App.css';

const BackgroundEqualizer = () => {
    const bars = Array.from({ length: 50 }, (_, i) => {
        const duration = (Math.random() * (1.0 - 0.5) + 0.5).toFixed(2);
        const delay = (Math.random() * -2.0).toFixed(2);

        const barStyle = {
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
        };

        return <div key={i} className="bar" style={barStyle}></div>;
    });

    return <div className="background-equalizer">{bars}</div>;
};

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

function App() {
  const openVideo = () => window.open("https://www.youtube.com/")

  return (
      <div className="app-wrapper">
          <BackgroundEqualizer />

          <header className="sticky-header">
              <div className="header-content">
                  <div className="logo text-gradient">Equalizer</div>
                  <nav>
                      <button className="header-button">Sign In</button>
                      <button className="header-button primary">Sign Up Free</button>
                  </nav>
              </div>
          </header>

          <main className="main-content">
              <section id="home" className="hero-section">
                  <h1 className="main-title text-gradient">Perfect Your Pronunciation</h1>
                  <p className="subtitle">
                      aaaaaa ai pronunciation tool placeholder subtitle
                      <br />
                      amongus
                  </p>
                  <div className="button-group">
                      <button className="cta-button">Try It Free</button>
                      <button className="cta-button secondary" onClick={openVideo} >Watch Demo</button>
                  </div>
              </section>


              <section id="features" className="features-section">
                  <h2 className="text-gradient">An Unfair Advantage in Language Learning</h2>
                  <p className="section-intro">
                      Equalizer goes beyond simple repetition. Our sophisticated AI provides a level of detail and feedback that was previously only available with a personal tutor.
                  </p>
                  <div className="features-grid">
                      <FeatureCard 
                          icon="" 
                          title="Phoneme-Level Analysis" 
                          description="Our AI doesn't just hear words, it hears sounds. Get instant, precise feedback on individual phonemes to correct mistakes at their source." 
                      />
                      <FeatureCard 
                          icon="" 
                          title="Master Intonation & Flow" 
                          description="Fluency is more than just correct sounds. Equalizer guides you in mastering the natural rhythm, pitch, and stress patterns of native speech." 
                      />
                      <FeatureCard 
                          icon="" 
                          title="Personalized Learning Path" 
                          description="As you improve, Equalizer adapts. Receive custom-tailored exercises and challenges that focus on your specific areas for growth." 
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
                      <span>read love bullet its really good</span>
                  </div>
              </section>
          </main>
      </div>
  );
}

export default App;