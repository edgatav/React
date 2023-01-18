import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="/inscription">
        <button>Inscription</button>
      </Link>
      <Link to="/connexion">
        <button>Connexion</button>
      </Link>
      <Link to="/home">
        <button>Accéder directement à la page d'accueil</button>
      </Link>
    </div>
  );
}

export default HomePage;