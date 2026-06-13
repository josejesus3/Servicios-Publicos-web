import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayautComponent } from './layaut/layaut.component';
import { CategoryChartComponentComponent } from './features/dashboard/components/category-chart-component/category-chart-component.component';

export const routes: Routes = [
    {path:'',component:LayautComponent,
        children:[
            { path: '', component: DashboardComponent },
            { path: 'misReportes', component: CategoryChartComponentComponent },

        ]
    },
    
    { path: 'login', component: LoginComponent }
];
