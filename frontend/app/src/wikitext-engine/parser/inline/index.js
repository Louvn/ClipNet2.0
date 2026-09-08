// STEP 2
// parsing gives the tokens a meaning

import { FORMAT } from "../../formats.js";
import handleBasics from "./handlers/handleBasics.js";
import handleLinks from "./handlers/handleLinks.js";
import { TOKEN } from "../../tokens.js";


function parseInline(tokens, fullMode = true) {

    const root = { type: FORMAT.root, children: []};
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
    const openNode = (type, parseRange, verbatim=false, pipeArgsAllowed=0) => { // parseRange = how many tokens got parsed? Important for verbatim and !fullMode

        const createAsTextNodes = () => {
            let value = "";

            for (let rangeIdx = 0; rangeIdx < parseRange; rangeIdx++) {
                value = value + tokens[rangeIdx]?.value;
            }

            return createTextNode(value);
        }

        const node = { type: type, children: [], verbatim: verbatim, pipeArgsAllowed: pipeArgsAllowed };

        // verbatim
        if (current().verbatim) return createAsTextNodes(token.value);

        // not full mode means only these are accepted:
        if (!fullMode && ![FORMAT.bold, FORMAT.italic, FORMAT.underscored, FORMAT.text, FORMAT.root, FORMAT.userlink, FORMAT.wikilink, FORMAT.url].includes(type)) {
            return createAsTextNodes();
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

    const REGISTERED_HANDLERS = [
        handleBasics,
        handleLinks
    ]

    mainLoop:
    for (let idx = 0;idx < tokens.length;idx++) {

        token = tokens[idx];

        // escaping
        if (escaped) {

            createTextNode(token.value);
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


        const applyHandler = handlerRes => {
            
            const tokensParsed = handlerRes;
            if (!tokensParsed) return false;

            idx += tokensParsed - 1;
            return true;
        }

        const context = {
            token: token,
            tokens: tokens,
            openNode: openNode,
            closeNode: closeNode,
            idx: idx,
            findOpenNodeOf: findOpenNodeOf,
            createTextNode: createTextNode
        }

        for (const handler of REGISTERED_HANDLERS) {

            if (applyHandler(handler(context))) continue mainLoop;
        }



        if (token.type === TOKEN.PIPE && tokens[idx+1]?.type === TOKEN.TEXT) {
            
            createPipeArg(tokens[idx+1].value);
            idx++;

            continue;
        }



        // fallback if no condition is true
        createTextNode(token.value);

    }

    return stack[0].children;
}

export default parseInline;