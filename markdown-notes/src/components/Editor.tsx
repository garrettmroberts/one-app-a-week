import React, { useRef, useState } from 'react';
import BreadCrumbs from './BreadCrumbs';
import { SampleNote as sn } from '../constants/temp';

const Editor: React.FC = () => {
  const [note, setNote] = useState(sn);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = textAreaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
          textarea.value.substring(0, start) +
          '\t' +
          textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }
    }
  };

  return (
    <div className="editor-wrapper">
      <BreadCrumbs />
      <section className="editor">
        <textarea
          ref={textAreaRef}
          placeholder="Write your notes here..."
          className="editor__content"
          onKeyDown={handleKeyDown}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>
    </div>
  );
};

export default Editor;
