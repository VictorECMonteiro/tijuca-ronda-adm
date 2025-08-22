import L from "leaflet";
import '../../styles/modals/ModalLocal.module.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

export default function LeafLetComponentMap({ setPosition }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const icon = L.icon({
    iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [38, 38],
  });

  useEffect(() => {
    if (mapRef.current) return;

    // cria o mapa
    mapRef.current = L.map("mapa").setView(
      [-4.210356570786809, -38.215798070757785],
      18
    );

    // camada de tiles
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
      {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: "jpg",
      }
    ).addTo(mapRef.current);

    // evento de click
    mapRef.current.on("click", (e) => {
      const { lat, lng } = e.latlng;

      // remove marcador antigo
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // adiciona novo marcador
      markerRef.current = L.marker([lat, lng], { icon }).addTo(mapRef.current);

      // envia coords pro pai
      setPosition({ latitude: lat, longitude: lng });
    });

    // garante que o mapa calcule o tamanho correto
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, 200);
  }, [setPosition]);

  return <div id="mapa" style={{ height: "100%", width: "100%" }}></div>;
}
