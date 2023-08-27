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
import Events from "./pages/events/Events";
import SecondaryRegister from "./pages/secondaryRegister/SecondaryRegister";
import TeachersRegister from "./pages/teachersRegister/TeachersRegister";
import Quiz from "./components/quiz/Quiz";
import QuizReview from "./components/quizreview/QuizReview";
import QustionReview from "./pages/Qustionreview/QustionReview";
import AddQustions from "./pages/addQustions/AddQustions";


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
          {role==="1"&&(
            <>
            <Route path="/register" element={user? <Register/>:<Login/>}></Route>
            <Route path="/secondaryRegister" element={user? <SecondaryRegister/>:<Login/>}></Route>
            <Route path="/TeachersRegister" element={user? <TeachersRegister/>:<Login/>}></Route>
            <Route path="/events" element={user? <Events/>:<Login/>}></Route>
            </>
          )}
         {role==="2"&&(
          <>
          
          <Route path="/quiz" element={user? <Quiz/>:<Login/>}></Route>
          <Route path="/quizReview" element={user? <QuizReview/>:<Login/>}></Route>
          <Route path="/quizReview/:title" element={user? <QustionReview/>:<Login/>}></Route>
          <Route path="/addQustion" element={user? <AddQustions/>:<Login/>}></Route>
          
          </>
         )}
         
         
        </Routes>
        
    </Router>

    
      
  
  );
}

export default App;
