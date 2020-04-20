// ==UserScript==
// @name         De-Indexing Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Checks if a URL is de-indexed for search bot crawling or not
// @author       Prithvi Anand
// @match        https://*.housing.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const styles = {
        'success': "font-size:14px; padding:3px; color: lightgreen;",
        'fail': "font-size: 14px; padding:3px; color: pink;"
    }

    let deIndexed = false;
    Array.from(document.getElementsByTagName('meta')).forEach(meta => {
        if(meta.name='robots' && meta.content.includes('noindex')) {
            deIndexed = true;
        }
    })
    console.log(`%cURL is ${deIndexed ? '' : 'NOT '}de-indexed\n${window.location.href}`, deIndexed ? styles.success : styles.fail);
})();