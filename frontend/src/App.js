import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StoreList from "./pages/StoreList";
import RoleSelection from "./pages/RoleSelection";
import AdminPanel from "./components/AdminPanel";
import AdminRoute from "./pages/AdminRoute";
import AddUserForm from "./components/AddUserForm";
import AddStoreForm from "./components/AddStoreForm";
import UserList from "./pages/UserList";
import ChangePassword from "./pages/ChangePassword";
import StoreDashboard from "./pages/StoreDashboard";
import ForgotPassword from "./pages/ForgetPassword";
import RatingUsersList from "./pages/RatedUserList";
import AddStore from "./pages/AddStore";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stores" element={<StoreList />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/add-user" element={<AddUserForm />} />
        <Route path="/add-store" element={<AddStoreForm />} />
        <Route path="/user-list" element={<UserList/>}/>
        <Route path="/store-dash" element={<StoreDashboard/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/forget-password" element={<ForgotPassword/>}/>
        <Route path="/rated-users" element={<RatingUsersList/>}/>
        <Route path="/addstore" element={<AddStore/>}/>
      </Routes>
    </Router>
  );
}

export default App;
