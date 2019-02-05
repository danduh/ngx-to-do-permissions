import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducers} from './index';
import {TodosEffects} from './todos/todo.effects';
import {EffectsModule} from '@ngrx/effects';
import {FilterEffects} from './filter/effect';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([TodosEffects, FilterEffects])
    ]
})
export class TodoStoreModule {
}
