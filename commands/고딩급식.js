const fs = require('fs');
const { MessageEmbed } = require("discord.js");

exports.run = async (bot, msg, args) => {
	const request = require('request');

	const iurl = 'https://schoolmenukr.ml/code/api?q=' + encodeURI(args[0]);

  var d = new Date();

	request(iurl, async (err, res, body) => {
		if (!args[0])
			return msg.reply(
				'$고딩급식 `학교이름` `날짜(일)` ex)$고딩급식 김해고 3'
			);
    
		var json = JSON.parse(body);

		if (Object.keys(json['school_infos']).length === 0) {
			return msg.reply('`' + args[0] + '` 학교를 찾을수 없음.')
      }

    var si = json['school_infos']

    //console.log(si)
    var info = json['school_infos']['0']['code'];
    var name = json['school_infos']['0']['name'];
    var add = json['school_infos']['0']['address'];

    if (Object.keys(json['school_infos']).length > 1) {
      var name1 = json['school_infos']['1']['name'];
      var add1 = json['school_infos']['1']['address'];
      let filter = m => m.author.id === msg.author.id
      msg.channel.send(`\n1. ${si[0]['name']}, 주소: ${si[0]['address']}\n2. ${si[1]['name']}, 주소: ${si[1]['address']}\n 숫자를 적으세요 \`1\` / \`2\``).then(() => {
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(msg => {
            msg = msg.first()
            if (msg.content.toUpperCase() == '1' || msg.content.toUpperCase() == '1') {
              const url = 'https://schoolmenukr.ml/api/high/' + json['school_infos']['0']['code'] + '?date=' + encodeURI(args[1]);


        		  request(url, (err, res, body) => {
        			  if (!args[1])
        				  return msg.reply(
        					  '$고딩급식 `학교이름` `날짜(일)` ex)$고딩급식 김해고 3'
        			  	);
        
        			  var json = JSON.parse(body);
        
        			  if (Object.keys(json['menu']).length === 0)
        				  return msg.reply('`' + name + '`의 급식이 없습니다.');
        
        		  	//console.log(json['menu']['0']);
        			  var ml = json['menu']['0']['lunch'];
        
        	  		var foslist = new Array();
        
        		  	if (Object.keys(ml).length === 0)
        			  	return msg.reply('`' + name + '`의 급식이 없습니다.');
        
        			  ml.forEach(function(element) {
        			  	var req = JSON.stringify(element);
        			  	foslist.push(req.replace(/\"/gi, '`').replace(/[/.]/g, '').replace(/[0-9]/g,''));
        			  });
        
                const gs = new MessageEmbed()
                .setTitle(`${Math.floor(d.getMonth() + 1)}월 ${args[1]}일 ${name}의 점심 급식표`)
                .setDescription('[학교식단 API](https://github.com/5d-jh/school-menu-api), [NEIS](https://github.com/5d-jh/neis-code-finder)')
        	      .setColor('#0099ff')
                .setTimestamp()
                .addFields(
                  {name: '급식', value: foslist.join('\n')},
                  {name: '학교주소', value: '`'+add+'`'},
                )
                .setFooter(msg.author.tag, msg.author.defaultAvatarURL)
        
        		  	msg.channel.send(gs).catch(console.error);
        		  });
              return
            } else if (msg.content.toUpperCase() == '2' || msg.content.toUpperCase() == '2') {
              const url = 'https://schoolmenukr.ml/api/high/' + json['school_infos']['1']['code'] + '?date=' + encodeURI(args[1]);

          		request(url, (err, res, body) => {
          			if (!args[1])
          				return msg.reply(
          					'$고딩급식 `학교이름` `날짜(일)` ex)$고딩급식 김해고 3'
          				);
          
          			var json = JSON.parse(body);
          
          			if (Object.keys(json['menu']).length === 0)
          				return msg.reply('`' + name1 + '`의 급식이 없습니다.');
          
          			//console.log(json['menu']['0']);
          			var ml = json['menu']['0']['lunch'];
          
          			var foslist = new Array();
          
          			if (Object.keys(ml).length === 0)
          				return msg.reply('`' + name1 + '`의 급식이 없습니다.');
          
          			ml.forEach(function(element) {
          				var req = JSON.stringify(element);
          				foslist.push(req.replace(/\"/gi, '`').replace(/[/.]/g, '').replace(/[0-9]/g,''));
          			});
          
                const gs = new MessageEmbed()
                .setTitle(`${Math.floor(d.getMonth() + 1)}월 ${args[1]}일 ${name1}의 점심 급식표`)
                .setDescription('[학교식단 API](https://github.com/5d-jh/school-menu-api), [NEIS](https://github.com/5d-jh/neis-code-finder)')
          	    .setColor('#0099ff')
                .setTimestamp()
                .addFields(
                  {name: '급식', value: foslist.join('\n')},
                  {name: '학교주소', value: '`'+add1+'`'},
                )
                .setFooter(msg.author.tag, msg.author.defaultAvatarURL)
          
          			msg.channel.send(gs).catch(console.error);
          		});
              return
            } else {
              msg.channel.send(`?`)
              return
            }
          })
          .catch(collected => {
            msg.channel.send('시간만료');
            return
          });
      })
      return
    }


		const url = 'https://schoolmenukr.ml/api/high/' + info + '?date=' + encodeURI(args[1]);

		request(url, (err, res, body) => {
			if (!args[1])
				return msg.reply(
					'$고딩급식 `학교이름` `날짜(일)` ex)$고딩급식 김해고 3'
				);

			var json = JSON.parse(body);

			if (Object.keys(json['menu']).length === 0)
				return msg.reply('`' + name + '`의 급식이 없습니다.');

			//console.log(json['menu']['0']);
			var ml = json['menu']['0']['lunch'];

			var foslist = new Array();

			if (Object.keys(ml).length === 0)
				return msg.reply('`' + name + '`의 급식이 없습니다.');

			ml.forEach(function(element) {
				var req = JSON.stringify(element);
				foslist.push(req.replace(/\"/gi, '`').replace(/[/.]/g, '').replace(/[0-9]/g,''));
			});

      const gs = new MessageEmbed()
      .setTitle(`${Math.floor(d.getMonth() + 1)}월 ${args[1]}일 ${name}의 점심 급식표`)
      .setDescription('[학교식단 API](https://github.com/5d-jh/school-menu-api), [NEIS](https://github.com/5d-jh/neis-code-finder)')
	    .setColor('#0099ff')
      .setTimestamp()
      .addFields(
        {name: '급식', value: foslist.join('\n')},
        {name: '학교주소', value: '`'+add+'`'},
      )
      .setFooter(msg.author.tag, msg.author.defaultAvatarURL)

			msg.channel.send(gs).catch(console.error);
		});
	});
};

exports.help = {
	name: '고딩급식'
};
