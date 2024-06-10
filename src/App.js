import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/main/Main';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp.js';
import RecruitBoard from './components/recruitboard/RecruitBoard';
import NotFound from './components/NotFound';
import MyProfile from './components/profile/MyProfile';
import UserProfile from './components/profile/UserProfile';
import RecruitBoardDetail from './components/recruitboard/RecruitBoardDetail'; 
import ReviewBoardDetail from './components/reviewboard/ReviewBoardDetail'; 
import RecruitBoardWrite from './components/recruitboard/RecruitBoardWrite'; 
import RecruitBoardModify from './components/recruitboard/RecruitBoardModify'; 
import ReviewBoardModify from './components/reviewboard/ReviewBoardModify'; 
import ReviewBoard from './components/reviewboard/ReviewBoard'; 
import ReviewBoardWrite from './components/reviewboard/ReviewBoardWrite'; 
import './App.css';
import './fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header className="header" />
        <Routes>
		  <Route path="/" element={<Main />} />
		  <Route path="/Login" element={<Login />} />
		  <Route path="/SignUp" element={<SignUp />} />
		  <Route path="/main" element={<Main />} />
		  <Route path="/recruitboard" element={<RecruitBoard />} />
		  <Route path="/reviewboard" element={<ReviewBoard />} />
		  <Route path="/reviewboardwrite" element={<ReviewBoardWrite />} />
		  <Route path="/recruitboard/:boardNo" element={<RecruitBoardDetail />} />
		  <Route path="/reviewboard/:boardNo" element={<ReviewBoardDetail />} />
		  <Route path="/userprofile/:userId" element={<UserProfile />} />
		  <Route path="/myprofile" element={<MyProfile />} />
		  <Route path="/recruitboardwrite" element={<RecruitBoardWrite />} />
		  <Route path="/recruitboard/:boardNo/modify" element={<RecruitBoardModify />} />
		  <Route path="/reviewboard/:boardNo/modify" element={<ReviewBoardModify />} />
		  <Route path="*" element={<NotFound />} />
		</Routes>
        <Footer className="footer" />
      </BrowserRouter>
    </div>
  );
};

export default App;