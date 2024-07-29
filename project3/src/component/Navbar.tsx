// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { firestore, storage } from '../lib/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage';



const Navbar = () => {
    const [logo4, setlogo4] = useState("");

    const location = useLocation();

    const navigate = useNavigate();
    const [data, setData] = useState<DocumentData[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [download, setDownload] = useState('');
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
      }};
  
    useEffect(() => {
      //lay anh
      const logo4= ref(storage, "Component/Frame 8.png");
      Promise.all([
        getDownloadURL(logo4),
      ])
        .then((urls) => {
          setlogo4(urls[0]);
        })
        .catch((error) => {
          console.log("Error getting URLs:", error);
        });
      const fetchData = async () => {
        try {
          const quanlyRef = await getDocs(collection(firestore, "WS"));
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
    }, [navigate]);
  return (
<nav className="navbar">
      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              style={location.pathname === '/' ? { textDecoration: 'underline', color: '#99FFFF' } : {}}
            >
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link
              to="/bai-viet"
              style={location.pathname === '/bai-viet' ? { textDecoration: 'underline', color: '#99FFFF' } : {}}
            >
              BÀI VIẾT
            </Link>
          </li>
        </ul>
        <div className="container">
          <img src={logo4} alt="" />
        </div>
        <ul className="nav-links">
          <li>
            <Link
              to="/tai-lieu"
              style={location.pathname === '/Tailieu' ? { textDecoration: 'underline', color: '#99FFFF' } : {}}
            >
              TÀI LIỆU
            </Link>
          </li>
          <li>
            <Link
              to="/tuyen-dung"
              style={location.pathname === '/tuyen-dung' ? { textDecoration: 'underline', color: '#99FFFF' } : {}}
            >
              TUYỂN DỤNG
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;