// src/components/RandomTextGenerator.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../../scss/FormResult.scss';

interface FormResultProps {
  editableTexts: string[];
  onEditableTextChange: (index: number, value: string) => void;
}

const FormResult: React.FC<FormResultProps> = ({
  editableTexts,
  onEditableTextChange,
}) => {
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);
  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);

  useEffect(() => {
    textareaRefs.current.forEach(textarea => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [editableTexts]);

  const copyToClipboard = (index: number) => {
    navigator.clipboard.writeText(editableTexts[index]);
    setClickedBtnIdx(index);
    setTimeout(() => {
      setClickedBtnIdx(null);
    }, 3000);
  };

  return (
    <section className='gen-result'>
      {editableTexts.map((_, index) => (
        <div key={index} className="gen-result__cont">
          <textarea
            value={editableTexts[index] || ''}
            onChange={(e) => onEditableTextChange(index, e.target.value)}
            ref={(textarea) => {
              if (textarea !== null) {
                textareaRefs.current[index] = textarea
              }
            }}
            rows={3}
          />
          <div className="gen-result__cont-foot">
            <p>文字数：{(editableTexts[index] || '').length}</p>
            <button
              onClick={() => copyToClipboard(index)}
              className={clickedBtnIdx === index ? 'clicked' : ''}
            >
              {clickedBtnIdx === index ? 'コピーしました！' : 'コピーする'}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FormResult;
