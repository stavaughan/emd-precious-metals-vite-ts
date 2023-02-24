import request from 'supertest';

import { app } from './app';

jest.mock('./models/settingsModel');

describe('App Test', () => {
  // eslint-disable-next-line jest/expect-expect
  test('GET `/random-url` should return 404', () => {
    return new Promise((done) => {
      request(app).get('/reset').expect(404, done);
    });
  });

  // eslint-disable-next-line jest/expect-expect
  test('GET `/api/settings` should return 200', () => {
    return new Promise((done) => {
      request(app).get('/api/settings').expect(200, done);
    });
  });
}) as unknown as (
  name: string | number | Function | jest.FunctionLike,
  fn: jest.EmptyFunction
) => void;
