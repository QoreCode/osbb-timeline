import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimelineView from './pages/TimelineView';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimelineView />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
