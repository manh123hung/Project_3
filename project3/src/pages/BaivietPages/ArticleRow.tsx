import React from 'react';
import Article from './Article';

interface ArticleData {
  hinh: string;
  title: string;
  date: string;
  views: string;
  tags: string[];
}

interface ArticleRowProps {
  articles: ArticleData[];
}

const ArticleRow: React.FC<ArticleRowProps> = ({ articles }) => (
  <div className="row">
    {articles.map((article, index) => (
      <Article
        key={index}
        hinh={article.hinh}
        title={article.title}
        date={article.date}
        views={article.views}
        tags={article.tags}
      />
    ))}
  </div>
);

export default ArticleRow;
