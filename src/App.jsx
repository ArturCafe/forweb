import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Folder from "./pages/Folder";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogSingle />} />

          <Route path="/archives" element={<Archives />} />
          <Route path="/folder/:id" element={<Folder />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
