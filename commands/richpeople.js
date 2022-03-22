const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed,
} = require('discord.js');
const {
    getArray,
    shuffleArray,
    hlButton,
    shortInt,
    makeTable
} = require('../Utils/functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('richpeople')
        .setDescription('Starts a game of Higher Lower about Richest People'),
    async execute(interaction, client) {

        let channels = await getArray('richpeople');
        shuffleArray(channels);
        let i = 0,
            winCount = 0,
            correct;
        let channel1 = channels[i][0],
            channel2 = channels[i + 1][0],
            subs1 = parseInt(channels[i][1]),
            subs2 = parseInt(channels[i + 1][1]),
            thumb1 = channels[i][2],
            thumb2 = channels[i + 1][2]
        let data = [
            [channel1, channel2],
            ["", ""],
            [shortInt(subs1), "?"],
            ["", ""]
        ]
        let embed = new MessageEmbed()
            .setAuthor({
                name: "Higher Lower - Rich People",
                iconURL: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/310/money-bag_1f4b0.png"
            })
            .setTitle("__" + channel1 + "__ VS __" + channel2 + "__")
            .setDescription("```\n" + makeTable(data) + "\n```\n\n**Total Score:** `" + winCount + "`")
            .setThumbnail(thumb1)
            .setImage(thumb2)
        interaction.reply({
            embeds: [embed],
            components: hlButton()
        })
        if (subs1 > subs2) {
            correct = 0;
        } else if (subs1 < subs2) {
            correct = 1;
        } else {
            correct = 2;
        }
        i = 1
        while (i < channels.length) {
            channel1 = channels[i][0],
                channel2 = channels[i + 1][0],
                subs1 = parseInt(channels[i][1]),
                subs2 = parseInt(channels[i + 1][1]),
                thumb1 = channels[i][2],
                thumb2 = channels[i + 1][2]
            data = [
                [channel1, channel2],
                ["", ""],
                [shortInt(subs1), "?"],
                ["", ""]
            ]
            winCount++;
            try {
                const filter = (x) => x.user.id === interaction.user.id;
                cmp = await interaction.channel.awaitMessageComponent({
                    filter,
                    time: 15000
                })
                if (cmp.isButton) {

                    if ((cmp.customId === 'higher' && correct > 0) || (cmp.customId === 'lower' && correct < 1) || (cmp.customId === 'higher' && correct > 1) || (cmp.customId === 'lower' && correct > 1)) {
                        embed.setTitle("__" + channel1 + "__ VS __" + channel2 + "__")
                            .setDescription("```\n" + makeTable(data) + "\n```\n\n**Total Score:** `" + winCount + "`")
                            .setThumbnail(thumb1)
                            .setImage(thumb2)
                        if (subs1 > subs2) {
                            correct = 0;
                        } else if (subs1 < subs2) {
                            correct = 1;
                        } else {
                            correct = 2;
                        }
                        cmp.update({
                            embeds: [embed]
                        })
                    } else {
                        embed.setDescription("**Wrong Answer!!**\n" + embed.description.replace("?", shortInt(subs1)))
                            .setThumbnail(interaction.user.displayAvatarURL())
                            .setImage("https://www.tomscott.com/quietcarriage/wrong.png")
                        cmp.update({
                            embeds: [embed],
                            components: []
                        })
                    }

                }
                i++;
            } catch (err) {
                return
            }
        }
        
    }
}