import parseInline from "../inline";
import handleHeading from "./handlers/handleHeading";
import handleParagraph from "./handlers/handleParagraph";
import handleSubheading from "./handlers/handleSubheading";
import handleTable from "./handlers/handleTable";

const REGISTERED_HANDLERS = [
    handleSubheading,
    handleHeading,
    handleTable,

    // fallback
    handleParagraph
];

function parseBlocks(tokens, fullMode) {

    let blocks = [];

    mainLoop:
    for (let idx = 0; idx < tokens.length; idx++) {

        const token = tokens[idx];


        const applyHandler = handlerRes => {
            
            if (!handlerRes) return false;

            const nextIdx = handlerRes.nextIdx;
            idx = nextIdx-1;

            blocks.push(handlerRes.block);
            return true;
        }

        const context = {
            token: token,
            tokens: tokens,
            idx: idx,
            REGISTERED_HANDLERS: REGISTERED_HANDLERS,
            parseInline: (tokens) => parseInline(tokens, fullMode),
            parseBlocks: (tokens) => parseBlocks(tokens, fullMode)
        }

        for (const handler of REGISTERED_HANDLERS) {

            if (applyHandler(handler(context))) continue mainLoop;
        }

    }

    return blocks;
}

export default parseBlocks;