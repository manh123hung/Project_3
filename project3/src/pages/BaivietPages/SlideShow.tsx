import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Slide from "./slide";
import Arrow from "./Arrow";
import Dots from "./Dots";
import "./BaivietPages.css";
import h1 from "../../asset/01.png";

const SlideShow: React.FC = () => {
  const [slidesData, setSlidesData] = useState<DocumentData[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = ["BaivietPages/Rectangle 3.png", "BaivietPages/img (20).png", "BaivietPages/img (13).png", "BaivietPages/img (14).png"];
        const imageRefs = images.map(image => ref(storage, image));
        const urls = await Promise.all(imageRefs.map(imageRef => getDownloadURL(imageRef)));
        return urls;
      } catch (error) {
        console.log("Error getting image URLs:", error);
        return [];
      }
    };

    const fetchSlidesData = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "slideshow"));
        const fetchedData: DocumentData[] = [];

        snapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        const imageUrls = await fetchImages();
        
        const slidesWithData = fetchedData.map((data, index) => ({
          src: imageUrls[index] || data.src,
          alt: data.alt,
          title: data.title,
          description: data.description,
        }));

        setSlidesData(slidesWithData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchSlidesData();
  }, [navigate]);

  const plusSlides = (n: number) => {
    setActiveIndex(
      (prevIndex) => (prevIndex + n + slidesData.length) % slidesData.length
    );
  };

  const currentSlide = (index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

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
      {slidesData.length > 0 && (
        <div className="news-info">
          <div className="news-info-header">
            <h3 style={{color:"#0054A6",fontSize:"27px",fontWeight:"bold"}}>  {slidesData[activeIndex].title}</h3>
            <div style={{ textDecoration: "none" }}>
              <Arrow direction="left" onClick={() => plusSlides(-1)} />
              <Arrow direction="right" onClick={() => plusSlides(1)} />
            </div>
          </div>
          <p>{slidesData[activeIndex].description}</p>
        </div>
      )}
      <Dots
        totalSlides={slidesData.length}
        activeIndex={activeIndex}
        onClick={currentSlide}
        dotImageUrl={h1} // Sử dụng hình ảnh ngoài lề cho chấm được chọn
      />
    </div>
  );
};

export default SlideShow;
