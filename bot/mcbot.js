const { getUserInfo, joinChat } = require('./botConnection')
const { validateChatCommand } = require('./botHelper')

let running = true

function controlBot(channelId, status) {
  if (status === 'stop'){
    running = false
    return
  } else if (status === 'run' && !running) {
    running = true
    return
  }

  getUserInfo().then(async userInfo => {
    const socket = await joinChat(userInfo.id, channelId)

    // Greet a joined user
    socket.on('UserJoin', data => {
      if (data.username !== 'MMCBot') {
        socket.call('msg', [
          `Hi ${data.username}! I'm songbot! Welcome to the chat! Please checkout our !rules and my !commands`
        ])
      }
    })

    /* ========================
     * ===   Test Command   ===
     * ======================== */

    socket.on('ChatMessage', data => {
      console.log('running', running)
      const validMsg = validateChatCommand(data, '!test')
      if (validMsg && running) {
        socket.call('msg', [`@${data.user_name} called me from an electron app`])
      }
    })

    /* ============================
     * ===   Commands Command   ===
     * ============================ */

    // React to ping command
    /*
    socket.on('ChatMessage', data => {
      if (data.message.message[0].data.toLowerCase().startsWith('!commands')) {
        let commandListOutput = ''

        commandList.map(cli => {
          commandListOutput += `${cli.command}: ${cli.function} \n`
        })
        socket.call('msg', [`@${data.user_name} ${commandListOutput}`])
      }
    })
    */

    /* =========================
     * ===   Rules Command   ===
     * ========================= */

    /*
    socket.on('ChatMessage', data => {
      if (data.message.message[0].data.toLowerCase().startsWith('!rules')) {
        socket.call('msg', [`@${data.user_name} ${rules}`])
      }
    })
    */

    /* =============================
       ===   What Song Command   ===
       ============================= */

    /*
    // React to ping command
    socket.on('ChatMessage', data => {
      if (data.message.message[0].data.toLowerCase().startsWith('!song')) {
        socket.call('msg', [`@${data.user_name}, ${song_name} is playing!`])
        console.log(`${data.user_name} asked what song!`)
      }
    })
    */

    // handle errors
    socket.on('error', error => {
      console.error('Socket error')
      console.error(error)
    })
  })
    .catch(error => {
      console.log(error.message)
    })
}

module.exports = { controlBot }
