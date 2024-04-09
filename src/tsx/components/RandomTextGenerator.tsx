// src/components/FormSettings.tsx
import React, { useState, useRef } from 'react';
import {
  htmlTags,
  spChars,
} from '../utils/constants.ts';
import FormResult from './FormResult.tsx';
import { GenFormData } from '../utils/interface.ts';
import '../../scss/RandomTextGenerator.scss';

const initialFormData: GenFormData = {
  charLength: 10,
  hiragana: false,
  katakana: false,
  alphabet: true,
  htmlTags: false,
  specialChars: false,
  customChar: "",
  numOfStrings: 1,
};

const RandomTextGenerator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showHtmlTags, setShowHtmlTags] = useState(false);
  const [selectedHtmlTags, setSelectedHtmlTags] = useState<string[]>([]);
  const htmlAccordionRef = useRef<HTMLDivElement>(null);
  const [htmlTagsAccordionHeight, setHtmlTagsAccordionHeight] = useState(0);
  const [showSpChars, setShowSpChars] = useState(false);
  const [selectedSpChars, setSelectedSpChars] = useState<string[]>([]);
  const spCharsAccordionRef = useRef<HTMLDivElement>(null);
  const [spCharsAccordionHeight, setSpCharsAccordionHeight] = useState(0);
  const [useCustomChar, setUseCustomChar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prevFormData) => {
      switch (name) {
        case 'customChar':
          setUseCustomChar(value.trim() !== "");
          return { ...prevFormData, [name]: value };
        case 'hiragana':
        case 'katakana':
        case 'alphabet':
        case 'htmlTags':
        case 'specialChars':
          return { ...prevFormData, [name]: checked };
        default:
          return { ...prevFormData, [name]: parseInt(value, 10) };
      }
    });
  };

  const toggleHtmlTags = () => {
    if (htmlAccordionRef.current) {
      setShowHtmlTags(!showHtmlTags);
      const height = htmlAccordionRef.current?.clientHeight + 15;
      setHtmlTagsAccordionHeight(height);
    }
  }

  const handleHtmlTagCheckboxChange = (tag: string, checked: boolean) => {
    let newSelectedTags = [...selectedHtmlTags];
    if (checked) {
      newSelectedTags.push(tag);
    } else {
      newSelectedTags = newSelectedTags.filter((t) => t !== tag);
    }
    setSelectedHtmlTags(newSelectedTags);
    setFormData((prevFormData) => ({
      ...prevFormData,
      htmlTags: newSelectedTags.length > 0,
    }));
  };

  const handleCheckAllHtmlTags = (checked: boolean) => {
    if (checked) {
      setSelectedHtmlTags(htmlTags);
    } else {
      setSelectedHtmlTags([]);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      htmlTags: checked,
    }));
  };

  const toggleSpChars = () => {
    if (spCharsAccordionRef.current) {
      setShowSpChars(!showSpChars);
      const height = spCharsAccordionRef.current?.clientHeight + 15;
      setSpCharsAccordionHeight(height);
    }
  }

  const handleSpCharsCheckboxChange = (char: string, checked: boolean) => {
    let newSelectedSpChars = [...selectedSpChars];
    if (checked) {
      newSelectedSpChars.push(char);
    } else {
      newSelectedSpChars = newSelectedSpChars.filter((c) => c !== char);
    }
    setSelectedSpChars(newSelectedSpChars);
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialChars: newSelectedSpChars.length > 0,
    }));
  };

  const handleCheckAllSpChars = (checked: boolean) => {
    if (checked) {
      setSelectedSpChars(spChars);
    } else {
      setSelectedSpChars([]);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialChars: checked,
    }));
  };

  return (
    <section className="rand-str-gen">
      <h1>ランダム文字列生成</h1>
      <form className="rand-str-gen__form">
        <label className="rand-str-gen__form-label">
          <div>
            文字数：
            <input
              type="number"
              name="charLength"
              value={formData.charLength}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="hiragana"
              checked={formData.hiragana}
              onChange={handleChange}
            />
            ひらがな
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="katakana"
              checked={formData.katakana}
              onChange={handleChange}
            />
            カタカナ
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="alphabet"
              checked={formData.alphabet}
              onChange={handleChange}
            />
            アルファベット
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="htmlTags"
              checked={formData.htmlTags}
              onChange={toggleHtmlTags}
            />
            HTMLタグ
          </div>
          <p className={`rand-str-gen__accordion-icon ${showHtmlTags ? "open" : ""}`}></p>
        </label>
        <div
          style={{
            height: showHtmlTags ? `${htmlTagsAccordionHeight}px` : "0px",
            opacity: showHtmlTags ? 1 : 0,
          }}
          className="rand-str-gen__accordion-wrap"
        >
          <div
            ref={htmlAccordionRef}
            className="rand-str-gen__accordion-cont"
          >
            <label>
              <input
                type="checkbox"
                checked={selectedHtmlTags.length === htmlTags.length}
                onChange={(e) => handleCheckAllHtmlTags(e.target.checked)}
              />
              すべてチェック
            </label>
            <div className="checkBoxInput">
              {htmlTags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedHtmlTags.includes(tag)}
                    onChange={(e) =>
                      handleHtmlTagCheckboxChange(tag, e.target.checked)
                    }
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="specialChars"
              checked={formData.specialChars}
              onChange={toggleSpChars}
            />
            特殊文字
          </div>
          <span className={`rand-str-gen__accordion-icon ${showSpChars ? "open" : ""}`} />
        </label>
        <div
          style={{
            height: showSpChars ? `${spCharsAccordionHeight}px` : "0px",
            opacity: showSpChars ? 1 : 0,
          }}
          className="rand-str-gen__accordion-wrap"
        >
          <div
            ref={spCharsAccordionRef}
            className="rand-str-gen__accordion-cont"
          >
            <label>
              <input
                type="checkbox"
                checked={selectedSpChars.length === spChars.length}
                onChange={(e) => handleCheckAllSpChars(e.target.checked)}
              />
              すべてチェック
            </label>
            <div className="checkBoxInput">
              {spChars.map((char, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedSpChars.includes(char)}
                    onChange={(e) =>
                      handleSpCharsCheckboxChange(char, e.target.checked)
                    }
                  />
                    {char}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="rand-str-gen__form-label">
          <input
            type="checkbox"
            checked={useCustomChar}
            onChange={handleChange}
          />
          カスタム：
          <input
            type="text"
            name="customChar"
            value={formData.customChar}
            onChange={handleChange}
          />
        </label>

        <label className="rand-str-gen__form-label">
          生成文字列数：
          <input
            type="number"
            name="numOfStrings"
            value={formData.numOfStrings}
            onChange={handleChange}
          />
        </label>
      </form>

      <FormResult
        formData={formData}
        selectedHtmlTags={selectedHtmlTags}
        selectedSpChars={selectedSpChars}
      />
    </section>
  );
};

export default RandomTextGenerator;
