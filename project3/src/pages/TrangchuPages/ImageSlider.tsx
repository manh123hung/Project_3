
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../lib/firebase';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import './TrangchuPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
interface Slide {
  src: string;
  text: string;
}



const ImageSlider: React.FC = () => {
  const [logo4, setlogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
  const [hinh3, sethinh3] = useState("");
  const [hinh4, sethinh4] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const logo4Ref = ref(storage, "TrangchuPages/image 3.png");
    const hinh1Ref = ref(storage, "TrangchuPages/image 22.png");
    const hinh2Ref = ref(storage, "TrangchuPages/image 22 (1).png");
    const hinh3Ref = ref(storage, "TrangchuPages/image 22 (2).png");
    const hinh4Ref = ref(storage, "TrangchuPages/image 2.png");

    Promise.all([
      getDownloadURL(logo4Ref),
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),

    ])
      .then((urls) => {
        setlogo4(urls[0]);
        sethinh1(urls[1]);
        sethinh2(urls[2]);
        sethinh3(urls[3]);
        sethinh4(urls[4]);

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
  const slides: Slide[] = [
    { src: hinh3, text: 'Kết quả đấu giá giữ xe tại CVVH Đầm Sen 2022' },
    { src: hinh4, text: 'Kết quả đấu giá giữ xe tại CVVH Đầm Sen 2022' },
    { src: logo4, text: 'Hơn 1000 bánh chưng lộc cho khách dâng hương tưởng vua Hùng tại Đầm Sen' },
    { src: hinh1, text: 'Kết quả đấu giá giữ xe tại CVVH Đầm Sen 2022' },
    { src: hinh2, text: 'Kết quả đấu giá giữ xe tại CVVH Đầm Sen 2022' }
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(2);

  const handleImageClick = (index: number) => {
    if (index < 2) {
      setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    } else if (index > 2) {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }
  };

  const getSlideIndex = (offset: number) => (currentIndex + offset + slides.length) % slides.length;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center no-gutters">
        <div className="col-md-2">
          <div className="image-card lean-right" onClick={() => handleImageClick(0)}>
            <img src={slides[getSlideIndex(-2)].src} className="img-fluid" alt="Image 1" />
            <div className="overlay-text">{slides[getSlideIndex(-2)].text}</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="image-card lean-right" onClick={() => handleImageClick(1)}>
            <img src={slides[getSlideIndex(-1)].src} className="img-fluid" alt="Image 2" />
            <div className="overlay-text">{slides[getSlideIndex(-1)].text}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="image-card central-image">
            <img src={slides[currentIndex].src} className="img-fluid" alt="Image 3" />
            <div className="overlay-text">{slides[currentIndex].text}</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="image-card lean-left" onClick={() => handleImageClick(3)}>
            <img src={slides[getSlideIndex(1)].src} className="img-fluid" alt="Image 4" />
            <div className="overlay-text">{slides[getSlideIndex(1)].text}</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="image-card lean-left" onClick={() => handleImageClick(4)}>
            <img src={slides[getSlideIndex(2)].src} className="img-fluid" alt="Image 5" />
            <div className="overlay-text">{slides[getSlideIndex(2)].text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
