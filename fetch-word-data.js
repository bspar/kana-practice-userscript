// Script to fetch kanji and definitions from Jisho API for all words
// Run with: node fetch-word-data.js

const hiraganaWords = [
  "あいだ", "あいて", "あおい", "あおぞら", "あかい", "あける", "あげる", "あさごはん",
  "あした", "あそぶ", "あたまがいい", "あつめる", "あなた", "あのかた", "あびる", "あぶない",
  "あまい", "あまり", "あらう", "あるく", "いいえ", "いがあるのですが", "いがい", "いかが",
  "いかがですか", "いがく", "いくつ", "いくら", "いけない", "いけん", "いさん", "いそぐ",
  "いちいちきゅう", "いちど", "いちども", "いちばん", "いつか", "いっしょに", "いつでも", "いっぱい",
  "いつも", "いない", "いなか", "いらっしゃいます", "いろいろな", "うけつけ", "うごく", "うたう",
  "うちゅう", "うりば", "えいが", "えきまえ", "おいしい", "おいのり", "おかげさまで", "おかず",
  "おきる", "おくさん", "おくじょう", "おくりもの", "おくる", "おさがしですか", "おじいさん", "おしえる",
  "おせわになりました", "おそい", "おだいじに", "おっと", "おでこ", "おととい", "おととし", "おとな",
  "おなかがすく", "おなまえ", "おねがいします", "おばあさん", "おばさん", "おひきだしですか", "おもい", "おもいだす",
  "おもう", "おもちゃ", "おもて", "およぐ", "おりる", "おろす", "おわり", "おわる",
  "おんがく", "おんせん", "がいい", "かいがい", "かいがん", "かいぎ", "かいぎしつ", "がいこく",
  "かいしゃ", "かいじょう", "がいたい", "かいだん", "かいも", "かえす", "かえる", "かがく",
  "かがみ", "かかる", "がくせい", "がくぶ", "かけですか", "かける", "かぞく", "かたち",
  "かっこいい", "がっこう", "かなり", "かのじょ", "かびん", "かぶき", "かぶる", "かみがた",
  "かみなり", "かめる", "からい", "からきました", "からだ", "かりる", "かるい", "かわいい",
  "かんがえる", "かんけい", "かんづめ", "がんばる", "きいろい", "きおん", "きかい", "ぎじゅつ",
  "きせつ", "きそく", "きっさてん", "きって", "きっと", "きっぷ", "きのう", "きぶん",
  "きもの", "きゅうこう", "きゅうりょう", "きょう", "きょうかい", "きょうしつ", "きょうみ", "きょく",
  "きょねん", "きらいな", "きれいな", "きんえん", "きんがく", "ぎんこう", "きんじょ", "ぐあい",
  "くうき", "くうこう", "くすり", "くちびる", "くつした", "くなる", "ぐらい", "くるま",
  "くれる", "くろい", "けいざい", "けいたい", "けしき", "けっこうです", "げんいん", "げんかん",
  "けんきゅうしゃ", "げんきん", "けんこう", "げんりょう", "こうえん", "こうがい", "こうくうびん", "こうこう",
  "こうじょう", "こうつう", "こうばん", "こうむいん", "こうよう", "こえる", "こくさい", "こくない",
  "こころ", "ございます", "ごしゅじん", "ごぜん", "こたえ", "ごちゅうもんは", "ことし", "ことば",
  "これから", "こんげつ", "こんしゅう", "こんど", "こんばん", "こんや", "さいきん", "さいご",
  "さいしょ", "さいちゅう", "さいふ", "ざいりょう", "さくぶん", "さくら", "さっき", "ざっし",
  "さどう", "さらいげつ", "さらいしゅう", "さらいねん", "さわる", "さんです", "ざんねんですが", "しあい",
  "しかた", "じかん", "じこくひょう", "しごと", "じしょ", "じしん", "しずかな", "じだい",
  "したぎ", "じたく", "しつれいですが", "じてん", "じてんしゃ", "じどうしゃ", "じどうはんばいき", "じぶんで",
  "じむしょ", "しめる", "しやくしょ", "しゃしん", "しゃちょう", "しゅうかん", "じゅうしょ", "じゅうどう",
  "しゅうまつ", "じゅぎょう", "じゅく", "しゅくだい", "しゅしょう", "しゅじん", "しゅみ", "じょう",
  "しょうがつ", "しょうがっこう", "じょうずな", "しょうせつ", "じょうほう", "しょうゆ", "しょうらい", "しょくどう",
  "しょくひん", "じょせい", "しょるい", "しりょう", "しろい", "しんかんせん", "しんごう", "じんこう",
  "じんじゃ", "しんせき", "しんちょう", "しんぶん", "しんゆう", "すいえい", "すいどう", "すうがく",
  "ずかしい", "すごい", "ずっと", "すてきな", "すてる", "すみません", "すると", "すわる",
  "せいかつ", "せいき", "せいじ", "せいせき", "せいと", "せいひん", "せかい", "せかいじゅう",
  "せきゆ", "せっけん", "せつび", "せなか", "せんしゅ", "せんせい", "ぜんぜん", "せんそう",
  "せんぱい", "ぜんぶ", "ぜんぶで", "せんもん", "そうです", "そうですね", "そして", "そのまま",
  "それじゃ", "それで", "それとも", "それに", "そろそろ", "そんなに", "たいおんけい", "たいかい",
  "だいがく", "だいがくせい", "たいしかん", "たいじゅう", "だいじょうぶ", "たいせつな", "だいたい", "たいてい",
  "だいとうりょう", "だいどころ", "だいぶ", "たいふう", "たいへんな", "たいよう", "だから", "たくさん",
  "たたみ", "たちいりきんし", "たてもの", "たのしい", "たばこ", "たぶん", "たべもの", "たまに",
  "だめです", "たりる", "たんじょうび", "だんせい", "だんだん", "だんぼう", "ちかい", "ちがいます",
  "ちかてつ", "ちから", "ちきゅう", "ちっとも", "ちゃわん", "ちゃん", "ちゅう", "ちゅうがっこう",
  "ちゅうしゃじょう", "ちょうし", "ちょくせつ", "ちょっと", "つかう", "つかる", "つかれる", "つぎの",
  "つくえ", "つくる", "つける", "つごう", "つごうがいい", "つごうがわるい", "つなみ", "つまらない",
  "つめたい", "つれていく", "つれてくる", "ていしょく", "ている", "てがみ", "できる", "でございます",
  "ですから", "てつだう", "てぶくろ", "てんいん", "てんき", "でんき", "てんきですね", "でんげん",
  "でんしゃ", "でんわ", "どうぐ", "どうして", "どうしましたか", "とうとう", "どうぶつ", "どうぶつえん",
  "どうも", "どうやって", "とおい", "ときどき", "どくしん", "とくに", "ところ", "ところで",
  "としょかん", "とちゅう", "どちら", "どちらも", "どっち", "とても", "どなた", "とまる",
  "どろぼう", "どんどん", "どんな", "なおす", "なかなか", "なくす", "なみだ", "ならう",
  "なるほど", "なんがつ", "なんにん", "にいい", "にぎやかな", "について", "にっき", "にほんご",
  "にもつ", "にんき", "ねだん", "ねむい", "ねんがじょう", "のどがかわく", "のぼる", "のみもの",
  "のりかえる", "のりば", "はいしゃ", "はいゆう", "はがき", "はじまる", "はじめ", "はじめて",
  "はじめに", "はじめる", "ばしょ", "はちょっと", "はなび", "はなみ", "はやい", "はやく",
  "はやし", "はらう", "ばんぐみ", "ばんごう", "ばんごはん", "ばんせん", "はんぶん", "ひこうき",
  "びじゅつ", "びじゅつかん", "ひじょうぐち", "ひっこし", "ひまな", "ひゃくとおばん", "ひょう", "びょういん",
  "びょうき", "ひるごはん", "ひるま", "ひろば", "ふうとう", "ふくろ", "ぶっか", "ふとん",
  "ふねで", "ふべんな", "ぶんか", "ぶんがく", "ぶんぽう", "へいじつ", "へたな", "べつべつに",
  "べんごし", "べんとう", "べんりな", "ほうげん", "ほうだい", "ぼうねんかい", "ほうほう", "ほうりつ",
  "ほかに", "ほけんしょう", "ほしい", "ほんしゃ", "ほんとう", "ほんもの", "ほんや", "まいあさ",
  "まいしゅう", "まいつき", "まいとし", "まいにち", "まいばん", "まえる", "まがる", "まける",
  "ませんか", "まだまだです", "まっすぐ", "まつり", "までに", "まれる", "まわす", "まんが",
  "みがく", "みぎがわ", "みじかい", "みどり", "みなさん", "みやげ", "みらい", "みんな",
  "みんなで", "むかえる", "むかし", "むずかしい", "むだな", "むりな", "むりょう", "めいし",
  "もういちど", "もういっぱい", "もうすぐ", "もくてき", "もしもし", "もちろん", "もっていく", "もってくる",
  "もっと", "もみじ", "もらう", "もんだい", "やかん", "やきゅう", "やくにたつ", "やこう",
  "やさしい", "やじるし", "やちん", "やっと", "やはり", "やめる", "ゆうがた", "ゆうびんきょく",
  "ゆうめいな", "ゆうりょう", "ゆっくり", "ゆびわ", "ようじ", "ようしょく", "ようす", "ようちえん",
  "よかったら", "よてい", "よなか", "よほう", "らいねん", "らかい", "らしい", "らせる",
  "りゆう", "りゅうがくせい", "りょう", "りょうしん", "りょうほう", "りょうり", "りょかん", "りょこう",
  "りんご", "るだけ", "れきし", "れんきゅう", "ろうか", "ろんぶん", "わかい", "わかりました",
  "わかります", "わしょく", "わすれもの", "わすれる", "わたし", "わたり", "わりびき", "わるい",
  "をください", "をつけて", "をとる"
];

