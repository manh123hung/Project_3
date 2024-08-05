import Slide from "./slide";
import Arrow from "./Arrow";
import Dots from "./Dots";
import "./BaivietPages.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const SlideShow: React.FC = () => {
  const [logo4, setlogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
  const [hinh3, sethinh3] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const logo4Ref = ref(storage, "BaivietPages/Rectangle 3.png");
    const hinh1Ref = ref(storage, "BaivietPages/img (20).png");
    const hinh2Ref = ref(storage, "BaivietPages/img (13).png");
    const hinh3Ref = ref(storage, "BaivietPages/img (14).png");

    Promise.all([
      getDownloadURL(logo4Ref),
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
    ])
      .then((urls) => {
        setlogo4(urls[0]);
        sethinh1(urls[1]);
        sethinh2(urls[2]);
        sethinh3(urls[3]);
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

  const plusSlides = (n: number) => {
    setActiveIndex(
      (prevIndex) => (prevIndex + n + slidesData.length) % slidesData.length
    );
  };

  const currentSlide = (index: number) => {
    setActiveIndex(index);
  };

  const slidesData = [
    {
      src: logo4,
      alt: "Slide 1",
      title: "Title 1",
      description: "Description for slide 1",
    },
    {
      src: hinh1,
      alt: "Slide 2",
      title: "Title 2",
      description: "Description for slide 2",
    },
    {
      src: hinh2,
      alt: "Slide 3",
      title: "Title 3",
      description: "Description for slide 3",
    },
    {
      src: hinh3,
      alt: "Slide 4",
      title: "Title 4",
      description: "Description for slide 4",
    },
  ];

  return (
    <div className="main-content">
      <div style={{ height: "450px" }}>
        {slidesData.map((slide, index) => (
          <Slide
            key={index}
            src={slide.src}
            alt={slide.alt}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      <div className="news-info">
        <div className="news-info-header">
          <h3>{slidesData[activeIndex].title}</h3>
          <Arrow direction="left" onClick={() => plusSlides(-1)} />
          <Arrow direction="right" onClick={() => plusSlides(1)} />
        </div>
        <p>{slidesData[activeIndex].description}</p>
      </div>
      <Dots
        totalSlides={slidesData.length}
        activeIndex={activeIndex}
        onClick={currentSlide}
      />
    </div>
  );
};

export default SlideShow;
