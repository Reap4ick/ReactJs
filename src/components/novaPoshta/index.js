import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import axios from "axios";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

const NovaPoshtaPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [map, setMap] = useState(null); // State to hold map instance

  // Define default icon
  const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const fetchRegions = async () => {
      const apiKey = "63aa362a44e812e38243bd8fb803b606";
      const model = {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getAreas",
        methodProperties: {},
      };

      try {
        const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", model);
        setRegions(response.data.data);
      } catch (error) {
        console.error("Помилка при отриманні областей: ", error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async (regionRef) => {
      if (!regionRef) {
        setCities([]);
        return;
      }

      const apiKey = "63aa362a44e812e38243bd8fb803b606";
      const model = {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: regionRef,
        },
      };

      try {
        const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", model);
        setCities(response.data.data);
      } catch (error) {
        console.error("Помилка при отриманні міст: ", error);
      }
    };

    fetchCities(selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    const fetchWarehouses = async (cityDescription) => {
      if (!cityDescription) {
        setWarehouses([]);
        return;
      }

      const apiKey = "63aa362a44e812e38243bd8fb803b606";
      const model = {
        apiKey: apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          Language: "ua",
          CityName: cityDescription,
        },
      };

      try {
        const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", model);
        setWarehouses(response.data.data);
        console.log("Вибране місто: ", cityDescription);
        console.log("Отримані відділення та поштомати для вибраного міста: ", response.data.data);
      } catch (error) {
        console.error("Помилка при отриманні відділень та поштоматів: ", error);
      }
    };

    fetchWarehouses(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.MarkerCluster) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    const markers = L.markerClusterGroup();
    warehouses.forEach((warehouse) => {
      if (warehouse.Latitude && warehouse.Longitude) {
        const marker = L.marker([warehouse.Latitude, warehouse.Longitude], { icon: defaultIcon }).bindPopup(
          warehouse.Description
        );
        markers.addLayer(marker);
      }
    });
    map.addLayer(markers);

    // Fit map to markers bounds
    if (warehouses.length > 0) {
      const bounds = markers.getBounds();
      map.fitBounds(bounds);
    }
  }, [map, warehouses]);

  useEffect(() => {
    const mapInstance = L.map("map").setView([49.8397, 24.0297], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleRegionChange = (event) => {
    const regionRef = event.target.value;
    setSelectedRegion(regionRef);
    setSelectedCity("");
    setSelectedWarehouse("");
  };

  const handleCityChange = (event) => {
    const cityDescription = event.target.value;
    setSelectedCity(cityDescription);
    setSelectedWarehouse("");
  };

  const handleWarehouseChange = (event) => {
    const warehouseDescription = event.target.value;
    setSelectedWarehouse(warehouseDescription);
  };

  return (
    <div className="container">
      <h1>Отримання даних із Нової Пошти</h1>
      <div className="mb-3">
        <label htmlFor="regionSelect" className="form-label">Область:</label>
        <select id="regionSelect" className="form-select" onChange={handleRegionChange} value={selectedRegion}>
          <option value="">Оберіть область</option>
          {regions.map((region) => (
            <option key={region.Ref} value={region.Ref}>
              {region.Description}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="citySelect" className="form-label">Місто:</label>
        <select id="citySelect" className="form-select" onChange={handleCityChange} value={selectedCity}>
          <option value="">Оберіть місто</option>
          {cities.map((city) => (
            <option key={city.Ref} value={city.Description}>
              {city.Description}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="warehouseSelect" className="form-label">Відділення або поштомат:</label>
        <select id="warehouseSelect" className="form-select" onChange={handleWarehouseChange} value={selectedWarehouse}>
          <option value="">Оберіть відділення або поштомат</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.Ref} value={warehouse.Description}>
              {warehouse.Description}
            </option>
          ))}
        </select>
      </div>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
};

export default NovaPoshtaPage;
