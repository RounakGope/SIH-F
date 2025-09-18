import React, { useState } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import Knowledge from './components/knowledge';
import Recognize from './components/recognize';
import Analysis from './components/analysis';
import AiRecreate from './components/AiRecreate';

function App() {
  const [currentRoute, setCurrentRoute] = useState('/home');
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisSuccess = (data) => {
    setAnalysisData(data);
    setCurrentRoute('/analysis');
  };

  const renderComponent = () => {
    switch (currentRoute) {
      case '/knowledge':
        return <Knowledge />;
      case '/recognize':
        return <Recognize setCurrentRoute={setCurrentRoute} onAnalysisSuccess={handleAnalysisSuccess} />;
      case '/analysis':
        return <Analysis analysisData={analysisData} setCurrentRoute={setCurrentRoute} />;
      case '/recreate':
        return <AiRecreate />;
      case '/home':
      default:
        return <Home setCurrentRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        {renderComponent()}
      </main>
    </div>
  );
}

export default App;

