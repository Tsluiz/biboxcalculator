function filter(lastMessages, newMessage, result) {
  //current duplicate message count
  var duplicateCount = 0;
  //max duplicate message count
  var maxDuplicateCount = 3;

  for (var i in lastMessages) {
    var lmsg = lastMessages[i];

    //check message text
    if (lmsg.originalText === newMessage.originalText) {
      duplicateCount++;
    }
  }

  if (duplicateCount == maxDuplicateCount - 1) {
    // accept message and show info message
    return result.info('Please stop');
  }
  if (duplicateCount == maxDuplicateCount) {
    // accept message and show warning message
    return result.warning('PLEASE DO NOT SPAM!.');
  }

  if (duplicateCount > maxDuplicateCount) {
    // you can abort sending
    // return result.decline('Your message was declined');
    // or result.ban(15, 'You are banned');  // 15 min
    // or ban user
    return result.decline('Your message was declined'
  }

  // Bad word list
  var badWord = ['biboxtokens.com', 'moeder'];

  // message text
  var text = newMessage.originalText;

  for (var w in badWord) {
    var word = badWord[w];
    text = text.split(word).join(new Array(word.length + 1).join('*'))
  }

  if (newMessage.originalText =! text) {
    // text has been modified and need change it
    newMessage.originalText = text;
    return result.change(newMessage, 'your message has been modified'); // notification is optional
  }

  // everything alright
  return result.accept();
}
