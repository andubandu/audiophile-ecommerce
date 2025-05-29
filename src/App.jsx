import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;