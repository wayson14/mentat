module.exports = {
    name :"score",
    ticket: "wymagany",
    description: 'Dodaje określoną liczbę punktów na konto.',
    usage: ' [nazwisko bez polskich znaków] [+/- liczba punktów]',
    aliases: ['punkty','wynik','exp','s'],
    args: 'true',

    execute (message, args){
        fs = require('fs')
        data = require('../data.json')

        function checkForPerson(data, person){
            for (let i in data.guys){
                if(person === i) return true;
            }
            return false;
        }

        function points(data,people,value){
            let msg = '';

            for (let i = 0; i < people.length; i++){
                person = people[i];
                x = data["guys"][person];
                x.score = Number(x.score) + Number(value);
                msg = msg+ `${x.name} ${x.surname}: ${x.score} \n`;
            }

            return message.channel.send(msg);
        }

        function write(object, path) {
            fs.writeFile(path, JSON.stringify(object),
                function write_error(err) {
                    if (err) return console.log(err);
                });
        }

        function sliceArray(a){
            let b = [];
            for(let i = 0; i < a.length-1; i++ ){
                b.push(a[i]);
            }
            return b;
        }
        console.log(data.guys);
        last = args.length-1;
        if(!checkForPerson(data, args[0])) return message.channel.send('Brak osoby w bazie!');
        
        if(isNaN(args[last])) return message.channel.send('Idiotoshield v.1.0.1');
        a = sliceArray(args);
        console.log(a);
        points(data,a,args[last]);
        write(data, './data.json');
    }

}