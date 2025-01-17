import './App.css';
import RoutesMain from "./Routes";
import {AuthProvider} from "./Contexts/AuthContext";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <RoutesMain />
        </AuthProvider>
    </div>
  );
}

export default App;
