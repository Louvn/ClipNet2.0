import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleHeading({ token, tokens, idx, parseInline }) {
    
    if (token.type === TOKEN.HASH) {

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

        return {
            nextIdx: titleEnd+1,
            block: {
                type: FORMAT.heading,
                title: parseInline(titleTokens, true),
                children: [] // children added in main loop
            }
        }

    }
    
    return null;
}

export default handleHeading;