const katakanaWords = [
  "アイディア", "アニメ", "アルバイト", "イラスト", "インスタント", "インフルエンザ", "エアコン", "エンジン",
  "ガイドブック", "ガソリン", "カタログ", "カット", "カメラ", "カラオケ", "キャンセル", "キャンプ",
  "クラシック", "クラス", "グラス", "クリスマス", "コンテスト", "コンビニ", "サイズ", "サイン",
  "サラダ", "サンダル", "ジャズ", "ジョギング", "スイッチ", "ストレス", "ソフト", "ダイエット",
  "タオル", "ダンス", "チェック", "チケット", "チャレンジ", "チャンス", "テキスト", "デザイン",
  "テスト", "テレビ", "ドラマ", "バイク", "パソコン", "パンダ", "パンフレット", "ピアノ",
  "ビタミン", "ビデオ", "ファイル", "プリント", "プレゼント", "フロント", "ベッド", "ペット",
  "ペットボトル", "ポケット", "ポスト", "ボタン", "ポップス", "ホテル", "ボランティア", "マンション",
  "ミルク", "ラジオ", "ラッシュ", "リサイクル", "リュック", "レストラン", "ロック", "ロボット"
];

async function fetchWordData(kana) {
  try {
    const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kana)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const firstResult = data.data[0];

      // Extract kanji form
      const kanji = firstResult.japanese[0]?.word || kana; // fallback to kana if no kanji

      // Extract English definitions
      const definitions = firstResult.senses
        .flatMap(sense => sense.english_definitions)
        .slice(0, 3) // take top 3 definitions
        .join('; ');

      // Check if it's common/JLPT word
      const jlpt = firstResult.jlpt || [];
      const isCommon = firstResult.is_common || false;

      return {
        kana: kana,
        kanji: kanji,
        definition: definitions,
        jlpt: jlpt,
        isCommon: isCommon
      };
    } else {
      return {
        kana: kana,
        kanji: kana,
        definition: "(definition not found)",
        jlpt: [],
        isCommon: false
      };
    }
  } catch (error) {
    console.error(`Error fetching ${kana}:`, error.message);
    return {
      kana: kana,
      kanji: kana,
      definition: "(error fetching definition)",
      jlpt: [],
      isCommon: false
    };
  }
}

