/**
 * Created by AYUSH on 1/6/2017.
 */
var Person = {
    firstName: 'Default',
    lastName: 'Default',
    greet: function () {
        return this.firstName + ' ' + this.lastName
    }
};

var harry = Object.create(Person);
harry.firstName = 'Harry';
harry.lastName = 'Potter';
console.log(harry.greet());

var gogo = function (cat, dog) {
    return function () {
        return cat + ' yo ' + dog;
    }
};

var func = function () {
    var arr = [];

    for (var i=0; i<3; i++) {
        arr.push(function () {
            console.log(i);
        })
    }

    return arr;
};

var arr2 = func();

console.log(arr2[0]());
console.log(arr2[1]());
console.log(arr2[2]());

var qw = function () {
    console.log('yoohoohoo');
};