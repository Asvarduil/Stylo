import { LexerRule } from "./lexer-rule.base";
import { Token } from "./lexer.models";

export class CommentRule extends LexerRule {
    regex = /^\/\/.*/;

    checkRule(input: string): Token | undefined {
        const keywordUse: RegExpMatchArray | null = this.regex.exec(input.trim())
        if (keywordUse)
            return undefined;

        // If it doesn't, DEFINITELY throw a syntax error.
        return undefined;    
    }
}