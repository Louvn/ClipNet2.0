// STEP 3
// renderer reads the parsed WikiText to build the right JSX structure

import React from "react";
import { Link } from "react-router-dom";
import { FORMAT } from "./formats.js";
import { useSearch } from "../hooks/useSearch";


function WikiLinkNode({ title }) {
    // TODO: Would be better to not start a search for every single link [caching!]
    const foundArticle = useSearch(title, { content_types: ["article"]})?.[0];

    if (foundArticle?.current_revision.title === title) {
        return <Link to={`/wiki/${foundArticle.slug}`}>{title}</Link>;
    }

    return <Link style={{ color: "red"}} to={`/editor`}>{title}</Link>;
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
            return <h3>{renderedChildren}</h3>
            


        default:
            return null;
    }
}

export default render;