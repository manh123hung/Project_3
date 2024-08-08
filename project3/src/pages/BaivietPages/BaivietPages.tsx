// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../lib/firebase";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./BaivietPages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo1 from "../../asset/Frame 8 (1).png"
import {
  faAngleDoubleDown,
  faArrowDown,
  faArrowUp,
  faBell,
  faCalendarAlt,
  faChevronRight,
  faDownload,
  faHome,
  faLightbulb,
  faMapMarkerAlt,
  faNewspaper,
  faPhoneAlt,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SlideShow from "./SlideShow";
import Sidebar from "./Sidebar";
import ArticleRow from "./ArticleRow";

function BaivietPages() {
  const [logo4, setLogo4] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [logo6, setLogo6] = useState("");
  const [data, setData] = useState<DocumentData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [download, setDownload] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const imageRefs = [
        "BaivietPages/img (15).png",
        "BaivietPages/img (16).png",
        "BaivietPages/img (17).png",
        "BaivietPages/img (18).png",
        "BaivietPages/img (19).png",
        "BaivietPages/img (20).png",
        "BaivietPages/img (21).png",
        "BaivietPages/img (22).png",
        "BaivietPages/img (23).png",
        "BaivietPages/img (24).png",
        "BaivietPages/img (25).png",
        "BaivietPages/img (26).png",
      ];
      try {
        const urls = await Promise.all(
          imageRefs.map(async (path) => {
            const storageRef = ref(storage, path);
            return getDownloadURL(storageRef);
          })
        );

        setImages(urls);
        setLogo6("TrangchuPages/Frame 8 (1).png");

      } catch (error) {
        console.log("Error fetching image URLs:", error);
      }
    };

    const fetchVideo = async () => {
      const logo4Ref = ref(storage, "TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4");
      try {
        const url = await getDownloadURL(logo4Ref);
        setLogo4(url);
      } catch (error) {
        console.log("Error fetching video URL:", error);
      }
    };

    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, "Articles"));
        const fetchedData: DocumentData[] = [];
        quanlyRef.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchImages();
    fetchVideo();
    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log("Error uploading video:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownload(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const articles = data.map((item, index) => ({
    hinh: images[index],
    title: item.title,
    date: item.date,
    views: item.views,
    tags: Array.isArray(item.tags) ? item.tags : []  // Đảm bảo rằng tags là một mảng
  }));
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Công Viên Văn Hóa Đầm Sen",
    "KDLST Vàm Sát",
    "Công Viên Văn Hóa Đầm Sen",
    "Công Viên Văn Hóa Đầm Sen",
  ]);

  const searchSuggestions = [
    "Nhân viên phục vụ",
    "Nhân viên bảo vệ",
    "Nhân viên thiết kế",
    "Nhân viên bảo trì",
    "Nhân viên trợ lý",
  ];

  const handleSearchClick = () => {
    setSuggestionsVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestionsVisible(false), 200); // Delay để đảm bảo người dùng có thể chọn mục gợi ý trước khi danh sách bị ẩn
  };

  const handleRemoveRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
    setSuggestionsVisible(false);
  };
  return (
    <div>
      <Navbar />
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Hiển thị video */}
        {logo4 && (
          <video
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} // Thêm style cho video
            loop
            autoPlay
            muted
          >
            <source src={logo4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div
          className="container c012"
          style={{ marginLeft: "310px", fontFamily: "Roboto" }}
        >
          <div className="container-fluid">
            <div className="row">
              <div
                className="text-center"
                style={{ marginLeft: "-50px", color: "#0054A6" }}
              >
                <h1 className="title">Bài Viết</h1>
              </div>
            </div>
            <div className="row" style={{ marginRight: "200px" }}>
              <div className="col-md-8">
                <SlideShow />
              </div>
              <div className="col-md-4">
                <Sidebar />
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container-fluid" style={{ fontFamily: "Roboto" }}>
        <div className="row">
          <div className="col-md-2 menu-ngang">
            <h5
              style={{
                color: "#0054A6",
                fontFamily: "Philosopher",
                textAlign: "center",
              }}
            >
              <b>CHỦ ĐỀ BÀI VIẾT</b>
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="#">
                  <FontAwesomeIcon icon={faLightbulb} /> Giới thiệu{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faNewspaper} /> Tin tức{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Sự kiện{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faBell} /> Thông báo{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faUserFriends} /> Hoạt động đoàn thể{" "}
                </Link>
              </li>
            </ul>
            <img src={logo1} alt="" className="logo7"  />
          </div>
          <div className="col-md-9">
            <div className="row mb-3">
              <div className="col-md-7">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span
                        className="input-group-text fc2"
                        style={{
                          height: "40px",
                          backgroundColor: "white",
                          border: "none",
                        }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                    </div>
                    <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm"
            style={{ border: "none" }}
            value={searchText}
            onClick={handleSearchClick}
            onChange={(e) => setSearchText(e.target.value)}
            onBlur={handleBlur}
          />


{isSuggestionsVisible && (
        <div className="suggestions">
          {searchText === "" ? (
            <div className="recent-searches">
              <strong>Tìm kiếm gần đây:</strong>
              <ul>
                {recentSearches.map((item, index) => (
                  <li key={index}>
                    {item}
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="close-icon"
                      onClick={() => handleRemoveRecentSearch(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="search-suggestions">
              <ul style={{ listStyleType: "none" }}>
                {searchSuggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(item)}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />{item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
                  </div>
                </div>
              </div>
              <div className="col-md-4" style={{}}>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control fc1"
                      id="date-from"
                      value={currentDate} // Hiển thị ngày hiện tại
                    />
                    <span
                      className="input-group-text fc2"
                      style={{ backgroundColor: "white", border: "none" }}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                    <input
                      type="date"
                      className="form-control fc1"
                      id="date-to"
                      value={currentDate} // Hiển thị ngày hiện tại
                    />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#0054A6",
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ marginLeft: "1px" }}
                        />
                        <p
                          style={{
                            marginTop: "5px",
                            marginLeft: "7px",
                            color: "#666666",
                          }}
                        >
                          {" "}
                          A đến Z
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
      <ArticleRow articles={articles.slice(0, 4)} />
      <ArticleRow articles={articles.slice(4, 8)} />
      <ArticleRow articles={articles.slice(8, 12)} />
    </div>
    <div className="pagination-container" style={{width:"280px",marginLeft:"430px"}}>
      <button className="pagination-arrow" disabled>&lt;</button>
      <button className="pagination-page active">1</button>
      <button className="pagination-page">2</button>
      <button className="pagination-page">3</button>
      <span className="pagination-dots">...</span>
      <button className="pagination-page">10</button>
      <button className="pagination-arrow">&gt;</button>
    </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BaivietPages;
