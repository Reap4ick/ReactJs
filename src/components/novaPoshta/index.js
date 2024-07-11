import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";

const NovaPoshtaPage = () => {
    const apiKey = "63aa362a44e812e38243bd8fb803b606";
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const mapRef = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        displayMap([]);
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            const areasData = await getAreas();
            setAreas(areasData);
        }
        fetchAreas();
    }, []);

    useEffect(() => {
        if (selectedArea) {
            const fetchCities = async () => {
                const citiesData = await getCities(selectedArea.Ref);
                setCities(citiesData);
            }
            fetchCities();
        }
    }, [selectedArea]);

    useEffect(() => {
        if (selectedCity) {
            const fetchWarehouses = async () => {
                const warehousesData = await getWarehouses(selectedCity.Ref);
                setWarehouses(warehousesData);
                displayMap(warehousesData, selectedCity, selectedWarehouse);
            }
            fetchWarehouses();
        }
    }, [selectedCity, selectedWarehouse]);

    const getAreas = async () => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "getAreas"
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    }

    const getCities = async (areaRef) => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
                    AreaRef: areaRef
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

    const getWarehouses = async (cityRef) => {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: apiKey,
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: cityRef
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching warehouses:", error);
        }
    }

    const displayMap = (warehouses, selectedCity, selectedWarehouse) => {
        if (mapRef.current) {
            mapRef.current.remove();
        }

        const map = L.map('map').setView([48.3794, 31.1656], 6);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const markers = L.markerClusterGroup();

        warehouses.forEach(warehouse => {
            const statusEmoji = warehouse.WarehouseStatus === 'Working' ? "🟢" : "🔴";
            const popupContent = `<b>${warehouse.Description}</b><br>
                           <br><strong>Address:</strong> ${warehouse.ShortAddress}<br>
                           <strong>Status:</strong> ${warehouse.WarehouseStatus} ${statusEmoji}`;

            const marker = L.marker([warehouse.Latitude, warehouse.Longitude], {
                icon: L.AwesomeMarkers.icon({
                    markerColor: "red",
                })
            }).bindPopup(popupContent);

            markers.addLayer(marker);
            markersRef.current.push(marker);

            if (selectedWarehouse && selectedWarehouse.Ref === warehouse.Ref) {
                if (warehouse.Latitude && warehouse.Longitude) {
                    map.setView([warehouse.Latitude, warehouse.Longitude], 18);
                }
            }
        });


        if (selectedCity && !selectedWarehouse) {
            const city = cities.find(city => city.Ref === selectedCity.Ref);
            if (city && city.Latitude && city.Longitude) {
                map.setView([city.Latitude, city.Longitude], 10);
            }
        }

        map.addLayer(markers);
    }

    return (
        <>
            <h1>Отримання даних із нової пошти</h1>

            <div className="primary-button mt-4">
                <em>Select Area:</em>
                <Select
                    value={selectedArea}
                    onChange={(selectedOption) => {
                        setSelectedArea(selectedOption);
                        setSelectedCity(null);
                        setSelectedWarehouse(null);
                    }}
                    getOptionLabel={option => option.Description}
                    getOptionValue={option => option.Ref}
                    options={areas}
                />

                {selectedArea && (
                    <div style={{ marginLeft: '20px' }}>
                        <em>Select City:</em>
                        <Select
                            value={selectedCity}
                            onChange={(selectedOption) => {
                                setSelectedCity(selectedOption);
                                setSelectedWarehouse(null);
                            }}
                            getOptionLabel={option => option.Description}
                            getOptionValue={option => option.Ref}
                            options={cities}
                        />
                    </div>
                )}

                {selectedCity && (
                    <div style={{ marginLeft: '20px' }}>
                        <em>Select Warehouse:</em>
                        <Select
                            value={selectedWarehouse}
                            onChange={(selectedOption) => setSelectedWarehouse(selectedOption)}
                            getOptionLabel={option => option.Description}
                            getOptionValue={option => option.Ref}
                            options={warehouses}
                        />
                    </div>
                )}

            </div>

            <div id="map" style={{ height: "490px", marginTop: "20px", zIndex: 0 }}></div>
        </>
    )
}

export default NovaPoshtaPage;
