const { MessageEmbed } = require("discord.js");

exports.run = async (bot, msg, args) => {

  const helpembed = new MessageEmbed()
  .setTitle(`명령어`)
  .setDescription('이 봇은 두 프로젝트의 도움으로 만들어졌습니다.\n글리치 호스트를 써서 서버가 불안정하여 핑이튀거나 다운될 수도 있습니다. \n[학교식단 API](https://github.com/5d-jh/school-menu-api), [NEIS](https://github.com/5d-jh/neis-code-finder)')
  .setColor('#0099ff')
  .setTimestamp()
  .addFields(
    {name: '기능', value: 'ping , invite'},
    {name: '급식', value: '고딩급식 , 고딩석식 , 중딩급식 , 중딩급식 , 초딩급식'},
  )
  .setFooter(msg.author.tag, msg.author.defaultAvatarURL)
  msg.channel.send(helpembed).catch(console.error);

}

exports.help = {
  name: '도움'
};