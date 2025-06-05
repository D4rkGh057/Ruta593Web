import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">    <!-- Sección visual decorativa al final -->
    <div class="boletos-footer-visual mt-5">
      <div class="bus-illustration">
        <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
          <rect x="10" y="20" width="140" height="25" rx="8" fill="#28405A"/>
          <rect x="20" y="28" width="30" height="12" rx="2" fill="#fff"/>
          <rect x="55" y="28" width="30" height="12" rx="2" fill="#fff"/>
          <rect x="90" y="28" width="30" height="12" rx="2" fill="#fff"/>
          <circle cx="30" cy="50" r="7" fill="#222"/>
          <circle cx="130" cy="50" r="7" fill="#222"/>
          <circle cx="30" cy="50" r="3" fill="#eee"/>
          <circle cx="130" cy="50" r="3" fill="#eee"/>
          <rect x="135" y="35" width="10" height="8" rx="2" fill="#198754"/>
          <rect x="10" y="35" width="10" height="8" rx="2" fill="#198754"/>
        </svg>
      </div>
      <div class="boletos-footer-msg">
        <span>¡Viaja seguro, cómodo y rápido con <b>Ruta593</b>!</span>
      </div>
    </div>
      <div class="search-section">
        <h2>Buscar Boletos</h2>
        <form (ngSubmit)="buscarBoletos()" #form="ngForm" class="search-form">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="form-group">
                <label>Origen</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-map-marker-alt"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Ciudad de origen" [(ngModel)]="origen" name="origen" required>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label>Destino</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-map-marker"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Ciudad de destino" [(ngModel)]="destino" name="destino" required>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label>Fecha</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-calendar"></i>
                  </span>
                  <input type="date" class="form-control" [(ngModel)]="fecha" name="fecha" required>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label>Pasajeros</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-user-friends"></i>
                  </span>
                  <input type="number" class="form-control" min="1" max="10" [(ngModel)]="pasajeros" name="pasajeros" required>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-3 d-flex justify-content-end">
              <button class="btn btn-primary" [disabled]="form.invalid || cargando">
                <span *ngIf="!cargando"><i class="fas fa-search"></i> Buscar</span>
                <span *ngIf="cargando" class="spinner-border spinner-border-sm"></span>
              </button>
            </div>
          </div>
        </form>
        <div *ngIf="mensaje" class="alert mt-3" [ngClass]="mensajeTipo">{{ mensaje }}</div>
      </div>

      <div class="results-section mt-4" *ngIf="resultados.length > 0">
        <div class="results-header d-flex justify-content-between align-items-center">
          <h3>Rutas Disponibles</h3>
          <div class="filters">
            <button class="btn btn-outline-primary btn-sm me-2" (click)="ordenarPor('precio')">
              <i class="fas fa-sort-amount-down"></i> Precio
            </button>
            <button class="btn btn-outline-primary btn-sm" (click)="ordenarPor('duracion')">
              <i class="fas fa-clock"></i> Duración
            </button>
          </div>
        </div>

        <div class="route-cards mt-3">
          <div class="route-card" *ngFor="let ruta of resultados">
            <div class="route-info">
              <div class="time-info">
                <div class="departure">
                  <h4>{{ ruta.horaSalida }}</h4>
                  <p>{{ ruta.origen }}</p>
                </div>
                <div class="duration">
                  <i class="fas fa-arrow-right"></i>
                  <span>{{ ruta.duracion }}</span>
                </div>
                <div class="arrival">
                  <h4>{{ ruta.horaLlegada }}</h4>
                  <p>{{ ruta.destino }}</p>
                </div>
              </div>
              <div class="bus-info">
                <p><i class="fas fa-bus"></i> {{ ruta.cooperativa }}</p>
                <p>
                  <i class="fas fa-couch" title="Asientos disponibles"></i>
                  <span [ngClass]="{'text-danger': ruta.asientos < pasajeros, 'text-success': ruta.asientos >= pasajeros}">
                    {{ ruta.asientos }} asientos disponibles
                  </span>
                </p>
              </div>
            </div>
            <div class="price-section">
              <div class="price">
                <span class="amount">$ {{ ruta.precio }}</span>
                <span class="label">por persona</span>
              </div>
              <button class="btn btn-success" [disabled]="ruta.asientos < pasajeros" (click)="seleccionarRuta(ruta)">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="resultados.length === 0 && busquedaRealizada && !cargando" class="alert alert-warning mt-4">
        No se encontraron rutas para tu búsqueda.
      </div>

      <!-- Modal de confirmación -->
      <div class="modal-backdrop" *ngIf="mostrarModal"></div>
      <div class="modal fade show d-block" tabindex="-1" *ngIf="mostrarModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmar compra</h5>
              <button type="button" class="btn-close" (click)="cerrarModal()"></button>
            </div>
            <div class="modal-body">
              <p>¿Deseas comprar <b>{{ pasajeros }}</b> boleto(s) para la ruta de <b>{{ rutaSeleccionada?.origen }}</b> a <b>{{ rutaSeleccionada?.destino }}</b>?</p>
              <p>Total a pagar: <b>$ {{ rutaSeleccionada?.precio * pasajeros }}</b></p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="cerrarModal()">Cancelar</button>
              <button class="btn btn-success" (click)="confirmarCompra()">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-section {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      color: #28405A;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 0;
    }

    label {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .input-group-text {
      background-color: #f8f9fa;
      color: #28405A;
    }

    .route-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.2s ease;
      border-left: 5px solid #0d6efd;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
      }
    }

    .route-info {
      flex: 1;
    }

    .time-info {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1rem;
    }

    .departure, .arrival {
      h4 {
        color: #28405A;
        margin: 0;
        font-size: 1.25rem;
      }
      p {
        color: #666;
        margin: 0;
        font-size: 0.9rem;
      }
    }

    .duration {
      color: #666;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      i {
        color: #28405A;
      }
    }

    .bus-info {
      display: flex;
      gap: 2rem;
      color: #666;
      font-size: 0.9rem;

      i {
        color: #28405A;
        margin-right: 0.5rem;
      }
    }

    .price-section {
      text-align: right;
      min-width: 150px;
    }

    .price {
      margin-bottom: 1rem;
      
      .amount {
        color: #198754;
        font-size: 1.5rem;
        font-weight: bold;
        display: block;
      }
      
      .label {
        color: #666;
        font-size: 0.8rem;
      }
    }

    .results-header {
      margin-bottom: 1rem;
      
      h3 {
        color: #28405A;
        margin: 0;
      }
    }


    .text-danger {
      color: #dc3545 !important;
    }

    .text-success {
      color: #198754 !important;
    }

    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 1040;
    }

    .modal {
      z-index: 1050;
    }

    .spinner-border {
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
    }

    .alert-success {
      background: #e6f9ed;
      color: #198754;
      border: 1px solid #b6f2d6;
    }

    .alert-danger {
      background: #fbeaea;
      color: #dc3545;
      border: 1px solid #f5c2c7;
    }

    @media (max-width: 768px) {
      .route-card {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .time-info {
        justify-content: center;
      }

      .bus-info {
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
      }

      .price-section {
        width: 100%;
        text-align: center;
      }
    }
        // ...existing code...
    .boletos-footer-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
      margin-top: 3rem;
      opacity: 0.95;
    }
    
    .bus-illustration {
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 2px 8px rgba(40,64,90,0.15));
    }
    
    .boletos-footer-msg {
      font-size: 1.1rem;
      color: #28405A;
      background: #e6f9ed;
      border-radius: 8px;
      padding: 0.5rem 1.5rem;
      box-shadow: 0 1px 4px rgba(40,64,90,0.07);
      margin-top: 0.2rem;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .boletos-footer-visual {
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      .boletos-footer-msg {
        font-size: 1rem;
        padding: 0.5rem 0.7rem;
      }
      .bus-illustration svg {
        width: 120px;
        height: 45px;
      }
    }
    // ...existing code...
  `]
})
export class BoletosComponent {
  origen = '';
  destino = '';
  fecha = '';
  pasajeros = 1;
  resultados: any[] = [];
  busquedaRealizada = false;
  cargando = false;
  mensaje = '';
  mensajeTipo = '';
  mostrarModal = false;
  rutaSeleccionada: any = null;

  buscarBoletos() {
    this.busquedaRealizada = false;
    this.resultados = [];
    this.mensaje = '';
    this.cargando = true;
    setTimeout(() => {
      this.busquedaRealizada = true;
      this.cargando = false;
      if (this.origen && this.destino && this.fecha && this.pasajeros > 0) {
        this.resultados = [
          {
            origen: this.origen,
            destino: this.destino,
            horaSalida: '08:00',
            horaLlegada: '12:00',
            duracion: '4h',
            cooperativa: 'Cooperativa ABC',
            asientos: 32,
            precio: 25
          },
          {
            origen: this.origen,
            destino: this.destino,
            horaSalida: '10:00',
            horaLlegada: '14:30',
            duracion: '4h 30m',
            cooperativa: 'Cooperativa XYZ',
            asientos: 2,
            precio: 28
          }
        ];
        this.mensaje = '';
      } else {
        this.resultados = [];
        this.mensaje = 'Por favor completa todos los campos.';
        this.mensajeTipo = 'alert-danger';
      }
    }, 1200);
  }

  ordenarPor(criterio: string) {
    if (criterio === 'precio') {
      this.resultados.sort((a, b) => a.precio - b.precio);
    } else if (criterio === 'duracion') {
      this.resultados.sort((a, b) => {
        const getMin = (d: string) => {
          const [h, m] = d.split('h');
          return parseInt(h) * 60 + (m ? parseInt(m) : 0);
        };
        return getMin(a.duracion) - getMin(b.duracion);
      });
    }
  }

  seleccionarRuta(ruta: any) {
    this.rutaSeleccionada = ruta;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.rutaSeleccionada = null;
  }

  confirmarCompra() {
    this.mostrarModal = false;
    this.mensaje = '¡Compra realizada con éxito!';
    this.mensajeTipo = 'alert-success';
    // Aquí podrías limpiar resultados o actualizar asientos
  }
}