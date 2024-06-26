import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/main/Main';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp.js';
import FindId from './components/signUp/FindId';
import FindPassword from './components/signUp/FindPassword';
import VerifyPassword from './components/signUp/VerifyPassword';
import EditProfile from './components/signUp/EditProfile';
import TagSelectionForEdit from './components/signUp/TagSelectionForEdit';
import RecruitBoard from './components/recruitboard/RecruitBoard';
import NotFound from './components/NotFound';
import MyProfile from './components/profile/MyProfile';
import UserProfile from './components/profile/UserProfile';
import TagSelection from './components/signUp/TagSelection';
import RecruitBoardDetail from './components/recruitboard/RecruitBoardDetail'; 
import ReviewBoardDetail from './components/reviewboard/ReviewBoardDetail'; 
import RecruitBoardWrite from './components/recruitboard/RecruitBoardWrite'; 
import RecruitBoardModify from './components/recruitboard/RecruitBoardModify'; 
import ReviewBoardModify from './components/reviewboard/ReviewBoardModify'; 
import ReviewBoard from './components/reviewboard/ReviewBoard'; 
import ReviewBoardWrite from './components/reviewboard/ReviewBoardWrite'; 
import MessageBoard from './components/message/MessageBoard'; 
import ProfileToMessage from './components/message/ProfileToMessage';
import './App.css';
import './fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './AuthContext.js';

const App = () => {
	 
  return (
	

	<AuthProvider>
		<div className="App">
		<BrowserRouter>
			<Header className="header" />
			<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/SignUp" element={<SignUp />} />
			<Route path="/SignUp/TagSelection" element={<TagSelection />} />
			<Route path="/findId" element={<FindId/>}/>
			<Route path="/findPassword" element={<FindPassword/>}/>
			<Route path = "/VerifyPassword" element ={<VerifyPassword/>}/>
			<Route path = "/EditProfile" element = {<EditProfile/>}/>
			<Route path = "/TagSelectionForEdit" element = {<TagSelectionForEdit/>}/>
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
			<Route path="/profiletomessage" element={<ProfileToMessage />} />
			<Route path="/messageboard" element={<MessageBoard />} />
			<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer className="footer" />
		</BrowserRouter>
		</div>
	</AuthProvider>

  );
};

export default App;