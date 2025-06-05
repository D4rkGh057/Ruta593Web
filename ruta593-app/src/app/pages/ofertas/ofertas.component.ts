import { Component } from '@angular/core';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  template: `
    <div class="container">
      <div class="empty-state">
        <div class="icon-container">
          <img src="assets/images/oferta.png" alt="No hay ofertas">
        </div>
        <h2>No hay ofertas por el momento</h2>
      </div>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
    }
    .icon-container {
      position: relative;
      margin-bottom: 1.5rem;
    }
    .icon-container img {
      width: 150px;
      height: auto;
    }
    .warning-icon {
      position: absolute;
      bottom: 0;
      right: -10px;
      font-size: 2rem;
      color: #ffd700;
      background: white;
      border-radius: 50%;
    }
    h2 {
      color: #333;
      font-size: 1.5rem;
    }
      .icon-container img {
  width: 300px;
  height: auto;
}

  `]
})
export class OfertasComponent { } 