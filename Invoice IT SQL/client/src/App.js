import './App.css';
import Navbar from './Components/Navbar';
import POform from './Components/POform';
import Potable from './Components/Potable';
import ViewPO from './Components/ViewPO';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import Edit from './Components/Edit';

function App() {




  return (

<>
<div className='main'>
<Navbar></Navbar>
<Router className = "router">
  <Routes>
  <Route path="/" element={<Potable />}/>
  <Route path="/add" element={<POform/>}/>
  <Route path ="/view/:id" element={<ViewPO/>}/>
  <Route path ="/edit/:id" element={<Edit/>}/>
  </Routes>
</Router>
</div>


   </>
  );
}

export default App;
