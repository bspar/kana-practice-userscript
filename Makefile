.PHONY: help fix rebuild check clean

help:
	@echo "Available commands:"
	@echo "  make fix      - Re-fetch words with missing/error definitions"
	@echo "  make rebuild  - Rebuild userscript from current data"
	@echo "  make check    - Check data quality"
	@echo "  make clean    - Remove temporary files"
	@echo "  make all      - Fetch all words from scratch (SLOW!)"

fix:
	@echo "Fixing words with errors..."
	@node fetch-word-data.js update
	@node -e "const fs = require('fs'); \
		const data = JSON.parse(fs.readFileSync('word-data-enriched.json', 'utf8')); \
		const wordMap = {}; \
		[...data.hiragana, ...data.katakana].forEach(w => wordMap[w.kana] = {kana: w.kana, kanji: w.kanji, definition: w.definition}); \
		fs.writeFileSync('word-map-compact.json', JSON.stringify(wordMap));"
	@$(MAKE) rebuild

rebuild:
	@echo "Rebuilding userscript..."
	@node create-userscript.js
	@echo "✓ kana-kanji-practice.user.js updated!"

check:
	@node -e "const fs = require('fs'); \
		const data = JSON.parse(fs.readFileSync('word-data-enriched.json', 'utf8')); \
		let errors = 0, missing = 0; \
		[...data.hiragana, ...data.katakana].forEach(w => { \
			if (w.definition.includes('error')) errors++; \
			if (w.kanji === w.kana && !/^[ァ-ヶー]+$$/.test(w.kana)) missing++; \
		}); \
		console.log('Total words:', data.hiragana.length + data.katakana.length); \
		console.log('Errors:', errors); \
		console.log('Possibly missing kanji:', missing);"

clean:
	@rm -f word-data-compact.js kana-kanji-practice-embedded.user.js
	@echo "Cleaned temporary files"

all:
	@echo "Fetching ALL words from scratch (this will take ~3 minutes)..."
	@node fetch-word-data.js
	@$(MAKE) fix
