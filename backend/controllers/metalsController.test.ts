import metalsController from './metalsController';

describe('metalsController', () => {
  it('should have a getMetals function', () => {
    expect(typeof metalsController.getMetals).toBe('function');
  });
});
