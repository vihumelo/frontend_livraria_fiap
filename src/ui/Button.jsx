import classNames from 'classnames';
import PropTypes from 'prop-types';

const buttonVariationsMapper = {
  primary: 'bg-blue-500 text-gray-50',
  ghost: 'bg-transparent border border-solid border-gray-300',
};

const buttonSizesMapper = {
  small: 'h-10 px-3 text-base',
  medium: 'h-14 px-3 py-2 text-xl',
};

export default function Button({
  type,
  className,
  variation,
  size = 'medium',
  disabled = false,
  children,
  ...props
}) {
  const defaultClassName = classNames(
    `rounded font-bold w-full`,
    buttonVariationsMapper[variation],
    buttonSizesMapper[size],
    {
      'pointer-events-none opacity-40': disabled,
    },
    className
  );

  return (
    <button className={defaultClassName} type={type} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variation: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
