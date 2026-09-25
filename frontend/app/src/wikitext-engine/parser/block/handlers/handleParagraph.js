import { FORMAT } from "../../../formats.js";
import { TOKEN } from "../../../tokens.js";

function handleParagraph(context) {

    const { tokens, idx, REGISTERED_HANDLERS, parseInline } = context;

    const isBlockStart = (tokens, bIdx) => {

        const blockContext = {
            ...context,
            token: tokens[bIdx],
            tokens: tokens,
            idx: bIdx
        }

        // handle escapings
        if (tokens[bIdx-1]?.type === TOKEN.BACKSLASH) return false;

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
    const blockTokens = tokens.slice(idx, blockEnd).filter(t => t.type !== TOKEN.BACKSLASH);

    return {
        nextIdx: blockEnd,
        block: {
            type: FORMAT.paragraph,
            children: parseInline(blockTokens)
        }
    }

}

export default handleParagraph;