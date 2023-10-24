import React, { useEffect } from 'react';
import { useNewsState, useNewsDispatch } from '../../context/news/context';
import { fetchNewsArticles } from '../../context/news/actions';

const NewsListItems: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();

  const { articles, isLoading, isError, errorMessage } = newsState;

  useEffect(() => {
    fetchNewsArticles(newsDispatch);
  }, [newsDispatch]);

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className='w-3/4'>
      {articles.map((article: any) => (
        <div key={article.id} className="w-full flex items-center mb-4 border border-gray-500 rounded p-2">
          <div className="w-3/4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.summary}</p>
            <p className=" text-left text-gray-500 block mt-0">{new Date(article.date).toLocaleDateString()}</p>
            <a href={`/news/${article.id}`} className=" text-center text-blue-500 block mt-0">Read more</a>
          </div>
          <div className="w-1/4">
            <p className="text-gray-500 text-center">{article.sport.name}</p>
            <img src={article.thumbnail} alt={article.title} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsListItems;
