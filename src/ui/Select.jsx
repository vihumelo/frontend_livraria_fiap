import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Text from './Text';

const Select = React.forwardRef(
  (
    { className, label = null, id = '', error = null, options, ...props },
    ref
  ) => {
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
        <select className={defaultClassName} ref={ref} id={id} {...props}>
          <option value="" selected disabled>
            Selecione...
          </option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {error && (
          <Text className="text-red-500 text-sm font-bold">
            {error.message}
          </Text>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
