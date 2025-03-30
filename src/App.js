import "./App.css";
import AppRouter from "./components/AppRouter";
import TextEditorToolbar from "./components/textEditor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <AppRouter></AppRouter>
           </header>
    </div>
  );
}

export default App;
