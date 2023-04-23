import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
}
