import { Routes } from '@angular/router';
import { PaginaInicioComponent} from './pagina-inicio/pagina-inicio.component';
import {PaginaFAQComponent } from './pagina-faq/pagina-faq.component';
import { PaginaCondicionesComponent} from './pagina-condiciones/pagina-condiciones.component';
import { PaginaCatalogoComponent } from './pagina-catalogo/pagina-catalogo.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaRegisterComponent } from './pagina-register/pagina-register.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductosComponent } from './productos/productos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { RestablecerContrasenaComponent } from './restablecer-contrasena/restablecer-contrasena.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  {path: 'faq', component: PaginaFAQComponent},
  {path: 'condiciones', component: PaginaCondicionesComponent},
  {path: 'catalogo', component: PaginaCatalogoComponent},
  {path: 'registro', component: PaginaRegisterComponent},
  {path: 'login', component: PaginaLoginComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component: PerfilComponent},
  {path: 'verificar', component: VerificarCorreoComponent},
  {path: 'restablecer-contrasena', component: RestablecerContrasenaComponent},
  { path: '404', component: NotFoundComponent },
  {path: ':idProducto', component:ProductosComponent},
  { path: '**', redirectTo: '/404' }
];
