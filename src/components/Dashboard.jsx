import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import WasteMap from "./WasteMap";

function Dashboard({ refresh }) {
  const [logs, setLogs] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 📥 FETCH + REALTIME
  useEffect(() => {
    fetchLogs();

    const channel = supabase
      .channel("waste-logs-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "waste_logs",
        },
        (payload) => {
          console.log("Realtime change:", payload);
          setLogs((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  // 📜 SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📥 FETCH LOGS
  async function fetchLogs() {
    const { data, error } = await supabase
      .from("waste_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setLogs(data);
    }
  }

  // ⬆️ SCROLL TO TOP
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // 🔐 RESET FUNCTION (still kept if you want it later)
  async function resetLogs() {
    const inputKey = prompt("Enter admin key:");

    if (inputKey !== import.meta.env.VITE_ADMIN_KEY) {
      alert("❌ Unauthorized");
      return;
    }

    const confirmReset = window.confirm("Delete all logs?");

    if (!confirmReset) return;

    const { error } = await supabase
      .from("waste_logs")
      .delete()
      .neq("id", "");

    if (error) {
      alert("Reset failed");
    } else {
      alert("Deleted successfully");
      fetchLogs();
    }
  }

  const totalWeight = logs.reduce(
    (sum, log) => sum + Number(log.weight),
    0
  );

  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: "10px" }}>🌍 Audit Dashboard</h2>

      {/* 📊 STATS */}
      <div className="stats-container">
        <div className="stat-card total">
          <h4>Total Waste</h4>
          <p>{totalWeight.toFixed(2)} kg</p>
        </div>

        <div className="stat-card plastic">
          <h4>Plastic</h4>
          <p>
            {logs
              .filter((l) => l.category === "Plastic")
              .reduce((a, b) => a + Number(b.weight), 0)
              .toFixed(2)}{" "}
            kg
          </p>
        </div>

        <div className="stat-card organic">
          <h4>Organic</h4>
          <p>
            {logs
              .filter((l) => l.category === "Organic")
              .reduce((a, b) => a + Number(b.weight), 0)
              .toFixed(2)}{" "}
            kg
          </p>
        </div>

        <div className="stat-card ewaste">
          <h4>E-Waste</h4>
          <p>
            {logs
              .filter((l) => l.category === "E-Waste")
              .reduce((a, b) => a + Number(b.weight), 0)
              .toFixed(2)}{" "}
            kg
          </p>
        </div>
      </div>

      {/* 📋 TABLE */}
      <table>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Category</th>
            <th>Weight (kg)</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.category}</td>
              <td>{log.weight} kg</td>
              <td>{log.latitude}</td>
              <td>{log.longitude}</td>
              <td>
                {log.image_url ? (
                  <img
                    src={log.image_url}
                    alt="waste"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ) : (
                  "No image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🗺 MAP */}
      <WasteMap logs={logs} />

      {/* ⬆ BACK TO TOP BUTTON */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Dashboard;