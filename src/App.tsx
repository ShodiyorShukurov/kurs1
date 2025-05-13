import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import UsersPage from './pages/Users/UsersPage';
import MessagePage from './pages/Message/MessagePage';
import AdminPage from './pages/AdminPage/AdminPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<PrivateRoute />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/messages" element={<MessagePage />} />
        {localStorage.getItem('role') === 'superadmin' ? (
          <Route path="/admin-add" element={<AdminPage />} />
        ) : (
          ''
        )}
      </Route>
    </Routes>
  );
};

export default App;
