import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1>Viaja con seguridad y comodidad</h1>
            <p class="lead">Encuentra los mejores boletos para tu próximo viaje</p>
            <div class="search-box">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="¿A dónde quieres ir?">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search"></i> Buscar
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <img src="assets/images/bus-illustration.svg" alt="Bus illustration" class="hero-image">
          </div>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card">
              <i class="fas fa-ticket-alt feature-icon"></i>
              <h3>Boletos Seguros</h3>
              <p>Garantizamos la seguridad de tu compra con confirmación inmediata.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <i class="fas fa-bus feature-icon"></i>
              <h3>Múltiples Rutas</h3>
              <p>Encuentra la mejor ruta para tu destino con nuestras diferentes opciones.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <i class="fas fa-clock feature-icon"></i>
              <h3>24/7 Disponible</h3>
              <p>Compra tus boletos en cualquier momento, estamos siempre disponibles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%);
      padding: 4rem 0;
      margin-bottom: 3rem;
      position: relative;
      overflow: hidden;
    }

    .hero-section::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #28405A 0%, #90CAF9 100%);
    }

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #28405A;
      margin-bottom: 1rem;
    }

    .lead {
      font-size: 1.25rem;
      color: #28405A;
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .search-box {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-control {
      border: 1px solid #ddd;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      &:focus {
        box-shadow: none;
        border-color: #28405A;
      }
    }

    .btn-primary {
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      background-color:rgb(121, 121, 188);
      border-color: #28405A;
      &:hover {
        background-color: darken(#28405A, 10%);
        border-color: darken(#28405A, 10%);
      }
    }

    .hero-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      transform: scale(1.1);
    }

    .features-section {
      padding: 3rem 0;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: center;
      height: 100%;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .feature-icon {
      font-size: 2.5rem;
      color: #28405A;
      margin-bottom: 1rem;
    }

    h3 {
      color: #28405A;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 0;
        text-align: center;
      }

      h1 {
        font-size: 2rem;
      }

      .search-box {
        padding: 1rem;
      }

      .features-section {
        padding: 2rem 0;
      }
    }
  `]
})
export class HomeComponent {}
