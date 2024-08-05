// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../lib/firebase";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./TrangchuPages.css";
import ImageSlider from "./ImageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

function TrangchuPages() {
  const [logo4, setLogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
  const [hinh3, sethinh3] = useState("");
  const [hinh4, sethinh4] = useState("");
  const [hinh5, sethinh5] = useState("");
  const [hinh6, sethinh6] = useState("");
  const [hinh7, sethinh7] = useState("");
  const [hinh8, sethinh8] = useState("");
  const [logo5, setLogo5] = useState("");
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
    const hinh1Ref = ref(storage, "TrangchuPages/Rectangle 11.png");
    const hinh2Ref = ref(storage, "TrangchuPages/Rectangle 12.png");
    const hinh3Ref = ref(storage, "TrangchuPages/img.png");
    const hinh4Ref = ref(storage, "TrangchuPages/img (1).png");
    const hinh5Ref = ref(storage, "TrangchuPages/img (2).png");
    const hinh6Ref = ref(storage, "TrangchuPages/img (3).png");
    const hinh7Ref = ref(storage, "TrangchuPages/img (4).png");
    const hinh8Ref = ref(storage, "TrangchuPages/img (5).png");
    const logo5 = ref(storage, "TrangchuPages/Frame 8.png");
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
      .then((urls) => {
        sethinh1(urls[0]);
        sethinh2(urls[1]);
        sethinh3(urls[2]);
        sethinh4(urls[3]);
        sethinh5(urls[4]);
        sethinh6(urls[5]);
        sethinh7(urls[6]);
        sethinh8(urls[7]);
        setLogo5(urls[8]);
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
        const quanlyRef = await getDocs(collection(firestore, "TrangchuPages"));
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
  const posts = [
    {
      image: hinh6,
      author: "Admin",
      title: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND4 }} />
            </div>
          ))}
        </div>
      ),
      content: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND7 }} />
            </div>
          ))}
        </div>
      ),
      tags: ["Sự kiện", "Thông báo", "Tin tức"],
      date: "10N lượt xem - 20/02/2022",
    },
    {
      image: hinh7,
      author: "Admin",
      title: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND6 }} />
            </div>
          ))}
        </div>
      ),
      content: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND8 }} />
            </div>
          ))}
        </div>
      ),
      tags: ["Sự kiện", "Thông báo", "Tin tức"],
      date: "10N lượt xem - 20/02/2022",
    },
    {
      image: hinh8,
      author: "Admin",
      title: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND6 }} />
            </div>
          ))}
        </div>
      ),
      content: (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.ND9 }} />
            </div>
          ))}
        </div>
      ),
      tags: ["Sự kiện", "Thông báo", "Tin tức"],
      date: "10N lượt xem - 20/02/2022",
    },
  ];
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {logo4 && (
          <video
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
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
          style={{ marginLeft: "390px", fontFamily: "Roboto", padding: "10px" }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="text-center" style={{ marginLeft: "-270px" }}>
                <h3 className="title2">
                  CÔNG TY CỔ PHẦN DỊCH VỤ DU LỊCH PHÚ THỌ
                </h3>
                <h1 className="title3">PHUTHOTOURIST</h1>
                <h5 className="title2">Ngày thành lập 01/01/2019</h5>
              </div>
            </div>
            <div className="row" style={{ marginRight: "550px" }}>
              <ImageSlider />
            </div>
            <div
              className="row"
              style={{ marginRight: "560px", padding: "10px" }}
            >
              <FontAwesomeIcon
                icon={faAngleDoubleDown}
                color="white"
                style={{ fontSize: "40px" }}
                onClick={handleScrollDown}
              />
            </div>
            <br />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="container1">
          <div className="left-content">
            <h3>
              {data.map((item, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item.TT1 }} />
                </div>
              ))}
            </h3>
            <h2 style={{ color: "#003F7D" }}>
              {" "}
              {data.map((item, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item.ND1 }} />
                </div>
              ))}
            </h2>
            <div className="line"></div>
            <br />
            <div className="blue-line">
              {data.map((item, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item.ND2 }} />
                </div>
              ))}
            </div>
            <br />
            <button className="button">Xem chi tiết</button>
          </div>
          <div className="right-content">
            <div className="image-container image-container-top">
              <img src={hinh1} alt="Đầm Sen Park" />
            </div>
            <div className="image-container image-container-bottom">
              <img src={hinh2} alt="Đầm Sen Park" />
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ backgroundColor: "#4E95DB" }}>
        <div className="c01" style={{ position: "relative" }}>
          <img src={logo5} className="logo5" />
          <div style={{ marginTop: "-230px" }}>
            <div className="header">
              <p>
                {" "}
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.TT2 }} />
                  </div>
                ))}
              </p>
              <h2>
                {" "}
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.TT4 }} />
                  </div>
                ))}
              </h2>
              <div
                className="line"
                style={{ marginLeft: "450px", width: "250px" }}
              ></div>
              <p>
                {" "}
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.TT3 }} />
                  </div>
                ))}
              </p>
            </div>

            <div className="content">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="post"
                  style={{ backgroundColor: "white" }}
                >
                  <img
                    src={post.image}
                    alt={
                      typeof post.title === "string" ? post.title : "Bài viết"
                    }
                  />
                  <div className="post-info">
                    <div className="author">
                      <span>{post.author}</span>
                      <span className="dot"></span>
                    </div>
                    <h3>
                      <b>{post.title}</b>
                    </h3>
                    <p>{post.content}</p>
                    <div className="tags">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>{tag}</span>
                      ))}
                    </div>
                    <div className="date">
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="button1">
              <button>Xem thêm bài viết</button>
            </div>
          </div>
        </div>
      </div>

      <h4
        className="text-center"
        style={{ lineHeight: "53.2px", fontFamily: "Philosopher" }}
      >
        {" "}
        <b>
          {" "}
          <div>
            {data.map((item, index) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{ __html: item.TD01 }} />
              </div>
            ))}
          </div>
        </b>
      </h4>
      <h1
        className="text-center"
        style={{
          color: "#003F7D",
          lineHeight: "53.2px",
          fontFamily: "Philosopher",
        }}
      >
        {" "}
        <b>
          {" "}
          <div>
            {data.map((item, index) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{ __html: item.TDN1 }} />
              </div>
            ))}
            <div
              className="line"
              style={{ marginLeft: "610px", width: "300px" }}
            ></div>
          </div>
        </b>
      </h1>

      <h4
        className="text-center"
        style={{
          color: "#4D4D4D",
          lineHeight: "53.2px",
          fontFamily: "Philosopher",
        }}
      >
        {" "}
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: item.TD02 }} />
            </div>
          ))}
        </div>
      </h4>

      <div className="container mt-5" style={{ fontFamily: "Roboto" }}>
        <div className="row">
          <div className="col-md-4 service-card">
            <img src={hinh3} alt="Trò Chơi" />
            <div className="wt">
              <h4 style={{ color: "#0054A6", lineHeight: "42.56px" }}>
                {" "}
                <b>
                  <div>
                    {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.T1 }} />
                      </div>
                    ))}
                  </div>
                </b>
              </h4>
              <div>
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.T01 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 service-card">
            <img src={hinh4} alt="Trò Chơi" />
            <div className="wt">
              <h4 style={{ color: "#0054A6", lineHeight: "42.56px" }}>
                {" "}
                <b>
                  <div>
                    {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.T2 }} />
                      </div>
                    ))}
                  </div>
                </b>
              </h4>
              <div>
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.T02 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 service-card">
            <img src={hinh5} alt="Cảnh Trí" />
            <div className="wt">
              <h4 style={{ color: "#0054A6", lineHeight: "42.56px" }}>
                <b>
                  {" "}
                  <div>
                    {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.T3 }} />
                      </div>
                    ))}
                  </div>
                </b>
              </h4>
              <div>
                {data.map((item, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: item.T03 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TrangchuPages;
