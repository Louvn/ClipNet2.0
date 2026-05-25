// STEP 3
// renderer reads the parsed WikiText to build the right JSX structure

import React from "react";
import { Link } from "react-router-dom";
import { FORMAT } from "./formats.js";
import { useWikiIndex } from "../context/WikiIndexContext.jsx";
import { useUserIndex } from "../context/UserIndexContext.jsx";

function WikiLinkNode({ title }) {

    const wikiIndex = useWikiIndex();

    // get article from cached wikiIndex
    const foundArticle = wikiIndex.get(title);

    if (foundArticle) {
        return <Link to={`/wiki/${foundArticle.slug}`}>{title}</Link>;
    }

    return <Link style={{ color: "red"}} to={`/editor?title=${title}`}>{title}</Link>;
}

function UserLinkNode({ username }) {

    const userIndex = useUserIndex();

    const foundUser = userIndex.get(username);

    if (foundUser) {
        return <Link to={`/community/user/${username}`}>@{username}</Link>;
    }

    return <Link style={{ color: "red" }} to={`/404`}>@{username}</Link>;
}

function HeadingNode({ title, children }) {

    return <details>
        <summary>{title}</summary>
        {children}
    </details>;
}

function SubheadingNode({ children }) {
    return <h3>{children}</h3>;
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

        case FORMAT.userlink:
            return <UserLinkNode username={node.children[0]?.value} />;

        case FORMAT.heading:
            return <HeadingNode title={node.title}>{renderedChildren}</HeadingNode>;

        case FORMAT.subheading:
            return <SubheadingNode>{renderedChildren}</SubheadingNode>;
        
        case FORMAT.newline:
            return <br />;


        default:
            return null;
    }
}

export default render;