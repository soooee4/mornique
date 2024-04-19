import './App.css';
import CompleteDisplay from './components/CompleteDisplay';
import CustomRainBow from './components/CustomRainbow';
import InitialRainbow from './components/InitialRainbow';
import RoutineModal from './components/RoutineModal';

function App() {
  return (
    <div className="App">
     <InitialRainbow />
     <CustomRainBow />
    </div>
  );
}

export default App;
