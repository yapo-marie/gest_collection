import { Link } from 'react-router-dom';

function LandingPage() {
  const benefits = [
    { title: 'Tout centraliser', desc: 'Livres, films, jeux, cartes : un seul espace clair pour vos passions.', iconClass: 'fa-regular fa-folder-closed' },
    { title: 'Visualiser en un regard', desc: 'Totaux, statuts, répartition : vos chiffres se dévoilent sans effort.', iconClass: 'fa-solid fa-chart-line' },
    { title: 'Retrouver instantanément', desc: 'Filtres, tags, notes, statuts : chaque item est documenté, accessible.', iconClass: 'fa-solid fa-magnifying-glass' },
    { title: 'Interface premium', desc: 'Design lumineux, glassmorphism léger, expérience fluide et responsive.', iconClass: 'fa-regular fa-gem' }
  ];

  const features = [
    { title: 'Gestion des collections', desc: 'Créez, renommez et illustrez vos collections en quelques clics.', iconClass: 'fa-solid fa-layer-group' },
    { title: 'Gestion fine des items', desc: 'Notes, tags, statuts, prix, liens et visuels pour chaque objet.', iconClass: 'fa-solid fa-rectangle-list' },
    { title: 'Upload d’images', desc: 'Ajoutez des couvertures et photos pour enrichir vos fiches.', iconClass: 'fa-solid fa-cloud-arrow-up' },
    { title: 'Filtres & tags', desc: 'Filtrez par type, statut, genre ; classez avec des tags clairs.', iconClass: 'fa-solid fa-filter' },
    { title: 'Dashboard statistique', desc: 'Vue globale, répartition par type et statut, progression personnelle.', iconClass: 'fa-regular fa-chart-bar' },
    { title: 'Auth email & Google', desc: 'Connexion sécurisée, sessions fiables, accessible sur tous vos écrans.', iconClass: 'fa-solid fa-shield-check' }
  ];

  const personas = [
    { title: 'Lecteurs & cinéphiles', desc: 'Suivez vos séries, auteurs et réalisateurs favoris avec précision.' },
    { title: 'Gamers', desc: 'Classez vos jeux, éditions et DLC, gardez un œil sur vos envies.' },
    { title: 'Fans de cartes', desc: 'Decks, séries, raretés : tout est rangé et visuellement documenté.' },
    { title: 'Collectionneurs passionnés', desc: 'Un univers maîtrisé, des données claires, l’esprit tranquille.' }
  ];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-white/70 px-4 py-14 shadow-lg ring-1 ring-slate-100 sm:px-10">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-primary-200/60 blur-3xl" aria-hidden />
        <div className="absolute -right-20 top-10 h-52 w-52 rounded-full bg-indigo-100/60 blur-3xl" aria-hidden />
        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
              Gestion premium des collections
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Collection Manager, la sérénité pour vos passions
            </h1>
            <p className="text-lg text-slate-600">
              Un espace lumineux et précis pour organiser vos livres, films, jeux vidéo et cartes. Visualisez, filtrez,
              racontez vos collections avec une interface inspirée des meilleurs outils modernes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register" className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700">
                Commencer gratuitement
              </Link>
              <a href="#features" className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                Découvrir l’application
              </a>
            </div>
            <p className="text-xs font-semibold text-slate-500">Sans carte bancaire • Vos données restent privées • Accès sécurisé</p>
          </div>
          <div className="relative">
            <div className="absolute -left-10 -top-8 h-16 w-16 rounded-full bg-primary-200 blur-2xl sm:h-24 sm:w-24" aria-hidden />
            <div className="absolute -right-14 bottom-4 h-24 w-24 rounded-full bg-amber-100 blur-3xl sm:h-32 sm:w-32" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-primary-100">Aperçu produit</p>
                <h2 className="mt-1 text-xl font-semibold">Tableau de bord</h2>
                <p className="text-sm text-primary-100">Collections, items et statuts en un coup d’œil.</p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold text-slate-500">Total items</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">124</p>
                  <p className="mt-1 text-xs text-emerald-600">+8 cette semaine</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold text-slate-500">Collections</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
                  <p className="mt-1 text-xs text-slate-500">Livres, films, jeux, cartes...</p>
                </div>
                <div className="col-span-1 sm:col-span-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold text-slate-500">Statuts</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-700">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Terminé</span>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">En cours</span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">Possédé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-primary-50 text-primary-700">Valeur</span>
          <h2 className="text-2xl font-semibold text-slate-900">Ce qui rend Collection Manager différent</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <i className={benefit.iconClass} aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-indigo-50 text-indigo-700">Collections</span>
          <h2 className="text-2xl font-semibold text-slate-900">Pensé pour toutes vos passions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Livres', desc: 'Suivez vos romans, mangas, beaux livres et éditions spéciales.', iconClass: 'fa-solid fa-book' },
            { title: 'Films', desc: 'Steelbooks, séries, réalisateurs favoris : tout est rangé.', iconClass: 'fa-solid fa-film' },
            { title: 'Jeux vidéo', desc: 'Jeux, DLC, éditions collector, plateformes.', iconClass: 'fa-solid fa-gamepad' },
            { title: 'Cartes', desc: 'TCG, decks, séries, raretés et visuels soignés.', iconClass: 'fa-regular fa-clone' }
          ].map((tile) => (
            <div key={tile.title} className="glass-card rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <i className={tile.iconClass} aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{tile.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{tile.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-indigo-50 text-indigo-700">Fonctionnalités</span>
          <h2 className="text-2xl font-semibold text-slate-900">Pensé pour organiser et explorer</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <i className={feature.iconClass} aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-emerald-50 text-emerald-700">Simple</span>
          <h2 className="text-2xl font-semibold text-slate-900">Comment démarrer en 3 étapes</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Créez votre compte',
              desc: 'En email ou via Google, en quelques secondes.',
              number: '1'
            },
            {
              title: 'Ajoutez vos collections',
              desc: 'Livres, films, jeux, cartes avec visuels et descriptions.',
              number: '2'
            },
            {
              title: 'Suivez vos stats',
              desc: 'Totaux, statuts, répartition : votre progression au quotidien.',
              number: '3'
            }
          ].map((step) => (
            <div key={step.title} className="glass-card rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                {step.number}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="personas" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-purple-50 text-purple-700">Pour les passionnés</span>
          <h2 className="text-2xl font-semibold text-slate-900">Un espace pour raconter vos collections</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {personas.map((persona) => (
            <div key={persona.title} className="glass-card rounded-2xl p-5">
              <h3 className="text-base font-semibold text-slate-900">{persona.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{persona.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="screens" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-slate-100 text-slate-700">Aperçus</span>
          <h2 className="text-2xl font-semibold text-slate-900">L’interface, en un coup d’œil</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Dashboard', desc: 'Vue globale, stats et répartition.' },
            { title: 'Page collection', desc: 'Cartes illustrées, filtres, actions rapides.' },
            { title: 'Détail d’un item', desc: 'Infos, notes, liens, visuels, tags.' },
            { title: 'Mobile & desktop', desc: 'Navigation fluide sur tous vos écrans.' }
          ].map((shot) => (
            <div
              key={shot.title}
              className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm"
            >
              <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-slate-200/60" aria-hidden />
              <h3 className="text-base font-semibold text-slate-900">{shot.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{shot.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-slate-100 text-slate-700">Sécurité</span>
          <h2 className="text-2xl font-semibold text-slate-900">Vos données restent vos données</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Comptes isolés', desc: 'Vous seul accédez à vos collections, jamais partagées sans votre accord.' },
            { title: 'Authentification sécurisée', desc: 'Email/mot de passe ou Google, sessions protégées.' },
            { title: 'Respect de la confidentialité', desc: 'Vos données servent uniquement à votre expérience dans Collection Manager.' }
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="pill bg-slate-100 text-slate-700">FAQ</span>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fréquentes</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { q: 'Est-ce gratuit pour commencer ?', a: 'Oui, vous pouvez créer un compte et démarrer sans carte bancaire.' },
            { q: 'Puis-je gérer plusieurs types de collections ?', a: 'Oui, livres, films, jeux vidéo, cartes et plus encore.' },
            { q: 'Mes données sont-elles visibles par d’autres ?', a: 'Non, chaque compte est isolé et privé.' },
            { q: 'Accès mobile ?', a: 'Oui, l’interface est responsive et fonctionne sur mobile et tablette.' },
            { q: 'Dois-je tout saisir à la main ?', a: 'Non, vous pouvez enrichir progressivement, ajouter des images et des tags pour filtrer.' },
            { q: 'Et la sécurité ?', a: 'Connexion sécurisée (email ou Google), données utilisées uniquement pour votre expérience.' }
          ].map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-3xl px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Prêt à démarrer ?</p>
            <h3 className="text-2xl font-bold text-slate-900">Rejoignez Collection Manager en quelques secondes</h3>
            <p className="text-sm text-slate-600">Sécurité, confidentialité, simplicité. Vos données vous appartiennent.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
            >
              Créer un compte maintenant
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
