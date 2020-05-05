module.exports = {
    name: 'remove',
    description: 'Usuwa konkurencję/wyzwanie',
    usage: ' [nazwa konkurencji] [daily/weekly/spec]',
    aliases: ['usuń', 'delete', 'remove', 'rm'],
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

        
        if (args.length<2) return message.channel.send('Wymagane conajmniej dwa argumenty!');
        
        if(!check(data, args[0])) return message.channel.send('Brak takiej kategorii!');
        if(!check(data[args[0]], args[1])) return message.channel.send('Brak takiego wyzwania!');

        try {remove(data[args[0]], args[1]);}
        catch (err) {return console.log(err)}

        console.log(`Usunięto: ${args[1]} z kategorii: ${args[0]}`)
        write(data, data_path);
        //console.log(data[args[1]][args[0]]);
    }
}