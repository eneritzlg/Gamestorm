import { Routes } from '@angular/router';
import { PaginaInicioComponent} from './pagina-inicio/pagina-inicio.component';
import {PaginaFAQComponent } from './pagina-faq/pagina-faq.component';
import { PaginaCondicionesComponent} from './pagina-condiciones/pagina-condiciones.component';
import { PaginaCatalogoComponent } from './pagina-catalogo/pagina-catalogo.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaRegisterComponent } from './pagina-register/pagina-register.component';



export const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  {path: 'faq', component: PaginaFAQComponent},
  {path: 'condiciones', component: PaginaCondicionesComponent},
  {path: 'catalogo', component: PaginaCatalogoComponent},
  {path: 'registro', component: PaginaRegisterComponent},
  {path: 'login', component: PaginaLoginComponent},
];
