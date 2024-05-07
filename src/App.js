import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoticeList from './components/NoticeList';
import AddNotice from './components/AddNotice';
import NoticeDetail from './components/NoticeDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoticeList />} />
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
