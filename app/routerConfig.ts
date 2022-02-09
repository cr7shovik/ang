import { Routes } from '@angular/router';  
import { CompanyListComponent } from './company-list/company-list.component';
import { LoginComponent } from './login/login.component';
import { PerformanceComponent } from './performance/performance.component';
import { WatchListComponent } from './watch-list/watch-list.component';

export const appRoutes: Routes = [  
    { path: 'companies', component: CompanyListComponent },
    { path : 'login',component:LoginComponent},
    {path : 'watch', component : WatchListComponent},
    {path : 'performance',component:PerformanceComponent}
                            ];