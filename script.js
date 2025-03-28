const apiUrl = "https://cdn.moeda.info/api/latest.json";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");


const flagsContainer = document.createElement("div");
flagsContainer.style.display = "flex"; 
flagsContainer.style.justifyContent = "center"; 
flagsContainer.style.gap = "20px"; 


const fromLogo = document.createElement("img");
const toLogo = document.createElement("img");


flagsContainer.appendChild(fromLogo);
flagsContainer.appendChild(toLogo);
convertButton.after(flagsContainer);

function updateLogo(currency, logoElement) {
  const logoUrl = `imagens/${currency}.png`;
  logoElement.src = logoUrl;
  logoElement.alt = `Logo de ${currency}`;
  logoElement.style.width = "50px";
  logoElement.style.margin = "10px";
}

async function populateCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    currencies.forEach((currency) => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    updateLogo(fromCurrency.value, fromLogo);
    updateLogo(toCurrency.value, toLogo);

    fromCurrency.addEventListener("change", () =>
      updateLogo(fromCurrency.value, fromLogo)
    );
    toCurrency.addEventListener("change", () =>
      updateLogo(toCurrency.value, toLogo)
    );
  } catch (error) {
    result.textContent = "Erro ao carregar moedas.";
  }
}

async function convertCurrency() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const fromRate = data.rates[fromCurrency.value];
    const toRate = data.rates[toCurrency.value];
    if (fromRate && toRate) {
      const convertedAmount = (amount.value * toRate) / fromRate;
      result.textContent = `${amount.value} ${
        fromCurrency.value
      } = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
    } else {
      result.textContent = "Erro na conversão. Verifique os valores.";
    }
  } catch (error) {
    result.textContent = "Erro ao converter moedas.";
  }
}

convertButton.addEventListener("click", convertCurrency);
populateCurrencies();
