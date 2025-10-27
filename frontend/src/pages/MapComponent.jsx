import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix Leaflet's missing marker icons in Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapComponent = ({ location }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;
    let isMounted = true;

    const fetchCoordinates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const data = await response.json();

        if (isMounted) {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          } else {
            setError("No coordinates found for this location");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching geocoding data:", err);
          setError("Error fetching coordinates");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCoordinates();

    return () => {
      isMounted = false;
    };
  }, [location]);

  return (
    <div className="w-full sm:w-[400px] h-[300px] mt-4 border rounded-lg overflow-hidden shadow-sm">
      {loading && (
        <p className="text-center mt-2" style={{ color: "#4f7942" }}>
          Loading map...
        </p>
      )}
      {error && <p className="text-center mt-2 text-red-600">{error}</p>}
      {!loading && coordinates && (
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>{location}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
