import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./components/ErrorPage";
import UserTinyCodes from "./components/UserTinyCodes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        
        <Route element={<RequireAuth />}>
        <Route path="/" element={<Home/>} />
        <Route path="/tiny" element={<UserTinyCodes />} />
        <Route path="/clicks" element={<h1>Clicks</h1>} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<ErrorPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
