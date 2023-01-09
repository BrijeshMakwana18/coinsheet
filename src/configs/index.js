const encryptedKeys = {
  a: 5,
  b: 9,
  c: 19,
  d: 24,
  e: 31,
  f: 18,
  g: 12,
  h: 33,
  i: 4,
  j: 7,
  k: 1,
  l: 11,
  m: 30,
  n: 22,
  o: 38,
  p: 39,
  q: 23,
  r: 2,
  s: 37,
  t: 35,
  u: 25,
  v: 0,
  w: 3,
  x: 16,
  y: 10,
  z: 13,
  A: 42,
  B: 58,
  C: 55,
  D: 54,
  E: 61,
  F: 53,
  G: 62,
  H: 52,
  I: 46,
  J: 44,
  K: 47,
  L: 48,
  M: 60,
  N: 56,
  O: 51,
  P: 17,
  Q: 41,
  R: 59,
  S: 57,
  T: 43,
  U: 40,
  V: 49,
  W: 32,
  X: 28,
  Y: 50,
  Z: 45,
  1: 20,
  2: 29,
  3: 6,
  4: 14,
  5: 36,
  6: 8,
  7: 21,
  8: 34,
  9: 26,
  0: 15,
};

const encryptedChar = [
  'x',
  'x',
  'p',
  'e',
  '1',
  'v',
  'D',
  'O',
  'I',
  '6',
  '9',
  'i',
  'h',
  'W',
  'L',
  'u',
  'm',
  'G',
  'a',
  'F',
  'J',
  '4',
  'k',
  '3',
  'N',
  'f',
  'o',
  '7',
  '0',
  'Q',
  'S',
  'X',
  'E',
  'Z',
  'y',
  's',
  'c',
  'K',
  'l',
  'b',
  'C',
  'g',
  'U',
  'z',
  'H',
  'A',
  'w',
  '8',
  'T',
  'P',
  'Y',
  'j',
  'q',
  'M',
  't',
  'R',
  'B',
  'V',
  'n',
  '5',
  'r',
  '2',
  'd',
];
const encryptedKeysV2 = {
  a: 5,
  b: 9,
  c: 19,
  d: 24,
  e: 31,
  f: 18,
  g: 12,
  h: 33,
  i: 4,
  j: 7,
  k: 1,
  l: 11,
  m: 30,
  n: 22,
  o: 38,
  p: 39,
  q: 23,
  r: 2,
  s: 37,
  t: 35,
  u: 25,
  v: 0,
  w: 3,
  x: 16,
  y: 10,
  z: 13,
  A: 42,
  B: 58,
  C: 55,
  D: 54,
  E: 61,
  F: 53,
  G: 27,
  H: 52,
  I: 46,
  J: 44,
  K: 47,
  L: 48,
  M: 60,
  N: 56,
  O: 51,
  P: 17,
  Q: 41,
  R: 59,
  S: 57,
  T: 43,
  U: 40,
  V: 49,
  W: 32,
  X: 28,
  Y: 50,
  Z: 45,
  1: 20,
  2: 29,
  3: 6,
  4: 14,
  5: 36,
  6: 8,
  7: 21,
  8: 34,
  9: 26,
  0: 15,
};
const encryptedCharV2 = [
  'x',
  'p',
  'e',
  '1',
  'v',
  'D',
  'O',
  'I',
  '6',
  '9',
  'i',
  'h',
  'W',
  'L',
  'u',
  'm',
  'G',
  'a',
  'F',
  'J',
  '4',
  'k',
  '3',
  'N',
  'f',
  'o',
  '7',
  '0',
  'Q',
  'S',
  'X',
  'E',
  'Z',
  'y',
  's',
  'c',
  'K',
  'l',
  'b',
  'C',
  'g',
  'U',
  'z',
  'H',
  'A',
  'w',
  '8',
  'T',
  'P',
  'Y',
  'j',
  'q',
  'M',
  't',
  'R',
  'B',
  'V',
  'n',
  '5',
  'r',
  '2',
  'd',
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const reverseString = str => {
  return str.split('').reverse().join('');
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export const encrypt = text => {
  let tempArray = text.split('');
  let finalArray = [];
  let specialCharKeys = [];
  let specialCharIndex = [];
  let encryptedIndex = [];
  for (let i = 0; i < tempArray.length; i++) {
    if (encryptedKeysV2[tempArray[i]]) {
      let tempChar = encryptedCharV2[encryptedKeysV2[tempArray[i]]];
      finalArray.push(tempChar);
    } else {
      specialCharKeys.push(tempArray[i]);
      specialCharIndex.push(i);
    }
  }

  for (let i = 0; i < specialCharIndex.length; i++) {
    let index;
    if (specialCharIndex[i] > 9) {
      index = specialCharIndex[i];
    } else {
      index = encryptedCharV2[encryptedKeysV2[specialCharIndex[i]]];
    }
    encryptedIndex.push(index);
  }
  let encryptedValue = [];
  for (let i = 0; i < finalArray.length; i++) {
    let tempChar = encryptedCharV2[encryptedKeysV2[finalArray[i]]];
    encryptedValue.push(tempChar);
  }
  let result = {
    value: encryptedValue.join(''),
    key: encryptedIndex,
    hint: specialCharKeys.join(''),
    version: 'V2',
  };
  console.log(result);
  decryptV1(result);
  return result;
};

export const decryptV1 = text => {
  if (typeof text !== 'object') {
    return text || '';
  }
  if (text.version === 'V2') {
    return decryptV2(text);
  }
  let firstPart = text.value.split('');
  let tempFirstValue = [];
  let finalFirstValue = [];
  let spChar = text.hint.split('');
  let spIndex = text.key;

  for (let i = 0; i < firstPart.length; i++) {
    let encryptedIndex = encryptedChar.indexOf(firstPart[i]);
    let finalChar = getKeyByValue(encryptedKeys, encryptedIndex);
    tempFirstValue.push(finalChar);
  }

  for (let i = 0; i < tempFirstValue.length; i++) {
    let encryptedIndex = encryptedChar.indexOf(tempFirstValue[i]);
    let finalChar = getKeyByValue(encryptedKeys, encryptedIndex);
    finalFirstValue.push(finalChar);
  }

  let result = finalFirstValue.join('');
  for (let i = 0; i < spChar.length; i++) {
    let originalIndex;
    if (typeof spIndex[i] === 'string') {
      let encryptedIndex = encryptedChar.indexOf(spIndex[i]);
      let finalChar = getKeyByValue(encryptedKeys, encryptedIndex);
      originalIndex = parseInt(finalChar);
    } else {
      originalIndex = spIndex[i];
    }

    result =
      result.substring(0, originalIndex) +
      spChar[i] +
      result.substring(originalIndex, result.length);
  }
  console.log(result);
  return result || '';
};
export const decryptV2 = text => {
  if (typeof text !== 'object') {
    return text || '';
  }
  let firstPart = text.value.split('');
  let tempFirstValue = [];
  let finalFirstValue = [];
  let spChar = text.hint.split('');
  let spIndex = text.key;

  for (let i = 0; i < firstPart.length; i++) {
    let encryptedIndex = encryptedCharV2.indexOf(firstPart[i]);
    let finalChar = getKeyByValue(encryptedKeysV2, encryptedIndex);
    tempFirstValue.push(finalChar);
  }

  for (let i = 0; i < tempFirstValue.length; i++) {
    let encryptedIndex = encryptedCharV2.indexOf(tempFirstValue[i]);
    let finalChar = getKeyByValue(encryptedKeysV2, encryptedIndex);
    finalFirstValue.push(finalChar);
  }

  let result = finalFirstValue.join('');
  for (let i = 0; i < spChar.length; i++) {
    let originalIndex;
    if (typeof spIndex[i] === 'string') {
      let encryptedIndex = encryptedCharV2.indexOf(spIndex[i]);
      let finalChar = getKeyByValue(encryptedKeysV2, encryptedIndex);
      originalIndex = parseInt(finalChar);
    } else {
      originalIndex = spIndex[i];
    }

    result =
      result.substring(0, originalIndex) +
      spChar[i] +
      result.substring(originalIndex, result.length);
  }
  console.log(result);
  return result || '';
};
