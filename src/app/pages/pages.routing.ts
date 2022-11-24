import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { FacturaComponent } from './factura/factura.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from '../guards/guard.guard';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
            { path: 'login', component: LoginComponent},   
    {
        path: '',
        component: PagesComponent,
        canActivate: [GuardGuard],
        canActivateChild: [GuardGuard],
        children: [
            { path: 'clientes', component: HomeComponent},
            { path: 'productos', component: ProductosComponent},
            { path: 'facturar', component: FacturaComponent},
            { path: 'reportes', component: ReportesComponent},
        ]
    },
    { path: '**', component: NopagefoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
