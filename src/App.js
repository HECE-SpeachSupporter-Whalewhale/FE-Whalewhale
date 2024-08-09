import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CreateSpeechPage from './screen/mobile/CreateSpeechPage';
import GeneratedSpeechPage from './screen/mobile/GeneratedSpeechPage';
import PracticeSpeechPage from './screen/mobile/PracticeSpeechPage';
import MainPage from './screen/mobile/MainPage';
import LoginPage from './screen/mobile/LoginPage';
import RegisterPage from './screen/mobile/RegisterPage';
import PasswordResetPage from './screen/mobile/PasswordResetPage';
import GenerationPage from './screen/mobile/GenerationPage';
import HelpWithSpeechPage from './screen/mobile/HelpWithSpeechPage';
import ViewMemoriesPage from './screen/mobile/ViewMemoriesPage';
import SpeechResultPage from './screen/mobile/SpeechResultPage';  // 추가된 부분
import CreateSpeechPagePc from './screen/pc/CreateSpeechPagePc';
import GeneratedSpeechPagePc from './screen/pc/GeneratedSpeechPagePc';
import PracticeSpeechPagePc from './screen/pc/PracticeSpeechPagePc';
import MainPagePc from './screen/pc/MainPagePc';
import LoginPagePc from './screen/pc/LoginPagePc';
import RegisterPagePc from './screen/pc/RegisterPagePc';
import PasswordResetPagePc from './screen/pc/PasswordResetPagePc';
import GenerationPagePc from './screen/pc/GenerationPagePc';
import HelpWithSpeechPagePc from './screen/pc/HelpWithSpeechPagePc';
import ViewMemoriesPagePc from './screen/pc/ViewMemoriesPagePc';
import SpeechResultPagePc from './screen/pc/SpeechResultPagePc';  // 추가된 부분
import './index.css';

const AppContent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [speechData, setSpeechData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const queryParams = new URLSearchParams(location.search);
    const forceMobile = queryParams.get('mobile') === 'true';

    if (/Mobi|Android/i.test(userAgent) || forceMobile) {
      setIsMobile(true);
      import('./mobile.css');
    } else {
      setIsMobile(false);
      import('./pc.css');
    }
  }, [location.search]);

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
    <div className="app-container">
      <Routes>
        {isMobile ? (
          <>
            <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} user={user} logout={logout} />} />
            <Route path="/create" element={<CreateSpeechPage showModal={showModal} />} />
            <Route path="/practice" element={<PracticeSpeechPage />} />
            <Route path="/login" element={<LoginPage login={login} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<PasswordResetPage />} />
            <Route path="/generation" element={<GenerationPage />} />
            <Route path="/help-with-speech" element={<HelpWithSpeechPage />} />
            <Route path="/view-memories" element={<ViewMemoriesPage />} />
            <Route path="/speech-result" element={<SpeechResultPage />} />  {/* 추가된 부분 */}
          </>
        ) : (
          <>
            <Route path="/" element={<MainPagePc isLoggedIn={isLoggedIn} user={user} logout={logout} />} />
            <Route path="/create" element={<CreateSpeechPagePc showModal={showModal} />} />
            <Route path="/practice" element={<PracticeSpeechPagePc />} />
            <Route path="/login" element={<LoginPagePc login={login} />} />
            <Route path="/register" element={<RegisterPagePc />} />
            <Route path="/forgot-password" element={<PasswordResetPagePc />} />
            <Route path="/generation" element={<GenerationPagePc />} />
            <Route path="/help-with-speech" element={<HelpWithSpeechPagePc />} />
            <Route path="/view-memories" element={<ViewMemoriesPagePc />} />
            <Route path="/speech-result" element={<SpeechResultPagePc />} />  {/* 추가된 부분 */}
          </>
        )}
      </Routes>
      {modalVisible && (
        <div className="modal-backdrop">
          {isMobile ? (
            <GeneratedSpeechPage speechData={speechData} hideModal={hideModal} />
          ) : (
            <GeneratedSpeechPagePc speechData={speechData} hideModal={hideModal} />
          )}
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;