async function processAllWords() {
  console.log('Fetching data for hiragana words...');
  const hiraganaData = [];

  for (let i = 0; i < hiraganaWords.length; i++) {
    const word = hiraganaWords[i];
    console.log(`Processing ${i + 1}/${hiraganaWords.length}: ${word}`);
    const data = await fetchWordData(word);
    hiraganaData.push(data);

    // Rate limiting - wait 200ms between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\nFetching data for katakana words...');
  const katakanaData = [];

  for (let i = 0; i < katakanaWords.length; i++) {
    const word = katakanaWords[i];
    console.log(`Processing ${i + 1}/${katakanaWords.length}: ${word}`);
    const data = await fetchWordData(word);
    katakanaData.push(data);

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const result = {
    hiragana: hiraganaData,
    katakana: katakanaData,
    generatedAt: new Date().toISOString()
  };

  // Write to file
  const fs = require('fs');
  fs.writeFileSync(
    'word-data-enriched.json',
    JSON.stringify(result, null, 2),
    'utf8'
  );

  console.log('\nDone! Data saved to word-data-enriched.json');
  console.log(`Total hiragana words: ${hiraganaData.length}`);
  console.log(`Total katakana words: ${katakanaData.length}`);
}

async function updateMissingWords() {
  const fs = require('fs');

  // Load existing data
  const existing = JSON.parse(fs.readFileSync('word-data-enriched.json', 'utf8'));

  let updated = 0;
  console.log('Updating hiragana words with errors...');

  for (let i = 0; i < existing.hiragana.length; i++) {
    const word = existing.hiragana[i];
    if (word.definition.includes('error fetching')) {
      console.log(`Re-fetching ${word.kana}...`);
      const newData = await fetchWordData(word.kana);
      existing.hiragana[i] = newData;
      updated++;
      // Longer delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\nUpdating katakana words with errors...');

  for (let i = 0; i < existing.katakana.length; i++) {
    const word = existing.katakana[i];
    if (word.definition.includes('error fetching')) {
      console.log(`Re-fetching ${word.kana}...`);
      const newData = await fetchWordData(word.kana);
      existing.katakana[i] = newData;
      updated++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  existing.generatedAt = new Date().toISOString();

  fs.writeFileSync(
    'word-data-enriched.json',
    JSON.stringify(existing, null, 2),
    'utf8'
  );

  console.log(`\nDone! Updated ${updated} words`);
}

// Run based on command line arg
const mode = process.argv[2] || 'all';

if (mode === 'update' || mode === 'fix') {
  updateMissingWords().catch(console.error);
} else {
  processAllWords().catch(console.error);
}
