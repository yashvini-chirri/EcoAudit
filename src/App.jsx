import { useEffect, useState } from "react";
import Header from "./components/Header";
import WasteForm from "./components/WasteForm";
import Dashboard from "./components/Dashboard";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
  setLoading(false);
}, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-body" : "";
  }, [darkMode]);

  // Show splash screen first
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Header />

      <button
        onClick={toggleDarkMode}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          zIndex: 1000,
          padding: "8px 12px",
          borderRadius: "20px",
          border: "none",
          background: "#22c55e",
          color: "white",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀︎" : "⏾"}
      </button>

      <WasteForm onSuccess={handleSuccess} />
      <Dashboard refresh={refresh} />
    </div>
  );
}

export default App;