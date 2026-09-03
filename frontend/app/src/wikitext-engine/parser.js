// STEP 2
// parsing gives the tokens a meaning

import { FORMAT } from "./formats.js";
import { TOKEN } from "./tokens.js";


function groupNodesByHeading(rootNode) {
    // this function should be called at end of parsing
    // it changes the structure of headings to prepare them for rendering

    const new_children = [];

    for (let idx = 0;idx < rootNode.children.length;idx++) {
        
        const node = rootNode.children[idx];

        if (node.type === FORMAT.heading) {

            node.title = node.children[0].value; // has only ONE children because of verbatim = true
            node.children = [];

            // add heading to the new tree
            new_children.push(node);
        } else {

            // handle if there was not a heading before
            if (new_children[new_children.length - 1]?.type !== FORMAT.heading) {
                new_children.push(node);
                continue;
            }

            // add node to children of heading
            new_children[new_children.length - 1].children.push(node);
        }
    }

    return { type: FORMAT.root, children: new_children };
}

function isFirstFormatOfLine(tokens, tokenId) {

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

function parse(tokens, fullMode = true) { // fullMode = false would disable headings, tables etc. and leave simple formats like bold and italic 

    const root =  { type: FORMAT.root, children: [] };
    let stack = [root];

    let escaped = false;
    let token = null;

    const current = () => stack[stack.length - 1];
    const findOpenNodeOf = (type) => stack.filter(e => e.type === type)[0];

    const createPipeArg = (arg) => {

        if (current().pipeArgsAllowed <= (current().pipeArgs?.length || 0)) return;
        if (!current().pipeArgs) current().pipeArgs = [];
        current().pipeArgs.push(arg.trim());
    }

    // opening a node
    const openNode = (type, verbatim=false, pipeArgsAllowed=0) => {

        const node = { type: type, children: [], verbatim: verbatim, pipeArgsAllowed: pipeArgsAllowed };

        // verbatim
        if (current().verbatim) return createTextNode(token.value);

        // not full mode means only these are accepted:
        if (!fullMode && ![FORMAT.bold, FORMAT.italic, FORMAT.underscored, FORMAT.text, FORMAT.root, FORMAT.userlink, FORMAT.wikilink, FORMAT.url].includes(type)) {
            return createTextNode(token.value);
        }

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

            //idx += token.value.length;
            escaped = false;
            continue;
        }


        // standard text
        if (token.type === TOKEN.TEXT) {
            
            createTextNode(token.value);
            continue
        }

        // escape next token
        if (token.type === TOKEN.BACKSLASH && !current().verbatim) {
            escaped = true;
            continue;
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
            if (tokens[idx+2]?.type === TOKEN.IMAGE) {

                openNode(FORMAT.image, true, 2);
                idx += 2;

                continue;
            }
            if (tokens[idx+2]?.type === TOKEN.URL) {

                openNode(FORMAT.url, true, 1);
                idx += 2;

                continue;
            }
            

            openNode(FORMAT.wikilink, true, 1);
            idx++;

            continue;
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

            idx++;
            continue;
        }

        if (token.type === TOKEN.HASH && isFirstFormatOfLine(tokens, idx)) {

            if (tokens[idx+1]?.type === TOKEN.HASH) {

                openNode(FORMAT.subheading, true);

                idx++;
                continue;
            }

            openNode(FORMAT.heading, true);

            continue;
        }

        if (token.type === TOKEN.HASH && tokens[idx+1]?.type === TOKEN.HASH) {
            
            if (findOpenNodeOf(FORMAT.subheading)) {
                closeNode(FORMAT.subheading);
            } else if (findOpenNodeOf(FORMAT.heading)) {
                closeNode(FORMAT.subheading);
                idx--;
            } else {
                createTextNode(token.value + tokens[idx+1]?.value);
            }

            idx++;
            continue;
        }

        if (token.type === TOKEN.HASH) {

            if (findOpenNodeOf(FORMAT.heading)) {
                closeNode(FORMAT.heading);
                continue;
            }
        }

        if (token.type === TOKEN.NEWLINE) {

            if (findOpenNodeOf(FORMAT.heading)) {
                closeNode(FORMAT.heading);
            }
            if (findOpenNodeOf(FORMAT.subheading)) {
                closeNode(FORMAT.subheading);
            }

            openNode(FORMAT.newline);
            closeNode(FORMAT.newline);
            continue;
        }

        if (token.type === TOKEN.PIPE && tokens[idx+1]?.type === TOKEN.TEXT) {
            
            createPipeArg(tokens[idx+1].value);
            idx++;

            continue;
        }



        // fallback if no condition is true
        createTextNode(token.value);

    }

    return groupNodesByHeading(stack[0]);
}

export default parse;