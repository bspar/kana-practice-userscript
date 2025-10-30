# Kana Practice - Kanji Mode Userscript

A Tampermonkey userscript that enhances the [Kana practice website](https://vedxyz.github.io/kana/) by transforming the word practice mode to show kanji with furigana and English definitions.

## What it does

Instead of showing just kana (e.g., がくせい), the userscript displays:
```
     がくせい          ← Furigana (small, above)
     学生              ← Kanji (large)

student               ← Definition

[romaji input: _____] ← Type romaji here
```

This addresses the concern mentioned in [issue #10](https://github.com/vedxyz/kana/issues/10) - practicing vocabulary with kanji instead of kana-only.

## Features

- Shows kanji for ~675 N5/N4 words
- Displays furigana above the kanji
- Shows English definitions (blurred until hover)
- Previous word definition shown below
- Works with both hiragana and katakana modes
- Dark theme styling

## Installation

Install from [Greasyfork](https://greasyfork.org/en/scripts/554169-kana-practice-kanji-mode) or copy the userscript from this repo.

## Usage

Go to https://vedxyz.github.io/kana/ and select "Word Practice" mode. The script will automatically add kanji and definitions.

## Data Source

The word data (kanji and definitions) is fetched from [Jisho.org](https://jisho.org/) using their public API. The data includes:
- 603 hiragana words
- 72 katakana words
- Kanji forms
- English definitions
- JLPT levels

## Files

- `kana-kanji-practice.user.js` - The userscript
- `fetch-word-data.js` - Fetches word data from Jisho API
- `word-data-enriched.json` - Word data with kanji and definitions
- `create-userscript.js` - Build script

## Customization

You can customize the styling by editing the CSS in the `injectStyles()` function:

```javascript
.word-furigana {
    font-size: 0.9rem;        // Furigana size
    color: #909296;           // Furigana color
}

.word-kanji {
    font-size: 2rem;          // Kanji size
    color: #c1c2c5;           // Kanji color
}

.word-definition {
    font-size: 1.1rem;        // Definition size
    color: #909296;           // Definition color
}
```

## Troubleshooting

If it's not working, check the browser console (F12) for errors. Make sure you're in Word Practice mode. If you see words with "(error fetching definition)", run `make fix` to re-fetch them.

## Development

```bash
make fix       # Re-fetch words with errors
make rebuild   # Rebuild userscript
make check     # Check data quality
```

To fetch all word data from scratch: `node fetch-word-data.js` (takes a few minutes)

## License

This is a personal userscript. The word data comes from Jisho.org. The base website is by [vedxyz](https://github.com/vedxyz/kana).

## Credits

- Original Kana practice site by [vedxyz](https://github.com/vedxyz/kana)
- Word data from [Jisho.org](https://jisho.org/)
- Inspired by [issue #10](https://github.com/vedxyz/kana/issues/10)
