import React, { useEffect, useState } from 'react';
import { useMatchState, useMatchDispatch } from '../../context/matches/context';
import { fetchNewMatches } from '../../context/matches/actions';
import { API_ENDPOINT } from '../../config/constants';
import { Link } from 'react-router-dom';
import { usePreferencesState,usePreferencesDispatch } from '../../context/preferences/context';
import { fetchPreferences } from '../../context/preferences/actions';

// Define a type for the match data
type Match = {
  id: number;
  score: any;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: { id: number; name: string }[];
};

const MatchesListItems: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken')
  const matchesState = useMatchState();
  const matchesDispatch = useMatchDispatch();
  const [isRotated, setIsRotated] = useState(false);
  const preferencesState:any = usePreferencesState();
  const preferencesDispatch=usePreferencesDispatch();
  const { preferences, isLoading: preferencesLoading, isError: preferencesError, errorMessage: preferencesErrorMessage } = preferencesState;
  const { matches, isLoading, isError, errorMessage } = matchesState;

  useEffect(() => {
    fetchNewMatches(matchesDispatch);
    fetchPreferences(preferencesDispatch)
  }, []);

  let [runningMatchesWithScores, setRunningMatchesWithScores] = useState<Match[]>([]);

  const handleRefreshClick = () => {
    // Toggle the rotation state
    setIsRotated(!isRotated);

    // Trigger the refresh action
    fetchNewMatches(matchesDispatch);
  };

  useEffect(() => {
    const fetchScoresForMatch = async (matchId: number): Promise<Match | null> => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
        const matchData = await response.json();
        return {
          ...matchData,
          id: matchId,
        };
      } catch (error) {
        console.error('Error fetching scores:', error);
        return null;
      }
    };

    const fetchScoresForRunningMatches = async () => {
      const runningMatches = matches.filter((match) => match.isRunning);

      const matchesWithScores = await Promise.all(
        runningMatches.map(async (match) => {
          const scores = await fetchScoresForMatch(match.id);
          if (scores !== null) {
            match.score = scores.score;
          }
          return match;
        })
      );

      setRunningMatchesWithScores(matchesWithScores);
    };

    fetchScoresForRunningMatches();
  }, [matches]);

  if (preferencesLoading) {
    return <span>Loading preferences...</span>;
  }

  if (preferencesError) {
    return <span>{preferencesErrorMessage}</span>;
  }

  if (matches.length === 0 && isLoading) {
    return <span>Loading matches...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Extract user preferences
  // const userPreferences = preferences[0];
  // console.log(userPreferences)

 if(isAuthenticated){
  runningMatchesWithScores = runningMatchesWithScores.filter((match: Match) => {
    if(preferences && preferences.sports && preferences.teams){
    // Check if the sport is in user preferences
    const sportInPreferences = preferences.sports.includes(match.sportName);

    // Check if any of the teams are in user preferences
    const teamsInPreferences = match.teams.some((team) => preferences.teams.includes(team.name));

    return sportInPreferences || teamsInPreferences;
    }
  });
}
console.log(runningMatchesWithScores)


  return (
    <div className="p-5 border border-gray-100 shadow-sm rounded-md w-3/4 mt-0 mb-4 relative">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 mr-10">Live Matches</h2>

      <button
        className="w-8 h-8 p-1 bg-blue-800 text-white rounded-full absolute top-2 right-2 z-10 transform transition-transform"
        onClick={handleRefreshClick}
      >
<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          aria-hidden="true"
          className={`w-6 h-6 mx-auto transform ${isRotated ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </button>
      <div className="flex flex-row space-x-4 h-45 w-92">
        {runningMatchesWithScores.map((match: Match) => (
          <div key={match.id}>
            <div className="h-45 w-92">
              <Link to={`/account/dashboard/${match.id}`}>
                <div className="border p-5 h- w-100 rounded-md hover:shadow-md bg-white shadow-md transition duration-300">
                  <div className="mb-4 w-full">
                    <h1 className="text-2xl font-semibold text-blue-800 uppercase antialiased">
                      {match.sportName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      <p className="text-green-500">Live</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 text-black">
                      <div className="text-lg font-semibold text-indigo-600 mr-16">
                        {match.teams[0].name}
                        <div className="mt-4">{match.teams[1].name}</div>
                      </div>
                      <div className="text-lg font-bold text-green-600 text-right">
                        {match.score && match.score[match.teams[0].name]}
                        <div className="mt-4">
                          {match.score && match.score[match.teams[1].name]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        ></path>
                      </svg>
                      {match.location}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesListItems;
