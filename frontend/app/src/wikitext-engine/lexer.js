// STEP 1
// lexing detects potential trigger symbols

import { TOKEN } from "./tokens.js";

function tokenize(text) {

    let tokens = [];
    let idx = 0;
    let currentText = "";

    // help-function to match and add to tokens with less code
    const match = (trigger, type) => {

        if (text.startsWith(trigger, idx)) {

            // add currentText to tokens
            if (currentText) {
                tokens.push({ type: TOKEN.TEXT, value: currentText });
                currentText = "";
            }

            // add trigger to tokens
            tokens.push({ type: type, value: trigger });
            idx += trigger.length;

            return true;
        }
        return false;

    }


    // main loop
    while (idx < text.length) {

        // first search for potential triggers
        if (match("#", TOKEN.HASH)) continue;
        if (match("\n", TOKEN.NEWLINE)) continue;
        if (match("*", TOKEN.ASTERISK)) continue;
        if (match("_", TOKEN.UNDERSCORE)) continue;
        if (match("[", TOKEN.OPENING_BRACKET)) continue;
        if (match("]", TOKEN.CLOSING_BRACKET)) continue;
        if (match("@", TOKEN.AT)) continue;
        if (match("\\", TOKEN.BACKSLASH)) continue;


        // add current idx to currentText
        // it will be added to tokens by match() as soon as there is another trigger
        currentText += text[idx];
        idx++;

    }


    if (currentText) {
        tokens.push({ type: TOKEN.TEXT, value: currentText });
    }

    return tokens

}

export default tokenize;