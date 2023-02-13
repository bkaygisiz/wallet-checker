import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { init } from "./init.mjs";

const client = await init();
client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.log("No command found");
        return;
    }
    console.log(command);
    try {
        command.default.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});