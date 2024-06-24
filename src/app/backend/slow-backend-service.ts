import { Injectable, model, signal } from '@angular/core';
import { generateFakeData } from './generator';

export interface EmojiEntry {
  username: string;
  emoji: string;
}

const INITIAL_DATA: EmojiEntry[] = [
  {
    username: 'tlavelle',
    emoji: '🌮',
  },
  {
    username: 'kirjs',
    emoji: '🔥',
  },
  ...generateFakeData(200),
];

@Injectable({ providedIn: 'root' })
export class EmojiService {
  private emojiData: EmojiEntry[] = INITIAL_DATA;
  readonly shouldHaveDelay = signal(true);
  readonly shouldHaveError = signal(false);
  readonly MAX_PAGE_SIZE = 5;
  constructor() {}

  // Function to generate random timeout between 1 to 3 seconds
  private getRandomTimeout(): number {
    console.log(this.shouldHaveDelay());
    return this.shouldHaveDelay()
      ? Math.floor(Math.random() * 1_000) + 2_000
      : 0;
  }

  // Utility function to handle promise with random timeout
  private withRandomTimeout<T>(callback: () => T): Promise<T> {
    return new Promise((resolve, reject) => {
      
      setTimeout(() => {
        if (this.shouldHaveError()) {
          reject('oh noes');
        }

        resolve(callback());
      }, this.getRandomTimeout());
    });
  }

  list(
    pageToken?: string
  ): Promise<{ data: EmojiEntry[]; nextPageToken?: number }> {
    return this.withRandomTimeout(() => {
      const startIndex = Number(pageToken || 0);
      const endIndex = startIndex + this.MAX_PAGE_SIZE;
      const data = this.emojiData.slice(startIndex, endIndex);
      const nextPageToken =
        endIndex < this.emojiData.length ? endIndex : undefined;
      return { data, nextPageToken };
    });
  }

  add(entry: EmojiEntry): Promise<EmojiEntry> {
    return this.withRandomTimeout(() => {
      this.emojiData.unshift(entry);
      return entry;
    });
  }

  delete(username: string): Promise<void> {
    return this.withRandomTimeout(() => {
      this.emojiData = this.emojiData.filter(
        (item) => !(item.username === username)
      );
    });
  }
}
