import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

const appLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/collections', label: 'Collections' }
];

const landingLinks = [
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#personas', label: 'Pour qui ?' },
  { href: '#screens', label: 'Aperçu' },
  { href: '#faq', label: 'FAQ' }
];

function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md shadow-md ring-1 ring-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-lg font-semibold text-white shadow">
            CM
          </span>
          <div className="leading-tight">
            <h1 className="text-lg font-semibold text-slate-900">Collection Manager</h1>
            <p className="text-xs text-slate-500">Organisez vos collections simplement</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Ouvrir le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="hidden items-center gap-3 md:flex">
          {isAuthenticated
            ? appLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))
            : landingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  {link.label}
                </a>
              ))}

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-rose-500 bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-600 hover:border-rose-600"
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Connexion
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
              >
                Créer un compte
              </Link>
            </>
          )}
        </nav>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6">
            {isAuthenticated
              ? appLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-sm font-semibold ${
                        isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))
              : landingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </a>
                ))}

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="rounded-lg border border-rose-500 bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-rose-600 hover:border-rose-600"
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
