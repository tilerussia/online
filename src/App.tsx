import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { News } from './pages/News';
import { HowToPlay } from './pages/HowToPlay';
import { Faq } from './pages/Faq';
import { Applications } from './pages/Applications';
import { PageView } from './pages/PageView';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route path="how-to-play" element={<HowToPlay />} />
            <Route path="faq" element={<Faq />} />
            <Route path="applications" element={<Applications />} />
            <Route path="page/:pageId" element={<PageView />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
