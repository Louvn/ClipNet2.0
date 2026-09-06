import { FORMAT } from "../formats";
import parseBlocks from "./block";

function parse(tokens, fullMode = true) {

    const blocks = parseBlocks(tokens, fullMode);
    const ast = {
        type: FORMAT.root,
        children: blocks
    }

    console.log(JSON.stringify(ast));

    return ast;
}

export default parse;