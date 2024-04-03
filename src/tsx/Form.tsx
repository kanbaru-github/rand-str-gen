import React, { useState } from "react";
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

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editableTexts, setEditableTexts] = useState<string[]>([]);
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : parseInt(value, 10),
    }));
  };

  const generateRandomTexts = () => {
    const { charLength, hiragana, katakana, alphabet, htmlTags, specialChars, numOfStrings } = formData;
    const charSet = [];
    const newTexts = [];

    if (hiragana) charSet.push(...getHiraganaChars());
    if (katakana) charSet.push(...getKatakanaChars());
    if (alphabet) charSet.push(...getAlphabetChars());
    if (htmlTags) charSet.push(...getHtmlTags());
    if (specialChars) charSet.push(...getSpecialChars());

    for (let i = 0; i < numOfStrings; i++) {
      let randomText = '';
      for (let j = 0; j < charLength; j++) {
        randomText += charSet[Math.floor(Math.random() * charSet.length)];
      }
      newTexts.push(randomText);
    }
    setEditableTexts(newTexts);
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
    return [
      "<meta name=\"title\" content=\"Meta\" />",
      "<body>Body</body>",
      "<img src=\"\" alt=\"Img\">",
      "<a href=\"\">Anchor</a>",
      "<script>Script</script>",
      "<style>Style</style>",
    ];
  };

  const getSpecialChars = () => {
    return [
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
      "\""
    ];
  };

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
            onChange={handleChange}
          />
          HTMLタグ
        </label>
        <label>
          <input
            type="checkbox"
            name="specialChars"
            checked={formData.specialChars}
            onChange={handleChange}
          />
          特殊文字
        </label>
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
        className="rand-str-gen__gen-btn"
      >
        生成する
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
              className={clickedBtnIdx === index ? 'is-clicked' : ''}
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
