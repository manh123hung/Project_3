// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../lib/firebase";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./TuyendungPages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faChevronRight,
  faDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Sidebar";
import Content from "./Content";
function TuyendungPages() {
  const [logo4, setLogo4] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [download, setDownload] = useState("");
  const [data, setData] = useState<DocumentData[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    // Lấy ảnh từ Firebase Storage
    const hinh1Ref = ref(storage, "TailieuPages/img (3).png");
    const hinh2Ref = ref(storage, "TailieuPages/img (4).png");
    const hinh3Ref = ref(storage, "TailieuPages/img (5).png");
    const hinh4Ref = ref(storage, "TailieuPages/img (6).png");
    const hinh5Ref = ref(storage, "TailieuPages/img (7).png");
    const hinh6Ref = ref(storage, "TailieuPages/img (8).png");
    const hinh7Ref = ref(storage, "TailieuPages/img (9).png");
    const hinh8Ref = ref(storage, "TailieuPages/img (10).png");
    const logo5 = ref(storage, "TailieuPages/Files.png");
    Promise.all([
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),
      getDownloadURL(hinh5Ref),
      getDownloadURL(hinh6Ref),
      getDownloadURL(hinh7Ref),
      getDownloadURL(hinh8Ref),
      getDownloadURL(logo5),
    ])
      .then((urls) => {})
      .catch((error) => {
        console.log("Error getting URLs:", error);
      });

    // Lấy video từ Firebase Storage
    const logo4Ref = ref(
      storage,
      "TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4"
    ); // Thay thế bằng đường dẫn đến video của bạn

    getDownloadURL(logo4Ref)
      .then((url) => {
        setLogo4(url);
      })
      .catch((error) => {
        console.log("Error getting video URL:", error);
      });

    // Lấy dữ liệu từ Firestore
    const fetchData = async () => {
      try {
        const quanlyRef = await getDocs(collection(firestore, "TuyendungPages"));
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

  // Xử lý tải lên video
  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(
      storage,
      `TrangchuPages/-b581-45d9-98eb-64676259fd20.mp4`
    ); // Thay thế bằng đường dẫn đến thư mục lưu trữ video của bạn

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                <h1 className="title">
                  {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.name }} />
                      </div>
                    ))}</h1>
              </div>
            </div>
            <div
              className="row"
              style={{
                position: "relative",
                marginLeft: "-470px",
                padding: "160px",
                marginTop: "-120px",
              }}
            >
              <Sidebar />
              <Content />
            </div>

            <br />
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default TuyendungPages;
