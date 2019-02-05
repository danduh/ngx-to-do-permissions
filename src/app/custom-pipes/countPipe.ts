import { Todo } from '../todo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:"count"
})
export class CountPipe implements PipeTransform {
  transform(todos:Todo[], filter: string):number {
    if(todos) {
      switch(filter) {
        case "ACTIVE":
          return todos.filter(todo => todo.completed===false).length;
        case "COMPLETED":
          return todos.filter(todo => todo.completed===true).length;
        default:
        return todos.length;
      }
  }
}

}
