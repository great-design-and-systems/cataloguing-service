import {
  expect
} from 'chai';
import path from 'path';
import {
  GDSDatabaseTest
} from 'gds-config';

describe('saving marc data', () => {

  before((done) => {
    new GDSDatabaseTest(() => {
      done();
    });
  });
});