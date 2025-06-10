import { LexerRule } from './lexer-rule.base';
import { SymbolTypes, Token } from './lexer.models';

export class BackgroundColorPropertyRule extends LexerRule {
    regex: RegExp = /(\b(background-color )\b)/g;
    ruleType: SymbolTypes = 'property';

    checkRule(input: string): Token | undefined {
        const keywordUse: RegExpMatchArray | null = this.regex.exec(input.trim())
        if (!keywordUse)
            return undefined;

        const indentLevel = this.getIndentLevel(input);
        const result = new Token('property', 'background-color', indentLevel);
        return result;
    }
}