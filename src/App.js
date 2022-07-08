import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import OnlineUsers from './components/online-users/OnlineUsers';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import Pages from './pages/Pages';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Pages />
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
