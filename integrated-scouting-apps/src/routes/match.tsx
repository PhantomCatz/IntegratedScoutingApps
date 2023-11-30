import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import no_image from '../public/images/no_image.png';
import { useState, useRef, useEffect } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Image, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [directUrls, setDirectUrls] = useState<string[]>([]);
  const [imageURI, setImageURI] = useState<string>();
  const [teamNum, setTeamNum] = useState<string>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);

  async function updateRobotInfo() {
    const display = document.getElementById('team');
    try {
      const response = await fetch('https://www.thebluealliance.com/api/v3/match/2023cass_' + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum'),
      {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': process.env.REACT_APP_X_TBA_AUTH_KEY as string,
        }
      });
      const data = await response.json();
      const team_color = form.getFieldValue('robotnum').substring(0, form.getFieldValue('robotnum').indexOf('_'));
      const team_num = form.getFieldValue('robotnum').substring(form.getFieldValue('robotnum').indexOf('_') + 1) - 1;
      const team = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
    
      await fetch('https://www.thebluealliance.com/api/v3/team/'+ team + '/media/2022',
      {
        method: "GET",
        headers: {
          'X-TBA-Auth-Key': process.env.REACT_APP_X_TBA_AUTH_KEY as string,
        }
      }).then(response => response.json()).then(data => {
        if (data.toString() !== '') {
          setDirectUrls(Object.keys(data).map(key => 
            (data as any)[key].direct_url).filter((url) => url !== null && url !== 'undefined' && url.length > 0)
          );
          console.log(data.toString() !== '' ? "has image" : "no image");
        }
        else {
          setDirectUrls([no_image]);
        }
        if (directUrls.length === 0) {
          setDirectUrls([no_image]);
        }
      });
      if (display && display.innerHTML !== 'undefined' && team) {
        setTeamNum((team as unknown as string).substring(3));
        display.innerHTML = teamNum || 'Team #';
      }
    }
    catch (error) {
      if (display) {
        display.innerHTML = 'Invalid Input';
      }
    }
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
      <div style={{alignItems: 'center', textAlign: 'center'}}>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='NK' maxLength={2} className='mainbutton'/>
        </Form.Item>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
            <Select placeholder='Match Level' options={rounds} className='matchlevel' onClick={updateRobotInfo}/>
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      autondied?: boolean;
      startingloc?: string;
      docked?: boolean;
      engaged?: boolean;
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
          {label: "R1", value: "red_1"},
          {label: "R2", value: "red_2"},
          {label: "R3", value: 'red_3'},
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          {label: "B1", value: "blue_1"},
          {label: "B2", value: "blue_2"},
          {label: "B3", value: 'blue_3'},
        ],
      },
    ];
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Path',
        children: PathTab(color),
      },
    ];
    function PathTab(color: boolean) { //needs to be capitalized to have the dynamic field work
      return (
        <div style={{alignContent: 'center'}}>
          <Button onClick={() => canvasRef.current?.undo()}>Undo</Button>
          <Button onClick={() => canvasRef.current?.redo()}>Redo</Button>
          <Button onClick={() => canvasRef.current?.clearCanvas()}>Clear</Button>
          <Button onClick={() => canvasRef.current?.exportImage('png').then(data => setImageURI(data))}>Export</Button>
          <ReactSketchCanvas
            ref={canvasRef}
            height={color ? '577px' : '567px'}
            width={color ? '636px' : '634px'}
            strokeWidth={5}
            strokeColor='#32a7dc'
            eraserWidth={100}
            backgroundImage={color ? field_blue : field_red}
            preserveBackgroundImageAspectRatio='xMidyMid meet'
            exportWithBackgroundImage={true}
          />
          <Input disabled value={imageURI}></Input>
        </div>
      );
    };      
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <h2 id='team'>{teamNum}</h2>
          <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
            <InputNumber min={1} onChange={updateRobotInfo}/>
          </Form.Item>
          <Form.Item<FieldType> id="robotnum" label="Robot #" name="robotnum" rules={[{ required: true, message: 'Please input the robot number!' }]}>
            <Select options={robotNum} className='input' onChange={async event => {
              if (event) {
                if (event.includes("red")) {
                  setColor(false);
                  canvasRef.current?.resetCanvas();
                }
                else {
                  setColor(true);
                  canvasRef.current?.resetCanvas();
                }
                updateRobotInfo();
              }}}/>
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align="flex-start">
          <Form.Item<FieldType> label="Robot Died" name="autondied" rules={[{ required: true}]}>
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
              <Image src={directUrls[0] !== null ? directUrls[0] : no_image} style={{height: 250 + 'px'}}/>
            </Image.PreviewGroup>
          </Flex>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} style={{alignItems: 'center'}}/>
      </div>
    );
  }
  function teleopMatch() {
    type FieldType = {
      single?: boolean,
      double?: boolean,
      ground?: boolean,
      teleopdied?: boolean,
      defend?: boolean,
      wasdefend?: boolean,
      matchnum?: number,
      robotnum?: number,
    };
    const robotNum = [
      {
        label: 'Red Alliance',
        options: [
          {label: "R1", value: "red_1"},
          {label: "R2", value: "red_2"},
          {label: "R3", value: 'red_3'},
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          {label: "B1", value: "blue_1"},
          {label: "B2", value: "blue_2"},
          {label: "B3", value: 'blue_3'},
        ],
      },
    ];
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <h2 id='team'>{teamNum}</h2>
          <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
            <InputNumber min={1} onChange={updateRobotInfo}/>
          </Form.Item>
          <Form.Item<FieldType> id="robotnum" label="Robot #" name="robotnum" rules={[{ required: true, message: 'Please input the robot number!' }]}>
            <Select options={robotNum} className='input' onChange={async event => {
              if (event) {
                if (event.includes("red")) {
                  setColor(false);
                  canvasRef.current?.resetCanvas();
                }
                else {
                  setColor(true);
                  canvasRef.current?.resetCanvas();
                }
                updateRobotInfo();
              }}}/>
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align="flex-start">
          <Form.Item<FieldType> label="Single Substation" name="single" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item<FieldType> label="Double Substation" name="double" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item> 
          <Form.Item<FieldType> label="Ground Intake" name="ground" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item<FieldType> label="Robot Died" name="teleopdied" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item<FieldType> label="Defended" name="defend" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item<FieldType> label="Was Defended" name="wasdefend" rules={[{ required: true}]}>
            <Checkbox></Checkbox>
          </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
            <Image.PreviewGroup items={directUrls}>
              <Image src={directUrls[0] !== null ? directUrls[0] : no_image} style={{height: 250 + 'px'}}/>
            </Image.PreviewGroup>
          </Flex>
        </Flex>
      </div>
    );
  }
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
      children: teleopMatch(),
    },
    {
      key: '4',
      label: 'End',
      children: <input type="submit" value="Submit" onClick={(event) => console.log(event)}></input>,
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
        initialValues={{
          autondied: false,
          docked: false,
          engaged: false,
          h_cube: false,
          h_cone: false, 
          super: false,

          single: false,
          double: false,
          ground: false,
          teleopdied: false,
          defend: false,
          wasdefend: false,
        }}
        form={form}
        onSubmitCapture={async event => await console.log(event)}
      >
        <Tabs defaultActiveKey="1" items={items}/>
      </Form>
    </body>
  );
}

export default MatchScout;