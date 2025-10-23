# Collection Manager

Application complète pour gérer vos collections (livres, films, jeux vidéo, cartes) avec une API FastAPI, une interface React moderne et un déploiement conteneurisé orchestré par Kubernetes.

## 🧱 Stack technique

- **Backend** : FastAPI (Python 3.11), SQLAlchemy ORM, Uvicorn
- **Frontend** : React 18, Vite, TailwindCSS, Axios, Recharts
- **Base de données** : PostgreSQL 15
- **Conteneurs** : Docker & Docker Compose
- **Orchestration** : Kubernetes (Kind pour environnement local)

## 📁 Structure du projet

```
collection-manager/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── config.py
│   │   ├── crud/
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models/
│   │   └── schemas/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── src/
│   ├── tailwind.config.js
│   └── vite.config.js
├── k8s/
│   ├── backend-*.yaml
│   ├── frontend-*.yaml
│   ├── namespace.yaml
│   ├── postgres-*.yaml
│   └── kind-config.yaml
├── docker-compose.yml
├── setup.sh
├── teardown.sh
└── README.md
```

## ⚙️ Prérequis

- Docker & Docker Compose
- Node.js 18+ (pour développement frontend hors conteneur)
- Python 3.11+ (si exécution backend hors conteneur)
- Kind et kubectl pour l’orchestration Kubernetes locale

## 🚀 Utilisation locale (Docker Compose)

1. Construire et lancer tous les services :
   ```bash
   docker compose up --build
   ```
2. Accéder à l’interface React : http://localhost:3002
3. API FastAPI : http://localhost:8002/docs
4. PostgreSQL : localhost:5434 (utilisateur `collection_user`, mot de passe `collection_password`)

> Les tables sont créées automatiquement et un jeu de données minimal est inséré au démarrage du backend.

Pour arrêter l’environnement :
```bash
docker compose down
```

## ☸️ Déploiement Kubernetes (Kind)

1. Lancer le script d’installation :
   ```bash
   ./setup.sh
   ```
   Le script crée un cluster Kind (`collection-cluster`), construit les images Docker locales, les charge dans le cluster et applique les manifests situés dans `k8s/`.
2. Vérifier l’état des pods :
   ```bash
   kubectl get pods -n collection-app
   ```
3. Accéder à l’interface : http://localhost:30082 (Service NodePort exposé par Nginx)
4. API interne : `http://backend.collection-app.svc.cluster.local:8002`

Nettoyer complètement l’environnement (Kubernetes & Compose) :
```bash
./teardown.sh
```

## 🔐 Variables d’environnement clés

Backend (`backend/app/config.py`) :
- `DATABASE_URL` : URL SQLAlchemy vers PostgreSQL (format `postgresql+psycopg2://user:password@host:port/db`)
- `CORS_ORIGINS` : liste séparée par des virgules des origines autorisées
- `APP_NAME` : nom de l’application (pour les métadonnées FastAPI)

Frontend (`frontend/src/services/api.js`) :
- `VITE_API_URL` : URL de l’API pour Axios (optionnelle, `/api` par défaut, proxifiée par Nginx)

Les secrets et ConfigMaps K8s fournissent des valeurs par défaut adaptées à l’environnement Kind.

## 🛣️ Endpoints principaux de l’API

| Méthode | Route                | Description                                   |
|---------|---------------------|-----------------------------------------------|
| GET     | `/api/collections`  | Lister les collections (filtre `type`, `search`)
| POST    | `/api/collections`  | Créer une collection                          |
| GET     | `/api/collections/{id}` | Détails d’une collection                   |
| PUT     | `/api/collections/{id}` | Mettre à jour une collection               |
| DELETE  | `/api/collections/{id}` | Supprimer une collection et ses items      |
| GET     | `/api/items`        | Lister les items (filtres `type`, `status`, `genre`, `search`, `collection_id`)
| POST    | `/api/items`        | Créer un item                                 |
| GET     | `/api/items/{id}`   | Détails d’un item                             |
| PUT     | `/api/items/{id}`   | Mettre à jour un item                         |
| DELETE  | `/api/items/{id}`   | Supprimer un item                             |
| GET     | `/health`           | Vérification de l’état du service             |

Toutes les routes retournent des schémas Pydantic valides et gèrent proprement les erreurs (404, 409, 400).

## 🖥️ Interface utilisateur

- **Dashboard** : statistiques globales (total items/collections, graphe par type, répartition par statut)
- **Collections** : grille responsive, création et suppression de collections
- **CollectionDetail** : liste filtrable des items, création/édition/suppression via modales
- **ItemDetail** : vue détaillée d’un item avec édition en ligne, métadonnées complètes

L’interface est responsive, affiche des états de chargement, des notifications toast (succès/erreur) et confirme chaque suppression.

## 🛠️ Commandes utiles

- Logs backend avec Docker Compose : `docker compose logs -f backend`
- Ouvrir un shell PostgreSQL : `docker compose exec postgres psql -U collection_user -d collections`
- Vérifier les services K8s : `kubectl get svc -n collection-app`
- Inspecter un pod : `kubectl logs deployment/backend -n collection-app`

## ✅ Tests rapides

- Vérification de santé API : `curl http://localhost:8002/health`
- Création d’une collection :
  ```bash
  curl -X POST http://localhost:8002/api/collections \
    -H 'Content-Type: application/json' \
    -d '{"name":"Films cultes","type":"movie"}'
  ```
- Interface frontend : créer un item et vérifier sa présence dans l’API (`GET /api/items`)

---

Bonnes explorations ! Contributions et améliorations (tests automatisés, export CSV, upload d’images, auth) peuvent être ajoutées en bonus.

---


GitHub : https://github.com/yapo-marie
