import { RefObject, createRef } from 'react';
import { GenFormData } from '../utils/interface';

type Action =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<GenFormData> }
  | { type: 'TOGGLE_HTML_TAGS' }
  | { type: 'UPDATE_SELECTED_HTML_TAGS'; payload: string[] }
  | { type: 'TOGGLE_SP_CHARS' }
  | { type: 'UPDATE_SELECTED_SP_CHARS'; payload: string[] }
  | { type: 'SET_USE_CUSTOM_CHAR'; payload: boolean }
  | { type: 'SET_IS_VALID_FORM_DATA'; payload: boolean };

const initialState: GenFormData & {
  showHtmlTags: boolean;
  selectedHtmlTags: string[];
  showSpChars: boolean;
  selectedSpChars: string[];
  isValidFormData: boolean;
  htmlAccordionRef?: RefObject<HTMLDivElement>;
  htmlTagsAccordionHeight: number;
  spCharsAccordionRef?: RefObject<HTMLDivElement>;
  spCharsAccordionHeight: number;
} = {
  charLength: 10,
  hiragana: false,
  katakana: false,
  alphabet: true,
  htmlTags: false,
  specialChars: false,
  customChar: "",
  numOfStrings: 1,
  showHtmlTags: false,
  selectedHtmlTags: [],
  showSpChars: false,
  selectedSpChars: [],
  useCustomChar: false,
  isValidFormData: false,
  htmlAccordionRef: createRef<HTMLDivElement>(),
  htmlTagsAccordionHeight: 0,
  spCharsAccordionRef: createRef<HTMLDivElement>(),
  spCharsAccordionHeight: 0,
};

const reducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, ...action.payload };
    case 'TOGGLE_HTML_TAGS': {
      const showHtmlTags = !state.showHtmlTags;
      const htmlTagsAccordionHeight = state.htmlAccordionRef?.current?.clientHeight
        ? state.htmlAccordionRef.current.clientHeight + 15
        : 0;
      return { ...state, showHtmlTags, htmlTagsAccordionHeight };
    }
    case 'UPDATE_SELECTED_HTML_TAGS':
      return { ...state, selectedHtmlTags: action.payload };
    case 'TOGGLE_SP_CHARS': {
      const showSpChars = !state.showSpChars;
      const spCharsAccordionHeight = state.spCharsAccordionRef?.current?.clientHeight
        ? state.spCharsAccordionRef.current.clientHeight + 15
        : 0;
      return { ...state, showSpChars, spCharsAccordionHeight };
    }
    case 'UPDATE_SELECTED_SP_CHARS':
      return { ...state, selectedSpChars: action.payload };
    case 'SET_USE_CUSTOM_CHAR':
      return { ...state, useCustomChar: action.payload };
    case 'SET_IS_VALID_FORM_DATA':
      return { ...state, isValidFormData: action.payload };
    default:
      return state;
  }
};

export type { Action };
export { reducer, initialState };
