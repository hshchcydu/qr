import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { Attractions } from './pages/Attractions';
import { AttractionDetail } from './pages/AttractionDetail';
import { Culture } from './pages/Culture';
import { Seasons } from './pages/Seasons';
import { Transport } from './pages/Transport';
import { Tips } from './pages/Tips';
import { About } from './pages/About';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attractions/:id" element={<AttractionDetail />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
