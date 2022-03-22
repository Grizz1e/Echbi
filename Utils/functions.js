const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const axios = require('axios');
const {
    table
} = require('table');

module.exports = class Functions {
    static async getArray(gameType) {
        let url, data2 = [];
        switch (gameType) {
            case 'youtubers':
                url = "https://moreorless.io/pool/_ls_IntYoutubers.js"
                break;
            case 'richpeople':
                url = "https://moreorless.io/pool/_ls_richPeople.js"
                break;
        }
        if (gameType === 'youtubers') {

            let body = await axios.get(url);
            let data = body.data,
                i;
            data = data.split("// name, value, thumbnail")[1].split("\n");
            for (i = 0; i < data.length; i++) {
                if (data[i].length < 10) {
                    data.splice(i, 1);
                }
                data2.push(data[i].trim().replace(/\s{2,}/g, ' ').replace("],", ""));
            }
            data2.pop();
            let finalArr = [];
            for (i = 0; i < data2.length; i++) {
                data2[i] = data2[i].startsWith(`["`) ? data2[i].replace(`["`, "").split(`", `) : data2[i].replace("['", "").split("', ");
                data2[i][1] = data2[i][1].split(",'");
                data2[i] = data2[i].flat();
                data2[i][2] = data2[i][2].replace("'", "").replace("]", "")
                finalArr.push(data2[i]);
            }
            return finalArr;
        } else if (gameType === 'richpeople') {

            let body = await axios.get(url);
            let data = body.data,
                i;
            data = data.split("// english")[1]
            data = data.split("// name, value, thumbnail")[1].split("\n");
            data.splice(data.length - 7, 7);
            for (i = 0; i < data.length; i++) {
                
                data[i] = data[i].trim();
                if (data[i].length < 10) {
                    data.splice(i, 1);
                }
                data2.push(data[i].trim().replace(/\s{2,}/g, ' ').replace("],", ""));
            }
            let finalArr = [];
            for (i = 0; i < data2.length; i++) {
                data2[i] = data2[i].startsWith(`["`) ? data2[i].replace(`["`, "").split(`", `) : data2[i].replace("['", "").split("', ");
                data2[i][1] = data2[i][1].split(", '");
                data2[i] = data2[i].flat();
                data2[i][2] = data2[i][2].replace("'", "").replace("]", "")
                finalArr.push(data2[i]);
            }
            return finalArr;
        }
    }
    static async shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    static hlButton() {
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('DANGER')
                .setLabel('Higher')
                .setCustomId('higher'),
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('Lower')
                .setCustomId('lower')
            )
        return [row]
    }
    static shortInt(num) {
        num = num.toString().replace(/[^0-9.]/g, '');
        if (num < 1000) {
            return num;
        }
        let si = [{
                v: 1E3,
                s: "K"
            },
            {
                v: 1E6,
                s: "M"
            },
            {
                v: 1E9,
                s: "B"
            },
            {
                v: 1E12,
                s: "T"
            },
            {
                v: 1E15,
                s: "P"
            },
            {
                v: 1E18,
                s: "E"
            }
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    }
    static makeTable(data) {
        const config = {
            columns: [{
                    alignment: 'center'
                },
                {
                    alignment: 'center'
                }
            ],
            drawHorizontalLine: (lineIndex, rowCount) => {
                return lineIndex === 1;
            },
            drawVerticalLine: (lineIndex, columnCount) => {
                return lineIndex === 1;
            }
        };
        return table(data, config)
    }
};