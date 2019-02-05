import {Todo} from '../todo';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {
    transform(todos: Todo[], currentFilter: string): Todo[] {
        switch (currentFilter) {
            case 'ACTIVE':
                return todos.filter(todo => todo.completed === false);
            case 'COMPLETED':
                return todos.filter(todo => todo.completed === true);
            default:
                return todos;
        }
    }

}
