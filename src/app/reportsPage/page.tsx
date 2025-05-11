'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import Sidebar from '@/components/ui/containers/Sidebar';
import { useUser } from '@/contexts/userContext';
import getAllFavorites from '@/services/getAllFavorites';
import calculateAge from '@/utils/calculateAge';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  LegendItem,
  Chart
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const router = useRouter();
  const { user } = useUser();
  const userName = user?.nombre ?? '';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pie fijo (Alquiler vs Compra)
  const operationData: ChartData<'pie', number[], string> = {
    labels: ['Alquiler', 'Compra'],
    datasets: [{ data: [60, 40], backgroundColor: ['#155dfc', '#2563eb'] }]
  };

  // Estados para datos dinámicos
  const [zoneData, setZoneData] = useState<ChartData<'bar', number[], string>>({
    labels: [],
    datasets: [{ label: 'Zonas', data: [], backgroundColor: [] }]
  });
  const [criteriaData, setCriteriaData] = useState<ChartData<'bar', number[], string>>({
    labels: [],
    datasets: [{ label: 'Tipos', data: [], backgroundColor: [] }]
  });
  const [ageData, setAgeData] = useState<ChartData<'bar', number[], string>>({
    labels: [],
    datasets: [{ label: 'Edad', data: [], backgroundColor: [] }]
  });

  const baseColors = ['#155dfc', '#2563eb', '#1e40af', '#1d4ed8', '#93c5fd'];

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart: Chart<'bar'>) => {
            const data = chart.data;
            const bg = data.datasets[0].backgroundColor as string[];
            return (data.labels as string[]).map((label, i) =>
              ({ text: label, fillStyle: bg[i], hidden: false, index: i } as LegendItem)
            );
          }
        },
        onClick: (e: any, legendItem: LegendItem, legend: any) => {
          const idx = legendItem.index!;
          const ch = legend.chart as any;
          const meta = ch.getDatasetMeta(0);
          meta.data[idx].hidden = !meta.data[idx].hidden;
          ch.update();
        }
      }
    },
    scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
  };

  useEffect(() => {
    // Cargamos TODOS los favoritos
    (async () => {
      try {
        const resp = await getAllFavorites();
        const favs = resp?.favoritosList ?? [];

        // Acumuladores
        const zoneCounts: Record<string, number> = {};
        const critCounts: Record<string, number> = {};
        const ageList: number[] = [];

        favs.forEach((f: any) => {
          const zona = f.propiedades.zona;
          zoneCounts[zona] = (zoneCounts[zona] || 0) + 1;

          const tipo = f.propiedades.tipo_propiedad;
          critCounts[tipo] = (critCounts[tipo] || 0) + 1;

          ageList.push(calculateAge(f.usuarios.fecha_nacimiento));
        });

        // Zonas
        const zoneLabels = Object.keys(zoneCounts);
        const zoneValues = zoneLabels.map(z => zoneCounts[z]);
        const zoneColors = zoneLabels.map((_, i) => baseColors[i % baseColors.length]);

        // Tipos
        const critLabels = Object.keys(critCounts);
        const critValues = critLabels.map(c => critCounts[c]);
        const critColors = critLabels.map((_, i) => baseColors[i % baseColors.length]);

        // Edades (simple histograma por edad exacta; si quieres rangos, agrúpalas aquí)
        const ageLabels = ageList.map(a => `${a} años`);
        const ageColors = ageList.map((_, i) => baseColors[i % baseColors.length]);

        setZoneData({ labels: zoneLabels, datasets: [{ label: 'Zonas', data: zoneValues, backgroundColor: zoneColors }] });
        setCriteriaData({ labels: critLabels, datasets: [{ label: 'Tipos', data: critValues, backgroundColor: critColors }] });
        setAgeData({ labels: ageLabels, datasets: [{ label: 'Edad', data: ageList, backgroundColor: ageColors }] });
      } catch (e) {
        console.error('Error cargando datos dinámicos:', e);
      }
    })();
  }, []);

  if (!userName) return null;

  const toggleSidebar = () => setSidebarOpen(o => !o);
  const closeSidebar = () => setSidebarOpen(false);
  const nav = (path: string) => { closeSidebar(); router.push(path); };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          userName={userName}
          onNewChat={() => nav('/homePage')}
          onSavedClick={() => nav('/savedPage')}
          onOptionClick={closeSidebar}
          onHomeClick={() => nav('/homePage')}
          handleHistoryChats={() => nav('/chatHistoryPage')}
          handleAnalytics={() => nav('/reportsPage')}
          suscriptionView={() => nav('/suscriptionsPage')}
        />
      </aside>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
          <Sidebar
              userName={userName}
              onNewChat={() => nav('/homePage')}
              onSavedClick={() => nav('/savedPage')}
              onOptionClick={closeSidebar}
              onHomeClick={() => nav('/homePage')}
              handleHistoryChats={() => nav('/chatHistoryPage')}
              handleAnalytics={() => nav('/reportsPage')}
              suscriptionView={() => nav('/suscriptionsPage')}
            />
          </div>
          <div className="flex-1 bg-white/25 bg-opacity-25" onClick={closeSidebar} />
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col relative">
        <button onClick={toggleSidebar} className="md:hidden absolute top-4 left-4 z-50">
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>
        <main className="h-full bg-gray-50 font-poppins flex flex-col">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-black">Reportes de Búsqueda</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie fijo */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Tipo de Operación</h2>
                <div className="flex-1">
                  <Pie data={operationData} options={pieOptions} />
                </div>
              </div>

              {/* Zonas más buscadas */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Zonas más buscadas</h2>
                <div className="flex-1">
                  <Bar data={zoneData} options={barOptions} />
                </div>
              </div>

              {/* ¿Qué buscan para alquilar o comprar? */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">¿Qué buscan para alquilar o comprar?</h2>
                <div className="flex-1">
                  <Bar data={criteriaData} options={barOptions} />
                </div>
              </div>

              {/* Búsquedas por edad */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Búsquedas por edad</h2>
                <div className="flex-1">
                  <Bar data={ageData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
