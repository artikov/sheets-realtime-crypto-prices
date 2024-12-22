function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Crypto Prices")
    .addItem("Update Prices", "updateCryptoPrices") // Add a menu item to trigger updates
    .addToUi();
}

function updateCryptoPrices() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var symbolColumn = 1; // Column A
  var priceColumn = 3;  // Column C
  var lastRow = sheet.getLastRow(); // Get the last row with data

  for (var row = 3; row < lastRow; row++) {
    var symbol = sheet.getRange(row, symbolColumn).getValue(); // Get the symbol from Column A
    if (symbol) { // Ensure the cell is not empty
      try {
        var price = getCryptoData(symbol); // Fetch the price
        sheet.getRange(row, priceColumn).setValue(price); // Update the price in Column B
      } catch (e) {
        sheet.getRange(row, priceColumn).setValue("Error: " + e.message); // Handle errors
      }
    }
  }
}

function getCryptoData(symbol) {
  var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  var apiKey = 'YOUR_COINMARKETCAP_API_KEY'; // Replace with your API key
  var headers = {
  "X-CMC_PRO_API_KEY": apiKey,
  "Accept": "application/json"
  };

  var uppercaseSymbol = symbol.toUpperCase();

  var parameters = {
  "symbol": uppercaseSymbol
  };

  var response = UrlFetchApp.fetch(url + "?" + Object.keys(parameters).map(key => key + '=' +
  parameters[key]).join('&'), {'headers': headers});
  var json = JSON.parse(response.getContentText());

  var price = json.data[uppercaseSymbol].quote.USD.price;
  return price;
}
