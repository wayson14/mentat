module.exports = {
    name: 'join',
    description: 'Pozwala na dołączenie do konkurencji',
    aliases: ['dołącz', 'zagraj', 'wejdź', 'dolacz', 'wejdz'],
    usage: '[nazwa konkurencji]',
    ticket: 'niewymagany',
    args: 'true',


    execute(message, args){
        data = require('../data.json')
        fs = require('fs')
        let flag = 0;

        function write(object, path) {
            fs.writeFile(path, JSON.stringify(object),
                function write_error(err) {
                    if (err) return console.log(err);
                });
        }

        function check(data, args){
            if (!data[args[0]] =='undefined'){
                return false;
            }
            else true;
        }

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

        console.log(findCategory(data, args[0]));

        if(!findCategory(data, args[0])){
            return message.channel.send('Brak takiego wyzwania!');
        }

        const category = findCategory(data, args[0]);

        let active = ['**Wyzwanie ---> Liczba uczestników **'];
        let keys;
        //all avaivable contests
        
        if(check(data[category], args)) return message.channel.send('Brak takiego wyzwania!');

        guys = data[category][args[0]];
        if(guys.includes(message.author.username)) {
            flag = 1;
            message.channel.send('Już się dodałeś do tego wyzwania!');
        }
        if (flag !== 1){
            guys.push(message.author.username);
            data[category][args[0]] = guys;
            console.log('git');
        }

        for (let i in data){
            let buffer;
            let n;
            if (i==='guys') break;
            if (i==='daily') active.push('**Wyzwanie dnia (daily): **');
            if (i==='weekly') active.push('**Wyzwanie tygodnia (weekly): **');
            if (i==='clash') active.push('**Poje(wielo)dynki (clash): **'); 
            
            for (let j in Object.keys(data[i])){
                m = Object.keys(data[i])[j];
                n = Object.keys(data[i])[j] +' ---> ' +data[i][m].length;
                console.log(data[i][m].length);
                active.push(n);
            }
            //active.push(Object.keys(data[i]));
        }

        write(data, './data.json');

        message.channel.send(active);
        
    
        
    }

}