import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Navigation from './UI/components/Navigation';
import HistoryPage from './UI/pages/History.page';
import HomePage from './UI/pages/Home.page';
import UserListPage from './UI/pages/UserList.page';
import UserProfilePage from './UI/pages/UserProfile.page';

const App = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/user-list" element={<UserListPage />} />
      <Route path="/profile/:id" element={<UserProfilePage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </Router>
);

export default App;
