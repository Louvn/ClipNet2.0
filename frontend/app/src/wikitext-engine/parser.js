// STEP 2
// parsing gives the tokens a meaning

import { FORMAT } from "./formats.js";
import { TOKEN } from "./tokens.js";

function parse(tokens) {

    const root =  { type: "root", children: [] };
    let stack = [root];

    let escaped = false;
    let token = null;

    const current = () => stack[stack.length - 1];
    const findOpenNodeOf = (type) => stack.filter(e => e.type === type)[0];

    // opening a node
    const openNode = (type, verbatim=false) => {

        const node = { type: type, children: [], verbatim: verbatim };

        // verbatim
        if (current().verbatim) return createTextNode(token.value);

        current().children.push(node);
        stack.push(node);
    }

    // closing a node 
    const closeNode = (type) => {

        if (current().verbatim && !(type === current().type)) return createTextNode(token.value);

        const idxOfOpening = stack.indexOf(findOpenNodeOf(type));
        stack = stack.slice(0, idxOfOpening);
    }


    const createTextNode = (value) => {

        const lastChildOfCurrent = current().children[current().children.length - 1];

        if (lastChildOfCurrent?.type === FORMAT.text) {
            lastChildOfCurrent.value += value;
            return;
        }

        current().children.push({
            type: FORMAT.text,
            value: value
        });
    }



    for (let idx = 0;idx < tokens.length;idx++) {

        token = tokens[idx];

        // escaping
        if (escaped) {

            createTextNode(token.value);

            idx += token.value.length;
            escaped = false;
            continue;
        }


        // standard text
        if (token.type === TOKEN.TEXT) {
            
            createTextNode(token.value);
            continue
        }

        // escape next token
        if (token.type === TOKEN.BACKSLASH) {
            escaped = true;
        }


        if (token.type === TOKEN.ASTERISK && tokens[idx+1]?.type === TOKEN.ASTERISK) {

            if (findOpenNodeOf(FORMAT.bold)) {
                closeNode(FORMAT.bold);
            } else {
                openNode(FORMAT.bold);
            }

            idx++; // do not do the second asterisk twice
            continue
        }

        if (token.type === TOKEN.ASTERISK) {
            
            if (findOpenNodeOf(FORMAT.italic)) {
                closeNode(FORMAT.italic);
            } else {
                openNode(FORMAT.italic);
            }

            continue
        }

        if (token.type === TOKEN.UNDERSCORE) {

            if (findOpenNodeOf(FORMAT.underscored)) {
                closeNode(FORMAT.underscored);
            } else {
                openNode(FORMAT.underscored);
            }

            continue;
        }

        if (token.type === TOKEN.OPENING_BRACKET && tokens[idx+1]?.type === TOKEN.OPENING_BRACKET) {

            if (tokens[idx+2]?.type === TOKEN.AT) {

                openNode(FORMAT.userlink, true);
                idx += 2;

                continue;
            }
            

            openNode(FORMAT.wikilink, true);
            idx++;

            continue;
        }

        if (token.type === TOKEN.CLOSING_BRACKET && tokens[idx+1]?.type === TOKEN.CLOSING_BRACKET) {


            if (findOpenNodeOf(FORMAT.wikilink)) {
                closeNode(FORMAT.wikilink);
            }

            if (findOpenNodeOf(FORMAT.userlink)) {
                closeNode(FORMAT.userlink);
            }

            idx++;
            continue;
        }

    }

    return stack[0]
}

export default parse;