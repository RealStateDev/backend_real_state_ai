'use client';

import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Arreglar íconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function Mapa() {
  const searchParams = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || "-25.326859");
  const lng = parseFloat(searchParams.get('lng') || "-57.548132");

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    </MapContainer>
  );
}
