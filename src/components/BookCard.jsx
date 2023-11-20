import Card from '../ui/Card';
import Text from '../ui/Text';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function BookCard({ book, loading = false }) {
  return (
    <Card className="flex flex-col justify-between p-4">
      <div className="grid grid-cols-[6rem_1fr] gap-2">
        {!loading ? (
          <div
            className="h-40 bg-cover bg-no-repeat bg-center rounded"
            style={{
              backgroundImage: `url('${book?.capa}')`,
            }}
          />
        ) : (
          <Skeleton className="w-[6rem] h-40" />
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            {!loading ? (
              <>
                <Text as="h1" variation="lg">
                  {book?.titulo}
                </Text>
                <Text className="italic text-gray-400">
                  {book?.autor?.nome}
                </Text>
              </>
            ) : (
              <>
                <Skeleton className="w-full h-[1.625rem]" />
                <Skeleton className="w-full h-6" />
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {!loading ? (
              <>
                <Text>Editora: {book?.editora?.nome}</Text>
                <Text>Páginas: {book?.paginas}</Text>
              </>
            ) : (
              <>
                <Skeleton className="w-[11rem] h-6" />
                <Skeleton className="w-[11rem] h-6" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        {!loading ? (
          <Link to={`/livros/${book?.id}`} className="text-blue-500 font-bold">
            Ver Detalhes
          </Link>
        ) : (
          <Skeleton className="w-[11rem] h-6" />
        )}
      </div>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
  loading: PropTypes.bool,
};
