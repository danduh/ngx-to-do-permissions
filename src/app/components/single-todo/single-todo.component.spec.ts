import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SingleTodoComponent} from './single-todo.component';

describe('SingleTodoComponent', () => {
    let component: SingleTodoComponent;
    let fixture: ComponentFixture<SingleTodoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SingleTodoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleTodoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
