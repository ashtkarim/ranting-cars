import React from 'react';


function App() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">SaaS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Tarifs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          <li className="nav-item">
            <button className="nav-link">Se connecter</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">S'inscrire</button>
          </li>
          </ul>
      </nav>
      <header className="bg-primary text-white text-center py-5" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1 className="display-4">Bienvenue sur SaaS</h1>
        <p className="lead">Découvrez notre application de location de voitures</p>
      </header>
      <main className="py-5">
        <section className="text-center">
          <h2 className="mb-4">Nos services</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Large sélection</h5>
                  <p className="card-text">Choisissez parmi une variété de logiciels pour tous les besoins</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Prix compétitifs</h5>
                  <p className="card-text">Profitez de nos tarifs avantageux pour votre utilisation</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service client 24/7</h5>
                  <p className="card-text">Notre équipe est à votre disposition à tout moment</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="text-center mt-5">
          <button className="btn btn-primary btn-lg">Réserver maintenant</button>
        </section>
      </main>
      
      <footer className="bg-light text-center py-3 mt-5">
        <p>&copy; 2023 SaaS. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
