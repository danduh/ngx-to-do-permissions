import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoStatisticsComponent} from './todo-statistics/todo-statistics.component';
import {PermissionsGuardService} from './utils/permissions/permissions-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        loadChildren: () => import('./todo-comp/todo-comp.module').then(m => m.TodoCompModule)
    },
    {
        path: 'stat',
        component: TodoStatisticsComponent,
        canActivate: [
            PermissionsGuardService
        ],
        data: {
            permission: 'stats_read'
        },
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
