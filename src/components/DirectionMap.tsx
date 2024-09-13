// src/components/DirectionMap.tsx

import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { useEffect, useRef } from "react";

interface DirectionMapProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  showTaxis?: boolean;
}

const DirectionMap = ({
  origin,
  destination,
  showTaxis = true,
}: DirectionMapProps) => {
  const webApiKey = import.meta.env.VITE_WEB_API_KEY;
  const serviceApiKey = import.meta.env.VITE_SERVICE_API_KEY;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        mapType: mapboxgl.Map.mapTypes.neshanVector,
        container: mapContainerRef.current,
        traffic: false,
        poi: false,
        zoom: 12,
        center: [origin.lng, origin.lat],
        mapKey: webApiKey,
        mapTypeControllerOptions: {
          show: true,
          position: "top-right",
        },
      }) as unknown as mapboxgl.Map;

      mapRef.current.on("load", async () => {
        // Add markers for origin and destination
        new mapboxgl.Marker({ color: "green" })
          .setLngLat([origin.lng, origin.lat])
          .addTo(mapRef.current)
          .setPopup(new mapboxgl.Popup().setText("مبدا").addTo(mapRef.current));

        new mapboxgl.Marker({ color: "blue" })
          .setLngLat([destination.lng, destination.lat])
          .addTo(mapRef.current)
          .setPopup(new mapboxgl.Popup().setText("مقصد").addTo(mapRef.current));

        // Drirection API
        const response = await fetch(
          `https://api.neshan.org/v4/direction/no-traffic?type=car&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=0`,
          {
            headers: {
              "Api-Key": serviceApiKey,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Draw all routes including alternatives
          data.routes.forEach((route: any, index: number) => {
            const decodedPolyline = decodePolyline(
              route.overview_polyline.points
            );

            //  different color for alternatives
            mapRef.current?.addSource(`route-${index}`, {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: decodedPolyline.map((point: number[]) => [
                    point[1],
                    point[0],
                  ]),
                },
              },
            });

            mapRef.current?.addLayer({
              id: `route-${index}`,
              type: "line",
              source: `route-${index}`,
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": index === 0 ? "#007aff" : "#FFA500", // Main route is blue, alternatives are orange
                "line-width": 5,
              },
            });
          });

          if (showTaxis) {
            setTimeout(() => showTaxisOnMap(mapRef.current, origin), 1000);
          }
        }
      });
    }
  }, [origin, destination, showTaxis]);

  const decodePolyline = (encoded: string) => {
    const poly = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push([lat / 1e5, lng / 1e5]);
    }

    return poly;
  };

  // add taxi markers around the origin
  const showTaxisOnMap = (
    map: mapboxgl.Map | null,
    origin: { lat: number; lng: number }
  ) => {
    const taxiCoordinates = generateRandomCoordinatesAround(origin, 5);

    taxiCoordinates.forEach((coord) => {
      const marker = new mapboxgl.Marker({
        element: createTaxiMarker(),
      })
        .setLngLat([coord.lng, coord.lat])
        .addTo(map);
    });
  };

  const generateRandomCoordinatesAround = (
    origin: { lat: number; lng: number },
    count: number
  ) => {
    const radius = 0.005;
    const coords = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const dx = radius * Math.cos(angle);
      const dy = radius * Math.sin(angle);
      coords.push({ lat: origin.lat + dy, lng: origin.lng + dx });
    }

    return coords;
  };

  const createTaxiMarker = () => {
    const img = document.createElement("img");
    img.src = "/images/taxi-img.svg";
    img.style.width = "32px";
    img.style.height = "32px";
    return img;
  };

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default DirectionMap;
