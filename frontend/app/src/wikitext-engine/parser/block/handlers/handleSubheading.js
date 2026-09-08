import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleSubheading({ token, tokens, idx, parseInline }) {

    if (token.type === TOKEN.HASH && tokens[idx+1].type === TOKEN.HASH) {

        const findTitleEnd = (startIdx) => {

            let hashIdx = startIdx + 1;
            while (
                hashIdx < tokens.length 
                && !(
                    tokens[hashIdx].type === TOKEN.HASH 
                    && tokens[hashIdx+1]?.type === TOKEN.HASH
                ) && tokens[hashIdx].type !== TOKEN.NEWLINE
            
            ) hashIdx++;
            
            return hashIdx;
        }

        const titleEnd = findTitleEnd(idx+1);
        const titleTokens = tokens.slice(idx+2, titleEnd);

        return {
            nextIdx: tokens[titleEnd].type === TOKEN.NEWLINE ? titleEnd+1 : titleEnd+2,
            block: {
                type: FORMAT.subheading,
                title: parseInline(titleTokens, false)
            }
        }

    }
    
    return null;
}

export default handleSubheading;