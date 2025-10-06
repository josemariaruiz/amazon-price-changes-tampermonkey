// ==UserScript==
// @name         Price Difference Calculator with Color
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Calculates and displays price difference with color coding (red/green)
// @author       OpenAI
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Helper to convert price text to number
    function extractPrice(text) {
        if (!text) return 0;
        const numeric = text.trim().substring(1).replace(/,/g, ''); // remove currency symbol and commas
        return parseFloat(numeric);
    }

    // Find all product message containers
    const items = document.querySelectorAll('[data-feature-id="single-imb-message"]');

    items.forEach(item => {
        const prices = item.querySelectorAll('.sc-product-price');

        if (prices.length >= 2) {
            const price1 = extractPrice(prices[0].textContent);
            const price2 = extractPrice(prices[1].textContent);

            const difference = price2 - price1;

            // Create result span
            const diffSpan = document.createElement('span');
            diffSpan.style.display = 'block';
            diffSpan.style.fontWeight = 'bold';
            diffSpan.style.marginTop = '4px';
            diffSpan.textContent = `Difference: ${difference.toFixed(2)}`;

            // Set color based on value
            if (difference > 0) {
                diffSpan.style.color = 'red'; // Price increased
            } else if (difference < 0) {
                diffSpan.style.color = 'green'; // Price decreased
            } else {
                diffSpan.style.color = 'gray'; // No change
            }

            // Append below second price
            prices[1].parentElement.appendChild(diffSpan);
        }
    });
})();
