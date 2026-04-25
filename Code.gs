function doPost(e) {
  // ตั้งค่า Headers สำหรับ CORS
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    // รับข้อมูลที่ส่งมาจาก Frontend
    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // เปิดหรือสร้าง Sheet ชื่อ "Users"
    var sheet = ss.getSheetByName("Users");
    if (!sheet) {
      sheet = ss.insertSheet("Users");
      // สร้างหัวตาราง
      sheet.appendRow(["ID", "Name", "Email", "Password", "Age", "Gender", "Major", "Province", "ExamCount", "CreatedAt"]);
      sheet.getRange("A1:J1").setFontWeight("bold").setBackground("#f3f4f6");
    }

    // เปิดหรือสร้าง Sheet ชื่อ "Notifications"
    var notifSheet = ss.getSheetByName("Notifications");
    if (!notifSheet) {
      notifSheet = ss.insertSheet("Notifications");
      notifSheet.appendRow(["Title", "Message", "UpdatedAt"]);
      notifSheet.appendRow(["", "", new Date().toISOString()]);
    }

    // เปิดหรือสร้าง Sheet ชื่อ "SupportMessages"
    var supportSheet = ss.getSheetByName("SupportMessages");
    if (!supportSheet) {
      supportSheet = ss.insertSheet("SupportMessages");
      supportSheet.appendRow(["ID", "UserId", "UserName", "UserEmail", "Subject", "Content", "Date", "Status", "Replies"]);
      supportSheet.getRange("A1:I1").setFontWeight("bold").setBackground("#f3f4f6");
    }

    // เปิดหรือสร้าง Sheet ชื่อ "BellNotifications"
    var bellSheet = ss.getSheetByName("BellNotifications");
    if (!bellSheet) {
      bellSheet = ss.insertSheet("BellNotifications");
      bellSheet.appendRow(["ID", "Title", "Message", "Date"]);
      bellSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#f3f4f6");
    }

    if (action === "register") return handleRegister(sheet, data, headers);
    if (action === "login") return handleLogin(sheet, data, headers);
    if (action === "getUsers") return handleGetUsers(sheet, headers);
    if (action === "updateUser") return handleUpdateUser(sheet, data, headers);
    if (action === "deleteUser") return handleDeleteUser(sheet, data, headers);
    if (action === "setNotification") return handleSetNotification(notifSheet, data, headers);
    if (action === "getNotification") return handleGetNotification(notifSheet, headers);
    
    if (action === "getSupportMessages") return handleGetSupportMessages(supportSheet, headers);
    if (action === "saveSupportMessage") return handleSaveSupportMessage(supportSheet, data, headers);
    if (action === "updateSupportMessage") return handleUpdateSupportMessage(supportSheet, data, headers);
    
    if (action === "getBellNotifications") return handleGetBellNotifications(bellSheet, headers);
    if (action === "saveBellNotification") return handleSaveBellNotification(bellSheet, data, headers);
    if (action === "deleteBellNotification") return handleDeleteBellNotification(bellSheet, data, headers);
    if (action === "uploadImage") return handleUploadImage(data, headers);

    return createResponse({ success: false, message: "Invalid action" }, headers);
  } catch (error) {
    return createResponse({ success: false, message: error.toString() }, headers);
  }
}

function handleUploadImage(data, headers) {
  try {
    var folderId = data.folderId;
    var base64Data = data.base64;
    var filename = data.filename || "upload_" + new Date().getTime() + ".png";
    var mimeType = data.mimeType || "image/png";

    // Create a blob from the base64 string
    // Remove the data URI scheme prefix if present (e.g., "data:image/png;base64,")
    var base64String = base64Data;
    if (base64Data.indexOf("base64,") !== -1) {
      base64String = base64Data.split("base64,")[1];
    }
    
    var blob = Utilities.newBlob(Utilities.base64Decode(base64String), mimeType, filename);
    
    var folder;
    if (folderId) {
      try {
        folder = DriveApp.getFolderById(folderId);
      } catch (e) {
        // If folder not found, use root
        folder = DriveApp.getRootFolder();
      }
    } else {
      folder = DriveApp.getRootFolder();
    }
    
    var file = folder.createFile(blob);
    // Set sharing to anyone with the link can view
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Get the direct download link or view link
    var fileUrl = "https://drive.google.com/uc?export=view&id=" + file.getId();
    
    return createResponse({
      success: true,
      url: fileUrl,
      fileId: file.getId()
    }, headers);
  } catch (error) {
    return createResponse({ success: false, message: "Upload failed: " + error.toString() }, headers);
  }
}

function handleRegister(sheet, data, headers) {
  var email = data.email;
  var dataRange = sheet.getDataRange().getValues();

  // ตรวจสอบว่ามีอีเมลนี้ในระบบแล้วหรือยัง
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][2] === email) {
      return createResponse({ success: false, message: "อีเมลนี้มีในระบบแล้ว" }, headers);
    }
  }

  var newId = Utilities.getUuid();
  var timestamp = new Date().toISOString();
  
  // บันทึกข้อมูลลง Sheet
  sheet.appendRow([
    newId, 
    data.name, 
    email, 
    data.password, 
    data.age || "", 
    data.gender || "", 
    data.major || "", 
    data.province || "", 
    data.examCount || "", 
    timestamp
  ]);

  return createResponse({
    success: true,
    message: "สมัครสมาชิกสำเร็จ",
    user: { id: newId, name: data.name, email: email }
  }, headers);
}

