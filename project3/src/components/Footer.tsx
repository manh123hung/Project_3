import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faCheck,
  faCheckCircle,
  faComment,
  faEnvelope,
  faLocationDot,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons"; // Icon "Thời gian"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { firestore, storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import logo2 from "../asset/Frame 626230.png";
const Footer = () => {
  const [logo4, setlogo4] = useState("");

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
    //lay anh
    const logo4 = ref(storage, "Component/logo ngang.png");

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
  return (
    <footer
      style={{
        backgroundColor: "#002549",
        color: "white",
        fontFamily: "Philosopher",
      }}
    >
      <div className="" style={{ padding: "20px" }}>
        <div
          className="row"
          style={{ fontFamily: "Nunito", lineHeight: "27px", fontSize: "18px" }}
        >
          <div className="col-md-4">
            <img src={logo4} className="img-fluid" alt="Logo" />
            <div
              className="row"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              <p style={{ fontFamily: "Nunito", fontSize: "14px" }}>
                Copyright © Công ty Cổ phần Dịch vụ Du lịch Phú Thọ
                (Phuthotourist)
              </p>
            </div>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <h5 style={{ fontFamily: "Bangers", fontStyle: "italic" }}>
                  <b>LIÊN HỆ</b>
                </h5>
              </li>
              <li style={{ marginBottom: "5px" }}>
                <i
                  className="fas fa-map-marker-alt"
                  style={{ color: "white", marginRight: "5px" }}
                ></i>
                <FontAwesomeIcon icon={faLocationDot} /> 15 Đường số 2, Cư xá Lữ
                Gia,Phường 15, Quận 11, TP. HCM{" "}
              </li>
              <li style={{ marginBottom: "5px" }}>
                <i
                  className="fas fa-phone-alt"
                  style={{ color: "white", marginRight: "5px" }}
                ></i>
                <FontAwesomeIcon icon={faPhone} /> 02838650921
              </li>
              <li style={{ marginBottom: "5px" }}>
                <i
                  className="fas fa-envelope"
                  style={{ color: "white", marginRight: "5px" }}
                ></i>
                <FontAwesomeIcon icon={faEnvelope} /> vanphong@damsenpark.vn
              </li>
              <li style={{ marginBottom: "5px" }}>
                <i
                  className="fas fa-envelope"
                  style={{ color: "white", marginRight: "5px" }}
                ></i>
                <img src={logo2} alt="" /> Phuthotourist
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <ul>
              <h5 style={{ fontFamily: "Bangers", fontStyle: "italic" }}>
                <b>CÁC ĐƠN VỊ CÙNG HỆ THỐNG PHUTHOTOURIST</b>
              </h5>
              <li>Công viên Văn hóa Đầm Sen</li>
              <li>Khu du lịch sinh thái Vàm Sắt</li>
              <li>Khách sạn Ngọc Lan (Quận 1)</li>
              <li>Khách sạn Phú Thọ (Quận 11)</li>
              <li>Trung tâm Du lịch Đầm Sen</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
