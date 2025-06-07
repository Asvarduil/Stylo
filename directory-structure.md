stylo/
├── src/
│   ├── compiler/
│   │   ├── index.ts          // Main entry point for the transpiler logic
│   │   ├── parser.ts         // Parsing logic to process Stylo code
│   │   ├── transformer.ts    // Logic to convert Stylo code to CSS
│   │   └── types.ts          // Types for Stylo, CSS, and the transpiler
│   ├── lang/
│   │   ├── lexer.ts          // Tokenizer (Lexer) for converting Stylo code to tokens
│   │   ├── syntax.ts         // Grammar rules and syntax for the language
│   │   └── utils.ts          // Helper functions for parsing and lexing
│   ├── test/
│   │   ├── input.stylo       // Sample Stylo input file for testing
│   │   └── output.css        // Expected output CSS for testing
│   └── index.ts              // Entry point for the application
├── package.json
├── tsconfig.json
└── README.md