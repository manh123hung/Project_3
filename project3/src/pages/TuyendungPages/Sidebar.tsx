import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapMarkerAlt,
  faPhoneAlt,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Sidebar: React.FC = () => {
  const [logo4, setlogo4] = useState("");

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
    // Lấy ảnh từ Firebase
    const logo4 = ref(storage, "TrangchuPages/Frame 8 (1).png");
    Promise.all([getDownloadURL(logo4)])
      .then((urls) => {
        setlogo4(urls[0]);
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
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const handleButtonClick = (label: string) => {
    setActiveButtons((prevActiveButtons) =>
      prevActiveButtons.includes(label)
        ? prevActiveButtons.filter((item) => item !== label)
        : [...prevActiveButtons, label]
    );
  };

  const buttonData = {
    "Linh vực": ["Hướng dẫn viên", "Kinh doanh", "Kỹ sư xây dựng", "Nhân viên kế toán", "Nhân viên kỹ thuật", "Nhân viên phục vụ"],
    "Hình thức làm việc": ["Bán thời gian", "Nhân viên chính thức", "Theo ca", "Thực tập"],
    "Nơi làm việc": ["Cà phê Vườn Đá", "NH Thủy Tạ Đầm Sen", "CVVH Đầm Sen", "Khách sạn Ngọc Lan", "Khách sạn Phú Thọ", "KDL Sinh Thái Vàm Sát", "Trung tâm DVĐL Đầm Sen", "VP PhuThoTourist"]
  };

  return (
    <div className="col-md-3 sidebar">
      <div className="input-group-append">
        <span
          className="input-group-text fc2"
          style={{ height: "40px", backgroundColor: "white" }}
        >
          <FontAwesomeIcon icon={faSearch} />
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
        </span>
      </div>
      
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
                    <FontAwesomeIcon icon={faSearch} className="search-icon" style={{marginRight:"410px"}} />{item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Các thành phần khác */}
      {Object.entries(buttonData).map(([category, buttons]) => (
        <div key={category}>
          <h4>
            <FontAwesomeIcon icon={faHome} /> {category}
          </h4>
          <div className="button-group">
            {buttons.map((button) => (
              <button
                key={button}
                className={`button ${activeButtons.includes(button) ? "active" : ""}`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      ))}
      <img src={logo4} className="logo4" style={{ width: "300px", height: "250px" }} />
    </div>
  );
};

export default Sidebar;
