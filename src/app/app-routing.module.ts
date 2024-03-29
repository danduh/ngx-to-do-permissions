import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoStatisticsComponent} from './todo-statistics/todo-statistics.component';
import {PermissionsGuardService} from './utils/permissions/permissions-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'stat',
        component: TodoStatisticsComponent,
        canActivate: [
            PermissionsGuardService
        ],
        data: {
            permission: 'stats'
        },
    }
];
