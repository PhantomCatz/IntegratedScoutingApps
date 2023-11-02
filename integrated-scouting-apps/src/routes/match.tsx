import '../public/stylesheets/home.css';
import logo from '../public/images/logo.png';
import { Button, Tabs, Input, Dropdown, Space } from 'antd';
import type { TabsProps, MenuProps } from 'antd';

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Pre',
      children: preMatch(),
    },
    {
      key: '2',
      label: 'Auton',
      children: 'testing the gp of robin',
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

function preMatch() {
    const items: MenuProps['items'] = [
        {label: "Qualifications", key: '0'},
        {label: "Round 1", key: '1'},
        {label: "Round 2", key: '2'},
        {label: "Round 3", key: '3'},
        {label: "Round 4", key: '4'},
        {label: "Round 5", key: '5'},
        {label: "Finals", key: '6'},
    ];
    return (
        <div>
            <p>Scouter Initials</p>
            <Input placeholder="NK" maxLength={2}/>
            <br></br>
            <p>Event Name</p>
            <Input placeholder="juwon is very home of six"/>
            <br></br>
            <p>Match Level</p>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button>
                <Space>
                    Click to choose team:
                </Space>
                </Button>
            </Dropdown>
            <div>
                <p id='asdf'></p>
            </div>
        </div>
    );
}
function autonMatch() {

}
function homePage() {
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}}></img>
          <h1>Match Scout</h1>
        </header>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </body>
  );
}

export default homePage;
