import '../public/stylesheets/style.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';
import { Button } from 'antd';

function homePage() {
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
          <h1>Strategy Apps</h1>
        </header>
      </div>
      <div className='body'>
        <Button className='mainbutton' href='/scoutingapp'>Scouting App</Button>
        <br></br>
        <Button className='mainbutton' href='/dtf'>Drive Team Feeder</Button>
      </div> 
    </body>
  );
}

export default homePage;
