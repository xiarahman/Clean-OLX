// ==UserScript==
// @name         Remove Featured & Promotional Ads from OLX
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hide OLX ads that contain "Featured" or self-promotion messages
// @author       You
// @match        *://*.olx.com.pk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeUnwantedAds() {
        // Remove Featured Ads
        let adListings = document.querySelectorAll('li[aria-label="Listing"]');
        adListings.forEach(ad => {
            let featuredLabel = ad.querySelector('span[aria-label="Featured"]');
            if (featuredLabel) {
                console.log("Removing Featured Ad:", ad);
                ad.style.display = 'none';
            }
        });

        // Remove Self-Promotion Ads (Matches the given structure)
        let promoAds = document.querySelectorAll('li._167ef7e9');
        promoAds.forEach(ad => {
            let promoText = ad.innerText.toLowerCase();
            if (promoText.includes("want to see your stuff here") || promoText.includes("make some extra cash")) {
                console.log("Removing Self-Promotion Ad:", ad);
                ad.style.display = 'none';
            }
        });
    }

    // Run the function initially after the page loads
    removeUnwantedAds();

    // Observe the DOM for changes and apply the function dynamically (for infinite scrolling pages)
    const observer = new MutationObserver(() => {
        removeUnwantedAds();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
