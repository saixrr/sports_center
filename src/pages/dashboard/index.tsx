import React from 'react';
import NewsListItems from '../news/NewsListItems'; 
import MatchesListItems from './MatchesListItems';
import SportsList from './SportsList';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/account/dashboard">View All News</Link>
      <MatchesListItems />
      {/* Include the NewsListItems component here */}
      <SportsList />
      <Outlet />
      <NewsListItems />
    </div>
  );
};

export default Dashboard;