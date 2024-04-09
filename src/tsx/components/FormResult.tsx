// src/components/RandomTextGenerator.tsx
import React, { useState } from 'react';
import {
  getHiraganaChars,
  getKatakanaChars,
  getAlphabetChars,
  getHtmlTags,
  getSpChars,
} from '../utils/charUtils.ts';
import { GenFormData } from '../utils/interface.ts';

interface GeneratorProps {
  formData: GenFormData;
  selectedHtmlTags: string[];
  selectedSpChars: string[];
}

const RandomTextGenerator: React.FC<GeneratorProps> = ({
  formData,
  selectedHtmlTags,
  selectedSpChars
}) => {
  const [editableTexts, setEditableTexts] = useState<string[]>([]);
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);
  const [isGenText, setIsGenText] = useState(false);

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
    <>
      <button
        onClick={generateRandomTexts}
        className={`rand-str-gen__gen-btn ${isGenText ? "clicked" : ""}`}
      >
        {isGenText ? "生成中です" : "生成する"}
      </button>

      {editableTexts.map((_, index) => (
        <div key={index} className="gen-result">
          <textarea
            value={editableTexts[index] || ''}
            onChange={(e) => handleEditableTextChange(e, index)}
            rows={5}
          />
          <div className="gen-result__foot">
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
    </>
  );
};

export default RandomTextGenerator;
