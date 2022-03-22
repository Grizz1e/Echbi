const {
    ShardingManager
} = require('discord.js');
const {
    config
} = require('dotenv')

config({
    path: `${__dirname}/.env`
});


const shards = new ShardingManager("./hlbot.js", {
    token: process.env.TOKEN,
    totalShards: "auto"
});


shards.on("shardCreate", shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`)
});

shards.spawn(shards.totalShards, 10000);

process.on("unhandledRejection", (err) => {
    console.error(err)
});