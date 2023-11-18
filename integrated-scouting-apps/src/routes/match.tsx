import '../public/stylesheets/style.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import grid_blue from '../public/images/grid_blue.png';
import grid_red from '../public/images/grid_red.png';
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
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);

  async function updateRobotInfo() {
    const display = document.getElementById('team');
    try {
      const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + form.getFieldValue('eventname') + "_" + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum'),
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
        display.innerHTML = (team as unknown as string).substring(3);
      }
    }
    catch (error) {
      if (display) {
        display.innerHTML = 'Invalid ' + error;
      }
    }
  }
  function piecesTab(color: boolean) {
    type FieldType = {
      //hybrid cone
      h_cone?: string;
      h_cube?: string;
      super?: string;
      
      //miss or dropped cone/cube
      miss_cone?: number;
      miss_cube?: number;
      drop_cone?: number;
      drop_cube?: number;

      //high cone nodes
      ll_high_cone?: string;
      lr_high_cone?: string;
      ml_high_cone?: string;
      mr_high_cone?: string;
      rl_high_cone?: string;
      rr_high_cone?: string;

      //mid cone nodes
      ll_mid_cone?: string;
      lr_mid_cone?: string;
      ml_mid_cone?: string;
      mr_mid_cone?: string;
      rl_mid_cone?: string;
      rr_mid_cone?: string;

      //high cube nodes
      l_high_cube?: string;
      m_high_cube?: string;
      r_high_cube?: string;

      //mid cube nodes
      l_mid_cube?: string;
      m_mid_cube?: string;
      r_mid_cube?: string;

      //low hybrid nodes
      ll_low_hybrid?: string;
      lm_low_hybrid?: string;
      lr_low_hybrid?: string;
      ml_low_hybrid?: string;
      mm_low_hybrid?: string;
      mr_low_hybrid?: string;
      rl_low_hybrid?: string;
      rm_low_hybrid?: string;
      rr_low_hybrid?: string;
    }
    return (
      <div>
        <Form.Item<FieldType> label="Cone" name="h_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> label="Cube" name="h_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> label="Super" name="super" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> label="Missed Cones" name="miss_cone" rules={[{ required: true}]}>
          <InputNumber min={0} placeholder='0'></InputNumber>
        </Form.Item>
        <Form.Item<FieldType> label="Missed Cubes" name="miss_cube" rules={[{ required: true}]}>
          <InputNumber min={0} placeholder='0'></InputNumber>
        </Form.Item>
        <Form.Item<FieldType> label="Dropped Cones" name="drop_cone" rules={[{ required: true}]}>
          <InputNumber min={0} placeholder='0'></InputNumber>
        </Form.Item>
        <Form.Item<FieldType> label="Dropped Cubes" name="drop_cube" rules={[{ required: true}]}>
          <InputNumber min={0} placeholder='0'></InputNumber>
        </Form.Item>
        <div style={{position: 'relative'}}>
          <img src={color ? grid_blue : grid_red} alt=''></img>
          <div style={{position: 'absolute'}}>
          <Form.Item<FieldType> name="ll_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="lr_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="ml_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="mr_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rl_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rl_high_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item<FieldType> name="ll_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="lr_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="ml_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="mr_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rl_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rl_mid_cone" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item<FieldType> name="l_high_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="m_high_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="r_high_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item<FieldType> name="l_mid_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="m_mid_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="r_mid_cube" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item<FieldType> name="ll_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="lm_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="lr_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="ml_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="mm_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="mr_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rl_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rm_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item<FieldType> name="rr_low_hybrid" rules={[{ required: true}]}>
          <Checkbox></Checkbox>
        </Form.Item>
          </div>
        </div>
      </div>
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
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='Scouter Initials' maxLength={2} className='mainbutton'/>
        </Form.Item>
        <Form.Item<FieldType> name="eventname" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Input placeholder='2023cass' className='mainbutton' onClick={updateRobotInfo}/>
        </Form.Item>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
            <Select placeholder='Match Level' options={rounds} className='matchlevel' onClick={updateRobotInfo}/>
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
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
          <Input disabled value={imageURI}></Input>
        </div>
      );
    };      
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
        <h2 id='team'>Team #</h2>
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
        <Tabs defaultActiveKey="1" items={items} style={{border: 2 + 'px solid black'}}/>
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
      children: 'hi',
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
          died: false,
          docked: false,
          engaged: false,
          h_cube: false,
          h_cone: false, 
          super: false,

          miss_cone: false,
          miss_cube: false,
          drop_cone: false,
          drop_cube: false,

          ll_high_cone: false,
          lr_high_cone: false,
          ml_high_cone: false,
          mr_high_cone: false,
          rl_high_cone: false,
          rr_high_cone: false,

          ll_mid_cone: false,
          lr_mid_cone: false,
          ml_mid_cone: false,
          mr_mid_cone: false,
          rl_mid_cone: false,
          rr_mid_cone: false,

          l_high_cube: false,
          m_high_cube: false,
          r_high_cube: false,

          l_mid_cube: false,
          m_mid_cube: false,
          r_mid_cube: false,

          ll_low_hybrid: false,
          lm_low_hybrid: false,
          lr_low_hybrid: false,
          ml_low_hybrid: false,
          mm_low_hybrid: false,
          mr_low_hybrid: false,
          rl_low_hybrid: false,
          rm_low_hybrid: false,
          rr_low_hybrid: false,
        }}
        form={form}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}

export default MatchScout;