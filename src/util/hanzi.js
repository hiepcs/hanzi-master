const HANZI_REGEX = /\p{Script=Han}/u;

export const isHanzi = (char) => HANZI_REGEX.test(char);

export const extractHanzi = (text) =>
  text.split('').filter((c) => isHanzi(c));

export const uniqueHanzi = (text) =>
  [...new Set(text.replace(/\s/g, '').split(''))].filter((c) => isHanzi(c));

export const PAPER_DIMS = {
  a4: { w: 210, h: 297, label: 'A4 (210 x 297mm)' },
  letter: { w: 215.9, h: 279.4, label: 'Letter (8.5 x 11in)' },
};

export const MARGINS = { top: 15, right: 10, bottom: 15, left: 10 };

export const DEFAULT_FONT_FAMILY =
  '"KaiTi", "STKaiti", "楷体", "STKaiti", "Noto Serif SC", serif';
