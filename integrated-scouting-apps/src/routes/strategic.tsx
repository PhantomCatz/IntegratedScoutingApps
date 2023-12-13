import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import { useEffect } from 'react';
import { Tabs, Input, Form, Select, Button  } from 'antd';
import type { TabsProps } from 'antd';
import { redirect } from 'react-router-dom';

function StrategicScout(props:any) 
{
  const [form]=Form.useForm();
  function preMatch() {
    type FieldType = {
      initials?: string;
      eventname?: string;
      matchlevel?: string;
      matchnum?: number;
      robot?: number;
      teamnum?: number;
  
    };
    const rounds = [
      {label: "Qualifications", value: "qm"},
      {label: "Elimination", value: "sf"},
      {label: "Finals", value: "f"},
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
    return (
      <div>
        <Form.Item<FieldType> label="Initials" name="initials" rules={[{ required: true, message: 'Please input your initials!' }]}>
          <Input placeholder='Scouter Initial' maxLength={2}/>
        </Form.Item>
        <Form.Item<FieldType> label="Event" name="eventname" id="eventcode" rules={[{ required: true, message: 'Please input the event name!' }]}>
        <Input disabled={true}/>
        </Form.Item>
        <Form.Item<FieldType> label="Match Level" name="matchlevel" id="level" rules={[{ required: true, message: 'Please input the event name!' }]}>
          <Select placeholder='Match Level' options={rounds}/>
        </Form.Item>
        <Form.Item<FieldType> label="Match #" name="matchnum" id="match" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <Input placeholder='Match #'/>
        </Form.Item>
        <Form.Item<FieldType> label="Robot" name="robot" id="robot" rules={[{ required: true, message: 'Please input the robot position!' }]}>
          <Select placeholder='Robot' options={robotNum}/>
        </Form.Item>
        <Form.Item<FieldType> label="Team #" name="teamnum" id="teamnum" rules={[{ required: true, message: 'Please input the match number!' }]}>
          <Input placeholder='Team #' maxLength={4}/>
        </Form.Item>
      </div>
    );
  }
  function AutonMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      autonQuestion1?: string;
      autonQuestion2?: string;
      autonQuestion3?: string;
      autonQuestion4?: string;
      autonQuestion5?: string;
    };
  
    return (
      <div className='matchbody'>
        <p>What was the robot's starting position?</p>
        <Form.Item<FieldType> name="autonQuestion1" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>What was the robot's first move when the round started? starting position?</p>
        <Form.Item<FieldType> name="autonQuestion2" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Where did they pick up game pieces from the field?</p>
        <Form.Item<FieldType> name="autonQuestion3" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Where did they place game pieces on the grid?</p>
        <Form.Item<FieldType> name="autonQuestion4" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>What was the robot's ending position?</p>
        <Form.Item<FieldType> name="autonQuestion5" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
    </div>
    );
  }
  
  function TeleopMatch() { //needs to be capitalized to have the dynamic field work
    type FieldType = {
      teleQuestion1?: string;
      teleQuestion2?: string;
      teleQuestion3?: string;
      teleQuestion4?: string;
      teleQuestion5?: string;
      teleQuestion6?: string;
      teleQuestion7?: string;
      teleQuestion8?: string;
      driverSkillRating?: string;
      robotSpeed?: string;
      comments?: string;
    };
  
    return (
      <div className='matchbody'>
        <p>Where does the robot go directly after autonomous?</p>
        <Form.Item<FieldType> name="teleQuestion1" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>How, if any, did defense affect the cycle time? Did the robot have good counter-defense?</p>
        <Form.Item<FieldType> name="teleQuestion2" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>How does the robot enter the community from the scoring table's perspective? (Top/Charging Station/Bottom)</p>
        <Form.Item<FieldType> name="teleQuestion3" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>How, if any, did they play defense? Was it effective?</p>
        <Form.Item<FieldType> name="teleQuestion4" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Is this robot capable of going over the charging station?</p>
        <Form.Item<FieldType> name="teleQuestion5" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Where is this robot able to collect game pieces in the substations? (Top/Bottom/Both)</p>
        <Form.Item<FieldType> name="teleQuestion6" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Is the robot well balanced? Or prone to tip.</p>
        <Form.Item<FieldType> name="teleQuestion7" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>What were the penalties that were incurred by this robot?</p>
        <Form.Item<FieldType> name="teleQuestion8" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Did driver have good driving skill?</p>
        <Form.Item<FieldType> name="driverSkillRating" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>How fast could the robot move?</p>
        <Form.Item<FieldType> name="robotSpeed" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <p>Comments</p>
        <Form.Item<FieldType> name="comments" rules={[{ required: true}]}>
          <Input/>
        </Form.Item>
        <input type="submit" value="Submit" style={{border: 2 + 'px solid black', textAlign: 'center', marginLeft: 45 + '%'}} className='input'></input>
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
      children: TeleopMatch(),
    },
  ];  
  
  async function newStrategicScout(event: any) {
    const body = {
      "matchIdentifier": {
        "Initials": event.initials,
        "Robot": event.robotnum,
        "match_event": event.eventname,
        "match_level": event.matchlevel,
        "match_number": event.matchnum,
        "team_number": event.teamnum,
      },
      "auto": {
        "auto_starting_position": event.autonQuestion1,
        "auto_robot_first_move": event.autonQuestion2,
        "auto_robot_pickup_location": event.autonQuestion3,
        "auto_robot_scoring_location": event.autonQuestion4,
        "auto_robot_ending_location": event.autonQuestion5,
      },
      "teleop": {
        "T_robot_starting_location": event.teleQuestion1,
        "T_robot_counter_defense": event.teleQuestion2,
        "T_robot_community_entering_location": event.teleQuestion3,
        "T_robot_entering_details": event.teleQuestion4,
        "T_robot_ability_overChargeStation": event.teleQuestion5,
        "T_robot_substation_usage": event.teleQuestion6,
        "T_robot_balancing": event.teleQuestion7,
        "T_robot_penalty_reason": event.teleQuestion8,
        "T_driver_skill": event.driverSkillRating,
        "T_robot_performance": event.robotSpeed,
        "T_comments": event.comments,
      }
    };
    try {
      await fetch(process.env.REACT_APP_FIREBASE_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Request-Headers":"Content-Type, Origin",
          "Content-Type":"application/json",
          "Origin":"localhost:3000",
          "Database":"StrategicScouting"
        }
      }).then(response => response.json()).then(data => console.log(data));
      redirect('./strategic');
  }
  catch (err) {
    console.log(err);
  }
};
    return (
      <body>
        <div className='banner'>
          <header>
            <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
            <h1>Strategic Scout</h1>
          </header>
        </div>
        <Form
        initialValues={
          {eventname: '2023cass'}
        }
        form={form}
        onFinish={event => {
          try {
            newStrategicScout(event);
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

export default StrategicScout;