'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['Sziasztok, sz\xE9p napunk van. Ma ', ' van.'], ['Sziasztok, sz\xE9p napunk van. Ma ', ' van.']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Osztály alapjául szolgáló függvény létrehozása, es2015 féle
var dateClass = function () {
    function dateClass(defaultDate) {
        _classCallCheck(this, dateClass);

        this.cDate = defaultDate ? defaultDate : new Date();
    }

    _createClass(dateClass, [{
        key: 'goodMorning',
        value: function goodMorning() {
            var d = this.toMysql();
            // Új behelyettesítéses
            // var template = `Sziasztok, szép napunk van. Ma ${d} van.`;

            // Új String.raw
            var template = String.raw(_templateObject, d);

            // Régi
            // var template = 'Sziasztok, szép napunk van. Ma '+d+' van.';
            console.log(template);
        }
    }, {
        key: 'toMysql',
        value: function toMysql() {
            var parts = [];
            parts.push(this.cDate.getFullYear());
            // statikus osztály hivatkozás
            parts.push(dateClass.toDoubleChars(this.cDate.getMonth() + 1));
            parts.push(dateClass.toDoubleChars(this.cDate.getDate()));
            return parts.join('-');
        }
    }], [{
        key: 'toDoubleChars',
        value: function toDoubleChars(num) {
            if (num < 10 && num > -10) {
                return '0' + num;
            }
            return '' + num;
        }
    }]);

    return dateClass;
}();

;

// Számok két karakteressé alakítása (összes számnak lesz egy ilyen funckiója)
/* Number.prototype.toDoubleChar = function () {
    if (this < 10 && this > -10) {
        return '0'+this;
    }
    return ''+this;
}; */

// MySql szabvány szerinti dátum készítése (összes dátumnak lesz egy ilyen funckiója)
/* Date.prototype.toMysql = function () {
    var parts = [];
    parts.push(this.getFullYear());
    parts.push( (this.getMonth()+1).toDoubleChar() );
    parts.push( this.getDate().toDoubleChar() );
    return parts.join('-');
}; */; /* window.addEventListener('resize', function ( ev ) {
       console.debug('width', ev.target.innerWidth);
       });
       window.addEventListener('resize', function ( ev ) {
       console.debug('height', ev.target.innerHeight);
       }); */

/* var inputList = document.querySelectorAll('input[type=file]');

console.log(inputList);

for (let i = 0; i < inputList.length; i++) {
    console.log(inputList[i]);
    inputList[i].addEventListener('change', function(ev) {
        console.log(ev.target.value);
    });
} */; // HTML5 szelektorok

// Egy elem kiválasztása
document.querySelector('form');

document.querySelector('input[type=date]');

// Gyorsabb megoldás
var regFrom = document.querySelector('#testform');
var dateInput = regFrom.querySelector('input[type=date]');
dateInput.value = '1988-10-22';

// Elemek csoportjának kiválasztása
var inputs = regFrom.querySelectorAll('input');
// console.log('inputs', inputs);

// Egyedi fájl input létrehozása
var fileInputs = document.querySelectorAll('.file-input-group');
for (var i = 0; i < fileInputs.length; i++) {
    // Beolvasás
    var name = fileInputs[i].getAttribute('data-name');

    // Létrehozás
    var label = document.createElement('label');
    label.setAttribute('for', name);
    label.className = 'col-xs-6 col-xs-offset-2 control-label btn btn-primary file-input-label';
    label.innerHTML = name;

    var input = document.createElement('input');
    input.setAttribute('id', name);
    input.type = 'file';
    input.className = 'hidden-file-input';

    input.addEventListener('change', function (ev) {
        console.log(ev.target.value);
        var currentLabel = document.querySelector('label[for=' + ev.target.id + ']');
        var name = ev.target.value;
        name = name.replace(/\\/g, '/').split('/').pop(); // pop = utolsó elemet adja vissza
        currentLabel.innerHTML = name;
    });

    fileInputs[i].appendChild(input);
    fileInputs[i].appendChild(label);
}

var evens = [1, 2, 3];
var odds = evens.map(function (v) {
    return v + 1;
});
console.log(odds);
;var reloaded = angular.module("reloaded", []);
reloaded.controller("hello", ['$scope', '$http', function ($scope, $http) {
    $scope.name = "Jeffrey";

    $scope.users = [{
        "name": "Jeffrey",
        "age": 42,
        "address": "New York",
        "job": "programmer"
    }, {
        "name": "Joe",
        "age": 16,
        "address": "New York",
        "job": "programmer"
    }, {
        "name": "Jack",
        "age": 38,
        "address": "New York",
        "job": "programmer"
    }, {
        "name": "Zsuzsi",
        "age": 54,
        "address": "New York",
        "job": "programmer"
    }, {
        "name": "Józsi",
        "age": 22,
        "address": "New York",
        "job": "programmer"
    }];
    /* $http.get('json/user.json')
        .then( function(data){
            console.log(data);
    }); */
    console.log("Itt");
}]);
