const Mixer = require('@mixer/client-node')
const ws = require('ws')

const client = new Mixer.Client(new Mixer.DefaultRequestRunner())

client.use(new Mixer.OAuthProvider(client, {
  tokens: {
    // mmcbot token
    access: 'b9AGx7PVcKLorBioXJamnafgJMZyR29Fh5XqkE4GjjCMcpRcAbWI4JE4MuByZdVU',
    expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
  },
}))

async function getUserInfo() {
  return client.request('GET', 'users/current')
    .then(response => response.body)
}

async function getConnectionInformation(channelId) {
  return new Mixer.ChatService(client).join(channelId).then(res => res.body)
}

async function joinChat(userId, channelId) {
  const joinInformation = await getConnectionInformation(channelId)
  // Create a chat socket and "boot" it(start it up and connect it)
  const socket = new Mixer.Socket(ws, joinInformation.endpoints).boot()

  return socket.auth(channelId, userId, joinInformation.authkey).then(() => socket)
}

module.exports = { getUserInfo, joinChat }
