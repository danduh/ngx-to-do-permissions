/**

 Simple example. of how property descriptor looks like

 **/
// 'use strict'
let todoObject = {
    title: 'Tasks For Today',
    text: 'create more tasks',
    deadLine: 999999999
};

let descriptor = Object.getOwnPropertyDescriptor(todoObject, 'text');
console.log(descriptor);

/**
 Log ->
 {
    value: 'create more tasks',
    writable: true,
    enumerable: true,
    configurable: true
  }

 Where this can help us?
 For example we want to be sure, that 'deadline' property can't be changed

 */

{

    Object.defineProperty(todoObject, 'deadLine', {writable: false});
    let descriptor = Object.getOwnPropertyDescriptor(todoObject, 'deadLine');
    console.log(descriptor);
    /**
     {
            value: 999999999,
            writable: false,
            enumerable: true,
            configurable: true
        }
     */
    // todoObject.deadLine = 8888888;
    console.log(todoObject.deadLine);

    /**
     under 'use strict' Throws error
     'Cannot assign to read only property 'deadLine' of object '#<Object>''

     without 'strict'
     will output 999999999

     Value wount be changed


     but we still can change it to writable true and change the value
     */

    Object.defineProperty(todoObject, 'deadLine', {writable: true});
    todoObject.deadLine = 7777777;
    console.log(todoObject.deadLine);
    /**
     So now we getting 7777777 in output

     To cpmplete prevent from any posible changes we need to set { writable: false, configurable: false}.

     */

    Object.defineProperty(todoObject, 'deadLine', {writable: false, configurable: false});
    todoObject.deadLine = 5555555;
    console.log(todoObject.deadLine);
    // outputs 7777777

    Object.defineProperty(todoObject, 'deadLine', {writable: true});

    /**
     Will throws error:
     TypeError: Cannot redefine property: deadLine

     That's it, we can't change this value.

     */
}

// class BaseToDo {
//
//     constructor(title, text) {
//         this.text = text;
//         this.title = title;
//     }
//
//     getContent() {
//         return this.title + '\n' + this.text;
//     }
// }
//
// let myToDo = new BaseToDo('Today Task:', 'cook some food');
//
// console.log(myToDo.getContent());
//
// let descriptor = Object.getOwnPropertyDescriptor(myToDo, 'title');
// console.log(descriptor)
