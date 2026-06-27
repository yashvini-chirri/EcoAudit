import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "leaflet.heat";

/* Fix Leaflet default icon */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Category icons */
const getIcon = (category) => {
  let color = "gray";

  if (category === "Plastic") color = "blue";
  else if (category === "Organic") color = "green";
  else if (category === "E-Waste") color = "red";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

/* Recenter */
function RecenterMap({ latest }) {
  const map = useMap();

  useEffect(() => {
    if (latest?.latitude && latest?.longitude) {
      map.setView(
        [Number(latest.latitude), Number(latest.longitude)],
        14
      );
    }
  }, [latest, map]);

  return null;
}

/* Heatmap Layer */
function HeatmapLayer({ logs }) {
  const map = useMap();
  const heatRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const points = logs
      .filter((l) => l.latitude && l.longitude)
      .map((l) => [
        Number(l.latitude),
        Number(l.longitude),
        Number(l.weight) || 1,
      ]);

    if (heatRef.current) {
      heatRef.current.remove();
    }

    heatRef.current = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      if (heatRef.current) {
        heatRef.current.remove();
      }
    };
  }, [logs, map]);

  return null;
}

export default function WasteMap({ logs = [] }) {
  const validLogs = logs.filter(
    (log) =>
      log.latitude &&
      log.longitude &&
      !isNaN(log.latitude) &&
      !isNaN(log.longitude)
  );

  const latestLog = validLogs[0];
  const defaultCenter = [13.0827, 80.2707];

  return (
    <div style={{ height: "420px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {latestLog && <RecenterMap latest={latestLog} />}

        {/* 🔥 HEATMAP LAYER */}
        <HeatmapLayer logs={validLogs} />

        {/* 📍 MARKERS + CLUSTER */}
        <MarkerClusterGroup>
          {validLogs.map((log) => (
            <Marker
              key={log.id}
              position={[
                Number(log.latitude),
                Number(log.longitude),
              ]}
              icon={getIcon(log.category)}
            >
              <Popup>
                <strong>{log.category}</strong>
                <br />
                {log.weight} kg
                <br />
                📍 {log.latitude}, {log.longitude}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}