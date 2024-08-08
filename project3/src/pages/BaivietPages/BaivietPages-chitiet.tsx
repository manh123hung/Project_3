// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../lib/firebase";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import "./BaivietPages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function BaivietChitiet() {
  const [logo4, setLogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
  const [hinh3, sethinh3] = useState("");
  const [hinh4, sethinh4] = useState("");
  const [hinh5, sethinh5] = useState("");
  const [hinh6, sethinh6] = useState("");
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
    const hinh1Ref = ref(storage, "BaivietPages/image 35.png");
    const hinh2Ref = ref(storage, "BaivietPages/Frame 626272.png");
    const hinh3Ref = ref(storage, "BaivietPages/img (11).png");
    const hinh4Ref = ref(storage, "BaivietPages/img (12).png");
    const hinh5Ref = ref(storage, "BaivietPages/img (13).png");
    const hinh6Ref = ref(storage, "BaivietPages/img (14).png");
    Promise.all([
      getDownloadURL(hinh1Ref),
      getDownloadURL(hinh2Ref),
      getDownloadURL(hinh3Ref),
      getDownloadURL(hinh4Ref),
      getDownloadURL(hinh5Ref),
      getDownloadURL(hinh6Ref),
    ])
      .then((urls) => {
        sethinh1(urls[0]);
        sethinh2(urls[1]);
        sethinh3(urls[2]);
        sethinh4(urls[3]);
        sethinh5(urls[4]);
        sethinh6(urls[5]);
      })
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
        const quanlyRef = await getDocs(
          collection(firestore, "Trangchuchitiet")
        );
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

  interface ItemProps {
    title: string;
    imageUrl: string;
    viewCount: string;
    date: string;
    admin: string;
    buttons: { label: string; href: string }[];
  }

  const Item: React.FC<ItemProps> = ({
    title,
    imageUrl,
    viewCount,
    date,
    admin,
    buttons,
  }) => {
    return (
      <div className="col-md-3 mb-4">
        <div className="item">
          <img src={imageUrl} className="img-fluid" alt="Item Image" />
          <div className="overlay2">Click để xem</div>
          <div className="item-content">
            <div className="author">
              <span>{admin}</span>
              <span className="dot"></span>
            </div>
            <h3 className="item-title" style={{ color: "#0054A6" }}>
              {title}
            </h3>
            <div className="item-buttons">
              {buttons.map((button) => (
                <a
                  href={button.href}
                  className="item-button"
                  key={button.label}
                >
                  {button.label}
                </a>
              ))}
            </div>
            <div className="item-info">
              <span>{viewCount} lượt xem</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const items: ItemProps[] = [
    {
      title: "Thông báo: đấu giá giữ xe tại CVHH Đầm Sen",
      imageUrl: hinh3,
      viewCount: "10N",
      date: "20/02/2022",
      admin: "Admin.",
      buttons: [
        { label: "Sự kiện", href: "#" },
        { label: "Thông báo", href: "#" },
        { label: "Tin tức", href: "#" },
      ],
    },
    {
      title: "Thông báo: đấu giá giữ xe tại CVHH Đầm Sen",
      imageUrl: hinh4,
      viewCount: "10N",
      date: "20/02/2022",
      admin: "Admin.",
      buttons: [
        { label: "Sự kiện", href: "#" },
        { label: "Thông báo", href: "#" },
        { label: "Tin tức", href: "#" },
      ],
    },
    {
      title: "Thông báo: đấu giá giữ xe tại CVHH Đầm Sen",
      imageUrl: hinh5,
      viewCount: "10N",
      date: "20/02/2022",
      admin: "Admin.",
      buttons: [
        { label: "Sự kiện", href: "#" },
        { label: "Thông báo", href: "#" },
        { label: "Tin tức", href: "#" },
      ],
    },
    {
      title: "Thông báo: đấu giá giữ xe tại CVHH Đầm Sen",
      imageUrl: hinh6,
      viewCount: "10N",
      date: "20/02/2022",
      admin: "Admin.",
      buttons: [
        { label: "Sự kiện", href: "#" },
        { label: "Thông báo", href: "#" },
        { label: "Tin tức", href: "#" },
      ],
    },
  ];
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
                      <div dangerouslySetInnerHTML={{ __html: item.title1 }} />
                    </div>
                  ))}
                </h1>
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
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <div style={{ padding: "40px" }}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="d-flex align-items-center">
                          <div>
                            <h1
                              className="job-title"
                              style={{ color: "#003F7D" }}
                            >
                              {" "}
                              <b>
                                {data.map((item, index) => (
                                  <div key={index}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item.title2,
                                      }}
                                    />
                                  </div>
                                ))}
                              </b>
                            </h1>
                            <div className="job-info">
                              {data.map((item, index) => (
                                <div key={index}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.title3,
                                    }}
                                  />
                                </div>
                              ))}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <img src={hinh2} className="img-fluid" />
                  </div>
                  {data.map((item, index) => (
                    <div key={index}>
                      <div dangerouslySetInnerHTML={{ __html: item.label }} />
                    </div>
                  ))}

                  <img
                    src={hinh1}
                    className="img-fluid"
                    style={{ marginLeft: "250px" }}
                  />
                  <h2 style={{ color: "#003F7D" }}>
                    <b>
                      {data.map((item, index) => (
                        <div key={index}>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.title4 }}
                          />
                        </div>
                      ))}
                    </b>
                  </h2>
                  <div className="container-fluid">
                    <div className="row">
                      {items.map((item, index) => (
                        <Item key={index} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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

export default BaivietChitiet;
