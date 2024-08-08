import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { firestore, storage } from "../lib/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const Navbar = () => {
  const [logo4, setlogo4] = useState("");

  const location = useLocation();

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
    const logo4 = ref(storage, "Component/Frame 8.png");
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
  }, []);

  const isActive = (paths: string[]) => {
    return paths.some((path) => location.pathname.startsWith(path))
      ? { textDecoration: "underline", color: "#99FFFF" }
      : {};
  };

  return (
    <nav className="navbar">
      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <Link to="/" style={isActive(["/"]) && location.pathname === "/" ? { textDecoration: "underline", color: "#99FFFF" } : {}}>
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link to="/BaivietPages" style={isActive(["/BaivietPages", "/BaivietChitiet"])}>
              BÀI VIẾT
            </Link>
          </li>
        </ul>
        <div className="container">
          <img src={logo4} alt="" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/Tailieu" style={isActive(["/Tailieu"])}>
              TÀI LIỆU
            </Link>
          </li>
          <li>
            <Link to="/Tuyendung" style={isActive(["/Tuyendung", "/TuyendungChitiet"])}>
              TUYỂN DỤNG
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
