import './App.css';
import React, {useState} from 'react';
import Timer from './components/Timer.js'
import Settings from './components/Settings';
import SettingsContext from './components/SettingsContext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className="App">
      <main>
        <h1 style={{fontSize: "4rem"}}>POMODORO</h1>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setBreakMinutes,
        setWorkMinutes
      }}>
        {showSettings ? <Settings/> : <Timer/>}
      </SettingsContext.Provider>
      </main>
      
    </div>
  );
}

export default App;
