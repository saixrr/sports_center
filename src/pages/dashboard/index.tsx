import React from 'react';
import NewsListItems from '../news/NewsListItems'; 
import MatchesListItems from './MatchesListItems';

import { Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';


const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <MatchesListItems />
      <Outlet />
      <NewsListItems />
    </div>
  );
};

export default Dashboard;