// HTML5 szelektorok

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

    input.addEventListener('change', (ev) => {
        console.log(ev.target.value);
        var currentLabel = document.querySelector('label[for='+ev.target.id+']');
        var name = ev.target.value;
        name = name.replace(/\\/g, '/').split('/').pop(); // pop = utolsó elemet adja vissza
        currentLabel.innerHTML = name;
    });

    fileInputs[i].appendChild(input);
    fileInputs[i].appendChild(label);
}

var evens = [1,2,3];
var odds = evens.map(v => v+1);
console.log(odds);
