import { Token } from './lexer.models';

export abstract class LexerRule {
    debugMode: boolean = true;
    abstract regex: RegExp;

    getIndentLevel(input: string) {
        if (!input || input.length === 0)
            return 0;
        
        return input.length - input.trimStart().length;
    }

    debugMessage(message: string, ...args: any[]) {
        if (!this.debugMode)
            return;

        console.info(message, args);
    }

    abstract checkRule(input: string): Token | undefined;
}