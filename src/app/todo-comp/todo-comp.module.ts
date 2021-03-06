import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodofooterComponent} from '../components/todofooter/todofooter.component';
import {TodoCompComponent} from './todo-comp.component';
import {SingleTodoComponent} from '../components/single-todo/single-todo.component';
import {TodoInputComponent} from '../components/todo-input/todo-input.component';
import {TodoFilterPipe} from '../custom-pipes/filterPipe';
import {CommonModule} from '@angular/common';
import {PermissionsModule} from '../utils/permissions/permissions.module';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
    {
        path: '',
        component: TodoCompComponent
    }
];

export const appRouter: ModuleWithProviders<unknown> = RouterModule.forChild(routes);


@NgModule({
    imports: [
        CommonModule,
        appRouter,
        PermissionsModule,
        FormsModule,
    ],
    declarations: [
        TodoCompComponent,
        TodofooterComponent,
        SingleTodoComponent,
        TodoInputComponent,

        TodoFilterPipe,
    ],
    exports: [
        TodoCompComponent,
        TodofooterComponent,
        SingleTodoComponent,
        TodoInputComponent,

        TodoFilterPipe,
    ]
})
export class TodoCompModule {
    static forRoot(): ModuleWithProviders<TodoCompModule> {
        return {
            ngModule: TodoCompModule
        };
    }
}
