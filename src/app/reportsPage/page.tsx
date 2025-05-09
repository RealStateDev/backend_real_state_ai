'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import Sidebar from '@/components/ui/containers/Sidebar';
import { useUser } from '@/contexts/userContext';
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
  LegendItem,
  Chart
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const router = useRouter();
  const { user } = useUser();
  const userName = user?.nombre ?? '';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => setSidebarOpen(prev => !prev);
  const handleSidebarOptionClick = () => setSidebarOpen(false);
  const handleGoToSaved = () => { setSidebarOpen(false); router.push('/savedPage'); };
  const handleGoHome = () => { setSidebarOpen(false); router.push('/homePage'); };
  const handleHistoryChats = () => { setSidebarOpen(false); router.push('/chatHistoryPage'); };
  const handleAnalytics = () => { setSidebarOpen(false); router.push('/reportsPage'); };
  const suscriptionView = () => { setSidebarOpen(false); router.push('/suscriptionsPage'); };

  if (!userName) return null;

  // Datos de ejemplo
  const operationData = {
    labels: ['Alquiler', 'Compra'],
    datasets: [{ data: [60, 40], backgroundColor: ['#155dfc', '#2563eb'] }]
  };

  const neighborhoodData = {
    labels: ['Villa Morra', 'Ciudad Nueva', 'Recoleta', 'Asunción', 'Las Lomas'],
    datasets: [{ data: [25, 20, 15, 10, 5], backgroundColor: ['#155dfc', '#2563eb', '#1e40af', '#1d4ed8', '#2563eb'] }]
  };

  const searchCriteriaData = {
    labels: ['Casa 1 dor', 'Casa 2 dor', 'Casa 3 dor', 'Monoambiente', 'Dpto 1 dor'],
    datasets: [{ data: [10, 20, 15, 30, 25], backgroundColor: ['#155dfc', '#2563eb', '#1e40af', '#1d4ed8', '#2563eb'] }]
  };

  const ageData = {
    labels: ['<25', '25-35', '35-50', '>50'],
    datasets: [{ data: [15, 30, 20, 10], backgroundColor: ['#155dfc', '#2563eb', '#1e40af', '#1d4ed8'] }]
  };

  // Opciones Pie
  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  // Opciones Barras
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart: Chart<'bar'>) => {
            const data = chart.data;
            const raw = data.datasets[0].backgroundColor;
            const bg = Array.isArray(raw) ? raw : [raw];
            return (data.labels as string[]).map((label, i) => ({ text: label, fillStyle: bg[i], hidden: false, index: i }));
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

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-64 bg-white p-6 flex-col justify-between">
        <Sidebar
          userName={userName}
          onNewChat={handleGoToSaved}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
          handleAnalytics={handleAnalytics}
          suscriptionView={suscriptionView}
        />
      </aside>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6">
            <Sidebar
              userName={userName}
              onNewChat={handleGoToSaved}
              onSavedClick={handleGoToSaved}
              onOptionClick={handleSidebarOptionClick}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
              handleAnalytics={handleAnalytics}
              suscriptionView={suscriptionView}
            />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col relative">
        <button onClick={handleMenuToggle} className="md:hidden absolute top-4 left-4 z-50">
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        <main className="h-full bg-gray-50 font-poppins flex flex-col">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-black">Reportes de Búsqueda</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Tipo de Operación</h2>
                <div className="flex-1"><Pie data={operationData} options={pieOptions} /></div>
              </div>
              {/* Barras */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Barrios más buscados</h2>
                <div className="flex-1"><Bar data={neighborhoodData} options={barOptions} /></div>
              </div>
              {/* ¿Qué buscan? */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">¿Qué buscan para alquilar o comprar?</h2>
                <div className="flex-1"><Bar data={searchCriteriaData} options={barOptions} /></div>
              </div>
              {/* Búsquedas por edad */}
              <div className="bg-white p-6 rounded shadow h-64 flex flex-col justify-between">
                <h2 className="text-xl font-semibold">Búsquedas por edad</h2>
                <div className="flex-1"><Bar data={ageData} options={barOptions} /></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}