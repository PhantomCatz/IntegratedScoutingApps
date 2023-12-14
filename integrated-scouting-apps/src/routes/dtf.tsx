import '../public/stylesheets/style.css';
import '../public/stylesheets/input.css';
import logo from '../public/images/logo.png';
import { useEffect } from 'react';
import { Button } from 'antd';

function dtfHome(props: any) {
  useEffect(() => document.title = props.title, [props.title]);
  return (
    //@Hyoungjun07 leave this here; it is the logo
    <div>
      <div className='banner'>
          <header>
            <img src={logo} style={{height: 64 + 'px'}} alt=''></img>
            <h1>Drive Team Feeder</h1>
          </header>
          
      </div>
     
      <div className="body">
        <input className="inputs" name="team1" placeholder='Team 1'/><br></br>
        
        <input className="inputs" name="team2" placeholder='Team 2'/><br></br>
        
        <input className="inputs" name="team3" placeholder='Team 3'/><br></br>
        
        <Button className="submits">Submit</Button><br></br>
        
        <Button className='backbutton' href='/'>Back</Button>
      </div>
      
    </div>

    // <Layout>
    //   <Header>
    //   </Header>
    //   <Layout>
    //     <Sider>left sidebar</Sider>
    //     <Content>main content</Content>
    //     <Sider>right sidebar</Sider>
    //   </Layout>
    //   <Footer>footer</Footer>
    // </Layout>
  );
}

export default dtfHome;
