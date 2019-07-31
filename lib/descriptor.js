'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(first, last) {
    _classCallCheck(this, Base);

    this.first = first;
    this.last = last;
  }

  _createClass(Base, [{
    key: 'getFullName',
    value: function getFullName() {
      return this.first + ' ' + this.last;
    }
  }]);

  return Base;
}();

var _T = new Base('Jhon', 'Doe');

var descriptor = Object.getOwnPropertyDescriptor(_T, 'getFullName');
console.log('descriptor', descriptor);

/**

 Simple example. of how property descriptor looks like

 **/
{
  // 'use strict'
  var _todoObject = {
    title: 'Tasks For Today',
    text: 'create more tasks',
    deadLine: 1602280800
  };

  var keys = Object.keys(_todoObject);
  console.log(keys);

  var _descriptor = Object.getOwnPropertyDescriptor(_todoObject, 'deadLine');
  console.log(_descriptor);

  /**
   Log ->
   {
  value: '1602280800',
  writable: true,
  enumerable: true,
  configurable: true
  }
    Where this can help us?
   For example we want to be sure, that 'deadline' property can't be changed
    */
}

{

  Object.defineProperty(todoObject, 'deadLine', { writable: false });
  var _descriptor2 = Object.getOwnPropertyDescriptor(todoObject, 'deadLine');
  console.log(_descriptor2);
  /**
   {
          value: 999999999,
          writable: false,
          enumerable: true,
          configurable: true
      }
   */
  todoObject.deadLine = 1999999999;
  console.log(todoObject.deadLine);

  /**
   under 'use strict' Throws error
   'Cannot assign to read only property 'deadLine' of object '#<Object>''
    without 'strict'
   will output 999999999
    Value wount be changed
     but we still can change it to writable true and change the value
   */

  Object.defineProperty(todoObject, 'deadLine', { writable: true });
  todoObject.deadLine = 7777777;
  console.log(todoObject.deadLine);
  /**
   So now we getting 7777777 in output
    To cpmplete prevent from any posible changes we need to set { writable: false, configurable: false}.
    */

  Object.defineProperty(todoObject, 'deadLine', { value: 1602280800, writable: false, configurable: false });
  todoObject.deadLine = 5555555;
  console.log(todoObject.deadLine);
  // outputs 7777777

  Object.defineProperty(todoObject, 'deadLine', { writable: true });

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