// STEP 3
// renderer reads the parsed WikiText to build the right JSX structure

import React from "react";
import { Link } from "react-router-dom";
import { FORMAT } from "./formats.js";
import { useWikiIndex } from "../context/WikiIndexContext.jsx";


function WikiLinkNode({ title }) {

    const wikiIndex = useWikiIndex();

    // get article from cached wikiIndex
    const foundArticle = wikiIndex.get(title);

    if (foundArticle) {
        return <Link to={`/wiki/${foundArticle.slug}`}>{title}</Link>;
    }

    return <Link style={{ color: "red"}} to={`/editor?title=${title}`}>{title}</Link>;
}


function render(node) {

    const renderedChildren = node.children?.map(
        (child, idx) => <React.Fragment key={idx}>{render(child)}</React.Fragment>
    ) || [];

    switch (node.type) {

        case FORMAT.root:
            return <>{renderedChildren}</>;

        case FORMAT.text:
            return node.value;
            
        case FORMAT.bold:
            return <strong>{renderedChildren}</strong>;

        case FORMAT.italic:
            return <em>{renderedChildren}</em>;

        case FORMAT.underscored:
            return <u>{renderedChildren}</u>;

        case FORMAT.wikilink:
            return <WikiLinkNode title={node.children[0]?.value} />;

        case FORMAT.heading:
            return <h2>{renderedChildren}</h2>;

        case FORMAT.subheading:
            return <h3>{renderedChildren}</h3>;
        
        case FORMAT.newline:
            return <br />;


        default:
            return null;
    }
}

export default render;