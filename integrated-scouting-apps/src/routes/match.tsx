import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import field_blue from '../public/images/field_blue.png';
import field_red from '../public/images/field_red.png';
import no_image from '../public/images/no_image.png';
import grid_blue from '../public/images/grid_blue.png';
import grid_red from '../public/images/grid_red.png';
import { useRef, useEffect, useState } from 'react';
import { Tabs, Input, Form, Select, Checkbox, InputNumber, Flex, Image, Button } from 'antd';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import type { TabsProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function MatchScout(props: any) {
  const [form] = Form.useForm();
  const [color, setColor] = useState(false);
  const [directURL, setDirectURL] = useState<string[]>([]);
  const imageURI = useRef<string>();
  const teamNum = useRef<number>(0);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  useEffect(() => document.title = props.title, [props.title]);
  const eventname = process.env.REACT_APP_EVENTNAME;
  const year = new Date().getFullYear() - 1;

  async function updateRobotInfo() {
    const display = document.getElementById('team');
    try {
      const response = await fetch('https://www.thebluealliance.com/api/v3/match/' + eventname + "_" + form.getFieldValue('matchlevel') + form.getFieldValue('matchnum'),
        {
          method: "GET",
          headers: {
            'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
          }
        });
      const data = await response.json();
      const team_color = form.getFieldValue('robotnum').substring(0, form.getFieldValue('robotnum').indexOf('_'));
      const team_num = form.getFieldValue('robotnum').substring(form.getFieldValue('robotnum').indexOf('_') + 1) - 1;
      const team = (data.alliances[team_color].team_keys[team_num] !== null ? data.alliances[team_color].team_keys[team_num] : 0);
      await fetch('https://www.thebluealliance.com/api/v3/team/' + team + '/media/' + year,
        {
          method: "GET",
          headers: {
            'X-TBA-Auth-Key': process.env.REACT_APP_TBA_AUTH_KEY as string,
          }
        }).then(response => response.json()).then(async data => {
          if (data.toString() !== '') {
            setDirectURL(Object.keys(data).map(key => (data as any)[key].direct_url).filter((url) => url !== null && url !== 'undefined' && url.length > 0));
            console.log(data);
          }
          else {
            setDirectURL([no_image]);
          }
        });
      if (display && display.innerHTML !== 'undefined' && team) {
        teamNum.current = parseInt((team as unknown as string).substring(3));
        display.innerHTML = teamNum.current.toString();
      }
    }
    catch (error) {
      if (display) {
        display.innerHTML = 'Invalid Input';
      }
    }
  }
  async function setNewMatchScout(event: any) {
    const body = {
      "matchIdentifier": {
        "Initials": event.initials,
        "Robot": event.robotnum,
        "match_event": eventname,
        "match_level": event.matchlevel,
        "match_number": event.matchnum,
        "team_number": teamNum,
      },
      "auto": {
        "auto_total_points": 0,
        "auto_cones_scored": 0,
        "auto_missed_cone": 0,
        "auto_cubes_scored": 0,
        "auto_missed_cube": 0,
        "auto_mobility": event.autonpath,
        "auto_start_location": event.startingloc,
        "auto_piecePickedUp": 0,
        "auto_docked": event.autondocked,
        "auto_engaged": event.autonengaged,
        "autonPath": event.URI,
      },
      "teleop": {
        "T_total_points": 0,
        "T_missed_cone": 0,
        "T_cones_scored": 0,
        "T_missed_cube": 0,
        "T_cubes_scored": 0,
        "T_docked": event.enddocked,
        "T_engaged": event.endengaged,
        "T_parked": event.parked,
        "T_ability_selfBalance": event.selfbalance,
      },
      "overall": {
        "counter_defense": event.countdefense,
        "intakeGround": event.ground,
        "intakeSingle": event.single,
        "intakeDouble": event.double,
        "robot_died": event.enddied,
        "intake_speed": event.intake,
        "comments": event.comments,
        "dropped_pieces": 0,
        "was_defended": event.wasdefend,
        "superchargedNodes": 0,
        "penaltiesIncurred": event.penalty,
      }
    };
    try {
      await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Request-Headers": "Content-Type, Origin",
          "Content-Type": "application/json",
          "Origin": "localhost:3000",
          "Database": "MatchScouting"
        }
      }).then(response => response.json()).then(data => console.log(data));
    }
    catch (err) {
      console.log(err);
    }
  };
  function PiecesTab(color: boolean) { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      ll_high?: boolean;
      lm_highc?: boolean;
      lr_high?: boolean;
      ml_high?: boolean;
      mm_highc?: boolean;
      mr_high?: boolean;
      rl_high?: boolean;
      rm_highc?: boolean;
      rr_high?: boolean;

      ll_mid?: boolean;
      lm_midc?: boolean;
      lr_mid?: boolean;
      ml_mid?: boolean;
      mm_midc?: boolean;
      mr_mid?: boolean;
      rl_mid?: boolean;
      rm_midc?: boolean;
      rr_mid?: boolean;

      ll_hybrid?: string;
      lm_hybrid?: string;
      lr_hybrid?: string;
      ml_hybrid?: string;
      mm_hybrid?: string;
      mr_hybrid?: string;
      rl_hybrid?: string;
      rm_hybrid?: string;
      rr_hybrid?: string;
    };
    const hybrid = [
      {
        options: [
          {label: "None", value: "none"},
          {label: "Cone", value: "cone"},
          {label: "Cube", value: "cube"},
          {label: "S. Cone", value: "supercone"},
          {label: "S. Cube", value: "supercube"},
        ],
      },
    ];
    return (
      <div>
        <Flex vertical justify='space-between'>
          <Flex align='flex-start' justify='space-between'>
            <Form.Item<FieldType> name="ll_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="lm_highc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="lr_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="ml_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="mm_highc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="mr_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rl_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rm_highc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rr_high" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
          </Flex>
          <Flex align='flex-start' justify='space-between'>
            <Form.Item<FieldType> name="ll_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="lm_midc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="lr_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="ml_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="mm_midc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="mr_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rl_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rm_midc" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> name="rr_mid" rules={[{ required: true }]}>
              <Checkbox></Checkbox>
            </Form.Item>
          </Flex>
          <Flex align='flex-start' justify='space-between'>
            <Form.Item<FieldType> name="ll_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="lm_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="lr_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="ml_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="mm_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="mr_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="rl_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="rm_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
            <Form.Item<FieldType> name="rr_hybrid" rules={[{ required: true }]}>
              <Select options={hybrid} className="input" defaultValue="none" />
            </Form.Item>
          </Flex>
        </Flex>
        <img src={color ? grid_blue : grid_red} style={{ width: 636 + 'px', paddingBottom: 50 + 'px' }} alt=''></img>
      </div>
    );
  }
  function preMatch() {
    type FieldType = {
      initials?: string;
      matchlevel?: string;
    };
    const rounds = [
      { label: "Qualifications", value: "qm" },
      { label: "Elimination", value: "sf" },
      { label: "Finals", value: "f" },
    ];
    return (
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ textAlign: 'left', paddingLeft: 40 + '%' }}>Scouter Initials</h2>
        <Form.Item<FieldType> name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='NK' maxLength={2} className='mainbutton' />
        </Form.Item>
        <Form.Item<FieldType> name="matchlevel" rules={[{ required: true, message: 'Please input the match level!' }]}>
          <Select placeholder='Match Level' options={rounds} className='matchlevel' onChange={updateRobotInfo} />
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      autondied?: boolean;
      startingloc?: string;
      autondocked?: boolean;
      autonengaged?: boolean;
      matchnum?: number;
      robotnum?: number;
    };
    const startingLoc = [
      { label: "Left", value: "left" },
      { label: "Middle", value: "middle" },
      { label: "Right", value: 'right' },
    ];
    const robotNum = [
      {
        label: 'Red Alliance',
        options: [
          { label: "R1", value: "red_1" },
          { label: "R2", value: "red_2" },
          { label: "R3", value: 'red_3' },
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          { label: "B1", value: "blue_1" },
          { label: "B2", value: "blue_2" },
          { label: "B3", value: 'blue_3' },
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
        children: PiecesTab(color),
      }
    ];
    function PathTab(color: boolean) { //needs to be capitalized to have the dynamic field work
      return (
        <div style={{ alignContent: 'center' }}>
          <Button onClick={() => canvasRef.current?.undo()} className='pathbutton'>Undo</Button>
          <Button onClick={() => canvasRef.current?.redo()} className='pathbutton'>Redo</Button>
          <Button onClick={() => canvasRef.current?.clearCanvas()} className='pathbutton'>Clear</Button>
          <ReactSketchCanvas
            ref={canvasRef}
            height='568px'
            width='568px'
            strokeWidth={5}
            strokeColor='#32a7dc'
            eraserWidth={100}
            backgroundImage={color ? field_blue : field_red}
            preserveBackgroundImageAspectRatio='xMidyMid meet'
            exportWithBackgroundImage={true}
          />
          <Input disabled value={imageURI.current} name='URI'></Input>
        </div>
      );
    };
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <h2 id='team'>{teamNum.current}</h2>
          <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
            <InputNumber min={1} onChange={updateRobotInfo} />
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
                await updateRobotInfo();
              }
            }} />
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> label="Robot Died" name="autondied" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Starting Location" name="startingloc" rules={[{ required: true, message: 'Please input the starting location!' }]}>
              <Select options={startingLoc} className='input' />
            </Form.Item>
            <Form.Item<FieldType> label="Docked" name="autondocked" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Engaged" name="autonengaged" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
            <Image.PreviewGroup items={directURL}>
              <Image src={directURL[0]} style={{ height: 250 + 'px' }} />
            </Image.PreviewGroup>
          </Flex>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} style={{ alignItems: 'center', textAlign: 'center' }} />
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
          { label: "R1", value: "red_1" },
          { label: "R2", value: "red_2" },
          { label: "R3", value: 'red_3' },
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          { label: "B1", value: "blue_1" },
          { label: "B2", value: "blue_2" },
          { label: "B3", value: 'blue_3' },
        ],
      },
    ];
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <h2 id='team'>{teamNum.current}</h2>
          <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
            <InputNumber min={1} onChange={updateRobotInfo} />
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
              }
            }} />
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> label="Single Substation" name="single" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Double Substation" name="double" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Ground Intake" name="ground" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Robot Died" name="teleopdied" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Defended" name="defend" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Was Defended" name="wasdefend" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
            <Image.PreviewGroup items={directURL}>
              <Image src={directURL[0] !== null ? directURL[0] : no_image} style={{ height: 250 + 'px' }} />
            </Image.PreviewGroup>
          </Flex>
        </Flex>
      </div>
    );
  }
  function endMatch() {
    type FieldType = {
      enddied?: boolean;
      startingloc?: string;
      enddocked?: boolean;
      endengaged?: boolean;
      parked?: boolean;
      matchnum?: number;
      robotnum?: number;
      intake?: number;
      countdefense?: number;
      defense?: number;
      driver?: number;
      penalty?: string;
      comments?: string;
      selfbalance?: boolean;
    };
    const robotNum = [
      {
        label: 'Red Alliance',
        options: [
          { label: "R1", value: "red_1" },
          { label: "R2", value: "red_2" },
          { label: "R3", value: 'red_3' },
        ],
      },
      {
        label: 'Blue Alliance',
        options: [
          { label: "B1", value: "blue_1" },
          { label: "B2", value: "blue_2" },
          { label: "B3", value: 'blue_3' },
        ],
      },
    ];
    return (
      <div className='matchbody'>
        <Flex align='flex-end' justify='space-between'>
          <h2 id='team'>{teamNum.current}</h2>
          <Form.Item<FieldType> label="Match #" name="matchnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
            <InputNumber min={1} onChange={updateRobotInfo} />
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
              }
            }} />
          </Form.Item>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> label="Robot Died" name="enddied" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Docked" name="enddocked" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Engaged" name="endengaged" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Parked" name="parked" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
            <Form.Item<FieldType> label="Self Balance" name="selfbalance" rules={[{ required: true }]}>
              <Checkbox className='checkbox'></Checkbox>
            </Form.Item>
          </Flex>
          <Flex vertical align="flex-end">
            <Image.PreviewGroup items={directURL}>
              <Image src={directURL[0]} style={{ height: 250 + 'px' }} />
            </Image.PreviewGroup>
          </Flex>
        </Flex>
        <Flex justify='space-between'>
          <Flex vertical align='flex-start'>
            <Form.Item<FieldType> label="Intake Speed" name="intake" rules={[{ required: true, message: 'Please input the intake speed!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
            <Form.Item<FieldType> label="Counterdefense" name="countdefense" rules={[{ required: true, message: 'Please input the counterdefense!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
          </Flex>
          <Flex vertical align='flex-end'>
            <Form.Item<FieldType> label="Defense" name="defense" rules={[{ required: true, message: 'Please input the defense!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
            <Form.Item<FieldType> label="Driver Skill" name="driver" rules={[{ required: true, message: 'Please input the driver skill!' }]}>
              <InputNumber min={0} max={4} />
            </Form.Item>
          </Flex>
        </Flex>
        <TextArea placeholder='Penalties Occured' maxLength={100} className='textarea' showCount name='penalty'></TextArea>
        <TextArea placeholder='Comments' maxLength={100} className='textarea' showCount name='comments'></TextArea>
        <Input type="submit" value="Submit" className='submit'></Input>
      </div>
    )
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
      children: endMatch(),
    },
  ];
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{ height: 64 + 'px' }} alt=''></img>
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
          autondocked: false,
          autonengaged: false,

          single: false,
          double: false,
          ground: false,
          teleopdied: false,
          defend: false,
          wasdefend: false,

          enddied: false,
          enddocked: false,
          endengaged: false,
          parked: false,
          selfbalance: false,

          ll_high: false,
          lm_high: false,
          lr_high: false,
          ml_high: false,
          mm_high: false,
          mr_high: false,
          rl_high: false,
          rm_high: false,
          rr_high: false,
          ll_mid: false,
          lm_mid: false,
          lr_mid: false,
          ml_mid: false,
          mm_mid: false,
          mr_mid: false,
          rl_mid: false,
          rm_mid: false,
          rr_mid: false,
        }}
        form={form}
        onFinish={async event => {
          try {
            canvasRef.current?.exportImage('png').then(data => imageURI.current = data);
            await setNewMatchScout(event);
            window.location.reload();
          }
          catch (err) {
            console.log(err);
          }
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </body>
  );
}

export default MatchScout;