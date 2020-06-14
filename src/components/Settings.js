import React from 'react';
import { Row, Col, Card, InputNumber } from 'antd';

const Settings = (props) => {
  const setWorkingSetDuration = (value) => {
    props.setWorkingSetDuration(value);
  }

  const setRestDuration = (value) => {
    props.setRestDuration(value);
  }

  return (
    <Card style={{width: '16rem'}}>
      <Row justify="space-between" align="middle" style={{marginBottom: '1.5rem'}}>
        <Col>
          <label style={{fontWeight: 800}}>Set Duration: </label>
        </Col>
        <Col>
          <InputNumber min={0} onChange={setWorkingSetDuration} value={props.workingSetDuration} />
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col>
          <label style={{fontWeight: 800}}>Rest Duration: </label>
        </Col>
        <Col>
          <InputNumber min={0} onChange={setRestDuration} value={props.restDuration} />
        </Col>
      </Row>
    </Card>
  );
}

export default Settings;