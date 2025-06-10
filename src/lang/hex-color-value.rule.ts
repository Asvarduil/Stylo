import { LexerRule } from './lexer-rule.base';
import { SymbolTypes, Token } from './lexer.models';

export class HexColorValueRule extends LexerRule {
    ruleType: SymbolTypes = 'value';
    regex: RegExp = /(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))/g;
}