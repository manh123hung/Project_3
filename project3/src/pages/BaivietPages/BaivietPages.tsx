// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import './BaivietPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faArrowDown, faArrowUp, faBell, faCalendarAlt, faChevronRight, faDownload, faHome, faLightbulb, faMapMarkerAlt, faNewspaper, faPhoneAlt, faSearch, faSortAlphaDown, faSortAlphaUp, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function BaivietPages() {

  const [logo4, setLogo4] = useState('');
  const [hinh1, sethinh1] = useState('');
  const [hinh2, sethinh2] = useState('');
  const [hinh3, sethinh3] = useState('');
  const [hinh4, sethinh4] = useState('');
  const [hinh5, sethinh5] = useState('');
  const [hinh6, sethinh6] = useState('');
  const [hinh7, sethinh7] = useState('');
  const [hinh8, sethinh8] = useState('');
  const [hinh9, sethinh9] = useState('');
  const [hinh10, sethinh10] = useState('');
  const [hinh11, sethinh11] = useState('');
  const [hinh12, sethinh12] = useState('');
  const [logo6, setLogo6] = useState('');

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
    const hinh1Ref = ref(storage, 'BaivietPages/img (15).png'); 
    const hinh2Ref = ref(storage, 'BaivietPages/img (16).png'); 
    const hinh3Ref = ref(storage, 'BaivietPages/img (17).png'); 
    const hinh4Ref = ref(storage, 'BaivietPages/img (18).png'); 
    const hinh5Ref = ref(storage, 'BaivietPages/img (19).png'); 
    const hinh6Ref = ref(storage, 'BaivietPages/img (20).png'); 
    const hinh7Ref = ref(storage, 'BaivietPages/img (21).png'); 
    const hinh8Ref = ref(storage, 'BaivietPages/img (22).png'); 
    const hinh9Ref = ref(storage, 'BaivietPages/img (23).png'); 
    const hinh10Ref = ref(storage, 'BaivietPages/img (24).png'); 
    const hinh11Ref = ref(storage, 'BaivietPages/img (25).png'); 
    const hinh12Ref = ref(storage, 'BaivietPages/img (26).png'); 
    const logo6Ref = ref(storage, 'TrangchuPages/Frame 8 (1).png'); 

    Promise.all([
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),
      getDownloadURL(hinh5Ref),
      getDownloadURL(hinh6Ref),
      getDownloadURL(hinh7Ref),
      getDownloadURL(hinh8Ref),
      getDownloadURL(hinh9Ref),
      getDownloadURL(hinh10Ref),
      getDownloadURL(hinh11Ref),
      getDownloadURL(hinh12Ref),
      getDownloadURL(logo6Ref),

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
        sethinh9(urls[8]);
        sethinh10(urls[9]);
        sethinh11(urls[10]);
        sethinh12(urls[11]);
        setLogo6(urls[12]);

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
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);
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
    <div className="row" >
  <div className="text-center" style={{marginLeft:"-50px",color:"#0054A6"}}>
    <h1 className="title">Bài Viết</h1>
  </div>
</div>



 


      <br />
    </div>
    </div>
   
</div>
      <br />
      <br />
   <div className="container-fluid" style={{fontFamily:"Roboto"}}>
  <div className="row">
    <div className="col-md-2 menu-ngang">
      <h5 style={{color:"#0054A6",fontFamily:"Philosopher",textAlign:"center"}}><b>CHỦ ĐỀ BÀI VIẾT</b></h5>
      <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link active" to="#"><FontAwesomeIcon icon={faLightbulb} /> Giới thiệu </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#"><FontAwesomeIcon icon={faNewspaper} /> Tin tức </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#"><FontAwesomeIcon icon={faCalendarAlt} /> Sự kiện </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#"><FontAwesomeIcon icon={faBell} /> Thông báo </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#"><FontAwesomeIcon icon={faUserFriends} /> Hoạt động đoàn thể </Link>
      </li>
        
      </ul>
      <img src={logo6}  className='logo7'/> 

    </div>
    <div className="col-md-9" >
    <div className="row mb-3">
    <div className="col-md-7" >
              <div className="form-group">
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
                    
                  />
                </div>
              </div>
            </div>
                <div className="col-md-4" style={{  }}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control fc1"
                    id="date-from"
                    value={currentDate} // Hiển thị ngày hiện tại
                  />
                  <span className="input-group-text fc2" style={{ backgroundColor: "white", border: "none" }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                  <input
                    type="date"
                    className="form-control fc1"
                    id="date-to"
                    value={currentDate} // Hiển thị ngày hiện tại
                  />
                   <div>
        <div style={{ display: 'flex', alignItems: 'center', color:"#0054A6"}}>
        <FontAwesomeIcon icon={faArrowUp} />
        <FontAwesomeIcon icon={faArrowDown} style={{ marginLeft: '1px' }} />
        <p style={{marginTop:"5px",marginLeft: '7px',color:"#666666"}}>   A đến Z</p>

      </div>

    </div>
                </div>
              </div>
          </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh1} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh2} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh3} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh4} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh5} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Gazillion Bubble Show của Fan Yang tại Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh6} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh7} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh8} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Thông báo: đấu giá giữ xe tại CVHH Đầm Sen</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh9} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Liên hoan ẩm thực Đất phương Nam 2019</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh10} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Liên hoan ẩm thực Đất phương Nam 2019</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh11} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Liên hoan ẩm thực Đất phương Nam 2019</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="article-container"> 
            <div className="article-preview">
              <img src={hinh12} alt="..." />
              <div className="article-content">
                <h5 className="article-title" >Liên hoan ẩm thực Đất phương Nam 2019</h5>
                <div className="author">
                  <span>Admin</span>
                  <span className="dot"></span>
                </div>
                <p className="article-description">
                  <span className="item-button">Sự kiện</span>
                  <span className="item-button">Thông báo</span>
                  <span className="item-button">Tin tức</span>

                </p>
                <p className="article-meta">10N lượt xem - 20/02/2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

      <Footer />
    </div>
    
  );
}

export default BaivietPages;