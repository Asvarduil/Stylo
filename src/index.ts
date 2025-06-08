// src/index.ts
import { lexer } from "@lang/lexer";
import { Parser } from "@compiler/parser";
import { transform } from "@compiler/transformer";

// const input = `.button
//   color is #FEFEFE
//   background-color is #336699

//   on hover
//     background-color is #6699CC
//   on active
//     background-color is #003366`;
const input = `
.button
  color is #FEFEFE
  background-color is #336699
`;

const tokens = lexer(input);
console.log("Tokens:", tokens);

const parser = new Parser(input);
parser.parseBlob();
const ast = parser.AST;
console.log("AST:", JSON.stringify(ast, null, 2));

const css = transform(ast);
console.log("Generated CSS:\n", JSON.stringify(css));
