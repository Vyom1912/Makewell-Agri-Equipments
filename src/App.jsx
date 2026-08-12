import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
// import Navbar   from './components/Navbar';
// import Footer   from './components/Footer';
// import Home     from './pages/Home';
// import About    from './pages/About';
// import Products from './pages/Products';
// import Company  from './pages/Company';
// import Export   from './pages/Export';
// import Contact  from './pages/Contact';
// import NotFound from './pages/NotFound';

import { Navbar, Footer, PageLoader } from "./components";
import {
  Home,
  About,
  Products,
  Company,
  Export,
  Contact,
  NotFound,
} from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [showBackTop, setShowBackTop] = useState(false);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      4000,
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageLoader />
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/company' element={<Company />} />
          <Route path='/export' element={<Export />} />
          <Route path='/contact' element={<Contact showToast={showToast} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Toast */}
      <div
        className={`toast${toast.visible ? " show" : ""}`}
        role='alert'
        aria-live='polite'>
        {toast.msg}
      </div>

      {/* Back to top */}
      <button
        className={`back-to-top${showBackTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label='Back to top'>
        ↑
      </button>
    </>
  );
}

export default function App() {
  // BASE_URL is "/" on Vercel, "/Makewell-Agri-Equipments/" on gh-pages
  // Strip trailing slash for BrowserRouter basename
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  return (
    <BrowserRouter basename={base}>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
