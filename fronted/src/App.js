import Home from './pages/Home';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import WorkoutDetails from './components/WorkoutDetails';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
       <Routes>
        <Route path='/' element = {<Home/>}/>
       </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
