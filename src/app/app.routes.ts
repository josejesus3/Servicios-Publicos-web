import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayautComponent } from './layaut/layaut.component';
import { CategoryChartComponentComponent } from './features/dashboard/components/category-chart-component/category-chart-component.component';
import { ContactComponent } from './features/contact/contact.component';
import { AyudaComponent } from './features/ayuda/ayuda.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IncidentsComponent } from './features/incidents/incidents.component';
import { IncidentCreateComponent } from './features/incidents/pages/incident-create/incident-create.component';
import { AdministradorComponent } from './shared/components/administrador/administrador.component';

export const routes: Routes = [
    {
        path: '', component: LayautComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'inicio', component: DashboardComponent },
            { path: 'contactos', component: ContactComponent },
            { path: 'ayuda', component: AyudaComponent },
            {path:'administrador',component:AdministradorComponent},
            { path: 'misReportes', component: IncidentsComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'reportes', component: IncidentCreateComponent },
    
    
    { path: 'login', component: LoginComponent }
];
