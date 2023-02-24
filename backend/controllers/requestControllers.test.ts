import requestControllers from './requestControllers';

describe('requestControllers', () => {
  it('should have a getItems function', () => {
    expect(typeof requestControllers.getItems).toBe('function');
  });
});
