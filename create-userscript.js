const fs = require('fs');

// Read the word data
const wordData = fs.readFileSync('word-data-enriched.json', 'utf8');

// Create the userscript with embedded data
const userscript = `// ==UserScript==
// @name         Kana Practice - Kanji Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Transforms word practice to show kanji with furigana and definitions
// @author       You
// @match        https://vedxyz.github.io/kana/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('[Kana Kanji Practice] Script loaded');

    // Embedded word data
    const WORD_DATA = ${wordData};

    // Create lookup map for fast word access
    function createWordMap(data) {
        const map = new Map();
        data.hiragana.forEach(word => map.set(word.kana, word));
        data.katakana.forEach(word => map.set(word.kana, word));
        return map;
    }

    let wordMap = null;
    let lastKana = null;
    let observer = null;

    // Find the kana display element
    function findKanaElement() {
        const element = document.querySelector('.mantine-1otvypu');
        return element;
    }

    // Replace the kana display with kanji + furigana + definition
    function updateDisplay(kanaElement) {
        const kana = kanaElement.textContent.trim();

        // Skip if same as last processed
        if (kana === lastKana) return;
        lastKana = kana;

        console.log('[Kana Kanji Practice] Processing word:', kana);

        // Look up word data
        const wordData = wordMap.get(kana);

        if (!wordData) {
            console.log('[Kana Kanji Practice] Word not found in database:', kana);
            return;
        }

        // Create styled content
        const furiganaHTML = wordData.kanji === kana
            ? \`<div class="word-display-kana">\${kana}</div>\`
            : \`
                <div class="word-display-container">
                    <div class="word-furigana">\${kana}</div>
                    <div class="word-kanji">\${wordData.kanji}</div>
                </div>
            \`;

        // Replace element content
        kanaElement.innerHTML = furiganaHTML;

        // Find the container and add definition
        const container = kanaElement.closest('.mantine-d9zk78, .mantine-Container-root');
        if (container) {
            // Check if definition already exists
            let defElement = container.querySelector('.word-definition');
            if (!defElement) {
                defElement = document.createElement('div');
                defElement.className = 'word-definition';

                // Insert after the kana element's parent stack
                const stackParent = kanaElement.closest('.mantine-Stack-root');
                if (stackParent && stackParent.nextSibling) {
                    stackParent.parentNode.insertBefore(defElement, stackParent.nextSibling);
                }
            }
            defElement.innerHTML = wordData.definition;
        }
    }

    // Watch for changes in the kana display
    function observeKanaChanges() {
        const kanaElement = findKanaElement();
        if (!kanaElement) {
            console.log('[Kana Kanji Practice] Kana element not found, retrying...');
            setTimeout(observeKanaChanges, 500);
            return;
        }

        console.log('[Kana Kanji Practice] Found kana element, setting up observer');

        // Initial update
        updateDisplay(kanaElement);

        // Create observer for future changes
        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    updateDisplay(kanaElement);
                }
            });
        });

        observer.observe(kanaElement, {
            childList: true,
            characterData: true,
            subtree: true
        });

        console.log('[Kana Kanji Practice] Observer active');
    }

    // Inject custom styles
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = \`
            /* Furigana styling */
            .word-display-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
            }

            .word-furigana {
                font-size: 0.9rem;
                color: #909296;
                letter-spacing: 0.1em;
            }

            .word-kanji {
                font-size: 2rem;
                font-weight: 500;
                color: #c1c2c5;
                letter-spacing: 0.05em;
            }

            .word-display-kana {
                font-size: 2rem;
                font-weight: 500;
                color: #c1c2c5;
            }

            .word-definition {
                font-size: 1.1rem;
                color: #909296;
                text-align: center;
                margin: 1rem 0;
                padding: 0.75rem;
                background-color: rgba(255, 255, 255, 0.03);
                border-radius: 0.5rem;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
        \`;
        document.head.appendChild(style);
        console.log('[Kana Kanji Practice] Styles injected');
    }

    // Initialize the script
    function initializeScript() {
        if (!WORD_DATA) {
            console.error('[Kana Kanji Practice] No word data available');
            return;
        }

        wordMap = createWordMap(WORD_DATA);
        console.log('[Kana Kanji Practice] Word map created with', wordMap.size, 'entries');

        injectStyles();
        observeKanaChanges();
    }

    // Wait for page to load, then start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeScript);
    } else {
        initializeScript();
    }
})();
`;

// Write the complete userscript
fs.writeFileSync('kana-kanji-practice-embedded.user.js', userscript, 'utf8');
console.log('✓ Created kana-kanji-practice-embedded.user.js');
