import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagements from './pages/UserManagement';
import UserResgistration from './pages/UserResgistration';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider> {}
      <Router>
        <Routes>
          <Route path="/login" element={<UserManagements />} />
          <Route path="/register" element={<UserResgistration />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
