import { TOKEN } from "../../../tokens.js";
import { FORMAT } from "../../../formats.js";

function handleTable({ token, tokens, idx, parseInline }) {

    const isTableOpening = (
        token?.type === TOKEN.OPENING_BRACKET 
        && tokens[idx+1]?.type === TOKEN.TEXT
        && tokens[idx+1]?.value === "table"
        && tokens[idx+2]?.type === TOKEN.CLOSING_BRACKET
    );
    const isTableClosing = (idx) => (
        tokens[idx]?.type === TOKEN.OPENING_BRACKET 
        && tokens[idx+1]?.type === TOKEN.SLASH
        && tokens[idx+2]?.type === TOKEN.TEXT
        && tokens[idx+2]?.value === "table"
        && tokens[idx+3]?.type === TOKEN.CLOSING_BRACKET
    );

    const findTableEnd = (idx) => {

        let tableEnd = idx;
        while (!isTableClosing(tableEnd) && tableEnd < tokens.length) tableEnd++;

        return tableEnd;
    }


    if (isTableOpening) {

        // create table
        let currentIdx = idx+3;
        let rows = [];

        let row = [];
        let cell = [];
        let cellType = FORMAT.tableCell;

        const tableEnd = findTableEnd(idx);

        while (currentIdx < tableEnd) {

            const currentToken = tokens[currentIdx];

            // next row
            if (currentToken.type === TOKEN.NEWLINE) {

                if (cell.length !== 0) row.push({ type: cellType, children: parseInline(cell)});
                if (row.length !== 0) rows.push({ type: FORMAT.tableRow, children: row});
                row = [];
                cell = [];

                cellType = FORMAT.tableCell;

                if (tokens[currentIdx+1]?.type === TOKEN.EXCLAMATION_MARK) {

                    cellType = FORMAT.tableHeaderCell;
                    currentIdx++; // because currentIdx+1 above

                } else if (tokens[currentIdx+1]?.type === TOKEN.PIPE) {

                    currentIdx++;
                }

                currentIdx++;
                continue;
            }

            // next cell
            if (currentToken.type === TOKEN.PIPE && tokens[currentIdx+1]?.type === TOKEN.PIPE) {
                row.push({ type: cellType, children: parseInline(cell)});
                cell = [];

                currentIdx += 2;
                continue;
            }

            // add to current cell (fallback for inlines)
            cell.push(currentToken);

            currentIdx++;
        }

        return {
            nextIdx: tableEnd+4, // +4 => after closing tag
            block: {
                type: FORMAT.table,
                children: rows
            }
        }

    }
    
    return null;
}

export default handleTable;