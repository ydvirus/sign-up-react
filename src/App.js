import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element = { <Navigate to='/sign-up'/>}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      
    </div>
  );
}

export default App;
