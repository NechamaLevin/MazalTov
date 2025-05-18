import "./App.css";
import AppRouter from "./components/AppRouter";
import SupportPopup from "./components/SupportPopup";

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <canvas
        id="confetti-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10000, // מעל הכל
        }}
      ></canvas>
            <SupportPopup />

         <AppRouter></AppRouter>
         {/* <EmailEditor></EmailEditor> */}
           </header>
    </div>
  );
}

export default App;

