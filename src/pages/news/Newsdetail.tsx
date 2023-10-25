import React from 'react';
import { useNewsState, useNewsDispatch } from '../../context/news/context';

const NewsDetail: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();

  if (!newsState.selectedArticle) {
    return <div>No article selected.</div>;
  }

  return (
    <div>
      <h2>{newsState.selectedArticle.title}</h2>
      <p>{newsState.selectedArticle.content}</p>
    </div>
  );
};

export default NewsDetail;
