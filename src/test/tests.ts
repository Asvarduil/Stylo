import { lexer } from "../lang/lexer";
import { Parser, parse } from "../compiler/parser";
import { transform } from "../compiler/transformer";

class TestCases {
  private simpleExample: string = `
.button
  color is #FEFEFE
  background-color is #336699
  `;

  runTests() {
    this.canExtractTokens();
    this.canExtractPropertiesToAST();
  }

  private canExtractTokens() {
    // GIVEN a simple example
    // WHEN we pass the example to the lexer
    // THEN we get an accurate series of tokens.

    const tokens = lexer(this.simpleExample);
    console.log("Tokens:", tokens);

    let expectedSelectorCount = 1;
    let expectedPropertyCount = 2;

    let selectorTokens = tokens.filter(t => t.type.trim().toLowerCase() == 'selector');
    let propertyTokens = tokens.filter(t => t.type.trim().toLowerCase() == 'property');

    let isSelectorCountCorrect = selectorTokens?.length === expectedSelectorCount;
    let isPropertyCountCorrect = propertyTokens?.length === expectedPropertyCount;

    if (!isSelectorCountCorrect)
        console.error('Selector count defies expectations:', 
          { expected: expectedSelectorCount}, 
          {found: selectorTokens?.length}, 
          selectorTokens
        );
    if (!isPropertyCountCorrect)
        console.error('Property count defies expectations:', 
            { expected: expectedPropertyCount}, 
            {found: propertyTokens?.length}, 
            propertyTokens
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