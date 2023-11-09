import '../public/stylesheets/home.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import grid_blue from '../public/images/grid_blue.png';
import grid_red from '../public/images/grid_red.png';
import { useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex } from 'antd';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';

function pathTab(color: boolean) {
  return (
    <div>
      <ReactSketchCanvas
        width='800px'
        height='690px'
        strokeWidth={5}
        strokeColor='cyan'
        eraserWidth={10}
        backgroundImage={color ? field_blue : field_red}
      />
    </div>
  )
};
function piecesTab(color: boolean) {
  return (
    <img src={color ? grid_blue : grid_red}></img>
  )
}
function preMatch() {
  type FieldType = {
    initials?: string;
    eventname?: string;
    matchlevel?: string;
  };
  const rounds = [
    {label: "Qualifications", value: "qual"},
    {label: "Round 1", value: "1"},
    {label: "Round 2", value: '2'},
    {label: "Round 3", value: '3'},
    {label: "Round 4", value: "4"},
    {label: "Round 5", value: "5"},
    {label: "Finals", value: "finals"},
  ];
  return (
    <div>
      <Form.Item<FieldType> label="Initials" name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
        <Input placeholder='NK' maxLength={2}/>
      </Form.Item>
      <Form.Item<FieldType> label="Event Name" name="eventname" rules={[{ required: true, message: 'Please input the event name!' }]}>
        <Input placeholder='2023cass'/>
      </Form.Item>
      <Form.Item<FieldType> label="Match Level" name="matchlevel" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Select options={rounds}/>
      </Form.Item>
    </div>
  );
}
function AutonMatch() { //needs to be capitalized to have the dynamic field work
  const [color, setColor] = useState(false);
  type FieldType = {
    died?: string;
    startingloc?: string;
    docked?: string;
    engaged?: string;
    matchnum?: number;
    robotnum?: number;
  };
  const startingLoc = [
    {label: "Left", value: "left"},
    {label: "Middle", value: "middle"},
    {label: "Right", value: 'right'},
  ];
  const robotNum = [
    {
      label: 'Red Alliance',
      options: [
        {label: "R1", value: "r1"},
        {label: "R2", value: "r2"},
        {label: "R3", value: 'r3'},
      ],
    },
    {
      label: 'Blue Alliance',
      options: [
        {label: "B1", value: "b1"},
        {label: "B2", value: "b2"},
        {label: "B3", value: 'b3'},
      ],
    },
  ];
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Path',
      children: pathTab(color),
    },
    {
      key: '2',
      label: 'Pieces',
      children: piecesTab(color),
    },
  ];  
  return (
    <div>
    <Form.Item<FieldType> label="Team #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
      <InputNumber placeholder='123' min='1' max='9999'/>
    </Form.Item>
    <Form.Item<FieldType> id="robotnum" label="Robot #" name="robotnum" rules={[{ required: true, message: 'Please input the robot number!' }]}>
    <Select options={robotNum} defaultValue={robotNum[0].options[0].value} onChange={event => {
                if (event.includes("r")) {
                  setColor(false)
                }
                else {
                  setColor(true);
                }
            }} />
    </Form.Item>
    <Flex justify='space-between' vertical={true} align='flex-start'>
      <Form.Item<FieldType> label="Robot Died" name="died" rules={[{ required: true}]}>
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item<FieldType> label="Starting Location" name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
        <Select options={startingLoc}/>
      </Form.Item>
      <Form.Item<FieldType> label="Docked" name="docked" rules={[{ required: true}]}>
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item<FieldType> label="Engaged" name="engaged" rules={[{ required: true}]}>
        <Checkbox></Checkbox>
      </Form.Item>
      <Flex vertical align="flex-end" justify="space-between">
        <img src={'https://i.imgur.com/4zcMOach.jpg'} alt=''></img>
        <p>Team #2637</p>
        <p>2022</p>
      </Flex>
    </Flex>
    <Tabs defaultActiveKey="1" items={items} />
  </div>
  )
}
function matchScout() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Pre',
      children: preMatch(),
    },
    {
      key: '2',
      label: 'Auton',
      children: AutonMatch(),
    },
    {
      key: '3',
      label: 'Teleop',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'End',
      children: 'Content of Tab Pane 3',
    },
  ];  
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Match Scout</h1>
        </header>
      </div>
      <Form
        initialValues={
          {died: false, docked: false, engaged: false}
        }
          >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}

export default matchScout;
