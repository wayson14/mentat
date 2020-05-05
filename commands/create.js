module.exports = {
    name: 'create',
    description: 'Dodaje nową konkurencję/wyzwanie',
    usage: ' [nazwa konkurencji] [daily/weekly]',
    aliases: ['stwórz', 'add',],
    ticket: 'wymagany',



    execute(message, args) {
        fs = require('fs');
        let data = require('../data.json');
        const data_path = './data.json';
    

        //functions
        

        function remove(object, to_delete) {
            delete object[to_delete];
            return;
        }

        function check(object, to_check) {
            for (let i in object) {
                if (i === to_check) return true;
            }
            return false;
        }

        function add(object, to_add) {
            object[to_add] = [];
            return;
        }
    

        function write(object, path) {
            fs.writeFile(path, JSON.stringify(object),
                function write_error(err) {
                    if (err) return console.log(err);
                });
        }

        

        if (!check(data, args[1])) return console.log('Brak kategorii!');
        else console.log('Kategoria istnieje.');

        
        try {add(data[args[1]], args[0]);}
        catch (err) {return console.log(err)}

        console.log(`Dodano: ${args[0]} do kategorii: ${args[1]}`);
        
        write(data, data_path);
        //console.log(data[args[1]][args[0]]);
    }
}