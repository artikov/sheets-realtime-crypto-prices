# Crypto Prices Google Sheets Integration

This project integrates cryptocurrency price updates into a Google Sheet using CoinMarketCap's API. A custom Google Apps Script adds a menu to fetch and update the cryptocurrency prices.

---

## Features

- Fetches live cryptocurrency prices from CoinMarketCap based on symbols listed in the sheet.
- Updates the prices in the sheet dynamically.
- Allows manual triggering of price updates via a custom menu.

---

## Prerequisites

1. **Google Account**: Access to Google Sheets and Google Apps Script.
2. **CoinMarketCap API Key**: You need an API key from CoinMarketCap to fetch live cryptocurrency data.

### Getting a CoinMarketCap API Key

1. Go to the [CoinMarketCap Developers Portal](https://coinmarketcap.com/api/).
2. Sign up or log in to your account.
3. Navigate to the **API Key** section under your account settings.
4. Choose the desired plan (Free Tier is sufficient for basic use).
5. Copy your API key from the dashboard.

---

## Setting Up the Script

1. **Open Google Sheets**:
    - Create a new Google Sheet or use an existing one.
2. **Open the Script Editor**:
    - Go to `Extensions > Apps Script`.
3. **Paste the Script**:
    - Copy and paste the code in `script.gs` into the Apps Script editor:

```jsx
function getCryptoData(symbol = "BTC") {
  var url = "<https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest>";
  var apiKey = 'YOUR_COINMARKETCAP_API_KEY'; // Replace with your API key
  var headers = {
    "X-CMC_PRO_API_KEY": apiKey,
    "Accept": "application/json"
  };

  var uppercaseSymbol = symbol.toUpperCase();
  var parameters = { "symbol": uppercaseSymbol };

  var response = UrlFetchApp.fetch(
    url + "?" + Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&'),
    { 'headers': headers }
  );

  var json = JSON.parse(response.getContentText());
  return json.data[uppercaseSymbol].quote.USD.price;
}

```

1. **Replace the API Key**:
    - Replace `'YOUR_COINMARKETCAP_API_KEY'` with your CoinMarketCap API key.
2. **Save the Script**:
    - Click the floppy disk icon or press `Ctrl + S` to save the project.
3. **Authorize the Script**:
    - Run any function (e.g., `onOpen`) and follow the prompts to grant permissions.
4. **Reload the Sheet**:
    - Close and reopen the sheet to trigger the `onOpen` function.

---

## How It Works

1. **Sheet Layout**:
    - Column A contains cryptocurrency symbols (e.g., `BTC`, `ETH`, `DOGE`).
    - Column B will be populated with the fetched prices.

| **A (Symbol)** | **B (Price)** |
| --- | --- |
| BTC | 50000 |
| ETH | 4000 |
| DOGE | 0.2 |
1. **Custom Menu**:
    - A custom "Crypto Prices" menu will appear in the toolbar.
2. **Update Prices**:
    - Select **Crypto Prices > Update Prices** to fetch and update the prices.

---

## Notes

- **Error Handling**:
    - If a symbol is invalid or an API call fails, "Error" with a relevant message will be shown in the price column.
- **API Rate Limits**:
    - Ensure you do not exceed the API rate limits, especially on the Free Tier.
- **Case Insensitivity**:
    - Cryptocurrency symbols are automatically converted to uppercase before the API call.

---

## Advanced Features (Optional)

- **Batch Requests**:
    - Modify the script to fetch prices for multiple symbols in a single API call to optimize requests.
- **Time-Driven Trigger**:
    - Add a trigger to update prices at regular intervals if required (not recommended for this setup).

---

Enjoy your dynamically updated cryptocurrency price sheet!
