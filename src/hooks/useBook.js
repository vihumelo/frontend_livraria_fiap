import React from 'react';
import useQuery from 'swr';
import api from '../helpers/api';

export default function useBook({ id } = {}) {
  const { data, isLoading } = useQuery(() => id && `/livros/${id}`);

  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function createBook({ paginas, ano, ...payload }) {
    setError(null);
    setSaving(true);

    try {
      await api.post('/livros', {
        ...payload,
        paginas: parseInt(paginas),
        ano: parseInt(ano),
      });

      alert('Livro criado com sucesso');
    } catch (e) {
      alert('Erro ao cadastrar o livro');
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  async function updateBook(id, { paginas, ano, ...payload }) {
    setError(null);
    setSaving(true);

    try {
      await api.put(`/livros/${id}`, {
        ...payload,
        paginas: parseInt(paginas),
        ano: parseInt(ano),
      });

      alert('Livro atualizado com sucesso');
    } catch (e) {
      alert('Erro ao atualizar o livro');
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  async function deleteBook(id) {
    setError(null);
    setSaving(true);

    try {
      await api.delete(`/livros/${id}`);

      alert('Livro deletado com sucesso');
    } catch (e) {
      alert('Erro ao deletar o livro');
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  return {
    book: data?.data,
    isLoadingBook: isLoading,
    isSavingBook: saving,
    bookError: error,
    createBook,
    updateBook,
    deleteBook,
  };
}
