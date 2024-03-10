import { useState, useEffect } from "react";
import loader from "../utils/googleMapsLoader";

interface Props {
  address: string;
}

const Map = ({ address }: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results !== null) {
          const mapOptions = {
            center: results[0].geometry.location,
            zoom: 16,
          };
          const newMap = new window.google.maps.Map(
            document.getElementById("map") as HTMLElement,
            mapOptions
          );
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: newMap,
          });
          setMap(newMap);
        }
      });
    });
  }, [address]);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default Map;
