import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import { Button } from 'antd';
import { useEffect } from 'react';

function ScoutingPage(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{ height: 64 + 'px' }} alt=''></img>
          <h1>Scouting App</h1>
        </header>
      </div>
      <div className='body'>
        <Button className='mainbutton' href='/scoutingapp/match' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Match Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/strategic' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Strategic Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/pit' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Pit Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/lookup' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Data Lookup</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/picklists' style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Picklists</Button>
        <br></br>
        <Button className='backbutton' href='/'>Back</Button>
        <br></br>
      </div>
    </body>
  );
}

export default ScoutingPage;
