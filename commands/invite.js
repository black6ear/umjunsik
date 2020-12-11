const fs = require('fs')

exports.run = async (bot, msg, args) => {
  msg.channel.send("https://discord.com/api/oauth2/authorize?client_id=450177137857789972&permissions=8&scope=bot")
}

exports.help = {
    name: 'invite',
    usage: 'invite',
    description: 'invite'
};