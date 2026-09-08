import { FORMAT } from "../formats";
import parseBlocks from "./block";

function parse(tokens, fullMode = true) {

    const blocks = parseBlocks(tokens, fullMode);
    const ast = {
        type: FORMAT.root,
        children: blocks
    }

    return ast;
}

export default parse;