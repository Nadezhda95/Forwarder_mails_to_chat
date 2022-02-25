function send_to_chat() {
  const messagesArr = get_messages();
  for (k=0; k<messagesArr.length; k++) {
    let date = new Date(messagesArr[k][2]);
    date = date.toLocaleDateString(`RU`);
    send(
      `От кого: ${messagesArr[k][1]}\nДата: ${date}\n\n${messagesArr[k][3]}`
      ,root_chat_id
      ,API
    )
    for (l=0; l<messagesArr[k][0].length; l++) {
      send_doc(messagesArr[k][0][l],root_chat_id,API)
    }
  }
}

function get_messages() {
  const messagesArr = new Array();
  const threadsArr = GmailApp.getInboxThreads();
  const lastEmailArr = Inbox.getRange(2,1, Inbox.getLastRow()).getValues().flat();
  //проверяю только 10 последних email на почте
  if (threadsArr.length >= 10) {
    for (m=0; m<10; m++) { 
      const threadId = threadsArr[m].getId();
      if (lastEmailArr.indexOf(threadId) == -1) {
        messagesArr.push(get_content(threadsArr[m]))
        Inbox.getRange(m+2,1).setValue(threadId);
      } else {
        break;
      }
    }  
  } else {
    for (m=0; m<threadsArr.length; m++) { 
      const threadId = threadsArr[m].getId();
      if (lastEmailArr.indexOf(threadId) == -1) {
        messagesArr.push(get_content(threadsArr[m]))
        Inbox.getRange(m+2,1).setValue(threadId);
      } else {
        break;
      }
    }  
  }
  return messagesArr
}


function get_content(thread) {
  const messageContentArr = new Array();
  const messages_arr = thread.getMessages();
  for (j=0; j<messages_arr.length; j++) {
    const attachments = messages_arr[j].getAttachments();
    const fromWho = messages_arr[j].getFrom().replace(/</g, ``).replace(/>/g,``);
    const date = messages_arr[j].getDate();
    let plainBody = messages_arr[0].getPlainBody().replace(/</g, ``).replace(/>/g,``);

    if (plainBody.length > 4096) {
      plainBody = `${plainBody.slice(0,4000)}\n\n Сообщение слишком длинное...`
    }
    messageContentArr.push(attachments,fromWho,date,plainBody)
  }

  return messageContentArr
}


