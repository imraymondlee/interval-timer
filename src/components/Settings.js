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
      <label>Set Duration</label>
      <InputNumber min={0} onChange={setWorkingSetDuration} value={props.workingSetDuration} />

      <label>Rest Duration</label>
      <InputNumber min={0} onChange={setRestDuration} value={props.restDuration} />
    </div>
  );
}

export default Settings;