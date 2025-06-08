import { lexer } from "../lang/lexer";
import { Parser } from "../compiler/parser";
import { transform } from "../compiler/transformer";

import { Token } from '../lang/lexer.models';
import { ClassSelectorRule } from "../lang/class-selector.rule";
import { ColorPropertyRule } from "../lang/color-property.rule";
import { HexColorValueRule } from "../lang/hex-color-value.rule";
import { CommentRule } from "../lang/comment.rule";

class TestCases {
  private simpleExample: string = `
// This is the simplest Stylo example possible
.button
  color is #FEFEFE
  background-color is #336699
`;

  runTests() {
    this.canIdentifyComment();
    this.canIdentifyClassSelector();
    this.canIdentifyColorPropertyAndValue();
    this.canExtractTokens();
    // this.canExtractPropertiesToAST();
  }

  private canIdentifyComment() {
    // GIVEN a comment line starting with //
    // WHEN I pass this line to the comment rule
    // THEN undefined is returned, because this should be ignored by the language.
    const stylo = '// This is a comment!';
    const commentRule = new CommentRule();

    const token = commentRule.checkRule(stylo);

    const canIdentifyComment = token == undefined;
    if (canIdentifyComment)
      console.info('[SUCCESS] Can identify a comment!');
    else
      console.info('Could not identify a comment by the // token');
  }

  private canIdentifyClassSelector() {
    // GIVEN a selector .button
    // WHEN I pass this selector to the class selector rule
    // THEN a Token of type selector with value .button is generated
    const stylo = '.button';
    const classSelectorRule = new ClassSelectorRule();

    const token = classSelectorRule.checkRule(stylo);

    const canIdentifySelector = token && token.type === 'selector' && token.value === '.button' && token.indentLevel === 0;
    if (!canIdentifySelector)
      console.error('Class selector not recognized >', stylo, token);
    else
      console.info('[SUCCESS] The class selection rule can identify class selectors.');
  }

  private canIdentifyColorPropertyAndValue() {
    // GIVEN the stylo color is #FEFEFE
    // WHEN I pass this to the color property and hex color value rules
    // THEN we get an accurate set of tokens from both rules.

    const stylo = 'color is #FEFEFE';
    const rules = [
      new ColorPropertyRule(),
      new HexColorValueRule()
    ];

    const tokens: (Token | undefined )[] = rules.map(m => m.checkRule(stylo));

    const hasColorPropertyRule = tokens.find(t => !!t && t.type === 'property' && t.value === 'color');
    const hasHexColorValueRule = tokens.find(t => !!t && t.type === 'value' && t.value === '#FEFEFE');
    const hasFoundBothTokens = hasColorPropertyRule && hasHexColorValueRule;

    if (hasFoundBothTokens) {
      console.info('[SUCCESS] Can correctly identify the color property and its hex value');
      return;
    }

    if (!hasColorPropertyRule)
      console.error('Could not find color property token >', stylo, tokens);
    if (!hasHexColorValueRule)
      console.error('Could not find color property hex value token >', stylo, tokens);
  }

  private canExtractTokens() {
    // GIVEN a simple example
    // WHEN we pass the example to the lexer
    // THEN we get an accurate series of tokens.

    const tokenTree = lexer(this.simpleExample);
    console.log("Token Tree:", tokenTree.renderTree());

    let expectedSelectorCount = 1;
    let expectedPropertyCount = 2;

    let selectorTokens = tokenTree.findChildrenByCriteria(t => t.type.trim().toLowerCase() == 'selector');
    let propertyTokens = tokenTree.findChildrenByCriteria(t => t.type.trim().toLowerCase() == 'property');

    let isSelectorCountCorrect = selectorTokens?.length === expectedSelectorCount;
    let isPropertyCountCorrect = propertyTokens?.length === expectedPropertyCount;

    if (!isSelectorCountCorrect)
        console.error('Selector count defies expectations:', 
          { expected: expectedSelectorCount}, 
          {found: selectorTokens?.length}
        );
    if (!isPropertyCountCorrect)
        console.error('Property count defies expectations:', 
            { expected: expectedPropertyCount}, 
            {found: propertyTokens?.length}
        );

    if (isSelectorCountCorrect && isPropertyCountCorrect)
        console.info('[SUCCESS] Can Extract Tokens');
  }

  private canExtractPropertiesToAST() {
    // GIVEN the simple example
    // AND that the lexer creates a token set
    // WHEN we call the parser
    // THEN an AST is created that faithfully represents the token hierarchy
    // const ast = parse(this.simpleExample);
    // console.log("AST:", JSON.stringify(ast, null, 2));
    const parser = new Parser(this.simpleExample);
    parser.parseBlob();
    const ast = parser.AST;
    console.log("AST:", JSON.stringify(ast, null, 2));

    let expectedPropertyCount = 2;
    let isPropertyCountCorrect = ast.rules[0].properties.length == expectedPropertyCount;

    if (!isPropertyCountCorrect)
        console.error('Property count defies expectations:', 
            { expected: expectedPropertyCount}, 
            {found: ast.rules[0].properties.length}, 
            ast
        );

    if (isPropertyCountCorrect)
        console.info('[SUCCESS] Can extract properties to AST');
  }
}

const tests = new TestCases();
tests.runTests();