import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Stats from '../components/Stats.jsx';
import { fetchDashboardStats } from '../services/api.js';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-800">Bienvenue !</h2>
        <p className="mt-2 text-slate-500">
          Aucune donnée disponible pour l'instant. Commencez par ajouter des collections et des articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Bienvenue sur votre tableau de bord</h1>
        <p className="mt-2 text-slate-500">
          Visualisez vos collections, leurs statuts et suivez votre progression.
        </p>
      </div>
      <Stats totals={stats.totals} byType={stats.byType} byStatus={stats.byStatus} />
    </div>
  );
}

export default HomePage;
