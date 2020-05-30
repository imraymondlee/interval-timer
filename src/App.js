import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import Settings from './components/Settings';
import './App.css';

const App = () => {
  let [workingSetDuration, setWorkingSetDuration] = useState(0);
  let [restDuration, setRestDuration] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    let interval = null;

    if(isRunning && (currentTime < workingSetDuration)) {
      interval = setInterval(() => {
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    } else if((!isRunning && currentTime !== 0) || (currentTime >= workingSetDuration)) {
      console.log('clear interval');
      stopTimer();
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, workingSetDuration]);

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
