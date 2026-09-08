import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleHeading({ token, tokens, idx, parseInline, parseBlocks }) {

    if (token.type === TOKEN.HASH) {

        const findBlockEnd = (startIdx) => {

            let hashIdx = startIdx + 1;
            while (
                hashIdx < tokens.length 
                && !(
                    // ignore double hashes
                    tokens[hashIdx].type === TOKEN.HASH
                    && tokens[hashIdx-1]?.type !== TOKEN.HASH
                    && tokens[hashIdx+1]?.type !== TOKEN.HASH
                )) hashIdx++;
            
            return hashIdx;
        }

        const findTitleEnd = (startIdx) => {

            let hashIdx = startIdx + 1;
            while (
                hashIdx < tokens.length 
                && tokens[hashIdx].type !== TOKEN.HASH 
                && tokens[hashIdx].type !== TOKEN.NEWLINE
            ) hashIdx++;
            
            return hashIdx;
        }

        const titleEnd = findTitleEnd(idx);
        const titleTokens = tokens.slice(idx+1, titleEnd);
        
        const blockEnd = findBlockEnd(titleEnd);
        const blockTokens = tokens.slice(titleEnd+1, blockEnd);

        return {
            nextIdx: blockEnd,
            block: {
                type: FORMAT.heading,
                title: parseInline(titleTokens, false),
                children: parseBlocks(blockTokens, true)
            }
        }

    }
    
    return null;
}

export default handleHeading;