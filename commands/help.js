const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows you a help menu!'),
    async execute(interaction, client) {

        const embed = new MessageEmbed()
            .setColor('#db172e') //#db172e = Red, #3523a7 = Blue
            .setAuthor({
                name: client.user.username + "'s Help Menu",
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription("**This Command is not ready!**")
            .setImage("https://preview.redd.it/nwm3kzzp1og51.jpg?width=1280&format=pjpg&auto=webp&s=13305a0b5628221bd6821e8c1dce4d47aeb346ce")
            .setFooter({
                text: 'An open sourced project by Grizz1e'
            })
        interaction.reply({
            embeds: [embed]
        });

    }

}