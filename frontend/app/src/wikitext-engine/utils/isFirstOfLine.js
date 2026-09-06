import { TOKEN } from "../tokens";

function isFirstOfLine(tokens, tokenId) {

    for (let idx = tokenId-1;idx >= 0;idx--) {
        if (tokens[idx].type === TOKEN.NEWLINE) {
            break;
        }
        if (tokens[idx].type === TOKEN.TEXT) {
            if (tokens[idx].value.trim() === "") continue;
        }

        return false;
    }

    return true;
}

export default isFirstOfLine;