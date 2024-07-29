// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';


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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [download, setDownload] = useState('');
  const [data, setData] = useState<DocumentData[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    // Lấy ảnh từ Firebase Storage
    const hinh1Ref = ref(storage, 'TrangchuPages/Rectangle 11.png'); 
    const hinh2Ref = ref(storage, 'TrangchuPages/Rectangle 12.png'); 
    const hinh3Ref = ref(storage, 'TrangchuPages/img.png'); 
    const hinh4Ref = ref(storage, 'TrangchuPages/img (1).png'); 
    const hinh5Ref = ref(storage, 'TrangchuPages/img (2).png'); 
    const hinh6Ref = ref(storage, 'TrangchuPages/img (3).png'); 
    const hinh7Ref = ref(storage, 'TrangchuPages/img (4).png'); 
    const hinh8Ref = ref(storage, 'TrangchuPages/img (5).png'); 
    const logo5= ref(storage, "TrangchuPages/Frame 8.png");
    Promise.all([
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),
      getDownloadURL(hinh5Ref),
      getDownloadURL(hinh6Ref),
      getDownloadURL(hinh7Ref),
      getDownloadURL(hinh8Ref),
      getDownloadURL(logo5),

    ])
      .then((urls) => {
        sethinh1(urls[0]);
        sethinh2(urls[1]);
        sethinh3(urls[2]);
        sethinh4(urls[3]);
        sethinh5(urls[4]);
        sethinh6(urls[5]);
        sethinh7(urls[6]);
        sethinh8(urls[7]);
        setLogo5(urls[8])
      })
      .catch((error) => {
        console.log('Error getting URLs:', error);
      });

    // Lấy video từ Firebase Storage
    const logo4Ref = ref(storage, 'TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4'); // Thay thế bằng đường dẫn đến video của bạn

    getDownloadURL(logo4Ref)
      .then((url) => {
        setLogo4(url);
      })
      .catch((error) => {
        console.log('Error getting video URL:', error);
      });

    // Lấy dữ liệu từ Firestore
    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, 'TrangchuPages'));
        const fetchedData: DocumentData[] = [];

        quanlyRef.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        setData(fetchedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  // Xử lý tải lên video
  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4`); // Thay thế bằng đường dẫn đến thư mục lưu trữ video của bạn

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log('Error uploading video:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownload(downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* Hiển thị video */}
        {logo4 && (
          <video
            width="100%"
            height="auto"
            loop
            autoPlay
            muted
          >
            <source src={logo4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="container">
        <h1>Danh sách tài liệu</h1>

       <div>
  <div className="filter">
    <label htmlFor="date-from">Ngày tạo:</label>
    <input type="date" id="date-from" defaultValue="2021-10-10" />
    <span> đến </span>
    <input type="date" id="date-to" defaultValue="2021-10-10" />
    <button>Lọc</button>
  </div>
  <div className="search">
    <label htmlFor="keyword">Từ khóa:</label>
    <input type="text" id="keyword" />
    <button>Tìm kiếm</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên tài liệu</th>
        <th>Ngày tạo</th>
        <th>Tải tài liệu</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Khám phá Hội An - Việt Nam</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Chuẩn bị gì sau khi tiêm vaccin Covid-19?</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>SNOW CHANNEL 1</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>Chuẩn bị gì sau khi tiêm vaccin Covid-19?</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>6</td>
        <td>Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td>Chuẩn bị gì sau khi tiêm vaccin Covid-19?</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td>Du lịch Tp.HCM đang như thế nào? 101</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td>SNOW CHANNEL 1</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
      <tr>
        <td>10</td>
        <td>Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h</td>
        <td>03/03/12 22:43</td>
        <td><a href="#">Download</a></td>
      </tr>
    </tbody>
  </table>
  <div className="pagination">
    <a href="#">«</a>
    <a href="#" className="active">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    <span>...</span>
    <a href="#">10</a>
    <a href="#">»</a>
  </div>
</div>
</div>
      <Footer />
    </div>
  );
}

export default TailieuPages;