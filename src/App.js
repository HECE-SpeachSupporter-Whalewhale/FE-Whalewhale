import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [speechData, setSpeechData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
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
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} user={user} logout={logout} />} />
          <Route path="/create" element={isLoggedIn ? <CreateSpeechPage showModal={showModal} /> : <Navigate to="/login" />} />
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
        </Routes>
        {modalVisible && (
          <div className="modal-backdrop">
            <GeneratedSpeechPage speechData={speechData} hideModal={hideModal} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;