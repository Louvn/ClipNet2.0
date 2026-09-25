import parseInline from "../inline";
import handleHeading from "./handlers/handleHeading";
import handleParagraph from "./handlers/handleParagraph";
import handleSubheading from "./handlers/handleSubheading";
import handleTable from "./handlers/handleTable";
import handleInlineCode from "./handlers/handleInlineCode";

import { TOKEN } from "../../tokens";
import { FORMAT } from "../../formats";


const REGISTERED_HANDLERS = [
    handleInlineCode, // first
    handleSubheading,
    handleHeading,
    handleTable,

    // fallback
    handleParagraph
];

function parseBlocks(tokens, fullMode) {

    let blocks = [];
    let escape = false;

    mainLoop:
    for (let idx = 0; idx < tokens.length; idx++) {

        const token = tokens[idx];

        // escaping on block level
        if (token.type === TOKEN.BACKSLASH) {
            escape = true; // escape next one
            continue;
        }

        // apply a rule
        const applyHandler = handlerRes => {
            
            if (!handlerRes) return false;

            const nextIdx = handlerRes.nextIdx;
            idx = nextIdx-1;

            // add to blocks/current heading
            if (blocks[blocks.length-1]?.type === FORMAT.heading) blocks[blocks.length-1].children.push(handlerRes.block) 
            else blocks.push(handlerRes.block);

            return true;
        }

        // context given to all handlers
        const context = {
            token: token,
            tokens: tokens,
            idx: idx,
            escape: escape,
            REGISTERED_HANDLERS: REGISTERED_HANDLERS,
            parseInline: (tokens, verbatim = false) => parseInline(tokens, verbatim, fullMode),
            parseBlocks: (tokens) => parseBlocks(tokens, fullMode)
        }
        
        // escape this
        if (escape) {
            applyHandler(handleParagraph(context));
            escape = false;
            continue;
        }

        // register all handlers and check them for this token
        for (const handler of REGISTERED_HANDLERS) {

            if (applyHandler(handler(context))) continue mainLoop;
        }

    }

    return blocks;
}

export default parseBlocks;