

function WikiTextEditor({initialContent, initialTitle, onContentChange, onTitleChange}) {
    
    return <div>

        <input 
            type="text" 
            placeholder="Give your Article a Title" 
            value={initialTitle} 
            onChange={onTitleChange}
            />

        <textarea 
            placeholder="Type in the story you want to tell" 
            value={initialContent} 
            onChange={onContentChange}
            />

    </div>

}

export default WikiTextEditor;