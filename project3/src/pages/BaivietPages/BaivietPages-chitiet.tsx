// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './BaivietPages.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function BaivietChitiet() {

  const [logo4, setLogo4] = useState('');
  const [hinh1, sethinh1] = useState('');
  const [hinh2, sethinh2] = useState('');
  const [hinh3, sethinh3] = useState('');
  const [hinh4, sethinh4] = useState('');
  const [hinh5, sethinh5] = useState('');
  const [hinh6, sethinh6] = useState('');
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
    const hinh1Ref = ref(storage, 'BaivietPages/image 35.png'); 
    const hinh2Ref = ref(storage, 'BaivietPages/Frame 626272.png'); 
    const hinh3Ref = ref(storage, 'BaivietPages/img (11).png'); 
    const hinh4Ref = ref(storage, 'BaivietPages/img (12).png'); 
    const hinh5Ref = ref(storage, 'BaivietPages/img (13).png'); 
    const hinh6Ref = ref(storage, 'BaivietPages/img (14).png'); 
    Promise.all([
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),
      getDownloadURL(hinh5Ref),
      getDownloadURL(hinh6Ref),

    ])
      .then((urls) => {
        sethinh1(urls[0]);
        sethinh2(urls[1]);
        sethinh3(urls[2]);
        sethinh4(urls[3]);
        sethinh5(urls[4]);
        sethinh6(urls[5]);

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

  interface ItemProps {
    title: string;
    imageUrl: string;
    viewCount: string;
    date: string;
    admin: string;
    buttons: { label: string; href: string }[];
  }
  
  const Item: React.FC<ItemProps> = ({ title, imageUrl, viewCount, date, admin, buttons }) => {
    return (
      <div className="col-md-3 mb-4" >
        <div className="item" style={{backgroundColor:"white"}}>
          <img src={imageUrl} className="img-fluid" alt="Item Image" />
          <div className="item-content">
          <div className="author">
                  <span>{admin}</span>
                  <span className="dot"></span>
                </div>
            <h3 className="item-title" style={{color:"#0054A6"}}>{title}</h3>
            <div className="item-buttons">
              {buttons.map((button) => (
                <a href={button.href} className="item-button" key={button.label}>
                  {button.label}
                </a>
              ))}
            </div>
            <div className="item-info">
              <span>{viewCount} lượt xem</span>
              <span>{date}</span>
            </div>
            
          </div>
        </div>
      </div>
    );
  };
 
  const items: ItemProps[] = [
    {
      title: 'Thông báo: đấu giá giữ xe tại CVHH Đầm Sen',
      imageUrl: hinh3,
      viewCount: '10N',
      date: '20/02/2022',
      admin: 'Admin.',
      buttons: [
        { label: 'Sự kiện', href: '#' },
        { label: 'Thông báo', href: '#' },
        { label: 'Tin tức', href: '#' },
      ],
    },
    {
        title: 'Thông báo: đấu giá giữ xe tại CVHH Đầm Sen',
        imageUrl: hinh4,
        viewCount: '10N',
        date: '20/02/2022',
        admin: 'Admin.',
        buttons: [
          { label: 'Sự kiện', href: '#' },
          { label: 'Thông báo', href: '#' },
          { label: 'Tin tức', href: '#' },
        ],
      },
      {
        title: 'Thông báo: đấu giá giữ xe tại CVHH Đầm Sen',
        imageUrl: hinh5,
        viewCount: '10N',
        date: '20/02/2022',
        admin: 'Admin.',
        buttons: [
          { label: 'Sự kiện', href: '#' },
          { label: 'Thông báo', href: '#' },
          { label: 'Tin tức', href: '#' },
        ],
      },
      {
        title: 'Thông báo: đấu giá giữ xe tại CVHH Đầm Sen',
        imageUrl: hinh6,
        viewCount: '10N',
        date: '20/02/2022',
        admin: 'Admin.',
        buttons: [
          { label: 'Sự kiện', href: '#' },
          { label: 'Thông báo', href: '#' },
          { label: 'Tin tức', href: '#' },
        ],
      },
  ];
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
    <h1 className="title">TUYỂN DỤNG</h1>
  </div>
</div>
<div className="row" style={{position:"relative",marginLeft:"-470px",padding:"160px",marginTop:"-120px"}}>
<div style={{backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
<div style={{padding:"40px"}}>
<div className='container-fluid'>
    <div className='row'>
  <div className="col-md-10">
    <div className="d-flex align-items-center">
      <div>
        <h1 className="job-title" style={{color:"#003F7D"}}> <b>Kết quả đấu giá giữ xe tại CVVH Đầm Sen 2022</b></h1>
        <div className="job-info">
        by tuyendung in on Tháng Năm 21, 2020
        </div>
      </div>
    </div>
  </div>

</div>
<br />
<img src={hinh2} className='img-fluid' />
</div>

<p>Công ty Cổ phần Dịch vụ Du lịch Phú Thọ xin thông báo đến các đơn vị tham gia đấu giá cạnh tranh hạng mục “Hợp tác giữ xe 02 – 04 bánh tại Công viên văn hóa Đầm Sen (Số 03 Hòa Bình, Phường 03, Quận 11, TP.HCM), kết quả như sau. </p>
    <ul>
    <li>Tên hạng mục đấu giá: Hợp tác giữ xe 02 -04 bánh.</li>
    <li>Giá khởi điểm được duyệt: 241.667.000 đồng/tháng (đã bao gồm thuế GTGT).</li>
    <li>Bên mời đấu giá: Công ty Cổ phần Dịch vụ Du lịch Phú Thọ (Địa chỉ: Số 15 đường số 2 cư xá Lữ Gia, Phường 15, Quận 11, TP.HCM).</li>
    <li>Địa điểm thực hiện: Công viên văn hóa Đầm Sen.</li>
    <li>Hình thức lựa chọn đơn vị: Đấu giá cạnh tranh</li>
</ul>
<p>Kết quả lựa chọn đơn vị:</p>
<ul>
<li>Công ty TNHH Thương mại Dịch vụ Hai Tám Sáu (Mã số doanh nghiệp: 0313270903 – Địa chỉ: 247/8B Hoàng Hoa Thám, Phường 05, Quận Phú Nhuận, TP.HCM)</li>
<li>Giá tham gia: 13.500.000.000 đồng (đã gồm thuế GTGT)</li>
<li>Xếp hạng hồ sơ: Hạng 1+ Giá trúng đấu giá: 13.500.000.000 đồng (đã gồm thuế GTGT)</li>
<li>Loại hợp đồng: Hợp đồng hợp tác kinh doanh+ Thời gian thực hiện hợp đồng: 03 năm</li>
</ul>
<p>Đề nghị Công ty TNHH TMDV Hai Tám Sáu trong vòng 02 ngày kể từ thời điểm nhận được thông báo trúng đấu giá của Công ty Cổ phần Dịch vụ Du lịch Phú Thọ, phải tiến hành thương thảo và ký hợp đồng. Nộp tiền bảo lãnh thực hiện hợp đồng bằng tiền mặt hoặc chuyển khoản tương ứng số tiền: 895.000.000 đồng (365 triệu/tháng x 03 tháng = 1.095.000.000 đồng trừ 200 triệu đồng tiền đã ký quỹ) ngay sau khi ký hợp đồng cho Công ty Cổ phần Dịch vụ Du lịch Phú Thọ theo đúng Hồ sơ yêu cầu mời đấu giá cạnh tranh ngày 31/5/2022.</p>
<p>Nếu quá thời hạn trên mà không thực hiện thương thảo, ký hợp đồng hoặc không nộp đủ số tiền bảo lãnh thực hiện hợp đồng, thì sẽ mất tiền ký quỹ và mặt bằng đấu giá hợp tác sẽ được chuyển cho khách hàng có hồ sơ đấu giá xếp hạng hai.</p>
<p>Kế hoạch ký kết hợp đồng với đơn vị được lựa chọn: Dự kiến trước ngày 30/6/2022.</p>
<p>Với những công ty không trúng đấu giá hợp tác sẽ được nhận lại ngay số tiền đã nộp ký quỹ là 200.000.000 đồng tại Văn phòng Công ty Cổ phần Dịch vụ Du lịch Phú Thọ.</p>
<p>Thông báo này là cơ sở để ký kết hợp đồng với nhà cung cấp trúng thầu đúng theo quy định.Trân trọng.</p>
<p>Chi tiết xem trong văn bản đính kèm</p>
<img src={hinh1} className='img-fluid' style={{marginLeft:"250px"}}/>
<h2 style={{color:"#003F7D"}} ><b>Bài viết liên quan</b></h2>
<div className="container-fluid">
      <div className="row">
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
    </div>
  </div>


</div>


      </div>
 


      <br />
    </div>
    </div>
   
</div>

      <br />
      <br />
      <Footer />
    </div>
    
  );
}

export default BaivietChitiet;