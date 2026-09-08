// STEP 3
// renderer reads the parsed WikiText to build the right JSX structure

import React from "react";
import { Link } from "react-router-dom";
import { FORMAT } from "./formats.js";
import { useWikiIndex } from "../context/WikiIndexContext.jsx";
import { useUserIndex } from "../context/UserIndexContext.jsx";
import styles from "./styles.module.css";
import arrowImg from "../assets/icons/arrow.png";
import { useImageIndex } from "../context/ImageIndexContext.jsx";

function WikiLinkNode({ title, visibleTitle }) {

    const wikiIndex = useWikiIndex();

    // get article from cached wikiIndex
    const foundArticle = wikiIndex.get(title);

    if (foundArticle) {
        return <Link className={styles.WikiLink} to={`/wiki/${foundArticle.slug}`}>{visibleTitle || title}</Link>;
    }

    return <Link className={`${styles.WikiLink} ${styles.RedLink}`} to={`/editor?title=${title}`}>{visibleTitle || title}</Link>;
}

function UserLinkNode({ username }) {

    const userIndex = useUserIndex();

    const foundUser = userIndex.get(username);

    if (foundUser) {
        return <Link className={styles.UserLink} to={`/community/user/${foundUser.id}`}>@{username}</Link>;
    }

    return <Link className={`${styles.UserLink} ${styles.RedLink}`} to={`/404`}>@{username}</Link>;
}

function HeadingNode({ title, children }) {

    const renderedTitle = title.map(
        (child, idx) => <React.Fragment key={idx}>{render(child)}</React.Fragment>
    ) || [];

    return <details className={styles.Section}>
        <summary className={styles.Heading}>
            <img src={arrowImg} alt="" />
            {renderedTitle}
            </summary>
        {children}
    </details>;
}

function SubheadingNode({ title }) {

    const renderedTitle = title.map(
        (child, idx) => <React.Fragment key={idx}>{render(child)}</React.Fragment>
    ) || [];

    return <h3 className={styles.Subheading}>{renderedTitle}</h3>;
}

function ImageNode({ id, pipeArgs }) {

    const imageIndex = useImageIndex();
    const img = imageIndex.get(id);

    let width = "50%";
    let additionalClass = styles.Left;

    if (!img) return null;

    pipeArgs?.forEach(arg => {
        if (arg.endsWith("%")) width = `${parseInt(arg, 10)}%`;
        if (arg === "left") additionalClass = styles.Left;
        if (arg === "right") additionalClass = styles.Right;
    });

    return <img style={{ width: width }} className={`${additionalClass} ${styles.Image} noInvert`} src={img.url} alt={img.description} />;
}

function UrlNode({ href, visibleText }) {
    if (window.location.origin === new URL(href, window.location.href).origin) return <Link to={href} className={styles.WikiLink}>{href}</Link>;

    return <a className={styles.WikiLink} href={href}>{visibleText || href}</a>;
}

function TableNode({ children }) {

    return <table className={styles.Table}>
        <tbody>
            {children}
        </tbody>
    </table>
}

function render(node) {

    const renderedChildren = node.children?.map(
        (child, idx) => <React.Fragment key={idx}>{render(child)}</React.Fragment>
    ) || [];

    switch (node.type) {

        case FORMAT.root:
            return <>{renderedChildren}</>;
        case FORMAT.paragraph:
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
            return <WikiLinkNode title={node.children[0]?.value.trim()} visibleTitle={node.pipeArgs?.[0]}/>;

        case FORMAT.userlink:
            return <UserLinkNode username={node.children[0]?.value} />;
        
        case FORMAT.image:
            return <ImageNode id={Number(node.children[0]?.value)} pipeArgs={node.pipeArgs} />;

        case FORMAT.url:
            return <UrlNode href={node.children[0]?.value} visibleText={node.pipeArgs?.[0]}/>;

        case FORMAT.heading:
            return <HeadingNode title={node.title}>{renderedChildren}</HeadingNode>;

        case FORMAT.subheading:
            return <SubheadingNode title={node.title}></SubheadingNode>;
        
        case FORMAT.newline:
            return <br />;


        case FORMAT.table:
            return <TableNode>{renderedChildren}</TableNode>;
        
        case FORMAT.tableRow:
            return <tr>{renderedChildren}</tr>

        case FORMAT.tableCell:
            return <td>{renderedChildren}</td>;

        case FORMAT.tableHeaderCell:
            return <th>{renderedChildren}</th>;


        default:
            return null;
    }
}

export default render;