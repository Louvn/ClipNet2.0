import { FORMAT } from "../../../formats.js";

function handleParagraph(context) {

    const { tokens, idx, REGISTERED_HANDLERS, parseInline } = context;

    const isBlockStart = (tokens, idx) => {

        const blockContext = {
            ...context,
            token: tokens[idx],
            tokens: tokens,
            idx: idx
        }
        
        return REGISTERED_HANDLERS.filter(h => h !== handleParagraph).some(
            handler => handler(blockContext)?.block // is there any handler beginning a block here?
        )
    }

    const findNextBlock = (startIdx) => {

        let blockIdx = startIdx + 1;
        while (blockIdx < tokens.length && !isBlockStart(tokens, blockIdx)) blockIdx++;
            
        return blockIdx;
    }

    const blockEnd = findNextBlock(idx);
    const blockTokens = tokens.slice(idx, blockEnd);

    return {
        nextIdx: blockEnd,
        block: {
            type: FORMAT.paragraph,
            children: parseInline(blockTokens, true)
        }
    }

}

export default handleParagraph;