import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext.jsx';
import { loginWithGooglePopup } from '../controllers/googleLogin.js';

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.29 20.29 0 0 1 5.06-5.94M9.88 9.88A3 3 0 0 1 14.12 14.12" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getGoogleErrorMessage = (error) => {
    // Priorité : message renvoyé par l'API (ex: "Invalid Firebase project")
    const backendMessage = error?.response?.data?.detail;
    if (backendMessage) {
      return backendMessage;
    }

    // Codes Firebase côté client
    if (error?.code) {
      const messages = {
        'auth/popup-closed-by-user': 'La fenêtre Google a été fermée avant validation.',
        'auth/popup-blocked': 'Le navigateur a bloqué la fenêtre Google.',
        'auth/unauthorized-domain': "Le domaine n'est pas autorisé dans Firebase (ajoutez votre URL dans les domaines autorisés).",
        'auth/operation-not-allowed': 'Activez le provider Google dans Firebase.',
        'auth/cancelled-popup-request': 'Une connexion Google est déjà en cours, réessayez.'
      };
      return messages[error.code] ?? `Erreur Google: ${error.code}`;
    }

    // Codes Axios (ERR_BAD_REQUEST, etc.)
    if (error?.response?.status) {
      return `Erreur API (${error.response.status}) : vérifiez la configuration Firebase côté backend.`;
    }

    return 'Connexion Google impossible';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const { idToken } = await loginWithGooglePopup();
      await loginGoogle(idToken);
      const redirectTo = location.state?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('Échec de la connexion Google', error);
      toast.error(getGoogleErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-semibold text-slate-900">Connexion</h1>
      <p className="mt-2 text-sm text-slate-500">Accédez à vos collections</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Mot de passe
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 pr-12 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 mt-1 flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {submitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <div className="my-6 flex items-center gap-2">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-widest text-slate-400">ou</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="h-5 w-5" />
        {googleLoading ? 'Connexion Google...' : 'Continuer avec Google'}
      </button>
      <p className="mt-4 text-center text-sm text-slate-600">
        Pas de compte ?{' '}
        <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
