import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./component/landing_page";
import LoginPage from "./component/sigin";
import RegisterPage from "./component/siginup";
import Verify from "./component/verify";
import Blogs from "./component/blogs";
import CreateBlog from "./component/create_blog";
import Dashboard from "./component/dashboard";
import BlogDetail from "./component/blog_detail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
