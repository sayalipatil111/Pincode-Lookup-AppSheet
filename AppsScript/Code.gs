function fetchPincodeDetails() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var inputSheet = ss.getSheetByName("Pincode Input");

  var outputSheet = ss.getSheetByName("Pincode Details");

  var lastRow = inputSheet.getLastRow();

  var pincode = inputSheet.getRange(lastRow,1).getValue();

  var url="https://api.postalpincode.in/pincode/"+pincode;

  var response=UrlFetchApp.fetch(url);

  var data=JSON.parse(response.getContentText());

  if(data[0].Status=="Success"){

    var office=data[0].PostOffice[0];

    outputSheet.appendRow([
      pincode,
      office.District,
      office.State,
      office.Region
    ]);

  }

}
