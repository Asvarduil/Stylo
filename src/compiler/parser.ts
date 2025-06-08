// src/compiler/parser.ts
import { lexer } from "../lang/lexer";
import { Token } from "../lang/lexer.models";
import { AST, ASTRule, ASTProperty } from './AST.models';

export class Parser {
    tokenTree: Token = new Token('root', '', -1);
    AST: AST = new AST();

    private currentRule?: ASTRule | null;
    private currentProperty?: string | null;

    constructor(input: string) {
        this.tokenTree = lexer(input);
    }

    parseBlob() {
        let lastIndentationLevel = 0;
        for (const current of this.tokenTree.children) {
            const indentationLevel = current.value.match(/^ */)?.[0].length || 0;
            console.info('Last vs. current indentation level:', lastIndentationLevel, indentationLevel);

            if (indentationLevel < lastIndentationLevel && indentationLevel === 0 && this.currentRule) {
                this.AST.rules.push(this.currentRule);
                this.currentRule = null;
            }
            lastIndentationLevel = indentationLevel;

            console.info('Current token type', current.type);
            switch (current.type) {
                // TODO: Make this able to handle nested selectors later.
                case 'selector':
                    if (indentationLevel === 0) {
                        if (this.currentRule) {
                            this.AST.rules.push(this.currentRule);
                        }

                        this.currentRule = new ASTRule(current.value);
                    }
                    break;

                case 'property':
                    if (!this.currentRule)
                        break;

                    this.currentProperty = current.value;
                    break;

                case 'state':
                    if (!(this.currentProperty && this.currentRule))
                        break;

                    const newProperty = new ASTProperty(this.currentProperty, current.value);
                    this.currentRule.properties.push(newProperty);
                    this.currentProperty = null; // Reset the current property after adding it
                    break;
            }
        }
    }
}

export function parse(input: string) {
  const tokenTree = lexer(input);
  const ast: AST = new AST();
  let currentRule: ASTRule | null = null;
  let currentProperty: string | null = null;

  let lastIndentationLevel = 0; // Keep track of indentation level

  for (const token of tokenTree.children) {
    // Check for indentation based on the leading spaces (assuming 2 spaces per indent)
    const indentationLevel = token.value.match(/^ */)?.[0].length || 0;

    // If we encounter a selector and there's no indentation, it starts a new rule
    if (token.type === "selector" && indentationLevel === 0) {
      if (currentRule) {
        ast.rules.push(currentRule);
      }
      currentRule = new ASTRule(token.value);
    }

    // If we encounter a property and a value
    if (token.type === "property" && currentRule) {
      currentProperty = token.value;
    }

    if (token.type === "value" && currentProperty && currentRule) {
      const newProperty = new ASTProperty(currentProperty, token.value);
      currentRule.properties.push(newProperty);
      currentProperty = null; // Reset the current property after adding it
    }
  }

  // Make sure to push the last rule
  if (currentRule) {
    ast.rules.push(currentRule);
  }

  return ast;
}
