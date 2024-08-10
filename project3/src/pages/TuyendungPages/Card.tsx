import "./Card.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firestore, storage } from "../../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  title: string;
  description: string;
  title2: string;
}

const Card: React.FC<CardProps> = ({ title, description, title2 }) => {
  const [logo4, setlogo4] = useState("");

  useEffect(() => {
    const logo4Ref = ref(storage, "TuyendungPages/Group 11.png");
    getDownloadURL(logo4Ref)
      .then((url) => setlogo4(url))
      .catch((error) => {
        console.log("Error getting URL:", error);
      });
  }, []);

  const getButtonClass = () => {
    return title2 === "Đang tuyển" ? "bt01" : "bt02";
  };

  return (
    <div className="col-md-4" style={{ fontFamily: "Roboto"}}>
      <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" ,marginLeft:"5px",marginBottom:"5px" }}>
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
            <div className="card-footer">
              <button className={getButtonClass()} style={{ marginLeft: "-40px", border: "none" }}>
                {title2}
              </button>
            </div>
          </div>
        </div>
        <div className="card-content">
          <p style={{ color: "#0054A6" }}>Mô tả công việc:</p>
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <Link to="/TuyendungChitiet" className="button" style={{ textAlign: "center", textDecoration: "none" }}>
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
