import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleBasics({ token, tokens, idx, openNode, closeNode, findOpenNodeOf }) {

    if (token.type === TOKEN.ASTERISK && tokens[idx+1]?.type === TOKEN.ASTERISK) {
    
        if (findOpenNodeOf(FORMAT.bold)) {
            closeNode(FORMAT.bold);
        } else {
            openNode(FORMAT.bold, 2);
        }
    
        return 2;
    }
    
    if (token.type === TOKEN.ASTERISK) {
                
        if (findOpenNodeOf(FORMAT.italic)) {
            closeNode(FORMAT.italic);
        } else {
            openNode(FORMAT.italic, 1);
        }
    
        return 1;
    }
    
    if (token.type === TOKEN.UNDERSCORE) {
    
        if (findOpenNodeOf(FORMAT.underscored)) {
            closeNode(FORMAT.underscored);
        } else {
            openNode(FORMAT.underscored, 1);
        }
    
        return 1;
    }

    return null;
}

export default handleBasics;