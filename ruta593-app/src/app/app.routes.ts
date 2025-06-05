import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'boletos', component: BoletosComponent },
  { path: 'perfil', component: HomeComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: '**', redirectTo: '/inicio' }
];
