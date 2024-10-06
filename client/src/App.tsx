import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import Authenticated from "./components/Authenticated";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:id" element={<PostDetail />} />

        <Route element={<Authenticated />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
