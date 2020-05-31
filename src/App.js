import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import Settings from './components/Settings';
import './App.css';

const App = () => {
  let [workingSetDuration, setWorkingSetDuration] = useState(0);
  let [restDuration, setRestDuration] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    let interval = null;

    if(isRunning && (currentTime < workingSetDuration)) {
      interval = setInterval(() => {
        console.log(interval);
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    } else if(isResting && (currentTime < restDuration)) {
      interval = setInterval(() => {
        console.log(interval);
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    }
    
    else if(isRunning && (currentTime >= workingSetDuration)) {
      // stopTimer();
      clearInterval(interval);
      setCurrentTime(0);
      // Start resting
      setIsRunning(false);
      setIsResting(true);
    }

    else if(isResting && (currentTime >= restDuration)) {
      // stopTimer();
      clearInterval(interval);
      setCurrentTime(0);
      // Start resting
      setIsRunning(true);
      setIsResting(false);
    }

    return () => clearInterval(interval);
    
  }, [isRunning, isResting, currentTime, workingSetDuration, restDuration]);

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
