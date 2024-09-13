// src/components/MapComponent.tsx
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { useEffect, useRef } from "react";


interface MapProps {
  origin: { lat: number; lng: number; address: string };
  destination: { lat: number; lng: number; address: string } | null;
  onMarkerDragEnd: (
    type: "origin" | "destination",
    lat: number,
    lng: number
  ) => void;
  searchTarget: "origin" | "destination"; // Track which location is selected
}

const MapComponent = ({
  origin,
  destination,
  onMarkerDragEnd,
  searchTarget,
}: MapProps) => {
  const webApiKey = import.meta.env.VITE_WEB_API_KEY;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const originMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destinationMarkerRef = useRef<mapboxgl.Marker | null>(null);

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
          position: "top-left",
        },
      }) as unknown as mapboxgl.Map;

      mapRef.current.on("load", () => {
        // Set origin marker
        originMarkerRef.current = new mapboxgl.Marker({
          color: "green",
          draggable: true,
        })
          .setLngLat([origin.lng, origin.lat])
          .addTo(mapRef.current)
          .setPopup(
            new mapboxgl.Popup()
              .setHTML(
                "<p>برای تغییر مکان <b>مبدا</b> مارکر را جا به جا کنید.</p>"
              )
              .addTo(mapRef.current)
          );

        originMarkerRef.current.on("dragend", () => {
          const lngLat = originMarkerRef.current?.getLngLat();
          if (lngLat) {
            onMarkerDragEnd("origin", lngLat.lat, lngLat.lng);
          }
        });

        // Set destination marker if there is one
        if (destination) {
          destinationMarkerRef.current = new mapboxgl.Marker({
            color: "blue",
            draggable: true,
          })
            .setLngLat([destination.lng, destination.lat])
            .addTo(mapRef.current)
            .setPopup(
              new mapboxgl.Popup()
                .setHTML(
                  "<p>برای تغییر مکان <b>مقصد</b> مارکر را جا به جا کنید.</p>"
                )
                .addTo(mapRef.current)
            );

          destinationMarkerRef.current.on("dragend", () => {
            const lngLat = destinationMarkerRef.current?.getLngLat();
            if (lngLat) {
              onMarkerDragEnd("destination", lngLat.lat, lngLat.lng);
            }
          });
        }
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    // Center the map based on the selected target
    if (mapRef.current) {
      if (searchTarget === "origin") {
        mapRef.current.flyTo({ center: [origin.lng, origin.lat], zoom: 14 });
      } else if (searchTarget === "destination" && destination) {
        mapRef.current.flyTo({
          center: [destination.lng, destination.lat],
          zoom: 14,
        });
      }
    }
  }, [searchTarget, origin, destination]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default MapComponent;
