import Skeleton from 'react-loading-skeleton';
import Text from './Text';
import PropTypes from 'prop-types';

export default function BoxKeyValue({ title, value, loading }) {
  return (
    <div className="flex flex-col p-2 border border-solid border-gray-200 rounded">
      {!loading ? (
        <>
          <Text variation="label">{title}</Text>
          <Text>{value}</Text>
        </>
      ) : (
        <>
          <Skeleton className="w-8/12 h-5" />
          <Skeleton className="w-full h-6" />
        </>
      )}
    </div>
  );
}

BoxKeyValue.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
};
