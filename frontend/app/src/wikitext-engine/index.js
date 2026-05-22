import render from "./renderer";
import parse from "./parser";
import tokenize from "./lexer";

function wikitextToJsx(wikitext) {

    return render(
        parse(
            tokenize(
                wikitext
            )
        )
    )
}

export default wikitextToJsx;