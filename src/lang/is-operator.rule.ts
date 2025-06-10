import { LexerRule } from "./lexer-rule.base";
import { SymbolTypes, Token } from "./lexer.models";

export class IsOperatorRule extends LexerRule {
    ruleType: SymbolTypes = 'operator';
    regex: RegExp = /\b( is )\b/g;

    checkRule(input: string): Token | undefined {
        const keywordUse: RegExpMatchArray | null = this.regex.exec(input.trim())
        if (!keywordUse)
            return undefined;

        const indentLevel = this.getIndentLevel(input);
        const result = new Token('operator', 'is', indentLevel, true);
        // TODO: Require property and a value, otherwise syntax error
        return result;
    }
}