// Card.tsx
import "./Card.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  title: string;
  description: string;
  title2: string;
}

const Card: React.FC<CardProps> = ({ title, description, title2 }) => {
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
    // lay anh
    const logo4 = ref(storage, "TuyendungPages/Group 11.png");
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
    <div className="col-md-4" style={{ fontFamily: "Roboto" }}>
      <div
        className="card"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <div className="card-header">
          <div className="card-header-left">
            <img src={logo4} alt="Logo" />
            <div>
              <h5 style={{ color: "#0054A6", whiteSpace: "nowrap" }}>
                <b>{title}</b>
              </h5>
              <p style={{ color: "#0054A6" }}>Nhân viên chính thức</p>
              <p style={{ color: "#666666" }}>
                <FontAwesomeIcon icon={faClock} /> CVVH Đầm Sen
              </p>
              <p style={{ color: "#666666" }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> 2 tuần trước
              </p>
            </div>
          </div>
          <div>
            <button className="bt01" style={{ marginLeft: "-50px" }}>
              {title2}
            </button>
          </div>
        </div>
        <div className="card-content">
          <p style={{ color: "#0054A6" }}>Mô tả công việc:</p>
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <Link
            to="/TuyendungChitiet"
            className="button"
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            {" "}
            Xem chi tiết{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
