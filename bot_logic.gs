function bot_logic(msg_data) {
  send(`Я успешно запущен. Пожалуйста не удаляйте письма на почте, чтобы я корректно мог их обрабатывать и пересылать в чат)`, msg_data.chat_id, API);
  Inbox.getRange(2,2).setValue(msg_data.chat_id);
}
