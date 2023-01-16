import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TodoStatisticsComponent } from './app/todo-statistics/todo-statistics.component';
import { PermissionsGuardService } from './app/utils/permissions/permissions-guard.service';
import { TodoCompComponent } from './app/todo-comp/todo-comp.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoStoreModule } from './app/store/module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      }),
      TodoStoreModule,
      HttpClientModule,
      CommonModule,
    ),

    provideRouter(
      [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: TodoCompComponent, pathMatch: 'full'},
        {
          path: 'stat', component: TodoStatisticsComponent, canActivate: [
            PermissionsGuardService
          ],
          data: {
            permission: 'stats_read'
          },
        },
      ]),
  ]
});
