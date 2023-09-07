import { BottomNavigation } from '@mui/material';
import './App.css';
// import EditTodo from './components/EditTodo';
//components
import InputTodo from './components/InputTodo';
import Regestrationform from './components/Registrationform.js';
// import ListTodo from './components/ListTodo';
import Test from './components/test';

function App() {
  
  return (
    <>
    
     <div className="container">
      
      <InputTodo />
      <Test />
      {/* <ListTodo /> */}
      {/* <EditTodo/> */}
      {/* <Regestrationform/> */}
      {/* <img src='https://www.loginradius.com/blog/static/05c0a6d7a4539d8f04241b6ddf720a52/03979/blog-banner.png' alt='aws'> */}
      
      {/* </img> */}
      
      </div> 
      
    

    </>
  );
}

export default App;
