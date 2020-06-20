import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Progress, message } from 'antd';
import NoSleep from 'nosleep.js';

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
  const noSleep = new NoSleep();

  useEffect(() => {
    let interval = null;
    // Timer when running
    if(isRunning && (currentTime <= workingSetDuration)) {
      interval = setInterval(() => {
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    // Timer when resting
    } else if(isResting && (currentTime <= restDuration)) {
      interval = setInterval(() => {
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
    if((workingSetDuration || restDuration) === 0) {
      error();
    } else {
      setIsRunning(true);
    }
  }

  const stopTimer = () => {
    setIsRunning(false);
    noSleep.disable();
  }

  const resetTimer = () => {
    stopTimer();
    setCurrentTime(0);
    setWorkingSetDuration(0);
    setRestDuration(0);
  }

  const progressPercent = () => {
    if(isRunning) {
      return (currentTime / workingSetDuration) * 100;
    } else if(isResting) {
      return (currentTime / restDuration) * 100;
    } else {
      return;
    }
  }

  const error = () => {
    message.error('Please fill in the durations.');
  };

  document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
  }, false);

  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
      <Col style={{textAlign: 'center'}}>
        <Row type="flex" justify="center">
          <div style={{position: 'relative', marginBottom: '6rem'}}>
            <div style={{position: 'absolute', top: '0%', width: '100%', textAlign: 'center'}}>
              <strong>{isResting ? 'Rest' : '' }</strong>
            </div>
            <div style={{position: 'absolute', top: '34%', width: '100%', textAlign: 'center'}}>
              <h1>{currentTime}</h1>
            </div>
            <Progress type="circle" percent={progressPercent()} showInfo={false} style={{transform: 'scale(-2, 2)'}} />
          </div>
        </Row>
        <Row type="flex" justify="center">
          <Settings 
            setWorkingSetDuration={setWorkingSetDuration} 
            workingSetDuration = {workingSetDuration} 
            setRestDuration={setRestDuration} 
            restDuration = {restDuration} 
            />
        </Row>

        <Row type="flex" justify="center" style={{marginTop: '1rem'}}>
          {!isRunning
            ? <Button type="primary" onClick={startTimer} style={{margin: '0.5rem'}}>Start</Button>
            : <Button type="primary" onClick={stopTimer} style={{margin: '0.5rem'}}>Stop</Button>
          }
          <Button onClick={resetTimer} style={{margin: '0.5rem'}}>Reset</Button>
        </Row>
      </Col>
    </Row>
  );
}

export default App;