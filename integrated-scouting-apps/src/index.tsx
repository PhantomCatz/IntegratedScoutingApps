/**
 * @author Nathan Kwok, add more...
 * @since 2023-10-29
 * @version 1.0.0
 * @description This is the entry point for the integrated-scouting-apps.
 */
import ReactDOM from 'react-dom/client';
import HomePage from './routes/home';
import ScoutingApp from './routes/scoutingapp';
import Match from './routes/match';
import DTF from './routes/dtf';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const homePage = {
  title: 'Strategy Apps',
  buttons: [
    {text: 'Scouting App', link: '/scoutingapp', style: 'mainbutton'},
    {text: 'Drive Team Feeder', link: '/dtf', style: 'mainbutton'}
  ]
};
const scoutingApp = {
  title: 'Scouting Apps',
  buttons: [
    {text: 'Match Scout', link: '/scoutingapp/match', style: 'mainbutton'},
    {text: 'Strategic Scout', link: '/scoutingapp/strategic', style: 'mainbutton'},
    {text: 'Pit Scout', link: '/scoutingapp/pit', style: 'mainbutton'},
    {text: 'Data Lookup', link: '/scoutingapp/lookup', style: 'mainbutton'},
    {text: 'Picklists', link: '/scoutingapp/picklists', style: 'mainbutton'},
    {text: 'Back', link: '/', style: 'backbutton'},
  ]
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage title={homePage.title} buttons={homePage.buttons}/>} />
        <Route path="/scoutingapp" element={<ScoutingApp title={scoutingApp.title} buttons={scoutingApp.buttons}/>} />
        <Route path="/dtf" element={<DTF />} />
        <Route path="/scoutingapp/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);