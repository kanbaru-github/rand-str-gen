// src/components/RandomTextGenerator.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  getHiraganaChars,
  getKatakanaChars,
  getAlphabetChars,
  getHtmlTags,
  getSpChars,
} from '../utils/charUtils.ts';
import { GenFormData } from '../utils/interface.ts';
import '../../scss/FormResult.scss';

interface GeneratorProps {
  formData: GenFormData;
  selectedHtmlTags: string[];
  selectedSpChars: string[];
  isValidFormData: boolean;
}

const RandomTextGenerator: React.FC<GeneratorProps> = ({
  formData,
  selectedHtmlTags,
  selectedSpChars,
  isValidFormData
}) => {
  const [editableTexts, setEditableTexts] = useState<string[]>([]);
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);
  const [isGenText, setIsGenText] = useState(false);
  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);

  useEffect(() => {
    textareaRefs.current.forEach(textarea => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [editableTexts]);

  const generateRandomTexts = () => {
    setIsGenText(true);
    const { charLength, hiragana, katakana, alphabet, htmlTags, specialChars, customChar, numOfStrings } = formData;
    const charSet = [];
    const newTexts = [];

    if (hiragana) charSet.push(...getHiraganaChars());
    if (katakana) charSet.push(...getKatakanaChars());
    if (alphabet) charSet.push(...getAlphabetChars());
    if (htmlTags) charSet.push(...getHtmlTags(selectedHtmlTags));
    if (specialChars) charSet.push(...getSpChars(selectedSpChars));
    if (customChar) charSet.push(customChar);

    for (let i = 0; i < numOfStrings; i++) {
      let randomText = '';
      while (randomText.length < charLength) {
        randomText += charSet[Math.floor(Math.random() * charSet.length)];
      }
      if (randomText.length > charLength) {
        randomText = randomText.slice(0, charLength);
      }

      newTexts.push(randomText);
    }
    setEditableTexts(newTexts);

    setTimeout(() => {
      setIsGenText(false);
    }, 1000);
  };

  const handleEditableTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newEditableTexts = [...editableTexts];
    newEditableTexts[index] = e.target.value;
    setEditableTexts(newEditableTexts);
  };

  const copyToClipboard = (index: number) => {
    navigator.clipboard.writeText(editableTexts[index]);
    setClickedBtnIdx(index);
    setTimeout(() => {
      setClickedBtnIdx(null);
    }, 3000);
  };

  return (
    <section className='gen-result'>
      <button
        onClick={generateRandomTexts}
        className={`gen-result__gen-btn ${isGenText ? "clicked" : ""} ${!isValidFormData ? "disabled" : ""}`}
      >
        {isGenText ? "生成中です" : "生成する"}
      </button>

      {editableTexts.map((_, index) => (
        <div key={index} className="gen-result__cont">
          <textarea
            value={editableTexts[index] || ''}
            onChange={(e) => handleEditableTextChange(e, index)}
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

export default RandomTextGenerator;
