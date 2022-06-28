import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../scss/timer.scss'
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {

  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secsLeft, setSecsLeft] = useState(0);
  const secsLeftRef = useRef(secsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secsLeftRef.current--; 
    setSecsLeft(secsLeftRef.current);
  }

  function initTimer(){
    setSecsLeft(settingsInfo.workMinutes*60);
  }

  useEffect(() => {

    function switchMode(){
      const nextMode = modeRef.current === 'work' ? 'break': 'work';
      const nextSecs = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
  
      setSecsLeft(nextSecs);
      secsLeftRef.current = nextSecs;
    }

    // initTimer();

    secsLeftRef.current = settingsInfo.workMinutes*60;
    setSecsLeft(secsLeftRef.current);

    const interval = setInterval(() => {
      if(isPausedRef.current){
        return;
      }
      if(secsLeftRef.current === 0){
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSecs = mode === 'work' ? settingsInfo.workMinutes*60 : settingsInfo.breakMinutes*60;
  const percentage = Math.round(secsLeft/totalSecs * 100);
  const mins = Math.floor(secsLeft/60);
  let secs = secsLeft%60;
  if(secs<10){
    secs = '0' + secs;
  }

    return (
      <div>
        <div className='progBar'>
            <div><CircularProgressbar value={percentage} text={mins + ':' + secs}
            styles={buildStyles({
                textColor:'fff',
                pathColor:mode === 'work' ? red: green,
                trailColor:'rgba(255,255,255,.2)',
            })} /></div>
        </div>
        <div style={{marginTop:'20px'}}>
            {isPaused ? 
            <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false;}}/> 
            : 
            <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true;}}/>}
        </div>
        <div style={{marginTop:'20px'}}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
        </div>
      </div>
    );
}

export default Timer;