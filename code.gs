var SCRIPT_PROP = PropertiesService.getScriptProperties();
var sheetID= 'xxx'
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty(sheetID, doc.getId());
}

function uploadFile(data, file,id,stdCode,firstname,lastname,address,tel,email) {
try {
    var folder=DriveApp.getFolderById('xxx');
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file),
      file = folder.createFolder([firstname+lastname+new Date()]).createFile(blob),
        filelid =file.getId() ;
        image = 'https://drive.google.com/uc?id='+filelid
    var lock = LockService.getPublicLock();
        lock.waitLock(30000);    
    var doc = SpreadsheetApp.openById(sheetID);
    var sheet = doc.getSheetByName("xxx");
    var row = [new Date,id,stdCode,firstname,lastname,address,"'"+tel,email,image];

  sheet.appendRow(row)
    return "OK";
   } catch (f) {
    return f.toString();
  } finally {
    lock.releaseLock();
  }
}