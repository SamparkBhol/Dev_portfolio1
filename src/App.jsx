
    import React from 'react';
    import { HashRouter as Router, Routes, Route } from 'react-router-dom';
    import PortfolioPage from '@/pages/PortfolioPage';
    import { Toaster } from '@/components/ui/toaster';
    import Navbar from '@/components/shared/Navbar';
    import Footer from '@/components/shared/Footer';

    function App() {
      return (
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      );
    }

    export default App;
  