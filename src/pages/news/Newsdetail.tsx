import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNewsDispatch, useNewsState } from '../../context/news/context';
import { fetchArticleById } from '../../context/news/actions';

const NewsDetail: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();
  const { articleId } = useParams<{ articleId?: string }>() || {};

  useEffect(() => {
    if (articleId) {
      fetchArticleById(newsDispatch, parseInt(articleId));
    }
  }, [articleId, newsDispatch]);

  const { selectedArticle } = newsState;

  if (!selectedArticle) {
    return <div>No article selected or not found.</div>;
  }

  return (
    <div>
      <h2>{selectedArticle.title}</h2>
      {/* <p>{selectedArticle.content}</p> */}
    </div>
  );
};

export default NewsDetail;
