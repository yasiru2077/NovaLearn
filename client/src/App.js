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
import SecondaryStudentsPage from "./pages/SecondaryStudentsPage/SecondaryStudentsPage";
import LogOutModal from "./components/logoutmodal/LogOutModal";
import PrimaryRegister from "./pages/primaryregister/PrimaryRegister";
import SecondryUi from "./pages/SecondryUi/SecondryUi";
import Subject from "./pages/subject/Subject";
import Qustions from "./components/qustions/Qustions";
import AnswersFeedBack from "./components/qustions/AnswersFeedBack";
import SomeParentComponent from "./components/qustions/SomeParentComponent";


function App() {
  
  const {user}=useContext(Context);

  const role = user?.role;
  const grade = user?.grade;
  console.log(grade);
  const studentsGrade = parseInt(grade);
  
  let elementToShow;
  if(user){
      if(role==="1"){
        elementToShow = <AdminUi />;
      }else if(role==="2"){
        elementToShow = <TeacherUI />;
      }else if(role==="3"){
        
        if(studentsGrade< 6){
          elementToShow = <PrimaryUi />;
        }else if(studentsGrade>5){
          elementToShow = <SecondryUi/>
        }
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
            <Route path="/PrimaryRegister" element={user? <PrimaryRegister/>:<Login/>}></Route>
            <Route path="/events" element={user? <Events/>:<Login/>}></Route>
            <Route path="/logout" element={user? <LogOutModal/>:<Login/>}></Route>
            </>
          )}
         {role==="2"&&(
          <>
          
          <Route path="/quiz" element={user? <Quiz/>:<Login/>}></Route>
          <Route path="/quizReview" element={user? <QuizReview/>:<Login/>}></Route>
          <Route path="/quizReview/:title" element={user? <QustionReview/>:<Login/>}></Route>
          <Route path="/addQustion" element={user? <AddQustions/>:<Login/>}></Route>
          <Route path="/logout" element={user? <LogOutModal/>:<Login/>}></Route>
          
          </>
         )}

         {role==="3"&&(
          <>
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/logout" element={user? <LogOutModal/>:<Login/>}></Route>
          <Route path="/subject" element={user? <Subject/>:<Login/>}></Route>
          <Route path="/subject/:title" element={user? <Qustions/>:<Login/>}></Route>
          <Route path="/SomeParentComponent" element={user? <SomeParentComponent/>:<Login/>}></Route>
          <Route path="/answerFeedBack" element={user? <AnswersFeedBack/>:<Login/>}></Route>
          </>
         )}
         
         
        </Routes>
        
    </Router>

    
      
  
  );
}

export default App;
