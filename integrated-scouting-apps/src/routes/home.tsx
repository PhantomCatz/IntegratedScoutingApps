import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import { Button } from 'antd';
import { useEffect } from 'react';

function HomePage(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{ height: 64 + 'px' }} alt=''></img>
          <h1>Strategy Apps</h1>
        </header>
      </div>
      <div className='body'>
        <Button className='mainbutton' href='/scoutingapp' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Scouting App</Button>
        <br></br>
        <Button className='mainbutton' href='/dtf' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Drive Team Feeder</Button>
      </div>
    </body>
  );
}

export default HomePage;
