import { LexerRule } from "./lexer-rule.base";
import { SymbolTypes, Token } from "./lexer.models";

export class CommentRule extends LexerRule {
    regex = /^\/\/.*/;
    ruleType: SymbolTypes = 'comment';

    checkRule(input: string): Token | undefined {
        const keywordUse: RegExpMatchArray | null = this.regex.exec(input.trim())
        if (keywordUse)
            return undefined;

        // If it doesn't, DEFINITELY throw a syntax error.
        return undefined;    
    }
}