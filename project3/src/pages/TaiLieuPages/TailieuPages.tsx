// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import './TailieuPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faChevronRight, faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function TailieuPages() {
    interface Document {
        id: number;
        name: string;
        date: string;
        downloadLink: string;
      }
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
    const hinh1Ref = ref(storage, 'TailieuPages/img (3).png'); 
    const hinh2Ref = ref(storage, 'TailieuPages/img (4).png'); 
    const hinh3Ref = ref(storage, 'TailieuPages/img (5).png'); 
    const hinh4Ref = ref(storage, 'TailieuPages/img (6).png'); 
    const hinh5Ref = ref(storage, 'TailieuPages/img (7).png'); 
    const hinh6Ref = ref(storage, 'TailieuPages/img (8).png'); 
    const hinh7Ref = ref(storage, 'TailieuPages/img (9).png'); 
    const hinh8Ref = ref(storage, 'TailieuPages/img (10).png'); 
    const logo5= ref(storage, "TailieuPages/Files.png");
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
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Khám phá Hội An - Việt Nam', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 2, name: 'Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 3, name: 'Chuẩn bị gì sau khi tiêm vaccin Covid-19?', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 4, name: 'SNOW CHANNEL 1', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 5, name: 'Chuẩn bị gì sau khi tiêm vaccin Covid-19?', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 6, name: 'Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 7, name: 'Chuẩn bị gì sau khi tiêm vaccin Covid-19?', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 8, name: 'Du lịch Tp.HCM đang như thế nào? 101', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 9, name: 'SNOW CHANNEL 1', date: '03/03/12 22:43', downloadLink: '#' },
    { id: 10, name: 'Hải Phòng yêu cầu người dân không ra khỏi nhà sau 22h', date: '03/03/12 22:43', downloadLink: '#' },
  ]);
  interface CardProps {
    title: string;
    text: string;
    imgSrc: string;
  }
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Cuộn mượt mà
    });
  };
  const Card: React.FC<CardProps> = ({ title, text, imgSrc }) => {
    return (
      <div className="card1">
        <div className="card-body">
          <img src={imgSrc} alt={title} />
          <img src={logo5} alt="" style={{height:"120px",width:"100px",marginLeft:"40px",top:"50px"}}/>
          <h5 className="card-title">
            {title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      
  {/* Hiển thị video */}
  {logo4 && (
    <video
      style={{ position: "absolute",width: '100%', height: '100%', objectFit: 'cover' }} // Thêm style cho video
      loop
      autoPlay
      muted
    >
      <source src={logo4} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
  <div className='container c012' style={{marginLeft:"310px",fontFamily:"Roboto"}}>
      <div className="container-fluid">
    <div className="row">
  <div className="text-center" style={{marginLeft:"-40px"}}>
    <h1 className="title">TÀI LIỆU</h1>
  </div>
</div>

      <div className="row" >
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
          <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh6}/>
        </div>
        <div className="col-md-2 mb-4">
          <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh7} />
        </div>
        <div className="col-md-2 mb-4">
          <Card title="Báo cáo Tài Chính" text="năm 2022-2023" imgSrc={hinh8} />
        </div>
      </div>
      <div className="row" style={{marginRight:"400px"}}>
      <FontAwesomeIcon
        icon={faAngleDoubleDown}
        color="white"
        style={{ fontSize: "40px" }}
        onClick={handleScrollDown}
      />      </div>
      <br />
    </div>
    </div>
</div>
    
      <br />
      <nav className="nv1">
     
<div style={{marginLeft:"10px",padding:"10px"}}>
<div className="row mb-3">
  <div className="col-md-4" >
  <div className="form-group">
    <label htmlFor="date-from" ><b style={{color:"#0054A6"}}> Ngày tạo:</b></label>
    <div className="input-group">
      <input type="date" className="form-control fc1" id="date-from" value="2021-10-10" />
      <span className="input-group-text fc2" style={{backgroundColor:"white",border:"none"}} ><FontAwesomeIcon icon={faChevronRight} />      </span>
      <input type="date" className="form-control fc1" id="date-to" value="2021-10-10" />
    </div>
  </div>
  </div>
  <div className="col-md-3" style={{marginLeft:"430px"}}>
    <div className="form-group">
    <label htmlFor="keyword"><b style={{color:"#0054A6"}}> Từ Khóa:</b></label>
      <div className="input-group">
      <div className="input-group-append">
          <span className="input-group-text fc2"  style={{height:"40px",backgroundColor:"white",border:"none"}}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        <input type="text" className="form-control" id="keyword" placeholder="Tìm kiếm" style={{border:"none"}}/>
   
      </div>
    </div>
  </div>
</div>
</div>
      <div className="container" style={{color:"white",fontFamily:"Roboto"}}>
      <table className="table">
        <thead >
          <tr >
            <th className='text-white' style={{backgroundColor:"#0054A6",textAlign:"center"}}>STT</th>
            <th className='text-white' style={{backgroundColor:"#0054A6"}}>Tên tài liệu</th>
            <th className='text-white' style={{backgroundColor:"#0054A6",textAlign:"center"}}>Ngày tạo</th>
            <th className='text-white' style={{backgroundColor:"#0054A6",textAlign:"center"}}>Tải tài liệu</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr className="table-primary"  key={doc.id}>
              <td  style={{backgroundColor:"#E6EEF7",border:"none",textAlign:"center"}}>{index + 1}</td>
              <td style={{backgroundColor:"#E6EEF7",border:"none"}}>{doc.name}</td>
              <td style={{backgroundColor:"#E6EEF7",border:"none",textAlign:"center" }}>{doc.date}</td>
              <td style={{backgroundColor:"#E6EEF7",border:"none",textAlign:"center"}}><a href={doc.downloadLink} style={{marginLeft:"35px"}}><FontAwesomeIcon icon={faDownload} />
              </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
    </div>
    <div style={{marginLeft:"20px"}}>
    <div className='row'>
    <div className='col-4'>
      <p className="text-muted">Hiển thị <button className="page-number">10</button>
      câu trả lời trong mỗi trang</p>
      </div>
        <div className='col-4' style={{marginLeft:"420px"}}>
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <span className="page-link">...</span>
          </li>
          <li className="page-item"><a className="page-link" href="#">10</a></li>
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