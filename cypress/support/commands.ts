import { faker } from '@faker-js/faker';
import slug from 'slug';
import dayjs from 'dayjs';

Cypress.Commands.add(
  'iframe', // @ts-ignore
  { prevSubject: 'element' },
  ($iframe) => new Cypress.Promise((resolve) => $iframe.on('load', () => resolve($iframe.contents().find('body')))),
);
Cypress.Commands.add('typeRandom', { prevSubject: 'element' }, (element, text, type): any => {
  const random = '_RANDOM_';
  const input = cy.wrap(element).clear();

  if (text.indexOf('_@') > -1 && text.indexOf('@_') > -1) {
    cy.get(`@${slug(text.replace('_@', '').replace('@_', ''))}`).then((val) => input.type(val.toString()));
  } else {
    if (text.indexOf(random) > -1) {
      switch (type) {
        case 'number':
          text = text.replace(random, faker.number.int({ min: 1, max: 100000000 }).toString());
          break;
        case 'percentage':
          text = text.replace(random, faker.number.int({ min: 1, max: 100 }).toString());
          break;
        case 'words':
          text = text.replace(random, faker.word.words(5));
          break;
        case 'email':
          text = text.replace(random, faker.internet.email().toLowerCase());
          break;
        case 'phone':
          text = text.replace(random, faker.helpers.replaceCreditCardSymbols('#{8,12}'));
          break;
        case 'color':
          text = text.replace(random, faker.color.rgb({ casing: 'upper' }));
          break;
        case 'date':
          text = text.replace(random, dayjs(faker.date.anytime()).format('DD-MM-YYYY'));
          break;
        default:
          text = text.replace(random, faker.word.sample());
          break;
      }
    }
    if (text) input.type(text, { parseSpecialCharSequences: false });
  }
});
