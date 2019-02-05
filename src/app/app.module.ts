import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { FormsModule } from '@angular/forms';
import { TodofooterComponent } from './components/todofooter/todofooter.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoStatisticsComponent } from './todo-statistics/todo-statistics.component';
import { TodoFilterPipe } from './custom-pipes/filterPipe';
import { CountPipe } from './custom-pipes/countPipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TodoStoreModule } from './store/module';
import { PermissionsModule } from './utils/permissions/permissions.module';
import { select, Store } from '@ngrx/store';
import { GetUsersAuthAction } from './store/auth/auth.actions';
import { userPermissionsState } from './store';

export function getDelay(store: Store<any>) {
    console.log('getDelay');
    return () => {
        return new Promise((resolve) => {
            store.dispatch(new GetUsersAuthAction());
            store
                .pipe(
                    select(userPermissionsState),
                )
                .subscribe((bata) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);

                }, (resp) => {
                    console.error('logged in user', resp);
                    // resolve(true);
                });
        });
    };
}


@NgModule({
    declarations: [
        AppComponent,
        CountPipe,
        TodoStatisticsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        TodoStoreModule,
        PermissionsModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    exports:[
        TodoStatisticsComponent,
        PermissionsModule,
        FormsModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        console.log('AppModule');
    }
}
