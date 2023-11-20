import React from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../../components/PageHeader';
import useAuthors from '../../hooks/useAuthors';
import useCategories from '../../hooks/useCategories';
import usePublishers from '../../hooks/usePublishers';
import BoxKeyValue from '../../ui/BoxKeyVaue';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Text from '../../ui/Text';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useBook from '../../hooks/useBook';
import { useNavigate, useParams } from 'react-router-dom';

const bookUpdateValidator = z.object({
  titulo: z.string().nonempty({ message: 'Campo obrigatório' }),
  isbn: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .length(14, { message: 'ISBN precisa ter 14 caracteres' }),
  capa: z
    .string()
    .url({ message: 'Campo precisa ser uma URL' })
    .nonempty({ message: 'Campo obrigatório' }),
  paginas: z.string().nonempty({ message: 'Campo obrigatório' }),
  ano: z.string().nonempty({ message: 'Campo obrigatório' }),
  categoriaId: z.string().nonempty({ message: 'Campo obrigatório' }),
  editoraId: z.string().nonempty({ message: 'Campo obrigatório' }),
  autorId: z.string().nonempty({ message: 'Campo obrigatório' }),
});

export default function BookUpdate() {
  const { id } = useParams();

  const [selectedPublisher, setSelectedPublisher] = React.useState(null);
  const [selectedAuthor, setSelectedAuthor] = React.useState(null);

  const { categories } = useCategories();
  const { publishers } = usePublishers();
  const { authors } = useAuthors();
  const { book, updateBook, isSavingBook } = useBook({ id });
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      titulo: book?.titulo,
      isbn: book?.isbn,
      capa: book?.capa,
      paginas: book?.paginas?.toString(),
      ano: book?.ano?.toString(),
      categoriaId: book?.categoria?.id,
      editoraId: book?.editora?.id,
      autorId: book?.autor?.id,
    },
    resolver: zodResolver(bookUpdateValidator),
  });

  const publisherId = form.watch('editoraId');
  const authorId = form.watch('autorId');

  React.useEffect(() => {
    const publisher = publishers.find(({ id }) => id === publisherId);
    setSelectedPublisher(publisher);
  }, [publishers, publisherId]);

  React.useEffect(() => {
    const author = authors.find(({ id }) => id === authorId);
    setSelectedAuthor(author);
  }, [authors, authorId]);

  React.useEffect(() => {
    if (book) {
      form.reset();
    }
  }, [book]);

  async function onSubmit(data) {
    await updateBook(id, data);

    navigate('/');
  }

  return (
    <>
      <PageHeader subTitle="Altere as informações abaixo para criar um atualizar o livro...">
        Editar Livro - {book?.titulo} - {book?.codigo}
      </PageHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <Card className="p-4 grid gap-3">
          <header>
            <Text variation="xl">Informações Gerais</Text>
          </header>

          <Input
            label="Título"
            id="titulo"
            error={form.formState.errors.titulo}
            {...form.register('titulo')}
          />
          <Input
            label="URL da Capa"
            id="capa"
            error={form.formState.errors.capa}
            {...form.register('capa')}
          />
          <Input
            label="ISBN"
            id="isbn"
            maxLength={14}
            error={form.formState.errors.isbn}
            {...form.register('isbn')}
          />
          <Input
            label="Quantidade de páginas"
            id="paginas"
            type="number"
            error={form.formState.errors.paginas}
            {...form.register('paginas')}
          />
          <Input
            label="Ano"
            id="ano"
            type="number"
            maxLength={4}
            error={form.formState.errors.ano}
            {...form.register('ano')}
          />
          <Select
            label="Categoria"
            id="categoria"
            options={categories.map((category) => ({
              value: category.id,
              label: category.nome,
            }))}
            error={form.formState.errors.categoriaId}
            {...form.register('categoriaId')}
          />
        </Card>

        <Card className="p-4 grid gap-3">
          <header>
            <Text variation="xl">Editora</Text>
          </header>

          <Select
            label="Selecione a editora"
            id="editora"
            options={publishers.map((publisher) => ({
              value: publisher.id,
              label: publisher.nome,
            }))}
            error={form.formState.errors.editoraId}
            {...form.register('editoraId')}
          />

          <section className="grid grid-cols-3 gap-4">
            <BoxKeyValue
              title="Endereço"
              value={selectedPublisher?.endereco || '-'}
            />
            <BoxKeyValue
              title="Telefone"
              value={selectedPublisher?.telefone || '-'}
            />
          </section>
        </Card>

        <Card className="p-4 grid gap-3">
          <header>
            <Text variation="xl">Autor</Text>
          </header>

          <Select
            label="Selecione o autor"
            id="autor"
            options={authors.map((author) => ({
              value: author.id,
              label: author.nome,
            }))}
            error={form.formState.errors.autorId}
            {...form.register('autorId')}
          />

          <section className="grid grid-cols-3 gap-4">
            <BoxKeyValue title="Email" value={selectedAuthor?.email || '-'} />
            <BoxKeyValue
              title="Telefone"
              value={selectedAuthor?.telefone || '-'}
            />
          </section>
        </Card>

        <footer className="flex justify-end">
          <Button variation="primary" className="!w-60" disabled={isSavingBook}>
            {!isSavingBook ? 'Atualizar Livro' : 'Salvando Livro...'}
          </Button>
        </footer>
      </form>
    </>
  );
}
