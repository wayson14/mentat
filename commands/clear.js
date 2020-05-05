module.exports = {
    name :"clear",
    ticket: "wymagany",
    description: 'Czyśći daną konkurencję z uczestników',
    usage: '!clear [nazwa konkurencji]',
    aliases: ['c', 'wyczyść'],
    args: 'true',

    execute (message, args){
        fs = require('fs')
        data = require('../data.json')
        
        function findCategory(object, toFind){
            const keys1 = Object.keys(object.daily);
            const keys2 = Object.keys(object.weekly);
            for (const key of keys1){
                if (key === toFind){
                    return 'daily';
                }
            }
            for (const key of keys2){
                if (key === toFind){
                    return 'weekly';
                }
            }
            return false;
        }

        function write(object, path) {
            fs.writeFile(path, JSON.stringify(object),
                function write_error(err) {
                    if (err) return console.log(err);
                });
        }

        function check(data, args){
            if (!data[findCategory(data,args[0])][args[0]] =='undefined'){
                return false;
            }
            else true;
        }

        function clearObject(object,args){

            object[findCategory(data, args[0])][args[0]] = [];
            console.log(object);
            return;
            
        }

        if(!findCategory(data,args[0])) return message.channel.send('Brak konkurencji w bazie!');
        clearObject(data, args);
        write(data, './data.json');
        
    }
}