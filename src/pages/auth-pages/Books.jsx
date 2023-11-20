import React from 'react';
import Input from '../../ui/Input';
import PageHeader from '../../components/PageHeader';
import useBooks from '../../hooks/useBooks';
import BookCard from '../../components/BookCard';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Books() {
  const form = useForm();
  const [search, setSearch] = React.useState('');
  const { books, isLoadingBooks } = useBooks({ search });
  const navigate = useNavigate();

  function onSubmit(data) {
    setSearch(data.search || '');
  }

  return (
    <>
      <PageHeader
        actions={
          <Button
            variation="ghost"
            size="small"
            onClick={() => {
              navigate('/livros/novo');
            }}
          >
            Criar Livro
          </Button>
        }
      >
        Livros
      </PageHeader>

      <form
        className="grid grid-cols-[1fr_20rem] gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Busque por nome de livros ou autores..."
          {...form.register('search')}
        />
        <Button
          type="submit"
          variation="primary"
          className="h-16"
          disabled={isLoadingBooks}
        >
          Buscar
        </Button>
      </form>

      <section className="grid grid-cols-4 gap-4 mt-9">
        {!isLoadingBooks &&
          books.map((book) => <BookCard key={book.id} book={book} />)}

        {isLoadingBooks &&
          Array.from({ length: 8 }).map((_, index) => (
            <BookCard key={`book-loading-${index}`} book={undefined} loading />
          ))}
      </section>
    </>
  );
}
