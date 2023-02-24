import requestControllers from './requestControllers';

describe('requestControllers', () => {
  it('should have a getItems function', () => {
    expect(typeof requestControllers.getItems).toBe('function');
  });
}) as unknown as (
  name: string | number | Function | jest.FunctionLike,
  fn: jest.EmptyFunction
) => void;
