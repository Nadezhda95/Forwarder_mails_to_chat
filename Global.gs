const Inbox = SpreadsheetApp.getActive().getSheetByName(`Inbox`);
const root_chat_id = Inbox.getRange(2,2).getValue();