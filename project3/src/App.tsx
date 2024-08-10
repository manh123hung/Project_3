import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { firestore } from './lib/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import TrangchuPages from './pages/TrangchuPages/TrangchuPages';
import TailieuPages from './pages/TaiLieuPages/TailieuPages';
import TuyendungPages from './pages/TuyendungPages/TuyendungPages';
import TuyendungChitiet from './pages/TuyendungPages/TuyendungPages-Chitiet';
import BaivietChitiet from './pages/BaivietPages/BaivietPages-chitiet';
import BaivietPages from './pages/BaivietPages/BaivietPages';
function App() {
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, "users"));
        const fetchedData: DocumentData[] = [];

        quanlyRef.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        setData(fetchedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<TrangchuPages  />} />
      <Route path="/Tailieu" element={<TailieuPages  />} />
      <Route path="/Tuyendung" element={<TuyendungPages  />} />
      <Route path="/TuyendungChitiet" element={<TuyendungChitiet  />} />
      <Route path="/BaivietChitiet" element={<BaivietChitiet />} />
      <Route path="/BaivietPages" element={<BaivietPages />} />


      </Routes>
    </Router>
  );
}

export default App;