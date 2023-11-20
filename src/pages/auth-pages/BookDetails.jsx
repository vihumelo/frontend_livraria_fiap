import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Card from '../../ui/Card';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import BoxKeyValue from '../../ui/BoxKeyVaue';
import useBook from '../../hooks/useBook';
import Skeleton from 'react-loading-skeleton';

export default function BookDetails() {
  const { id } = useParams();
  const { book, isLoadingBook } = useBook({ id });
  const navigate = useNavigate();
  const { deleteBook } = useBook();

  return (
    <>
      <PageHeader
        actions={
          <>
            <Button
              variation="ghost"
              size="small"
              onClick={() => {
                navigate(`/livros/${id}/editar`);
              }}
            >
              Editar
            </Button>
            <Button
              variation="ghost"
              size="small"
              onClick={async () => {
                await deleteBook(id);
                navigate('/');
              }}
            >
              Deletar
            </Button>
          </>
        }
      >
        {!isLoadingBook ? (
          <>
            Livro - {book?.titulo} - {book?.codigo}
          </>
        ) : (
          <Skeleton className="w-[50rem] h-[3.063rem]" />
        )}
      </PageHeader>

      <section className="grid grid-cols-[15rem_1fr] gap-4">
        <div className="flex flex-col gap-2">
          <header>
            <Text variation="xl">Capa</Text>
          </header>

          {!isLoadingBook ? (
            <Card
              className="bg-cover bg-no-repeat bg-center h-96"
              style={{
                backgroundImage: `url("${book?.capa}")`,
              }}
            ></Card>
          ) : (
            <Skeleton className="h-96" />
          )}
        </div>

        <div className="grid gap-6">
          <Card className="flex flex-col gap-2 p-4">
            <header>
              <Text variation="xl">Informações Gerais</Text>
            </header>

            <section className="grid grid-cols-5 gap-4">
              <BoxKeyValue
                title="Título"
                value={book?.titulo}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="ISBN"
                value={book?.isbn}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Código Interno"
                value={book?.codigo}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Ano"
                value={book?.ano}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Categoria"
                value={book?.categoria?.nome}
                loading={isLoadingBook}
              />
            </section>
          </Card>

          <Card className="flex flex-col gap-2 p-4">
            <header>
              <Text variation="xl">Editora</Text>
            </header>

            <section className="grid grid-cols-3 gap-4">
              <BoxKeyValue
                title="Nome"
                value={book?.editora?.nome}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Endereço"
                value={book?.editora?.endereco}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Telefone"
                value={book?.editora?.telefone}
                loading={isLoadingBook}
              />
            </section>
          </Card>

          <Card className="flex flex-col gap-2 p-4">
            <header>
              <Text variation="xl">Autor</Text>
            </header>

            <section className="grid grid-cols-3 gap-4">
              <BoxKeyValue
                title="Nome"
                value={book?.autor?.nome}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Email"
                value={book?.autor?.email}
                loading={isLoadingBook}
              />
              <BoxKeyValue
                title="Telefone"
                value={book?.autor?.telefone}
                loading={isLoadingBook}
              />
            </section>

            <section className="flex flex-col gap-1">
              <Text variation="lg">Bio</Text>

              {!isLoadingBook ? (
                <Text>{book?.autor?.bio}</Text>
              ) : (
                <Skeleton count={4} className="h-6" />
              )}
            </section>
          </Card>
        </div>
      </section>
    </>
  );
}
