import { LexerRule } from './lexer-rule.base';
import { SymbolTypes } from './lexer.models';

export class ClassSelectorRule extends LexerRule {
    regex = /(\.[a-zA-Z0-9_-]+)/g;
    ruleType: SymbolTypes = 'selector';
}