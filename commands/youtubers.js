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
        .setName('youtubers')
        .setDescription('Starts a game of Higher Lower with Youtuber\'s subscriber count'),
    async execute(interaction, client) {

        let channels = await getArray();
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
                name: "Higher Lower - YouTube Subscribers",
                iconURL: "https://logo-logos.com/wp-content/uploads/2016/11/YouTube_icon_logo.png"
            })
            .setTitle("__" + channel1 + "__ VS __" + channel2 + "__")
            .setDescription("```\n" + makeTable(data) + "\n```\n\n**Total Score:** `" + winCount + "`")
            .setThumbnail(thumb1)
            .setImage(thumb2)
        interaction.reply({
            embeds: [embed],
            components: hlButton()
        })
        if (subs1 <= subs2) {
            correct = "higher"
        } else if (subs1 >= subs2) {
            correct = "lower"
        }
        while (true) {
            // console.log(typeof channels)
            // i = i + 1;
            // let chnl1 = channels[i][0],
            //     chnl2 = channels[i + 1][0],
            //     sbs1 = parseInt(channels[i][1]),
            //     sbs2 = parseInt(channels[i + 1][1]),
            //     thb1 = channels[i][2],
            //     thb2 = channels[i + 1][2]

            const filter = i => i.user.id === interaction.member.id;

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                max: 1,
                time: 15000
            });

            collector.on('collect', async i => {
                if (i.customId === 'higher' && correct === 'higher') {
                    // correct = sbs1 <= sbs2 ? "lower" : "higher"
                    await i.update({
                        content: 'Correct',
                        components: []
                    });
                } else if (i.customId === 'lower' && correct === 'lower') {
                    // correct = sbs1 <= sbs2 ? "lower" : "higher"
                    await i.update({
                        content: 'Correct',
                        components: []
                    });
                } else {
                    await i.update({
                        content: 'Correct',
                        components: []
                    });
                    return
                }
            });
        }
    }
}