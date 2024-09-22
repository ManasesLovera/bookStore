import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserManagement from './pages/UserManagement';
import {UserRegistration} from './pages/userRegistration/UserResgistration'; 
import BookList from './pages/BookList'; 
import Navbar from './pages/Navbar';
import LandingPage from './landing/LandingPage';
import { AppProvider, useAppContext } from './context/AppContext'; 

const ProtectedRoute = ({ element, redirectTo }: { element: JSX.Element; redirectTo: string }) => {
  const { isAuthenticated } = useAppContext(); 
  return isAuthenticated ? element : <Navigate to={redirectTo} />; 
};

const App: React.FC = () => {
  return (
    <AppProvider> 
      <Router> 
        <Navbar /> 
        <Routes> 
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<UserManagement />} /> 
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/books" element={<ProtectedRoute element={<BookList />} redirectTo="/login" />} /> 
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App; 
