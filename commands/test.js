module.exports = {
    name: 'siema',
    description: 'Test',
    aliases: ['hej','cześć','joł','czuwaj'],
    usage: 'jakieś na pewno',
    ticket: 'wymagany',
    


    execute(message, args){
        data = require('../data.json')
        fs = require('fs')

        message.channel.send('Cześć, jestem Mentat - tłumacz relacji ludzie-roboty. Jestem już drugą, **lepszą**, generacją tego co kiedyś zwano HaBot. Jeżeli chcesz się zapoznać z moimi możliwościami wpisz **_!help_**.');
           
    }

}