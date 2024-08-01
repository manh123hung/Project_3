// Content.tsx
import React from 'react';
import Card from './Card';

const Content: React.FC = () => {
  return (
    <div className="col-md-9">
      <div className="row">
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
      </div>
      <div className="row">
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
      </div>
      <div className="row">
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
        <Card
          title="Nhân viên thiết kế đồ họa"
          description="Trung tâm dịch vụ du lịch Đầm Sen cần tuyển 2 Nhân viên kinh doanh lữ hành. Yêu cầu: Tốt nghiệp CĐ, ĐH chuyên ngành Du lịch, QT kinh doanh, Marketing. Am hiểu tâm lý..."
          title2="Đang tuyển"
        />
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              10
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Content;