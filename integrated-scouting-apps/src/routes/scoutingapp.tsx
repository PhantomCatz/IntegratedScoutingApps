import '../public/stylesheets/home.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';
import { Button } from 'antd';

function homePage() {
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Scouting App</h1>
        </header>
      </div>
      <div className='body'>
        <Button className='mainbutton' href='/scoutingapp/match'>Match Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/strategic'>Strategic Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/pit'>Pit Scout</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/lookup'>Data Lookup</Button>
        <br></br>
        <Button className='mainbutton' href='/scoutingapp/picklists'>Picklists</Button>
        <br></br>
        <Button className='backbutton' href='/'>Back</Button>
        <br></br>
      </div> 
    </body>
  );
}

export default homePage;
