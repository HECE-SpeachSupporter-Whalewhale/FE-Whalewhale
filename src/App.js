import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './index.css';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [speechData, setSpeechData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
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
          <Route path="/login" element={<LoginPage login={login} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<PasswordResetPage />} />
          <Route path="/generation" element={<GenerationPage />} />
          <Route path="/help-with-speech" element={<HelpWithSpeechPage showModal={showModal}/>} />
          <Route path="/view-memories" element={<ViewMemoriesPage />} />
          <Route path="/speech-result" element={<SpeechResultPage />} />
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