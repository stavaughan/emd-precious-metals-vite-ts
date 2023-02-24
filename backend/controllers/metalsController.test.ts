import metalsController from './metalsController';

describe('metalsController', () => {
  it('should have a getMetals function', () => {
    expect(typeof metalsController.getMetals).toBe('function');
  });
}) as unknown as (
  name: string | number | Function | jest.FunctionLike,
  fn: jest.EmptyFunction
) => void;
