// Osztály alapjául szolgáló függvény létrehozása, es2015 féle
class dateClass {

    constructor (defaultDate) {
        this.cDate = defaultDate ? defaultDate : new Date();
    };

    static toDoubleChars (num) {
        if (num < 10 && num > -10) {
            return '0'+num;
        }
        return ''+num;
    };

    goodMorning() {
        var d = this.toMysql();
        // Új behelyettesítéses
        // var template = `Sziasztok, szép napunk van. Ma ${d} van.`;

        // Új String.raw
        var template = String.raw`Sziasztok, szép napunk van. Ma ${d} van.`;

        // Régi
        // var template = 'Sziasztok, szép napunk van. Ma '+d+' van.';
        console.log(template);
    }

    toMysql () {
        var parts = [];
        parts.push(this.cDate.getFullYear());
        // statikus osztály hivatkozás
        parts.push( dateClass.toDoubleChars(this.cDate.getMonth()+1) );
        parts.push( dateClass.toDoubleChars(this.cDate.getDate()) );
        return parts.join('-');
    };

};

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
}; */