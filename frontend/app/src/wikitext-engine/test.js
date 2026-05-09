import parse from "./parser.js";
import tokenize from "./lexer.js";

let text = "[[hallo, [[@link]]";

console.log(
    JSON.stringify(
    parse(
        tokenize(
            text
        )
    ))
)