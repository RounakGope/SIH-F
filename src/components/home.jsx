import React from 'react';
import './Home.css';

// --- Feature data is now inside Home.jsx ---
const featuresData = [
  {
    title: 'Interactive Learning',
    points: [
      'Duolingo-style Quizzes: Progressive learning with gamified elements',
      'Progress Tracking: Monitor your learning journey and achievements',
      'Cultural Context: Learn about the history and meaning behind patterns',
      'Difficulty Levels: From beginner to advanced patterns',
    ],
    imagePlaceholder: 'IMAGE',
  },
  {
    title: 'AI-Powered Capabilities',
    points: [
      'Kolam Detection: Upload images and get AI-powered analysis of Kolam patterns',
      'Pattern Generation: Create new Kolam designs using mathematical principles and AI',
      'Smart Recognition: Identify traditional patterns and their cultural significance',
      'AI-Powered Insights: Get explanations and hints using local LLMs',
    ],
    imagePlaceholder: 'IMAGE',
  },
  {
    title: 'Community Features',
    points: [
      'Pattern Sharing: Share your creations with the community',
      'Learning from Others: Discover patterns created by fellow learners',
      'Collaborative Learning: Work together on complex designs',
      'Cultural Exchange: Connect with people passionate about traditional art',
    ],
    imagePlaceholder: 'IMAGE',
  },
  {
    title: 'Technical Features',
    points: [
      'Real-time Processing: Fast image analysis and generation',
      'Offline Capability: Works without internet using local AI models',
      'Cross-platform: Web, mobile, and desktop support',
      'Scalable Architecture: Built for growth and performance',
    ],
    imagePlaceholder: 'IMAGE',
  },
];


const KolamPattern = ({ children }) => <div className="kolam-pattern">{children}</div>;

const Home = ({ setCurrentRoute }) => {
  return (
    <>
      {/* --- Top Section of the Home Page --- */}
      <div className="home-container">
        <div className="kolam-graphics">
          <KolamPattern>
              <img src="https://i.imgur.com/uRkYf7g.png" alt="Kolam design 1" style={{width: "150px"}}/>
          </KolamPattern>
          <KolamPattern>
              <img src="https://i.imgur.com/gK2R4Xp.png" alt="Kolam design 2" style={{width: "100px"}}/>
          </KolamPattern>
          <KolamPattern>
              <img src="https://i.imgur.com/U8E6XwF.png" alt="Kolam design 3" style={{width: "150px"}}/>
          </KolamPattern>
          <KolamPattern>
              <img src="https://i.imgur.com/9O3t1gQ.png" alt="Kolam design 4" style={{width: "80px"}}/>
          </KolamPattern>
        </div>

        <div className="content-section">
          <h1 className="title">Kolam Vision</h1>
          <h2 className="subtitle">From Dots to Designs — Rediscover Kolams with AI™</h2>
          
          <div className="description-box">
            <p>
              Kolams are more than art—they are symbols of positivity, creativity, and community. By digitizing them, we aim to preserve this cultural treasure while making it accessible to the next generation.
            </p>
          </div>

          <button className="learn-more-button">
            Learn more about Kolams <span>&#x1F50D;</span>
          </button>

          <div className="features-grid">
            <button 
              className="feature-card clickable" 
              onClick={() => setCurrentRoute('/knowledge')}
            >
              <span>&#x1F4D6;</span> Test your knowledge and learn
            </button>
            <button 
              className="feature-card clickable" 
              onClick={() => setCurrentRoute('/recognize')}
            >
              <span>&#x1F4F7;</span> Let AI Recognize
            </button>
            <button 
              className="feature-card clickable" 
              onClick={() => setCurrentRoute('/recreate')}
            >
              <span>&#x2699;&#xFE0F;</span> Recreate or complete patterns
            </button>
          </div>

          <div className="platform-description">
              <p>
                  An AI-powered platform for learning, exploring, and celebrating the traditional Indian art of Kolam (also known as muggu, rangoli, and rangavalli). This platform blends cultural heritage with modern technology to provide interactive learning experiences.
              </p>
          </div>
        </div>
      </div>
      
      {/* --- "Our Features" Section is now directly inside Home.jsx --- */}
      <div className="features-section-container">
        <h2 className="features-main-title">Our Features</h2>
        {featuresData.map((feature, index) => (
          <div
            className={`feature-tile ${index % 2 === 1 ? 'reverse' : ''}`}
            key={index}
          >
            <div className="feature-details">
              <h3 className="feature-title">{feature.title}</h3>
              <ul className="feature-points">
                {feature.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="feature-image-placeholder">
              <span>{feature.imagePlaceholder}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

