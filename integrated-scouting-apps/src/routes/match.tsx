import '../public/stylesheets/style.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import grid_blue from '../public/images/grid_blue.png';
import grid_red from '../public/images/grid_red.png';
import { useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Carousel, Image } from 'antd';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';

function piecesTab(color: boolean) {
  return (
    <img src={color ? grid_blue : grid_red} style={{height: 450 + 'px'}}></img>
  )
}
function preMatch() {
  type FieldType = {
    initials?: string;
    eventname?: string;
    matchlevel?: string;
  };
  const rounds = [
    {label: "Qualifications", value: "qm"},
    {label: "Elimination", value: "sf"},
    {label: "Finals", value: "f"},
  ];
  return (
    <div>
      <Form.Item<FieldType> label="Initials" name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
        <Input placeholder='Scouter Initial' maxLength={2}/>
      </Form.Item>
      <Form.Item<FieldType> label="Event Name" name="eventname" rules={[{ required: true, message: 'Please input the event name!' }]}>
        <Input value='2023cass'/>
      </Form.Item>
      <Form.Item<FieldType> label="Match Level" name="matchlevel" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Select options={rounds}/>
      </Form.Item>
    </div>
  );
}
function AutonMatch() { //needs to be capitalized to have the dynamic field work
  const [color, setColor] = useState(false);
  const [directUrls, setDirectUrls] = useState<string[]>([]);
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
  function pathTab(color: boolean) {
    return (
      <div>
        <ReactSketchCanvas
          height='552px'
          strokeWidth={5}
          strokeColor={color ? 'blue': 'red'}
          eraserWidth={10}
          backgroundImage={color ? field_blue : field_red}
        />
      </div>
    )
  };
  async function getRobotImage(team: number) {
  await fetch('https://www.thebluealliance.com/api/v3/team/frc'+ team + '/media/2022',
  {
    method: "GET",
    headers: {
      'X-TBA-Auth-Key': process.env.REACT_APP_X_TBA_AUTH_KEY as string,
    }
  }
  ).then(response => response.json()).then(data => {
    setDirectUrls(Object.keys(data).map(key => 
      (data as any)[key].direct_url).filter((url) => url != null && url.length > 0))});
  }
  return (
    <div className='matchbody'>
      <Flex align='flex-end'>
      <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
        <InputNumber min={1}/>
      </Form.Item>
      <Form.Item<FieldType> id="robotnum" label="Robot #" name="robotnum" rules={[{ required: true, message: 'Please input the robot number!' }]}>
        <Select options={robotNum} className='input' onChange={event => {event.includes("r") ? setColor(false) : setColor(true)}}/>
      </Form.Item>
      </Flex>
      <Flex justify='space-between'>
        <Flex vertical align="flex-start">
        <Form.Item<FieldType> label="Robot Died" name="died" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> label="Starting Location" name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
          <Select options={startingLoc} className='input'/>
        </Form.Item> 
        <Form.Item<FieldType> label="Docked" name="docked" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> label="Engaged" name="engaged" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        </Flex>
        <Flex vertical align="flex-end">
          <Image.PreviewGroup items={directUrls}>
            <Image src={directUrls[0]} style={{height: 250 + 'px'}}/>
          </Image.PreviewGroup>
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
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
