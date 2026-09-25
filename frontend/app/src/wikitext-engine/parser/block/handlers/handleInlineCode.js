import { FORMAT } from "../../../formats.js";
import { TOKEN } from "../../../tokens.js";

function handleInlineCode(context) {

    const {token, tokens, idx, parseInline} = context;

    const findNextBacktick = () => {
        let backtickIdx = idx + 1;

        while (tokens[backtickIdx]?.type !== TOKEN.BACKTICK && backtickIdx < tokens.length) backtickIdx++;
        return backtickIdx;
    }

    if (token.type === TOKEN.BACKTICK) {

        const blockEnd = findNextBacktick();
        const blockTokens = tokens.slice(idx+1, blockEnd);

        return {
            nextIdx: blockEnd+1,
            block: {
                type: FORMAT.inlineCode,
                children: parseInline(blockTokens, true)
            }
        }
    }

    return null;
}

export default handleInlineCode;