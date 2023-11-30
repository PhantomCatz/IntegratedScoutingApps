import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import { Button, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

function ScoutingPage(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  type FieldType = {
    initials?: string,
    matchnum?: number,
    teamnum?: number,
    drivetrain?: string,
    numwheels?: number,
    wheeltype?: string,
    motortype?: string,
    numgear?: number,
    functional?: boolean,
    pos_mech_type?: string,
    pos_mech_function?: boolean,
    score_mech_type?: string,
    score_mech_function?: boolean,
    cone_any_direction?: boolean,
    
  };
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Scouting App</h1>
        </header>
      </div>
      <div className='body'>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='Scouter Initials' maxLength={2} className='mainbutton'/>
        </Form.Item>
        <Form.Item<FieldType> name="matchnum" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Input min={1} className='input'/>
        </Form.Item>
        <Form.Item<FieldType> name="teamnum" rules={[{ required: true, message: 'Please input the match level!' }]}>
        <InputNumber placeholder='2637' className='input' min={1} max={9999}/>
        </Form.Item>
      </div> 
    </body>
  );
}

export default ScoutingPage;
