import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleProps {
  hinh: string;
  title: string;
  date: string;
  views: string;
  tags: string[];
}

const Article: React.FC<ArticleProps> = ({ hinh, title, date, views, tags }) => (
  <div className="col-md-3">
    <Link to="/BaivietChitiet" style={{textDecoration:"none"}}>
      <div className="article-container">
        <div className="article-preview">
          <img src={hinh} alt="..." />
          <div className="overlay1">Click để xem</div>
          <div className="article-content">
            <h5 className="article-title">{title}</h5>
            <div className="author">
              <span>Admin</span>
              <span className="dot"></span>
            </div>
            <p className="article-description">
              {tags.map((tag, index) => (
                <span key={index} className="item-button">{tag}</span>
              ))}
            </p>
            <p className="article-meta">{views} lượt xem - {date}</p>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Article;
