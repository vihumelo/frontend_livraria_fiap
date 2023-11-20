import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Text from './Text';

const Input = React.forwardRef(
  ({ className, label = null, id = '', error = null, ...props }, ref) => {
    const defaultClassName = classNames(
      `rounded h-16 text-lg 
      border border-solid border-gray-200 
      bg-white w-full px-3 py-2 text-gray-800`,
      className
    );

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <Text
            as="label"
            className="font-bold !text-sm uppercase text-gray-700"
            htmlFor={id}
          >
            {label}
          </Text>
        )}
        <input className={defaultClassName} ref={ref} id={id} {...props} />
        {error && (
          <Text className="text-red-500 text-sm font-bold">
            {error.message}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
