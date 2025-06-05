import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="social-links">
            <a href="https://instagram.com" target="_blank" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" class="social-link">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
          <div class="footer-section">
            <p>© 2025 Todos los derechos reservados</p>
          </div>
          <div class="mountain-decoration"></div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #28405A;
      padding: 0.5remrem 0;
      position: relative;
      overflow: hidden;
      margin-top: auto;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      gap: 0.5rem;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-section p {
      margin: 0;
      font-size: 0.8rem;
      color: #ffffff;
      opacity: 0.8;
    }

    .social-links {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .social-link {
      color: #ffffff;
      font-size: 1.5rem;
      transition: opacity 0.3s ease;
      opacity: 0.8;
      
      &:hover {
        opacity: 1;
        color: #ffffff;
        text-decoration: none;
      }
    }

    .mountain-decoration {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 20px;
      background-size: cover;
      background-position: bottom;
      background-repeat: no-repeat;
      opacity: 0.1;
    }

    @media (max-width: 768px) {
      .footer-content {
        gap: 0.75rem;
      }

      .social-links {
        gap: 2rem;
      }
    }
  `]
})
export class FooterComponent {} 