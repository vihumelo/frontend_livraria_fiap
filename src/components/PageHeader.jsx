import classNames from 'classnames';
import Text from '../ui/Text';
import PropTypes from 'prop-types';

export default function PageHeader({
  className,
  children,
  actions = null,
  subTitle = null,
}) {
  return (
    <header
      className={classNames(
        'w-full mb-6',
        {
          'flex gap-2 item-center': actions,
        },
        className
      )}
    >
      <Text variation="4xl" className="flex items-center">
        {children}
      </Text>

      {subTitle && <Text className="italic text-gray-500">{subTitle}</Text>}

      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}

PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  subTitle: PropTypes.node,
};
