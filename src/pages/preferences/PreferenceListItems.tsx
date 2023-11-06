import React, { useState, useEffect } from "react";
import { useSportsState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import { usePreferencesState,usePreferencesDispatch } from "../../context/preferences/context";
import { updatePreferences } from "../../context/preferences/actions";

export default function PreferenceListItems() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sportState = useSportsState();
  const teamState = useTeamsState();
  const preferencesState = usePreferencesState();
  const preferencesDispatch =usePreferencesDispatch()

  const { sports} = sportState;
  const { teams} = teamState;
  const {preferences,isLoading,isError,errorMessage} = preferencesState

  useEffect(() => {
   
    setSelectedSports(preferences.sports || []);
    setSelectedTeams(preferences.teams || []);
  }, [preferences]);

  if (isLoading ) {
    return <span>Loading...</span>;
  }

  if (isError ) {
    return <span>{errorMessage}</span>;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const savePreferences = () => {
    const preferences = {
      sports: selectedSports,
      teams: selectedTeams,
    };

    // Call the updatePreferences function to update the preferences
    updatePreferences(preferencesDispatch,preferences);

    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="custom-preference-button">
        Preferences
      </button>
      {modalIsOpen && (
        <div className="custom-modal">
          <h2>Select Your Preferred Sports and Teams</h2>
          <div>
            <h3>Sports</h3>
            {sports.map((sport) => (
              <div key={sport.id} className="custom-checkbox">
                <input
                  type="checkbox"
                  value={sport.name}
                  checked={selectedSports.includes(sport.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSports([...selectedSports, e.target.value]);
                    } else {
                      setSelectedSports(
                        selectedSports.filter((name) => name !== e.target.value)
                      );
                    }
                  }}
                />
                {sport.name}
              </div>
            ))}
          </div>
          <div>
            <h3>Teams</h3>
            {teams.map((team) => (
              <div key={team.id} className="custom-checkbox">
                <input
                  type="checkbox"
                  value={team.name}
                  checked={selectedTeams.includes(team.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTeams([...selectedTeams, e.target.value]);
                    } else {
                      setSelectedTeams(
                        selectedTeams.filter((name) => name !== e.target.value)
                      );
                    }
                  }}
                />
                {team.name}
              </div>
            ))}
          </div>
          <button onClick={savePreferences} className="custom-save-button">
            Save Preferences
          </button>
        </div>
      )}
    </>
  );
}
