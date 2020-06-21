function validateChatCommand(data, msg) {
  if (data.message.message[0].data.toLowerCase().startsWith(msg))
    return true
  
  return false
}

module.exports = { validateChatCommand }
