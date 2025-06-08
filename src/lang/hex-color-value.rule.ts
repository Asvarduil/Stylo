import { LexerRule } from './lexer-rule.base';
import { Token } from './lexer.models';

export class HexColorValueRule extends LexerRule {
    regex: RegExp = /(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))/g;
    
    checkRule(input: string): Token | undefined {
        const colorCode = this.regex.exec(input);
        if (!colorCode)
            return undefined;

        const indentLevel = this.getIndentLevel(input);
        const result = new Token('value', colorCode[0], indentLevel);
        return result;
    }
}