import Welcome from "./pages/welcome/Welcome";
import Login from "./pages/login/Login";
import PrimaryNavBar from "./components/primary_navbar/PrimaryNavBar";
import PrimaryWelcome from "./pages/primaryWelcom/PrimaryWelcome";

function App() {
  return (
    <div className="App">
        <PrimaryNavBar/>
        <PrimaryWelcome/>
    </div>
  );
}

export default App;