function handleLogin(sheet, data, headers) {
  var email = data.email;
  var password = data.password;

  // ตรวจสอบบัญชี Super Admin
  if (email === "Krumax" && password === "@max123456") {
    return createResponse({
      success: true,
      message: "เข้าสู่ระบบ Super Admin สำเร็จ",
      user: { id: "admin-001", name: "Admin ผู้ดูแลระบบ", email: "Krumax" }
    }, headers);
  }

  var dataRange = sheet.getDataRange().getValues();

  // ค้นหาอีเมลและรหัสผ่าน
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][2] === email && dataRange[i][3] === password) {
      return createResponse({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
        user: { id: dataRange[i][0], name: dataRange[i][1], email: email }
      }, headers);
    }
  }

  return createResponse({ success: false, message: "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง" }, headers);
}

function handleGetUsers(sheet, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var users = [];
  
  for (var i = 1; i < dataRange.length; i++) {
    users.push({
      id: dataRange[i][0],
      name: dataRange[i][1],
      email: dataRange[i][2],
      password: dataRange[i][3],
      age: dataRange[i][4] || "",
      gender: dataRange[i][5] || "",
      major: dataRange[i][6] || "",
      province: dataRange[i][7] || "",
      examCount: dataRange[i][8] || "",
      createdAt: dataRange[i][9] || dataRange[i][4] // รองรับข้อมูลเก่าที่ CreatedAt อยู่คอลัมน์ E
    });
  }
  
  return createResponse({ success: true, users: users }, headers);
}

function handleUpdateUser(sheet, data, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var userId = data.userId;
  
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === userId) {
      // อัปเดตข้อมูล (แถว i+1 เพราะ index เริ่มที่ 0 แต่แถวเริ่มที่ 1)
      sheet.getRange(i + 1, 2).setValue(data.name);
      sheet.getRange(i + 1, 3).setValue(data.email);
      sheet.getRange(i + 1, 4).setValue(data.password);
      return createResponse({ success: true, message: "อัปเดตข้อมูลสำเร็จ" }, headers);
    }
  }
  return createResponse({ success: false, message: "ไม่พบผู้ใช้งาน" }, headers);
}

function handleDeleteUser(sheet, data, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var userId = data.userId;
  
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === userId) {
      sheet.deleteRow(i + 1);
      return createResponse({ success: true, message: "ลบผู้ใช้งานสำเร็จ" }, headers);
    }
  }
  return createResponse({ success: false, message: "ไม่พบผู้ใช้งาน" }, headers);
}

function handleSetNotification(notifSheet, data, headers) {
  notifSheet.getRange(2, 1).setValue(data.title);
  notifSheet.getRange(2, 2).setValue(data.message);
  notifSheet.getRange(2, 3).setValue(new Date().toISOString());
  return createResponse({ success: true, message: "บันทึกการแจ้งเตือนสำเร็จ" }, headers);
}

function handleGetNotification(notifSheet, headers) {
  var title = notifSheet.getRange(2, 1).getValue();
  var message = notifSheet.getRange(2, 2).getValue();
  var updatedAt = notifSheet.getRange(2, 3).getValue();
  
  return createResponse({ 
    success: true, 
    notification: { title: title, message: message, updatedAt: updatedAt, isActive: true } 
  }, headers);
}

function handleGetSupportMessages(sheet, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var messages = [];
  for (var i = 1; i < dataRange.length; i++) {
    messages.push({
      id: dataRange[i][0],
      userId: dataRange[i][1],
      userName: dataRange[i][2],
      userEmail: dataRange[i][3],
      subject: dataRange[i][4],
      content: dataRange[i][5],
      date: dataRange[i][6],
      status: dataRange[i][7],
      replies: dataRange[i][8] ? JSON.parse(dataRange[i][8]) : []
    });
  }
  return createResponse({ success: true, messages: messages }, headers);
}

function handleSaveSupportMessage(sheet, data, headers) {
  var newId = Utilities.getUuid();
  var timestamp = new Date().toISOString();
  sheet.appendRow([
    newId,
    data.userId,
    data.userName,
    data.userEmail,
    data.subject,
    data.content,
    timestamp,
    "unread",
    "[]"
  ]);
  return createResponse({ success: true, message: "ส่งข้อความสำเร็จ" }, headers);
}

function handleUpdateSupportMessage(sheet, data, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var msgId = data.msgId;
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === msgId) {
      if (data.status) sheet.getRange(i + 1, 8).setValue(data.status);
      if (data.replies) sheet.getRange(i + 1, 9).setValue(JSON.stringify(data.replies));
      return createResponse({ success: true, message: "อัปเดตข้อความสำเร็จ" }, headers);
    }
  }
  return createResponse({ success: false, message: "ไม่พบข้อความ" }, headers);
}

function handleGetBellNotifications(sheet, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var notifications = [];
  for (var i = 1; i < dataRange.length; i++) {
    notifications.push({
      id: dataRange[i][0],
      title: dataRange[i][1],
      message: dataRange[i][2],
      date: dataRange[i][3]
    });
  }
  return createResponse({ success: true, notifications: notifications }, headers);
}

function handleSaveBellNotification(sheet, data, headers) {
  var newId = Utilities.getUuid();
  var timestamp = new Date().toISOString();
  sheet.appendRow([
    newId,
    data.title,
    data.message,
    timestamp
  ]);
  return createResponse({ success: true, message: "เพิ่มการแจ้งเตือนสำเร็จ" }, headers);
}

function handleDeleteBellNotification(sheet, data, headers) {
  var dataRange = sheet.getDataRange().getValues();
  var notifId = data.notifId;
  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === notifId) {
      sheet.deleteRow(i + 1);
      return createResponse({ success: true, message: "ลบการแจ้งเตือนสำเร็จ" }, headers);
    }
  }
  return createResponse({ success: false, message: "ไม่พบการแจ้งเตือน" }, headers);
}

function createResponse(responseObject, headers) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}

// จัดการ Preflight Request (CORS)
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
