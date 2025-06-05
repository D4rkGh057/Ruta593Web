import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  template: `
    <section class="container ayuda-container">
      <article class="empty-state">
        <div class="icon-container" aria-label="Soporte disponible">
          <img src="assets/images/soporte.webp" alt="Imagen de soporte técnico">
          <span class="online-dot" title="Soporte disponible"></span>
        </div>

        <h2>Soporte 24/7 para ti</h2>
        <p>
          ¿Tienes dudas, problemas con tu compra o necesitas asistencia técnica?
          Nuestro equipo está disponible <strong>las 24 horas</strong> para ayudarte en lo que necesites.
        </p>

        <div class="ayuda-contactos">
          <a class="contact-button whatsapp" href="https://wa.me/593992990885" target="_blank" aria-label="Contactar por WhatsApp">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>

        <div class="ayuda-extra">
          <i class="fas fa-info-circle"></i>
          También puedes consultar nuestra <a href="#">sección de preguntas frecuentes</a>.
        </div>
      </article>
    </section>
  `,
  styles: [`
    :host {
      --color-primary: #2E77AE;
      --color-whatsapp: #25D366;
      --color-success: #198754;
      --radius: 18px;
    }

    .ayuda-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #f9f9f9;
      border-radius: var(--radius);
      box-shadow: 0 4px 16px rgba(46,119,174,0.08);
      padding: 2.5rem 2rem;
      max-width: 500px;
      margin: 2rem auto;
      position: relative;
    }

    .icon-container {
      position: relative;
      margin-bottom: 1.2rem;
    }

    .icon-container img {
      width: 170px;
      border-radius: 14px;
      box-shadow: 0 4px 12px rgba(46,119,174,0.13);
    }

    .online-dot {
      position: absolute;
      bottom: 12px;
      right: 18px;
      width: 18px;
      height: 18px;
      background: var(--color-whatsapp);
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 8px #25D36655;
    }

    h2 {
      color: var(--color-primary);
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    p {
      color: #444;
      font-size: 1.1rem;
      max-width: 420px;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .ayuda-contactos {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 1.2rem;
    }

    .contact-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      padding: 0.65rem 1.2rem;
      border-radius: 30px;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: background 0.2s, box-shadow 0.2s;
    }

    .contact-button i {
      font-size: 1.2rem;
    }

    .whatsapp {
      background-color: var(--color-whatsapp);
      box-shadow: 0 2px 8px #25d36622;
    }

    .email {
      background-color: var(--color-primary);
    }

    .phone {
      background-color: var(--color-success);
    }

    .contact-button:hover {
      filter: brightness(0.95);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      text-decoration: none;
    }

    .email:hover {
      background-color: #225c85;
    }

    .phone:hover {
      background-color: #146c43;
    }

    .ayuda-extra {
      font-size: 0.95rem;
      color: var(--color-primary);
      opacity: 0.9;
    }

    .ayuda-extra a {
      color: var(--color-primary);
      text-decoration: underline;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .empty-state {
        padding: 1.2rem 0.5rem;
        max-width: 98vw;
      }

      .icon-container img {
        width: 110px;
      }

      .ayuda-contactos {
        gap: 0.5rem;
      }
    }
  `]
})
export class AyudaComponent {}
