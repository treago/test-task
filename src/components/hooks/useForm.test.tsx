import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useForm } from './useForm';

const initialValues = {
  groupValidations: {},
  validations: {},
};

describe('useForm', () => {
  const getFakeTestEvent = (value: any = '') =>
    ({
      preventDefault: jest.fn(),
      target: { value },
    } as unknown as ChangeEvent<any>);

  describe('smoke test', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });
  });

  describe('updating', () => {
    it('should update the data', () => {
      const { result } = renderHook(() => useForm(initialValues));
      expect(result.current.values.name).toBeUndefined();
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('wwwwwwwwwww'));
      });

      expect(result.current.values.name).toBe('wwwwwwwwwww');
    });

    it('should initialize the data', () => {
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          initialValues: {
            name: 'Ursula',
          },
        }),
      );

      expect(result.current.values.name).toBe('Ursula');
      expect(result.current.values.bool).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should call the onSubmit callback when there are no errors', () => {
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          onSubmit,
        }),
      );
      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should validate required values', () => {
      const requiredMessage = 'This field is required';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          validations: {
            name: {
              required: {
                value: true,
                message: requiredMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors?.name).toBe(requiredMessage);
    });

    it('should validate patterns', () => {
      const validationMessage = "This field isn't formatted correctly.";
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          validations: {
            name: {
              pattern: {
                value: '/[A-Za-z]*/',
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('9034kjsDDD'));
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors?.name).toBe(validationMessage);
    });

    it('should validate custom validations', () => {
      const validationMessage = 'The minimum length is 7 characters.';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          validations: {
            name: {
              custom: {
                isValid: (value) => value?.length > 6,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      // Name is long enough
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('12'));
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(result.current.errors?.name).toBeUndefined();

      // Name is too short
      onSubmit.mockReset();
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('xxx'));
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors?.name).toBe(validationMessage);
    });

    it('should validate multiple validations', () => {
      const validationMessage = "This field isn't formatted correctly.";
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          ...initialValues,
          validations: {
            name: {
              pattern: {
                value: '/[A-Za-z]*/',
                message: validationMessage,
              },
              custom: {
                isValid: (value) => value?.length > 6,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      // Name is too short and contains numbers
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('cccccccccc'));
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});
