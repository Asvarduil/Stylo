// src/compiler/transformer.ts
export function transform(ast: any): string {
    return ast.rules
      .map((rule: any) => {
        const properties = rule.properties
          .map((p: any) => `${p.property}: ${p.value}`)
          .join(";\n  "); // Ensure proper spacing for properties in CSS
        return `${rule.selector} {\n  ${properties}\n}`;
      })
      .join("\n\n"); // Add spacing between rules
  }
  