import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import Settings from './components/Settings';
import './App.css';
import doubleBeepSound from './double-beep.wav';
import tripleBeepSound from './triple-beep.wav';

const App = () => {
  const [workingSetDuration, setWorkingSetDuration] = useState(0);
  const [restDuration, setRestDuration] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const doubleBeep = new Audio(doubleBeepSound);
  const tripleBeep = new Audio(tripleBeepSound);

  useEffect(() => {
    let interval = null;
    // Timer when running
    if(isRunning && (currentTime <= workingSetDuration)) {
      interval = setInterval(() => {
        console.log(interval);
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    // Timer when resting
    } else if(isResting && (currentTime <= restDuration)) {
      interval = setInterval(() => {
        console.log(interval);
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    }
    // Switch to rest
    else if(isRunning && (currentTime > workingSetDuration)) {
      doubleBeep.play();
      clearInterval(interval);
      setCurrentTime(0);
      // Start resting
      setIsRunning(false);
      setIsResting(true);
    }
    // Switch to run
    else if(isResting && (currentTime > restDuration)) {
      tripleBeep.play();
      clearInterval(interval);
      setCurrentTime(0);
      // Start resting
      setIsRunning(true);
      setIsResting(false);
    }


    return () => clearInterval(interval);
    
  }, [isRunning, isResting, currentTime, workingSetDuration, restDuration, doubleBeep, tripleBeep]);

  const startTimer = () => {
    setIsRunning(true);
  }

  const stopTimer = () => {
    setIsRunning(false);
  }

  const resetTimer = () => {
    setCurrentTime(0);
    setWorkingSetDuration(0);
    setRestDuration(0);
  }





  return (
    <div>
      
      {isResting ? <strong>Rest</strong> : '' }
      <h1>{currentTime}</h1>
      <Settings 
        setWorkingSetDuration={setWorkingSetDuration} 
        workingSetDuration = {workingSetDuration} 
        setRestDuration={setRestDuration} 
        restDuration = {restDuration} 
        />
      <Button type="primary" onClick={startTimer}>Start</Button>
      <Button type="primary" onClick={stopTimer}>Stop</Button>
      <Button type="primary" onClick={resetTimer}>Reset</Button>
      
      <div>
        Set Duration: {workingSetDuration}
      </div>
      <div>
        Rest Duration: {restDuration}
      </div>
    </div>
  );
}

export default App;
