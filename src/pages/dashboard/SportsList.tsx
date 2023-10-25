// SportsList.tsx

import React, { useEffect } from 'react';
import { useSportsState, useSportsDispatch } from '../../context/sports/context';
import { fetchSports } from '../../context/sports/actions';

const SportsList: React.FC = () => {
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();

  const { sports, isLoading, isError, errorMessage } = sportsState;

  useEffect(() => {
    fetchSports(sportsDispatch);
  }, [sportsDispatch]);

  if (sports.length === 0 && isLoading) {
    return <span>Loading sports...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="sticky">
      <div className="flex space-x-3" style={{color: 'black'}}>
        <button className="py-2 px-4 rounded-full bg-gray-100 ">Trending</button>
        {sports.map((sport: any) => (
          <button key={sport.id} className="py-2 px-4 rounded-full bg-gray-100" >
            {sport.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportsList;
