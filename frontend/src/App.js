import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './components/ShortenerPage';
import StatisticsPage from './components/StatisticsPage'; 
import RedirectPage from './components/RedirectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
