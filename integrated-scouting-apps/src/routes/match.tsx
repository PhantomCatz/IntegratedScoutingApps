import '../public/stylesheets/style.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import grid_blue from '../public/images/grid_blue.png';
import grid_red from '../public/images/grid_red.png';
import no_image from '../public/images/no_image.png';
import { useState, useRef } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Image, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'rc-textarea';

function MatchScout() {
  const [form] = Form.useForm();
  function piecesTab(color: boolean) {
    return (
      <img src={color ? grid_blue : grid_red} style={{height: 450 + 'px'}} alt=''></img>
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
          <Input placeholder='Scouter Initials' maxLength={2}/>
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
    const [teamNumber, setTeamNumber] = useState<number>();
    const [imageURI, setImageURI] = useState<string>();
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
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
      {
        key: '2',
        label: 'Pieces',
        children: piecesTab(color),
      },
    ];
    function PathTab(color: boolean) { //needs to be capitalized to have the dynamic field work
      return (
        <div>
          <Button onClick={() => canvasRef.current?.undo()}>Undo</Button>
          <Button onClick={() => canvasRef.current?.redo()}>Redo</Button>
          <Button onClick={() => canvasRef.current?.clearCanvas()}>Clear</Button>
          <Button onClick={() => canvasRef.current?.exportImage('png').then(data => setImageURI(data))}>Export</Button>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{marginLeft: 10 + '%'}}
            height={color ? '577px' : '567px'}
            width={color ? '636px' : '634px'}
            strokeWidth={5}
            strokeColor='#32a7dc'
            eraserWidth={100}
            backgroundImage={color ? field_blue : field_red}
            preserveBackgroundImageAspectRatio='xMidyMid meet'
            exportWithBackgroundImage={true}
          />
          <TextArea disabled value={imageURI}></TextArea>
        </div>
      );
    };      
    async function getTeamNumberFromMatch(match_num: number): Promise<number | void> {
      try {
        const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + form.getFieldValue('eventname') + "_" + form.getFieldValue('matchlevel') + match_num,
        {
          method: "GET",
          headers: {
            'X-TBA-Auth-Key': process.env.REACT_APP_X_TBA_AUTH_KEY as string,
          }
        });
        const data = await response.json();
        const team_color = form.getFieldValue('robotnum').substring(0, form.getFieldValue('robotnum').indexOf('_'));
        const team_num = form.getFieldValue('robotnum').substring(form.getFieldValue('robotnum').indexOf('_') + 1) - 1;
        setTeamNumber(data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
        return data.alliances[team_color].team_keys[team_num] !== null ? parseInt(data.alliances[team_color].team_keys[team_num].substring(3)) : undefined;
      } catch (error) {

        console.error(error);
      }
    }
    async function getRobotImage(team: number) {
      try {
        await fetch('https://www.thebluealliance.com/api/v3/team/frc'+ team + '/media/2022',
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
      }
      catch (error) {
        console.log(error);
      }
    }
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
        <h2 id='team'>Team #</h2>
        <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <InputNumber min={1} onChange={async (event: number | null) => {
            if (event) {
              const teamNumber = await getTeamNumberFromMatch(event);
              const display = document.getElementById('team');
              if (display) {
                if (display.innerHTML !== 'undefined') {
                  if (teamNumber) {
                    display.innerHTML = teamNumber as unknown as string;
                    await getRobotImage(teamNumber);     
                  }
                  else {
                    display.innerHTML = 'Invalid Team #';
                  }
                }
                else {
                  display.innerHTML = 'Invalid Team #';
                }
              }
            }
          }}/>
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
              const teamNumber = await getTeamNumberFromMatch(form.getFieldValue('matchnum'));
              if (teamNumber) {
                await getRobotImage(teamNumber);
              }
            }
            }}/>
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
              <Image src={directUrls[0] !== null ? directUrls[0] : no_image} style={{height: 250 + 'px'}}/>
            </Image.PreviewGroup>
          </Flex>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} />
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
        form={form}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}

export default MatchScout;