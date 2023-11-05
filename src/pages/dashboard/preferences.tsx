import React, { useEffect, useState } from 'react';
import { useSportsState, useSportsDispatch } from '../../context/sports/context';
import { fetchSports } from '../../context/sports/actions';
import { Dialog } from '@headlessui/react';
import { usePreferencesDispatch, usePreferencesState } from '../../context/preferences/context';
import { updatePreferences } from '../../context/preferences/actions';

const Preferences: React.FC = () => {
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();
  const preferencesDispatch = usePreferencesDispatch();
  const preferencesState = usePreferencesState();

  const { sports, isLoading, isError, errorMessage } = sportsState;
  const { preferences } = preferencesState;

  // State to store the selected sports
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true); // Control dialog open and close

  useEffect(() => {
    fetchSports(sportsDispatch);
  }, [sportsDispatch]);

  useEffect(() => {
    if (preferences.length > 0) {
      // Load selected sports from preferences if available
      setSelectedSports(preferences[0].sports);
    }
  }, [preferences]);

  const handleSportSelection = (sportName: string) => {
    if (selectedSports.includes(sportName)) {
      setSelectedSports(selectedSports.filter((sport) => sport !== sportName));
    } else {
      setSelectedSports([...selectedSports, sportName]);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const savePreferences = () => {
    const updatedPreferences = [{  id:1,sports: selectedSports }]; // You can use your preferences structure

    // Update the preferences
    updatePreferences(preferencesDispatch, updatedPreferences);

    // Close the dialog
    setIsOpen(false);
  };

  if (sports.length === 0 && isLoading) {
    return <span>Loading sports...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={closeDialog} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl" style={{ color: 'black' }}>
            <h2>Select Sports:</h2>
            {sports.map((sport) => (
              <div key={sport.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSports.includes(sport.name)}
                    onChange={() => handleSportSelection(sport.name)}
                  />
                  {sport.name}
                </label>
              </div>
            ))}
            <div>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={savePreferences}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Preferences;
