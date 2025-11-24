import { NavLink, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/collections', label: 'Collections' }
];

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-lg font-semibold text-white">
            CM
          </span>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Collection Manager</h1>
            <p className="text-sm text-slate-500">Organisez vos collections simplement</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {isAuthenticated &&
            links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                S'inscrire
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Se déconnecter
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
