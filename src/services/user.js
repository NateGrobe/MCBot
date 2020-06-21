import axios from 'axios'

const mixerApiUrl = 'https://mixer.com/api/v1/channels'

async function getUser(username) {
  const res = await axios.get(`${mixerApiUrl}/${username}`)
  return res.data
}

export default { getUser }
