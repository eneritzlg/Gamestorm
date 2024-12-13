import { Routes } from '@angular/router';
import { PaginaInicioComponent} from './pagina-inicio/pagina-inicio.component';
import {PaginaFAQComponent } from './pagina-faq/pagina-faq.component';
import { PaginaCondicionesComponent} from './pagina-condiciones/pagina-condiciones.component';


// @ts-ignore
// @ts-ignore
export const routes: Routes = [
  {path: '', component: PaginaInicioComponent, PaginaFAQComponent, PaginaCondicionesComponent}
];
