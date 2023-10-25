import React, { useEffect } from 'react';
import { useMatchState, useMatchDispatch } from '../../context/matches/context';
import { fetchNewMatches } from '../../context/matches/actions';

const MatchesListItems: React.FC = () => {
  const matchesState = useMatchState();
  const matchesDispatch = useMatchDispatch();

  const { matches, isLoading, isError, errorMessage } = matchesState;

  useEffect(() => {
    fetchNewMatches(matchesDispatch);
  }, [matchesDispatch]);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Filter the matches to only display those with isRunning set to true
  const runningMatches = matches.filter((match: any) => match.isRunning);

  return (
    <div className="p-5 border border-gray-100 shadow-sm rounded-md w-3/4">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Live Matches</h2>
      <div className="flex flex-row space-x-4">
        {runningMatches.map((match: any) => (
          <div key={match.id} className="h-50 w-120">
            <div className="mb-4">
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
                    <div className="text-lg font-semibold w-1/3">
                      {match.teams[0].name}
                    </div>
                    <div className="text-lg font-semibold w-1/3 text-center">
                      vs
                    </div>
                    <div className="text-lg font-semibold w-1/3 text-right">
                      {match.teams[1].name}
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      ></path>
                    </svg>
                    {match.location}
                  </div>
                  <button className="w-8 h-8 p-1 bg-blue-800 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      aria-hidden="true"
                      className="w-6 h-6 mx-auto"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesListItems;
