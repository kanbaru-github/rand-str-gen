import React, { useRef, useState } from "react";
import '../scss/Form.scss';

interface FormData {
  charLength: number;
  hiragana: boolean;
  katakana: boolean;
  alphabet: boolean;
  htmlTags: boolean;
  specialChars: boolean;
  numOfStrings: number;
}

const initialFormData: FormData = {
  charLength: 10,
  hiragana: false,
  katakana: false,
  alphabet: true,
  htmlTags: false,
  specialChars: false,
  numOfStrings: 1,
};

const htmlTags = [
  "<meta name=\"title\" content=\"Meta\" />",
  "<body>Body</body>",
  "<img src=\"\" alt=\"Img\">",
  "<a href=\"\">Anchor</a>",
  "<script>Script</script>",
  "<style>Style</style>",
];

const spChars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "--",
  "//",
  "'",
  "\"",
  "™️",
  "©︎",
];

const Form: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [editableTexts, setEditableTexts] = useState<string[]>([]);
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);
  const [showHtmlTags, setShowHtmlTags] = useState(false);
  const [selectedHtmlTags, setSelectedHtmlTags] = useState<string[]>([]);
  const [contentHeight, setContentHeight] = useState(0);
  const htmlAccordionRef = useRef<HTMLDivElement>(null);

  const [showSpChars, setShowSpChars] = useState(false);
  const [selectedSpChars, setSelectedSpChars] = useState<string[]>([]);
  const [spCharsContHeight, setSpCharsHeight] = useState(0);
  const spCharsAccordionRef = useRef<HTMLDivElement>(null);

  const [isGenText, setIsGenText] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : parseInt(value, 10),
    }));
  };

  const generateRandomTexts = () => {
    setIsGenText(true);
    const { charLength, hiragana, katakana, alphabet, htmlTags, specialChars, numOfStrings } = formData;
    const charSet = [];
    const newTexts = [];

    if (hiragana) charSet.push(...getHiraganaChars());
    if (katakana) charSet.push(...getKatakanaChars());
    if (alphabet) charSet.push(...getAlphabetChars());
    if (htmlTags) charSet.push(...getHtmlTags());
    if (specialChars) charSet.push(...getSpChars());

    for (let i = 0; i < numOfStrings; i++) {
      let randomText = '';
      for (let j = 0; j < charLength; j++) {
        randomText += charSet[Math.floor(Math.random() * charSet.length)];
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

  const toggleSpChars = () => {
    if (spCharsAccordionRef.current) {
      setShowSpChars(!showSpChars);
      const height = spCharsAccordionRef.current?.clientHeight + 15;
      setSpCharsHeight(height);
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

  const toggleHtmlTags = () => {
    if (htmlAccordionRef.current) {
      setShowHtmlTags(!showHtmlTags);
      const height = htmlAccordionRef.current?.clientHeight + 15;
      setContentHeight(height);
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

  const getHiraganaChars = () => {
    return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x3041));
  };

  const getKatakanaChars = () => {
    return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x30a1));
  };

  const getAlphabetChars = () => {
    const lowercase = [...Array(26)].map((_, i) =>
      String.fromCharCode(i + 0x61)
    );
    const uppercase = [...Array(26)].map((_, i) =>
      String.fromCharCode(i + 0x41)
    );
    return [...lowercase, ...uppercase];
  };

  const getHtmlTags = () => {
    return selectedHtmlTags;
  };

  const getSpChars = () => {
    return selectedSpChars;
  }

  return (
    <section className="rand-str-gen">
      <h1>ランダム文字列生成</h1>
      <form className="rand-str-gen__form">
        <label>
          文字数：
          <input
            type="number"
            name="charLength"
            value={formData.charLength}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="hiragana"
            checked={formData.hiragana}
            onChange={handleChange}
          />
          ひらがな
        </label>
        <label>
          <input
            type="checkbox"
            name="katakana"
            checked={formData.katakana}
            onChange={handleChange}
          />
          カタカナ
        </label>
        <label>
          <input
            type="checkbox"
            name="alphabet"
            checked={formData.alphabet}
            onChange={handleChange}
          />
          アルファベット
        </label>

        <label>
          <input
            type="checkbox"
            name="htmlTags"
            checked={formData.htmlTags}
            onChange={toggleHtmlTags}
          />
          HTMLタグ
          <span className={`rand-str-gen__accordion-icon ${showHtmlTags ? "open" : ""}`} />
        </label>
        <div
          style={{
            height: showHtmlTags ? `${contentHeight}px` : "0px",
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

        <label>
          <input
            type="checkbox"
            name="specialChars"
            checked={formData.specialChars}
            onChange={toggleSpChars}
          />
          特殊文字
          <span className={`rand-str-gen__accordion-icon ${showSpChars ? "open" : ""}`} />
        </label>
        <div
          style={{
            height: showSpChars ? `${spCharsContHeight}px` : "0px",
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

        <label>
          生成文字列数：
          <input
            type="number"
            name="numOfStrings"
            value={formData.numOfStrings}
            onChange={handleChange}
          />
        </label>
      </form>

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
    </section>
  );
};

export default Form;
