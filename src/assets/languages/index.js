import ru from './ru.json';
import en from './en.json';
import tr from './tr.json';

export const dictionaryList = { en, ru, tr };

export const languageOptions = {
  en: { country: 'En', flag: require('../icons/united-kingdom.png'), name: 'Eng',code:'en-US' },
  ru: { country: 'Ru', flag: require('../icons/russian.png'), name: 'Рус',code:'ru' },
  tr: { country: 'Tr', flag: require('../icons/turkey.png'), name: 'Tr',code:'tr' },
};
