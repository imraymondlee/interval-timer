import React from 'react';
import { InputNumber } from 'antd';

const Settings = (props) => {
  const setWorkingSetDuration = (value) => {
    props.setWorkingSetDuration(value);
  }

  const setRestDuration = (value) => {
    props.setRestDuration(value);
  }

  return (
    <div>
      <div>
        <label style={{fontWeight: 800}}>Set Duration (seconds): </label>
        <InputNumber min={0} onChange={setWorkingSetDuration} value={props.workingSetDuration} />
      </div>
      <div>
        <label style={{fontWeight: 800}}>Rest Duration (seconds): </label>
        <InputNumber min={0} onChange={setRestDuration} value={props.restDuration} />
      </div>
    </div>
  );
}

export default Settings;