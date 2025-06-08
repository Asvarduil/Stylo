// src/compiler/parser.ts
import { lexer } from "@lang/lexer";
import { Token } from "@lang/lexer.models";
import { AST, ASTRule, ASTProperty } from './AST.models';

export class Parser {
    tokenTree: Token = new Token('root', '', -1);
    AST: AST = new AST();

    constructor(input: string) {
        this.tokenTree = lexer(input);
    }

    parseBlob() {
        this.parseToken(this.tokenTree);
    }

    private parseToken(token: Token) {
      // TODO: Parse token
      switch (token.type) {
        case 'root':
        case 'comment':
          // Intentionally blank, this is merely an organizational token.
          // Ideally comments shouldn't get to this point, but just in case...
          break;

        case 'selector':
          // TODO: Implement
          break;

        case 'state':
          // TODO: Implement
          break;
        
        case 'property':
          // TODO: Implement
          break;

        case 'value':
          // TODO: Implement
      }

      for (let child of token.children) {
        this.parseToken(child);
      }
    }
}
