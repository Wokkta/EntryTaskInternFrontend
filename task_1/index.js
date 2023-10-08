import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

const variants = new Set();
const decoded = encoded.map((el) => {
  for (let i of Object.keys(el)) {
    const match = i.match(/\bid|Id\b/);
    if (match) {
      const decodedValue = translations[el[i]];
      variants.add(+el[i]);
      el[i] = decodedValue;
    }
  }
  return el;
});

console.log(decoded);
console.log('Уникальные айди :', [...variants]);

