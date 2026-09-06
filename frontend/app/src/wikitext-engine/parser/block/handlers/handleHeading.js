import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleHeading({ token, tokens, idx, parseInline }) {

    if (token.type === TOKEN.HASH) {

        const findNextHash = (startIdx) => {

            let hashIdx = startIdx + 1;
            while (hashIdx < tokens.length && tokens[hashIdx].type !== TOKEN.HASH) hashIdx++;
            
            return hashIdx;
        }

        const titleEnd = findNextHash(idx);
        const titleTokens = tokens.slice(idx+1, titleEnd);
        
        const blockEnd = findNextHash(titleEnd);
        const blockTokens = tokens.slice(titleEnd+1, blockEnd);

        return {
            nextIdx: blockEnd,
            block: {
                type: FORMAT.heading,
                title: parseInline(titleTokens, false),
                children: parseInline(blockTokens, true)
            }
        }

    }
    
    return null;
}

export default handleHeading;