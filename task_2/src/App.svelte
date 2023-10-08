<script lang="ts">
  import { onMount } from 'svelte';

  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let fromAmount = 1;
  let toAmount = 0;
  let exchangeRate = 0;
  let currencies: string[] = [];

  async function fetchExchangeRate() {
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
    const data = await response.json();
    exchangeRate = data.rates[toCurrency];
    toAmount = fromAmount * exchangeRate;
  }

  async function fetchCurrencies() {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    currencies = Object.keys(data.rates);
  }

  onMount(() => {
    fetchExchangeRate();
    fetchCurrencies();
  });

  async function handleCurrencyChange() {
    await fetchExchangeRate();
  }

  async function handleAmountToChange() {
    return (fromAmount = +(toAmount / (await getExchangeRate(fromCurrency, toCurrency))).toFixed(
      2,
    ));
  }
  async function handleAmountFromChange() {
    return (toAmount = +(fromAmount / (await getExchangeRate(toCurrency, fromCurrency))).toFixed(
      2,
    ));
  }

  async function getExchangeRate(baseCurrency: string, targetCurrency: string) {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    const data = await response.json();
    return data.rates[targetCurrency];
  }
</script>

<main>
  <h1>Конвертерация онлайн</h1>

  <div>
    <label for="from-currency">Исходная валюта:</label>
    <select id="from-currency" bind:value={fromCurrency} on:change={handleCurrencyChange}>
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
    <input type="number" bind:value={fromAmount} on:input={handleAmountFromChange} />
  </div>

  <div>
    <label for="to-currency">Конечная валюта:</label>
    <select id="to-currency" bind:value={toCurrency} on:change={handleCurrencyChange}>
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
    <input type="number" bind:value={toAmount} on:input={handleAmountToChange} />
  </div>

  <p>Обменный курс: {exchangeRate}</p>
</main>

<style>
</style>
