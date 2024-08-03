// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import './TailieuPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faChevronRight, faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

interface Document {
  id: string;
  name: string;
  date: string;
  downloadLink: string;
}

function TailieuPages() {
  const [logo4, setLogo4] = useState('');
  const [hinh1, sethinh1] = useState('');
  const [hinh2, sethinh2] = useState('');
  const [hinh3, sethinh3] = useState('');
  const [hinh4, sethinh4] = useState('');
  const [hinh5, sethinh5] = useState('');
  const [hinh6, sethinh6] = useState('');
  const [hinh7, sethinh7] = useState('');
  const [hinh8, sethinh8] = useState('');
  const [logo5, setLogo5] = useState('');
  const [data, setData] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tạo truy vấn Firestore
        const q = query(collection(firestore, 'TailieuPages')); 
        const querySnapshot = await getDocs(q);
        const fetchedData: Document[] = [];

        querySnapshot.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            ...doc.data(),
          } as Document);
        });

        setData(fetchedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    // Lấy URL hình ảnh từ Firebase Storage
    const getImageUrl = async (path: string) => {
      const storageRef = ref(storage, path);
      return getDownloadURL(storageRef);
    };

    const fetchImages = async () => {
      const [img1, img2, img3, img4, img5, img6, img7, img8, logoImg] = await Promise.all([
        getImageUrl('TailieuPages/img (3).png'),
        getImageUrl('TailieuPages/img (4).png'),
        getImageUrl('TailieuPages/img (5).png'),
        getImageUrl('TailieuPages/img (6).png'),
        getImageUrl('TailieuPages/img (7).png'),
        getImageUrl('TailieuPages/img (8).png'),
        getImageUrl('TailieuPages/img (9).png'),
        getImageUrl('TailieuPages/img (10).png'),
        getImageUrl('TailieuPages/Files.png'),
      ]);

      sethinh1(img1);
      sethinh2(img2);
      sethinh3(img3);
      sethinh4(img4);
      sethinh5(img5);
      sethinh6(img6);
      sethinh7(img7);
      sethinh8(img8);
      setLogo5(logoImg);
    };

    // Lấy URL video từ Firebase Storage
    const getVideoUrl = async (path: string) => {
      const storageRef = ref(storage, path);
      return getDownloadURL(storageRef);
    };

    const fetchVideo = async () => {
      const videoUrl = await getVideoUrl('TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4');
      setLogo4(videoUrl);
    };

    fetchData();
    fetchImages();
    fetchVideo();
  }, [navigate]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  // Lọc dữ liệu dựa trên tìm kiếm và ngày tháng
  const filteredDocuments = data.filter((doc) => {
    const nameMatch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch =
      (startDate === '' || doc.date >= startDate) && (endDate === '' || doc.date <= endDate);
    return nameMatch && dateMatch;
  });

  interface CardProps {
    title: string;
    text: string;
    imgSrc: string;
  }

  const Card: React.FC<CardProps> = ({ title, text, imgSrc }) => {
    return (
      <div className="card1">
        <div className="card-body">
          <img src={imgSrc} alt={title} />
          <img src={logo5} alt="" style={{ height: "120px", width: "100px", marginLeft: "40px", top: "50px" }} />
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {logo4 && (
          <video
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            loop
            autoPlay
            muted
          >
            <source src={logo4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="container c012" style={{ marginLeft: "310px", fontFamily: "Roboto" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="text-center" style={{ marginLeft: "-40px" }}>
                <h1 className="title">TÀI LIỆU</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh1} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh2} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh3} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh4} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh5} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh6} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh7} />
              </div>
              <div className="col-md-2 mb-4">
                <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh8} />
              </div>
            </div>
            <div className="row" style={{ marginRight: "400px" }}>
              <FontAwesomeIcon
                icon={faAngleDoubleDown}
                color="white"
                style={{ fontSize: "40px" }}
                onClick={handleScrollDown}
              />
            </div>
            <br />
          </div>
        </div>
      </div>

      <br />
      <nav className="nv1">
        <div style={{ marginLeft: "10px", padding: "10px" }}>
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="date-from"><b style={{ color: "#0054A6" }}> Ngày tạo:</b></label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control fc1"
                    id="date-from"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <span className="input-group-text fc2" style={{ backgroundColor: "white", border: "none" }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                  <input
                    type="date"
                    className="form-control fc1"
                    id="date-to"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{ marginLeft: "430px" }}>
              <div className="form-group">
                <label htmlFor="keyword"><b style={{ color: "#0054A6" }}> Từ Khóa:</b></label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text fc2" style={{ height: "40px", backgroundColor: "white", border: "none" }}>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="keyword"
                    placeholder="Tìm kiếm"
                    style={{ border: "none" }}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ color: "white", fontFamily: "Roboto" }}>
          <table className="table">
            <thead>
              <tr>
                <th className="text-white" style={{ backgroundColor: "#0054A6", textAlign: "center" }}>
                  STT
                </th>
                <th className="text-white" style={{ backgroundColor: "#0054A6" }}>
                  Tên tài liệu
                </th>
                <th className="text-white" style={{ backgroundColor: "#0054A6", textAlign: "center" }}>
                  Ngày tạo
                </th>
                <th className="text-white" style={{ backgroundColor: "#0054A6", textAlign: "center" }}>
                  Tải tài liệu
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, index) => (
                <tr className="table-primary" key={doc.id}>
                  <td style={{ backgroundColor: "#E6EEF7", border: "none", textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td style={{ backgroundColor: "#E6EEF7", border: "none" }}>{doc.name}</td>
                  <td style={{ backgroundColor: "#E6EEF7", border: "none", textAlign: "center" }}>
                    {doc.date}
                  </td>
                  <td style={{ backgroundColor: "#E6EEF7", border: "none", textAlign: "center" }}>
                    <a href={doc.downloadLink} style={{ marginLeft: "35px" }}>
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginLeft: "20px" }}>
          <div className="row">
            <div className="col-4">
              <p className="text-muted">
                Hiển thị <button className="page-number">10</button> câu trả lời trong mỗi trang
              </p>
            </div>
            <div className="col-4" style={{ marginLeft: "420px" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      10
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <Footer />
    </div>
  );
}

export default TailieuPages;