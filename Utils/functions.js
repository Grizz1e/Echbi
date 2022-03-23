const {
    MessageActionRow,
    MessageButton
} = require('discord.js')
const {
    table
} = require('table');

module.exports = class Functions {
    static async shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    static hlButton(disabled, isCard) {
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('DANGER')
                .setLabel('Higher')
                .setCustomId('higher')
                .setDisabled(disabled),
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('Lower')
                .setCustomId('lower')
                .setDisabled(disabled)
            )
        if (isCard) {
            row.addComponents(
                new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Equal')
                .setCustomId('equal')
                .setDisabled(disabled)
            )
        }
        return row
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
    static isCorrect(answer, id1, id2) {
        if (answer === 'higher') {
            return id1 < id2
        } else if (answer === 'lower') {
            return id1 > id2
        } else if (answer === 'equal') {
            return id1 === id2
        }
    }
};