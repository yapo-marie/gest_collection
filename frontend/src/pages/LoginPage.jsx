import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext.jsx';
import { loginWithGooglePopup } from '../controllers/googleLogin.js';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname ?? '/';
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
      const redirectTo = location.state?.from?.pathname ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error("Connexion Google impossible");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
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
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
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
