import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Email.css'; // ל-CSS מותאם

const Email = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSend = () => {
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log('נשלח אל:', to);
    console.log('נושא:', subject);
    console.log('תוכן:', content);
    alert('ההודעה נשלחה (מדומה)');
  };

  return (
    <div className="email-container">
        <h1>האתר בבניה אופציה זאת עדיין לא פעילה🙄🙄</h1>
      <h2>הודעה חדשה</h2>
      <input
        type="text"
        placeholder="אל"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="email-input"
      />
      <input
        type="text"
        placeholder="נושא"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="email-input"
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="email-editor-wrapper"
        editorClassName="email-editor"
        toolbarClassName="email-toolbar"
      />
      <button onClick={handleSend} className="send-button">שליחה</button>
    </div>
  );
};

export default Email;
