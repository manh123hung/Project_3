import "./BaivietPages.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

interface NewsItem {
  thumbnail: string;
  title: string;
  views: string;
  date: string;
}

const Sidebar: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    // Fetch image URLs from Firebase Storage
    const imageRefs = [
      ref(storage, "BaivietPages/Rectangle 3.png"),
      ref(storage, "BaivietPages/image 25.png"),
      ref(storage, "BaivietPages/image 25 (2).png"),
      ref(storage, "BaivietPages/image 25 (3).png"),
      ref(storage, "BaivietPages/image 25 (4).png"),
    ];

    Promise.all(imageRefs.map(getDownloadURL))
      .then(setImages)
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });

    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, "BMN"));
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

  const newsItems: NewsItem[] = data.map((item, index) => ({
    thumbnail: images[index % images.length] || "",
    title: item.title || "No Title",
    views: item.views || "0 views",
    date: item.date || "No Date",
  }));

  return (
    <div className="sidebar">
      <h4>
        <b>Bài mới nhất</b>
      </h4>
      {newsItems.map((item, index) => (
        <div className="news-item" key={index}>
          <img src={item.thumbnail} alt="News Thumbnail" />
          <div>
            <h6>
              <b className="L1">
                <Link to="/">{item.title}</Link>
              </b>
            </h6>
            <p>
              {item.views} | {item.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
