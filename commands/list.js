module.exports = {
    name: 'list',
    description: 'Pokazuje zawartość obiektu',
    usage: ' [daily/weekly/guys] opcjonalne:[all]',
    aliases: ['wyświetl', 'pokaż', 'lista','l'],
    ticket: 'niewymagany',
    args: 'true',


    execute(message, args) {
        fs = require('fs');
        let data = require('../data.json');
        const data_path = './data.json';

        function display(object, mode, x){
            let msg = `**_- Konkurencje: -_** \n`;
            for (let i in object){
                console.log(i);
                msg =  msg + i;
                if (mode === 'all'){
                    console.log(object[i]);
                    msg = msg +': ' + object [i];
                }
                msg = msg + '\n';
                
            }
            message.channel.send(msg);
        }

        display(data[args[0]], 'all');

    }
}