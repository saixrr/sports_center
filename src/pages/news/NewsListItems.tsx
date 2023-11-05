import React, { useEffect, useState } from 'react';
import { useNewsState, useNewsDispatch } from '../../context/news/context';
import { fetchNewsArticles } from '../../context/news/actions';
import { useSportsState, useSportsDispatch } from '../../context/sports/context';
import { fetchSports } from '../../context/sports/actions';
import { Link } from 'react-router-dom';

const NewsListItems: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();

  const { articles, isLoading, isError, errorMessage } = newsState;
  const { sports } = sportsState;

  const [selectedSport, setSelectedSport] = useState<string | null>('');

  useEffect(() => {
    fetchNewsArticles(newsDispatch);
    fetchSports(sportsDispatch);
  }, [newsDispatch, sportsDispatch]);

  // Function to filter articles based on the selected sport or trending
  const filterArticles = () => {
    if (selectedSport === '') {
      return articles;
    }
    if (selectedSport === 'Trending') {
      // Show trending articles when "Trending" is selected
      const latestArticles: any[] = [];
      sports.forEach((sport: any) => {
        const sportArticles = articles.filter((article: any) => article.sport.name === sport.name);
        if (sportArticles.length > 0) {
          sportArticles.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          latestArticles.push(sportArticles[0]);
        }
      });
      return latestArticles.slice(0, 7);
    }
    return articles.filter((article: any) => article.sport.name === selectedSport);
  };

  // Get the filtered articles based on the selected sport
  const filteredArticles = filterArticles();

  return (
    <div className="w-3/4 mr-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      <div className="sticky mb-2">
        <div className="flex space-x-3" style={{ color: 'black' }}>
          <button className="py-2 px-4 rounded-full bg-gray-100" onClick={() => setSelectedSport('Trending')}>
            TRENDING
          </button>
          {sports.map((sport: any) => (
            <button
              key={sport.id}
              className={`py-2 px-4 rounded-full bg-gray-100 ${
                selectedSport === sport.name ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => setSelectedSport(sport.name)}
            >
              {sport.name}
            </button>
          ))}
        </div>
      </div>
      {filteredArticles.length === 0 && isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>{errorMessage}</span>
      ) : (
        filteredArticles.map((article: any) => (
          <div key={article.id} className="w-full flex items-center mb-4  border-4 border-black-400 rounded-xl p-4">
            <div className="w-3/4 ">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
              <p className="text-left text-gray-500 block mt-0">{new Date(article.date).toLocaleDateString()}</p>
              <Link to={`/account/dashboard/articles/${article.id}`} className="text-center text-blue-500 block mt-0">
                Read more
              </Link>
            </div>
            <div className="w-1/4">
              <p className="text-gray-500 text-center">{article.sport.name}</p>
              <img src={article.thumbnail} alt={article.title} className="w-full" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsListItems;
