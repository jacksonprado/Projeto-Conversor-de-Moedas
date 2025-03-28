const apiUrl = "https://cdn.moeda.info/api/latest.json";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");

// Cria um contêiner para as bandeiras
const flagsContainer = document.createElement("div");
flagsContainer.style.display = "flex"; // Configura flexbox para bandeiras lado a lado
flagsContainer.style.justifyContent = "center"; // Centraliza as bandeiras
flagsContainer.style.gap = "20px"; // Adiciona espaço entre as bandeiras

// Cria os elementos das bandeiras
const fromLogo = document.createElement("img");
const toLogo = document.createElement("img");

// Adiciona as bandeiras ao contêiner e o contêiner à página
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
