import PrimaryNavBar from "./components/primarynavbar/PrimaryNavBar";
import PrimaryWelcome from "./pages/primarywelcome/PrimaryWelcome";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import TeacherUI from "./pages/teacherUi/TeacherUI";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AdminUi from "./pages/adminUI/AdminUi";
import PrimaryUi from "./pages/primaryUi/PrimaryUi";
import { useContext } from "react";
import { Context } from "./context/Context";
import Register from "./pages/register/Register";


function App() {
  
  const {user}=useContext(Context);

  const role = user?.role;
  
  let elementToShow;
  if(user){
      if(role==="1"){
        elementToShow = <AdminUi />;
      }else if(role==="2"){
        elementToShow = <TeacherUI />;
      }else if(role==="3"){
        elementToShow = <PrimaryUi />;
      }else{
        elementToShow=<Login/>
      }
  }else{
    elementToShow = <Login />;
  }

  return (
    
    <Router>
        
        <Routes>
          <Route path="/" element={<Welcome/>}></Route>
          
          <Route path="/login" element={user? elementToShow:<Login/>}></Route>
          <Route path="/register" element={user? <Register/>:<Login/>}></Route>
        
        </Routes>
        
    </Router>

    
      
  
  );
}

export default App;
