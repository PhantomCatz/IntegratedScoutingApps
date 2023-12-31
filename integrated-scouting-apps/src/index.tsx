/**
 * @author Nathan Kwok, add more...
 * @since 2023-10-29
 * @version 1.0.0
 * @description This is the entry point for the integrated-scouting-apps.
 */
import ReactDOM from 'react-dom/client';
import HomePage from './routes/home';
import ScoutingApp from './routes/scoutingapp';
import MatchScout from './routes/match';
import DTF from './routes/dtf'; 
import StrategicScout from './routes/strategic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage title="2637 Strategy App"/>} />
        <Route path="/scoutingapp" element={<ScoutingApp title="2637 Scouting App"/>} />
        <Route path="/dtf" element={<DTF title="2637 Drive Team Feeder"/>} />
        <Route path="/scoutingapp/match" element={<MatchScout title="2637 Match Scout"/>} />
        <Route path="/scoutingapp/strategic" element={<StrategicScout title="2637 Strategic Scout"/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);