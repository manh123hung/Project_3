// Sidebar.tsx
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt, faPhoneAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { firestore, storage } from '../../lib/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const Sidebar: React.FC = () => {
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
    const logo4= ref(storage, "TrangchuPages/Frame 8 (1).png");
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
    <div className="col-md-3 sidebar">
          <div className="input-group-append">
          <span className="input-group-text fc2"  style={{height:"40px",backgroundColor:"white",}}>
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" className="form-control" placeholder="Tìm kiếm" style={{border:"none"}} />

          </span>
        </div>

      <h4>
      <FontAwesomeIcon icon={faHome} /> Linh vực
      </h4>
      <div className="button-group">
        <button className="button"  >Hướng dẫn viên</button>
        <button className="button">Kinh doanh</button>
        <button className="button">Kỹ sư xây dựng</button>
        <button className="button">Nhân viên kế toán</button>
        <button className="button">Nhân viên kỹ thuật</button>
        <button className="button">Nhân viên phục vụ</button>
      </div>

      <h4>
      <FontAwesomeIcon icon={faMapMarkerAlt} /> Hình thức làm việc
      </h4>
      <div className="button-group">
        <button className="button">Bán thời gian</button>
        <button className="button">Nhân viên chính thức</button>
        <button className="button">Theo ca</button>
        <button className="button">Thực tập</button>
      </div>

      <h4>
      <FontAwesomeIcon icon={faPhoneAlt} /> Nơi làm việc
      </h4>
      <div className="button-group">
        <button className="button">Cà phê Vườn Đá</button>
        <button className="button">NH Thủy Tạ Đầm Sen</button>
        <button className="button">CVVH Đầm Sen</button>
        <button className="button">Khách sạn Ngọc Lan</button>
        <button className="button">Khách sạn Phú Thọ</button>
        <button className="button">KDL Sinh Thái Vàm Sát</button>
        <button className="button">Trung tâm DVĐL Đầm Sen</button>
        <button className="button">VP PhuThoTourist</button>
      </div>
      <img src={logo4}  className='logo4'/> 

    </div>
  );
};

export default Sidebar;