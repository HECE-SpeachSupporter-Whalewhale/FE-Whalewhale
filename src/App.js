import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CreateSpeechPage from './screen/CreateSpeechPage';
import GeneratedSpeechPage from './screen/GeneratedSpeechPage';
import PracticeSpeechPage from './screen/PracticeSpeechPage';
import MainPage from './screen/MainPage';
import LoginPage from './screen/LoginPage';
import RegisterPage from './screen/RegisterPage';
import PasswordResetPage from './screen/PasswordResetPage';
import GenerationPage from './screen/GenerationPage';
import HelpWithSpeechPage from './screen/HelpWithSpeechPage';
import ViewMemoriesPage from './screen/ViewMemoriesPage';
import SpeechResultPage from './screen/SpeechResultPage';
import ViewMemoriesPage_Detail from './screen/ViewMemoriesPage_Detail';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [speechData, setSpeechData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const showModal = (data) => {
    setSpeechData(data);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} user={user} logout={logout} />} />
        <Route path="/create" element={<CreateSpeechPage showModal={showModal} />} />
        <Route path="/practice" element={
          <PracticeSpeechPage 
            isLoggedIn={isLoggedIn} 
            login={login}
            logout={logout}
          />
        } />
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<PasswordResetPage />} />
        <Route path="/generation" element={isLoggedIn ? <GenerationPage /> : <Navigate to="/login" />} />
        <Route path="/help-with-speech" element={isLoggedIn ? <HelpWithSpeechPage showModal={showModal}/> : <Navigate to="/login" />} />
        <Route path="/view-memories" element={isLoggedIn ? <ViewMemoriesPage /> : <Navigate to="/login" />} />
        <Route path="/speech-result" element={isLoggedIn ? <SpeechResultPage /> : <Navigate to="/login" />} />
        <Route path="/ViewMemoriesPage_Detail" element={isLoggedIn ? <ViewMemoriesPage_Detail /> : <Navigate to="/login" />} />
        <Route 
          path="/oauth2/success" 
          element={
            <OAuth2RedirectHandler 
              onLogin={(userData) => {
                login(userData);
                navigate('/');
              }} 
            />
          } 
        />
      </Routes>

      {modalVisible && (
        <div className="modal-backdrop">
          <GeneratedSpeechPage speechData={speechData} hideModal={hideModal} />
        </div>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;