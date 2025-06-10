import { SymbolTypes, Token } from './lexer.models';

export abstract class LexerRule {
    debugMode: boolean = true;
    protected abstract ruleType: SymbolTypes;
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

    checkRule(input: string): Token | undefined {
        const value: RegExpExecArray | null = this.regex.exec(input.trim());
        if (!value)
            return undefined;

        const indentLevel = this.getIndentLevel(input);
        const result = new Token(this.ruleType, value[0], indentLevel);
        return result;
    }
}