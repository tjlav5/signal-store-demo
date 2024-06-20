import { Injectable } from "@angular/core";

export interface EmojiEntry {
    username: string;
    emoji: string;
}

const INITIAL_DATA: EmojiEntry[] = [{
    username: 'tlavelle',
    emoji: '🌮'
}]

@Injectable({ providedIn: 'root' })
export class EmojiService {
    private emojiData: EmojiEntry[] = INITIAL_DATA;

    constructor() { }

    // Function to generate random timeout between 1 to 3 seconds
    private getRandomTimeout(): number {
        return Math.floor(Math.random() * 1_000) + 2_000;
    }

    // Utility function to handle promise with random timeout
    private withRandomTimeout<T>(callback: () => T): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(callback()), this.getRandomTimeout());
        });
    }

    list(): Promise<EmojiEntry[]> {
        return this.withRandomTimeout(() => this.emojiData.slice());
    }

    add(entry: EmojiEntry): Promise<EmojiEntry> {
        return this.withRandomTimeout(() => {
            this.emojiData.push(entry);
            return entry;
        });
    }

    delete(entry: EmojiEntry): Promise<void> {
        return this.withRandomTimeout(() => {
            this.emojiData = this.emojiData.filter(
                (item) => !(item.username === entry.username && item.emoji === entry.emoji)
            );
        });
    }
}