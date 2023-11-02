import '../public/stylesheets/home.css';
import logo from '../public/images/logo.png';
import { Button } from 'antd';

interface Props {
  title: string;
  buttons: { text: string, link: string }[];
}

function homePage(props: Props) {
  return (
    <body>
      <div className='banner'>
        <header>
          <img src={logo} style={{height: 64 + 'px'}}></img>
          <h1>{props.title}</h1>
        </header>
      </div>
      <div className='body'>
        {props.buttons.map((button, index) => (
            <Button key={index} href={button.link}>{button.text}</Button>
          ))}
      </div> 
    </body>
  );
}

export default homePage;
