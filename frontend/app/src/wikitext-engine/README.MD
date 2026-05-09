# WikiText Engine
This subdirectory of `/src` contains the **3 steps** to render WikiText.

## 1. the lexer
The lexer starts with the raw text stored in the db and detects special symbols. For Example if there is a `*` in the text it will be `{ type: "ASTERISK" }` after passing the lexer. This helps the parser in the second step.

## 2. the parser
The parser uses the tokenized text made by the lexer to create a AST-like hierarchy of formatting options. In this step it uses detected potential triggers like `{ type: "ASTERISK" }` and checks whether all conditions are true for this asterisk to be the beginning of an *italic* text.

## 3. the renderer
The renderer creates the correct JSX structure based on the Syntax Tree made by the parser.