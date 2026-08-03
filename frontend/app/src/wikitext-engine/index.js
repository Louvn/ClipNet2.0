import render from "./renderer";
import parse from "./parser";
import tokenize from "./lexer";

function wikitextToJsx(wikitext, fullMode = true) {

    return render(
        parse(
            tokenize(
                wikitext
            ),
            fullMode
        )
    )
}

export default wikitextToJsx;