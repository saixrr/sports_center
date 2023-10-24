import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { NewsProvider } from "./context/news/context";
import { MatchProvider } from "./context/matches/context";
import React from "react";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <MatchProvider>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </MatchProvider>
    </div>
  );
};

export default App;