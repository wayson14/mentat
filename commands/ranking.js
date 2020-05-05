module.exports = {
    name :"ranking",
    ticket: "niewymagany",
    description: 'Wyświetla tabelę wyników',
    usage: '',
    aliases: ['tablica','r','overall'],
    ranking_sign: '**_- Lista Osobista -_** \n',
    specificChannel: 'ranking',
    execute (message, args){
        fs = require('fs');
        data = require('../data.json');
        Discord = require('discord.js');

        const client = new Discord.Client();

        function swap(items, leftIndex, rightIndex){
            var temp = items[leftIndex];
            items[leftIndex] = items[rightIndex];
            items[rightIndex] = temp;
        }
        function partition(items, left, right) {
            var pivot   = items[Math.floor((right + left) / 2)][2], //middle element
                i       = left, //left pointer
                j       = right; //right pointer
            while (i <= j) {
                while (items[i][2] < pivot) {
                    i++;
                }
                while (items[j][2] > pivot) {
                    j--;
                }
                if (i <= j) {
                    swap(items, i, j); //sawpping two elements
                    i++;
                    j--;
                }
            }
            return i;
        }
        
        function quickSort(items, left, right) {
            var index;
            if (items.length > 1) {
                index = partition(items, left, right); //index returned from partition
                if (left < index - 1) { //more elements on the left side of the pivot
                    quickSort(items, left, index - 1);
                }
                if (index < right) { //more elements on the right side of the pivot
                    quickSort(items, index, right);
                }
            }
            return items;
        }

        function sort(array){
            return quickSort(array, 0, array.length - 1);
        }

        function rankingTable(data, order){
            x = data.guys;
            k = Object.keys(x);
            a = [];
            for (let i = 0; i < k.length; i++){
                a.push([x[k[i]]["name"],
                x[k[i]]["surname"],
                Number(x[k[i]]["score"])]);

            }
            a = sort(a);
            if (order === 'ascending') return a;
            else return a.reverse();
        }

        function findChannel(to_find){
            return 
        }
        function makeMessage(array, ranking_sign){
            let msg = ranking_sign;
            for (let i = 0; i < array.length; i++){
                msg=msg+array[i][0]+' '+array[i][1]+': '+array[i][2]+'\n';
            }
            message.channel.send(msg);
        }

        let rankingList = rankingTable(data,'descending');
        makeMessage(rankingList, this.ranking_sign);
        //console.log(message.client.channels.find('name', 'ranking'));
    }
}