import React from "react";
import PreferenceDialog  from "./PreferenceListItems";

const Preferences = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          User Preferences
        </h2>
      </div>
      <PreferenceDialog />
    </>
  );
};

export default Preferences;
