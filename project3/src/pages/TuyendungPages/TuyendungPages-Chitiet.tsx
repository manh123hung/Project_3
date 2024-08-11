// Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../lib/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./TuyendungPages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function TuyendungChitiet() {
  const [logo4, setLogo4] = useState("");
  const [hinh1, sethinh1] = useState("");
  const [hinh2, sethinh2] = useState("");
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
    const hinh1Ref = ref(storage, "TuyendungPages/Group 11 (1).png");
    const hinh2Ref = ref(storage, "TuyendungPages/image 27.png");
    Promise.all([getDownloadURL(hinh1Ref), getDownloadURL(hinh2Ref)])
      .then((urls) => {
        sethinh1(urls[0]);
        sethinh2(urls[1]);
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
  const [fileName, setFileName] = useState<string>("Không có tập tin nào được chọn");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Không có tập tin nào được chọn");
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
                <h1 className="title">{data.map((item, index) => (
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
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <div style={{ padding: "40px" }}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="d-flex align-items-center">
                          <img src={hinh1} />
                          <div>
                            <h1
                              className="job-title"
                              style={{ color: "#003F7D" }}
                            >
                              {" "}
                              <b> {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.t01 }} />
                      </div>
                    ))}</b>
                            </h1>

                            <p
                              className="job-description"
                              style={{ color: "#003F7D" }}
                            >
{data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.t02 }} />
                      </div>
                    ))}                            </p>
                            <div className="job-info">
                              <FontAwesomeIcon icon={faMapMarkerAlt} /> CVVH Đầm
                              Sen&nbsp;&nbsp;
                              <FontAwesomeIcon icon={faClock} /> 2 tuần trước
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button className="apply-button">{data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.t03 }} />
                      </div>
                    ))}</button>
                      </div>
                    </div>
                    <img src={hinh2} className="img-fluid" />
                  </div>
                    <br />
                  <h1 style={{ color: "#003F7D" }}>{data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      </div>
                    ))}</h1>

                  <table className="table1">
                  {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.label }} />
                      </div>
                    ))}
                  </table>
                </div>
                <div className="container-fluid" style={{ padding: "40px" }}>
                  <h1 style={{ color: "#003F7D" }}>
                  {data.map((item, index) => (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: item.title2 }} />
                      </div>
                    ))}
                  </h1>
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="hoten">Họ tên</label>
                        <input
                          type="text"
                          id="hoten"
                          placeholder="Nguyễn Văn A"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="namsinh">Năm sinh</label>
                        <input
                          type="text"
                          id="namsinh"
                          placeholder="12-12-2000"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="noiohiennay">Nơi ở hiện nay</label>
                        <input
                          type="text"
                          id="noiohiennay"
                          placeholder="123 Âu Cơ, Phường 9, Tân Bình, TP HCM"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Nguyenvana@gmail.com"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="trinhdo">Trình độ</label>
                        <input
                          type="text"
                          id="trinhdo"
                          placeholder="Đại học"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="congtacdaingay">
                          Bạn có sẵn sàng đi công tác dài ngày
                        </label>
                        <p>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="congtacdaingay"
                              id="congtacdaingay-co"
                              defaultValue="Có"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="congtacdaingay-co"
                            >
                              Có
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="congtacdaingay"
                              id="congtacdaingay-tuythoidiem"
                              defaultValue="Tùy thời điểm"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="congtacdaingay-tuythoidiem"
                            >
                              Tùy thời điểm
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="congtacdaingay"
                              id="congtacdaingay-khong"
                              defaultValue="Không"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="congtacdaingay-khong"
                            >
                              Không
                            </label>
                          </div>
                        </p>
                      </div>
                      <div>
                        <label htmlFor="lamviectruocday">
                          Những nơi đã từng làm việc trước đây (ghi rõ vị trí)
                        </label>
                        <textarea
                          id="lamviectruocday"
                          className="form-control"
                          placeholder="Những nơi đã từng làm việc trước đây"
                          defaultValue={""}
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="lamviectruocday">
                          Kinh nghiệm bản thân
                        </label>
                        <textarea
                          id="lamviectruocday"
                          className="form-control"
                          placeholder="Kinh nghiệm bản thân"
                          defaultValue={""}
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label htmlFor="gioitinh">Giới tính</label>
                        <p>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gioitinh"
                              id="gioitinh-nam"
                              defaultValue="Nam"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gioitinh-nam"
                            >
                              Nam
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gioitinh"
                              id="gioitinh-nu"
                              defaultValue="Nữ"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gioitinh-nu"
                            >
                              Nữ
                            </label>
                          </div>
                        </p>
                      </div>
                      <div>
                        <label htmlFor="noisinh">Nơi sinh</label>
                        <input
                          type="text"
                          id="noisinh"
                          placeholder="Phường 6, Quận Tân Bình, TP HCM"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="dienthoai">Điện thoại</label>
                        <input
                          type="text"
                          id="dienthoai"
                          placeholder="+84 0123456789"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="facebook">Facebook cá nhân</label>
                        <input
                          type="text"
                          id="facebook"
                          placeholder="facebook.com.vn"
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                  <div className="file-upload">
                <label htmlFor="cv">Đính kèm CV</label>
                <div className="file-upload-container">
                  <span id="cv-label" className="file-upload-label">
                    {fileName}
                  </span>
                  <span className="cv-icon" onClick={handleIconClick}>
                    <input
                      type="file"
                      id="cv"
                      className="form-control-file"
                      onChange={handleFileChange1}
                      ref={fileInputRef}
                    />
                    
                  </span>
                </div>
              </div>
                      <div>
                        <label htmlFor="lamthemgio">
                          Bạn có sẵn sàng làm thêm giờ
                        </label>
                        <p>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="lamthemgio"
                              id="lamthemgio-co"
                              defaultValue="Có"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="lamthemgio-co"
                            >
                              Có
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="lamthemgio"
                              id="lamthemgio-tuythoidiem"
                              defaultValue="Tùy thời điểm"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="lamthemgio-tuythoidiem"
                            >
                              Tùy thời điểm
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="lamthemgio"
                              id="lamthemgio-khong"
                              defaultValue="Không"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="lamthemgio-khong"
                            >
                              Không
                            </label>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="button btn btn-success btn-block mt-3"
                    style={{ marginLeft: "1040px" }}
                  >
                    Gửi đơn
                  </button>
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

export default TuyendungChitiet;
