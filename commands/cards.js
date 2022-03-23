const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed,
} = require('discord.js');
const {
    hlButton,
    shuffleArray,
    isCorrect
} = require('../Utils/functions')
const cards = require('../categories/cards.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cards')
        .setDescription('Starts a game of Higher Lower with a Deck of Cards'),
    async execute(interaction, client) {
        let deck = await shuffleArray(cards)
        let i = 0,
            winCount = 0
        let card1 = deck[i].value + " of " + deck[i].suit,
            card2 = deck[i + 1].value + " of " + deck[i + 1].suit,
            thumb1 = deck[i].id,
            thumb2 = deck[i + 1].id,
            id1 = deck[i].code,
            id2 = deck[i + 1].code
        let embed = new MessageEmbed()
            .setAuthor({
                name: "Higher Lower - Cards",
                iconURL: "http://cdn.onlinewebfonts.com/svg/img_30448.png"
            })
            .setTitle("You Got: __" + card1 + "__ ")
            .setThumbnail("https://deckofcardsapi.com/static/img/" + thumb1 + ".png")
            .setDescription("\n\n**Total Score:** `" + winCount + "`")
            .setFooter({
                text: "What will the next card be?"
            })
        interaction.reply({
            embeds: [embed],
            components: [hlButton(false, true)]
        })
        i = 1;
        while (i < 52) {
            try {
                const filter = (x) => x.user.id === interaction.user.id;
                cmp = await interaction.channel.awaitMessageComponent({
                    filter,
                    time: 15000
                })
                if (cmp.isButton) {
                    if (isCorrect(cmp.customId, id1, id2)) {
                        card1 = deck[i].value + " of " + deck[i].suit,
                            card2 = deck[i + 1].value + " of " + deck[i + 1].suit,
                            thumb1 = deck[i].id,
                            thumb2 = deck[i + 1].id,
                            id1 = deck[i].code,
                            id2 = deck[i + 1].code
                        winCount++
                        embed.setTitle("You Got: __" + card1 + "__ ")
                            .setThumbnail("https://deckofcardsapi.com/static/img/" + thumb1 + ".png")
                            .setDescription("\n\n**Total Score:** `" + winCount + "`")
                        cmp.update({
                            embeds: [embed],
                        })
                    } else if (!isCorrect(cmp.customId, id1, id2)) {
                        embed.setTitle("You Got: __" + card2 + "__ ")
                            .setThumbnail("https://deckofcardsapi.com/static/img/" + thumb2 + ".png")
                            .setImage("https://www.tomscott.com/quietcarriage/wrong.png")
                        cmp.update({
                            embeds: [embed],
                            components: [hlButton(true, true)]
                        })
                    }
                }
                i++;
            } catch (err) {
                return
            }
            i++;
        }
    }

}