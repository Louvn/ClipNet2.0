// This file contains logic to render clean content previews used in search results

import { FORMAT } from "./formats";
import tokenize from "./lexer";
import parse from "./parser";
import styles from "./styles.module.css";

function escapeRegex(str) {
    return str ? str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"): str;
}

export function extractNormals(node) {
    
    if (node.type === FORMAT.text) {
        return node.value;
    }
    if (node.type === FORMAT.newline) {
        return "\n";
    }
    if (node.type === FORMAT.heading) {
        return `${node.title}: ${node.children.map(extractNormals).join("")}`;
    }

    return node.children ? node.children.map(extractNormals).join("") : "";
}

export function highlightQuery(txt, query) {

    if (!query) return txt;

    const rgx = new RegExp(`(${escapeRegex(query)})`, "gi");

    const splitted = txt.split(rgx); // seperates not matching and matching: ["none matching", "matching", "non matching"]

    const highlightedTxt = splitted.map((part, idx) => 
        part.toLowerCase() === query.toLowerCase()
        ? <mark key={idx} className={styles.Mark}>{part}</mark>
        : part
    );

    return highlightedTxt;
}

export function extractSnippet(txt, query=null, context=80) {

    const rgx = new RegExp(`(${escapeRegex(query)})`, "gi");
    const firstMatch = txt.search(rgx);

    // if there is no match return this
    if (firstMatch === -1 || !query) return txt.slice(0, context * 2) + (txt.length > context*2 ? "..." : "");

    let start = Math.max(0, firstMatch - context);
    let end = Math.min(txt.length, firstMatch + context);

    // adjust start and end to avoid cutting of words
    while (start > 0 && txt[start] !== " ") start--;
    while (end < txt.length && txt[end] !== " ") end++;


    let snippet = txt.slice(start, end);

    // add "..."
    if (start > 0) {
        snippet = "..." + snippet;
    }
    if (end < txt.length) {
        snippet = snippet + "...";
    }

    return snippet;

}

function renderPreview(txt, searchQuery=null) {

    const parsed = parse(tokenize(txt));
    const normalizedText = extractNormals(parsed);

    const snippet = extractSnippet(normalizedText, searchQuery);
    const highlightedTxt = highlightQuery(snippet, searchQuery);

    return highlightedTxt;
}

export default renderPreview;