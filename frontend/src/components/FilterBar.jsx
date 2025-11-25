import PropTypes from 'prop-types';

const types = [
  { value: '', label: 'Tous les types' },
  { value: 'livre', label: 'Livres' },
  { value: 'film', label: 'Films' },
  { value: 'jeu', label: 'Jeux vidéo' },
  { value: 'carte', label: 'Cartes' }
];

const statuses = [
  { value: '', label: 'Tous les statuts' },
  { value: 'possede', label: 'Possédé' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' }
];

function FilterBar({ filters, onChange, showType }) {
  return (
    <div className="mb-6 rounded-xl bg-white/80 backdrop-blur-md p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Recherche
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search"
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder="Titre, mots-clés..."
            className="w-full rounded-lg border-slate-300/70 bg-slate-50/50 py-2 pl-10 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        {showType && (
          <div className="relative">
            <label htmlFor="type" className="sr-only">
              Type
            </label>
            <select
              id="type"
              value={filters.type}
              onChange={(event) => onChange({ ...filters, type: event.target.value })}
              className="w-full appearance-none rounded-lg border-slate-300/70 bg-slate-50/50 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="relative">
          <label htmlFor="status" className="sr-only">
            Statut
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(event) => onChange({ ...filters, status: event.target.value })}
            className="w-full appearance-none rounded-lg border-slate-300/70 bg-slate-50/50 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label htmlFor="genre" className="sr-only">
            Genre
          </label>
          <input
            id="genre"
            type="text"
            value={filters.genre}
            onChange={(event) => onChange({ ...filters, genre: event.target.value })}
            placeholder="Genre"
            className="w-full rounded-lg border-slate-300/70 bg-slate-50/50 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    genre: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showType: PropTypes.bool
};

FilterBar.defaultProps = {
  showType: true
};

export default FilterBar;
