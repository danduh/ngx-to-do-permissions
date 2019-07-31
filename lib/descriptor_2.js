'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var todoObject = {
    title: 'Tasks For Today',
    text: 'create more tasks',
    deadLine: 1602280800,
    forLogger: function forLogger() {
        return this.title + ' till ' + this.deadLine;
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


var descriptorProtector = { writable: false, configurable: false };
var descriptorHider = { enumerable: false };

Object.defineProperties(todoObject, {
    title: descriptorProtector,
    text: descriptorProtector,
    deadLine: descriptorProtector,
    forLogger: descriptorHider
});

console.log(todoObject.hasOwnProperty('forLogger'));
todoObject.title = 'Task for Tomorrow';
console.log(todoObject.title); // Task for Tomorrow
var keys = Object.keys(todoObject);
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

var MyBase = function () {
    function MyBase(first, last) {
        _classCallCheck(this, MyBase);

        this.first = first;
        this.last = last;
        this.fullName = first + last;

        Object.defineProperty(this.prototype, 'fullName', { writable: false, configurable: false });
    }

    _createClass(MyBase, [{
        key: 'getFullName',
        value: function getFullName() {
            return this.first + ' ' + this.last;
        }
    }]);

    return MyBase;
}();

//


//


var User = function (_MyBase) {
    _inherits(User, _MyBase);

    function User(first, last, age) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, first, last));

        _this.fullName = _this.first + ' ' + _this.last;
        //Will throw : TypeError: Cannot assign to read only property 'fullName' of object '#<User>'
        return _this;
    }

    _createClass(User, [{
        key: 'getFullName',
        value: function getFullName() {
            return 'ddd';
        }
    }]);

    return User;
}(MyBase);

//
//


var _T = new User('Jhon', 'Doe', 99);

console.log('descriptor', _T.getFullName());
//
//