import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const statusColors = {
  possede: 'bg-slate-200 text-slate-700',
  en_cours: 'bg-amber-100 text-amber-700',
  termine: 'bg-emerald-100 text-emerald-700'
};

const statusLabels = {
  possede: 'Possédé',
  en_cours: 'En cours',
  termine: 'Terminé',
  owned: 'Possédé',
  in_progress: 'En cours',
  completed: 'Terminé'
};

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-slate-100 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[item.status]}`}>
            {statusLabels[item.status] ?? item.status.replace('_', ' ')}
          </span>
        </div>
        {item.genre && <p className="text-sm text-slate-600">{item.genre}</p>}
        {item.rating && (
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-sm font-bold text-amber-500">{item.rating.toFixed(1)}</p>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-slate-500">
          {item.creator && <span>{item.creator}</span>}
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
        <div className="border-t border-slate-100 my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={`/items/${item.id}`}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Voir détails
            </Link>
            {item.access_url && (
              <a
                href={item.access_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Ouvrir
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="rounded-lg p-1 text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    genre: PropTypes.string,
    rating: PropTypes.number,
    creator: PropTypes.string,
    access_url: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ItemCard;
