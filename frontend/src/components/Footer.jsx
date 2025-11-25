import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-500 text-sm font-semibold text-white shadow">
              CM
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">Collection Manager</p>
              <p className="text-xs text-slate-500">Organisez vos collections simplement</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">© {year} Collection Manager. Tous droits réservés.</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link to="/" className="hover:text-primary-600">
            Accueil
          </Link>
          <a href="#features" className="hover:text-primary-600">
            Fonctionnalités
          </a>
          <Link to="/login" className="hover:text-primary-600">
            Connexion
          </Link>
          <Link to="/register" className="hover:text-primary-600">
            Inscription
          </Link>
          <Link to="/dashboard" className="hover:text-primary-600">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
