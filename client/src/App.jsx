import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Files from './files';
import Register from './register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadChapter from './UploadChapter';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Files />} />
          <Route path="/upload" element={<UploadChapter />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
