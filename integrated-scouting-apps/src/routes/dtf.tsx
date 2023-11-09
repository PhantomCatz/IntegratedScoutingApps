import '../public/stylesheets/home.css';
import '../public/stylesheets/buttons.css';
import logo from '../public/images/logo.png';

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
        <a href='/scoutingapp'>
          <button className='mainbutton'>Scouting App</button>
        </a>
        <br></br>
        <a href='/dtf'>
          <button className='mainbutton'>Drive Team Feeder</button>
        </a>
      </div> 
    </body>
  );
}

export default homePage;
