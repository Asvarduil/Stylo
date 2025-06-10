import { LexerRule } from './lexer-rule.base';
import { ClassSelectorRule } from './class-selector.rule';
import { Token } from './lexer.models';
import { ColorPropertyRule } from './color-property.rule';
import { BackgroundColorPropertyRule } from './background-color-property.rule';
import { HexColorValueRule } from './hex-color-value.rule';
import { CommentRule } from './comment.rule';
import { IsOperatorRule } from './is-operator.rule';

export function lexer(input: string): Token {
  const tokenTreeRoot: Token = new Token('root', '', -1, true);
  if (!input || input.length === 0)
    return tokenTreeRoot;

  const rules: LexerRule[] = [
    new CommentRule(),
    new ClassSelectorRule(),
    new IsOperatorRule(),
    new ColorPropertyRule(),
    new BackgroundColorPropertyRule(),
    new HexColorValueRule()
  ];

  let currentAncestor: Token = tokenTreeRoot;
  
  const lines: string[] = input.split('\n');

  for (let current of lines) {
    const tokens = rules
      .map(r => r.checkRule(current))
      .filter(m => m != undefined);

    if (!tokens || tokens.length === 0)
      continue;

    currentAncestor.children.push(...tokens);

    // We should switch to the most recent ancestor IF...
    //   1. Current ancestor can have children.
    //   2. Current indent level is bigger than last indent level
    const lastToken = tokens[tokens.length - 1];
    if (lastToken.canHaveChildren && (lastToken.indentLevel > currentAncestor.indentLevel)) {
      currentAncestor = lastToken;
    }
  }

  return tokenTreeRoot;
}
