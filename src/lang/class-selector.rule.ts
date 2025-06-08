import { LexerRule } from './lexer-rule.base';
import { Token } from './lexer.models';

export class ClassSelectorRule extends LexerRule {
    regex = /(\.[a-zA-Z0-9_-]+)/g;

    checkRule(input: string): Token | undefined {
        const keywordUse: RegExpMatchArray | null = this.regex.exec(input.trim())
        if (!keywordUse)
            return undefined;

        const indentLevel = this.getIndentLevel(input);
        const result = new Token('selector', input.trim(), indentLevel, true);
        return result;
    }
}