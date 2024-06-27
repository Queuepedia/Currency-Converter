document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const baseCurrencySelect = document.getElementById('base-currency');
    const targetCurrencySelect = document.getElementById('target-currency');
    const convertButton = document.getElementById('convert-btn');
    const convertedAmountInput = document.getElementById('converted-amount');
    const errorMsg = document.getElementById('error-msg');

    // Function to fetch currencies and populate select options
    async function fetchCurrencies() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.textContent = currency;
                option2.textContent = currency;
                baseCurrencySelect.appendChild(option1);
                targetCurrencySelect.appendChild(option2);
            });
        } catch (error) {
            console.error('Error fetching currencies:', error);
            errorMsg.textContent = 'Failed to fetch currencies. Please try again later.';
        }
    }

    // Function to handle conversion
    function convertCurrency() {
        const baseCurrency = baseCurrencySelect.value;
        const targetCurrency = targetCurrencySelect.value;
        const amount = amountInput.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[targetCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                convertedAmountInput.value = convertedAmount;
                errorMsg.textContent = ''; // Clear any previous error messages
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                errorMsg.textContent = 'Failed to convert. Please check your inputs and try again.';
                convertedAmountInput.value = ''; // Clear conversion result on error
            });
    }

    // Event listener for convert button click
    convertButton.addEventListener('click', convertCurrency);

    // Fetch currencies when DOM content is loaded
    fetchCurrencies();
});
