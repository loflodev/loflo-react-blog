import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./components/Section/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import Layout from "./components/Layout";
import UserPage from "./pages/UserPage";
import UserLayout from "./components/UserLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
