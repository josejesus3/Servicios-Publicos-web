import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayautComponent } from './layaut/layaut.component';
import { CategoryChartComponentComponent } from './features/dashboard/components/category-chart-component/category-chart-component.component';
import { ContactComponent } from './features/contact/contact.component';
import { AyudaComponent } from './features/ayuda/ayuda.component';
import { AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'',component:LayautComponent,
        children:[
            {path:'',component:DashboardComponent},
            { path: 'inicio', component: DashboardComponent },
            { path: 'contactos', component: ContactComponent },
            {path:'ayuda',component:AyudaComponent}

        ]
    },
    
    { path: 'login', component: LoginComponent}
];
