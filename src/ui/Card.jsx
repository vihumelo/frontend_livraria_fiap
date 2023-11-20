import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Card({ className, children, ...props }) {
  const defaultClassName = classNames(
    'rounded-lg bg-white shadow-lg border border-solid border-gray-100',
    className
  );
  return (
    <div className={defaultClassName} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
