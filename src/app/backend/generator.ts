function generateRandomUsername() {
    const adjectives = ['happy', 'sad', 'fast', 'slow', 'red', 'blue', 'bright', 'dark', 'funny', 'serious'];
    const nouns = ['lion', 'tiger', 'bear', 'fox', 'wolf', 'eagle', 'shark', 'whale', 'dolphin', 'owl'];
  
    const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
    return `${getRandomItem(adjectives)}_${getRandomItem(nouns)}${Math.floor(Math.random() * 1000)}`;
  }
  
  function generateRandomEmoji() {
    const emojiRanges = [
      [0x1F600, 0x1F64F], // Emoticons
      [0x1F300, 0x1F5FF], // Miscellaneous Symbols and Pictographs
      [0x1F680, 0x1F6FF], // Transport and Map Symbols
      [0x1FA00, 0x1FA6F], // Chess Symbols      
    ];
  
    const getRandomEmojiFromRange = (range: any) => {
      const [start, end] = range;
      const codePoint = Math.floor(Math.random() * (end - start + 1)) + start;
      return String.fromCodePoint(codePoint);
    };
  
    const range = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
    return getRandomEmojiFromRange(range);
  }
  
  export function generateFakeData(count: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        username: generateRandomUsername(),
        emoji: generateRandomEmoji(),
      });
    }
  
    return data;
  }
  
