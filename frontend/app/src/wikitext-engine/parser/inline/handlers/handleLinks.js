import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleLinks({ token, tokens, idx, openNode, closeNode, findOpenNodeOf, createTextNode }) {

    if (token.type === TOKEN.OPENING_BRACKET && tokens[idx+1]?.type === TOKEN.OPENING_BRACKET) {
    
        if (tokens[idx+2]?.type === TOKEN.AT) {
    
            openNode(FORMAT.userlink, true);
            return 3;
        }
        
        if (tokens[idx+2]?.type === TOKEN.IMAGE) {
    
            openNode(FORMAT.image, true, 2);
            return 3;
        }
        
        if (tokens[idx+2]?.type === TOKEN.URL) {
    
            openNode(FORMAT.url, true, 1);
            return 3;
        }
                
        openNode(FORMAT.wikilink, true, 1);
        return 2;
    }
    
    
    if (token.type === TOKEN.CLOSING_BRACKET && tokens[idx+1]?.type === TOKEN.CLOSING_BRACKET) {
    
        if (findOpenNodeOf(FORMAT.wikilink)) {
            closeNode(FORMAT.wikilink);
    
        } else if (findOpenNodeOf(FORMAT.userlink)) {
            closeNode(FORMAT.userlink);
    
        } else if (findOpenNodeOf(FORMAT.url)) {
            closeNode(FORMAT.url);
    
        } else if (findOpenNodeOf(FORMAT.image)) {
            closeNode(FORMAT.image);
    
        } else {
            createTextNode(token.value + tokens[idx+1]?.value);
        }
    
        return 2;
    }

    return null;
}

export default handleLinks;