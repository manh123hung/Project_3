import "./BaivietPages.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface NewsItem {
  thumbnail: string;
  title: string;
  views: string;
  date: string;
}

const Sidebar: React.FC = () => {
  const [logo4, setlogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
  const [hinh3, sethinh3] = useState("");
  const [hinh4, sethinh4] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [download, setDownload] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    // lay anh
    const logo4Ref = ref(storage, "BaivietPages/Rectangle 3.png");
    const hinh1Ref = ref(storage, "BaivietPages/image 25.png");
    const hinh2Ref = ref(storage, "BaivietPages/image 25 (2).png");
    const hinh3Ref = ref(storage, "BaivietPages/image 25 (3).png");
    const hinh4Ref = ref(storage, "BaivietPages/image 25 (4).png");

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
  const newsItems: NewsItem[] = [
    {
      thumbnail: logo4,
      title: "Thông báo đấu giá giữ xe tại CVVH Đầm Sen",
      views: "10k views",
      date: "20/02/2022",
    },
    {
      thumbnail: hinh1,
      title: "Thông báo đấu giá giữ xe tại CVVH Đầm Sen",
      views: "10k views",
      date: "20/02/2022",
    },
    {
      thumbnail: hinh2,
      title: "Thông báo đấu giá giữ xe tại CVVH Đầm Sen",
      views: "10k views",
      date: "20/02/2022",
    },
    {
      thumbnail: hinh3,
      title: "Thông báo đấu giá giữ xe tại CVVH Đầm Sen",
      views: "10k views",
      date: "20/02/2022",
    },
    {
      thumbnail: hinh4,
      title: "Thông báo đấu giá giữ xe tại CVVH Đầm Sen",
      views: "10k views",
      date: "20/02/2022",
    },
  ];
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
              <b> {item.title}</b>
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
