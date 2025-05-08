import "./App.css";
import AppRouter from "./components/AppRouter";
import EmailEditor from "./components/Email";

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <AppRouter></AppRouter>
         {/* <EmailEditor></EmailEditor> */}
           </header>
    </div>
  );
}

export default App;
