let todoObject = {
    title: 'Tasks For Today',
    text: 'create more tasks',
    deadLine: 1602280800,
    forLogger: function () {
        return this.title + ' till ' + this.deadLine
    }
};


// // Object.defineProperty(todoObject, 'forLogger', {enumerable: false});
// console.log(todoObject.forLogger()); // Tasks For Today till 1602280800
//
// console.log(todoObject); // { title: 'Tasks For Today',
//                          //   text: 'create more tasks',
//                          //   deadLine: 1602280800 }
//
// let keys = Object.keys(todoObject);
// console.log(keys); // [ 'title', 'text', 'deadLine' ]
//

// Object.defineProperties(todoObject, {
//     deadLine: {writable: false, configurable: false},
//     forLogger: {enumerable: false}
// });


const descriptorProtector = {writable: false, configurable: false};
const descriptorHider = {enumerable: false};

Object.defineProperties(todoObject, {
    title: descriptorProtector,
    text: descriptorProtector,
    deadLine: descriptorProtector,
    forLogger: descriptorHider
});


console.log(todoObject.hasOwnProperty('forLogger'));
todoObject.title = 'Task for Tomorrow';
console.log(todoObject.title); // Task for Tomorrow
let keys = Object.keys(todoObject);
console.log(keys); // [ 'title', 'text', 'deadLine' ]
console.log(todoObject); // [ 'title', 'text', 'deadLine' ]
console.log(todoObject.hasOwnProperty('forLogger'));

// let todoObjectToBeChange = todoObject;
// todoObjectToBeChange.title = 'Task for Tomorrow';
// console.log(todoObjectToBeChange.deadLine); // Tasks For Today
// // Throws error in strict mode
//
//
// todoObject = {...todoObject, title: 'Task for Tomorrow'};
// console.log(todoObject.title); // Task for Tomorrow
//

//
class MyBase {


    constructor(first, last) {
        this.first = first;
        this.last = last;
        this.fullName = first + last;

        Object.defineProperty(this.prototype, 'fullName', {writable: false, configurable: false});
    }

    getFullName() {
        return this.first + ' ' + this.last;
    }

}

//


//
class User extends MyBase {
    constructor(first, last, age) {
        super(first, last);
        this.fullName = this.first + ' ' + this.last;
        //Will throw : TypeError: Cannot assign to read only property 'fullName' of object '#<User>'
    }

    getFullName() {
        return 'ddd'
    }
}

//
//
let _T = new User('Jhon', 'Doe', 99);

console.log('descriptor', _T.getFullName());
//
//

export const permissionsMap = {
    todos: {
        create: '*',
        read: '*',
        update: '*',
        delete: '*'
    },
    stats: '*'
};

permissionsMap
