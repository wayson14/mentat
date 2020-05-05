module.exports = {
    name: 'help',
    description: 'Lista wszystkich dostępnych komend.',
    aliases: ['commands', 'komendy', 'wszystkie', 'lista', 'pomoc'],
    usage: '!help [komenda]',
    ticket: 'niewymagany',

    execute(message, args) {
        const { prefix } = require('../config.json');
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Lista wszystkich komend:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nWpisz \`${prefix}help [command name] \` by dowiedzieć się więcej o danej komendzie!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Wysłałem Ci wiadomość ze wszystkimi moimi komendami! Korzystaj z nich mądrze, i nie zmarnuj ich na głupoty!!!');
                })
                .catch(error => {
                    console.error(`Nie mogłem wysłać wiadomości do ${message.author.tag}.\n`, error);
                    message.reply('wygląda na to, że możesz nie odbierać DM-ów?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Brak takiej komendy w bazie!');
        }

        data.push(`**Nazwa:** ${command.name}`);

        if (command.aliases) data.push(`**Aliasy:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Opis:** ${command.description}`);
        if (command.usage) data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`);
        if (command.usage) data.push(`**Złoty bilet:** ${command.ticket}`);
        //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });



    }
}