import Text from '../../ui/Text';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '../../hooks/useAuth';

const signUpValidator = z
  .object({
    email: z
      .string({
        required_error: 'Campo obrigatório',
      })
      .email({ message: 'Email inválido' })
      .endsWith('@livraria.com.br', {
        message: 'Email precisa ser da livraria.',
      }),
    senha: z
      .string({ required_error: 'Campo obrigatório' })
      .min(5, { message: 'Senha precisa ter no mínimo 5 caracteres' }),
    confirmarSenha: z
      .string({ required_error: 'Campo obrigatório' })
      .min(5, { message: 'Senha precisa ter no mínimo 5 caracteres' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmarSenha'],
  });

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(signUpValidator),
  });
  const { signUp, authError, authSaving } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data) {
    await signUp(data);
    navigate('/');
  }

  return (
    <>
      <header>
        <Text as="h1" variation="3xl">
          Livraria - Cadastro
        </Text>
        <Text className="italic text-gray-500">
          Digite as informações abaixo para criar um cadastro...
        </Text>
      </header>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <Input
          id="email"
          type="email"
          placeholder="ex: admin@livraria.com.br"
          label="Email"
          error={form.formState.errors.email}
          {...form.register('email')}
        />

        <Input
          id="senha"
          type="password"
          placeholder="ex: ********"
          label="Senha"
          error={form.formState.errors.senha}
          {...form.register('senha')}
        />

        <Input
          id="confirme-senha"
          type="password"
          placeholder="ex: ********"
          label="Confirme a senha"
          error={form.formState.errors.confirmarSenha}
          {...form.register('confirmarSenha')}
        />

        {authError && (
          <Text as="div" className="text-red-500 text-sm font-bold text-center">
            {authError}
          </Text>
        )}

        <Button variation="primary" type="submit" disabled={authSaving}>
          Criar Conta
        </Button>
      </form>

      <Text as="div" className="mt-5 text-center">
        Já possuí acesso?{' '}
        <Link to="/auth/login" className="text-blue-500">
          Entre com sua conta
        </Link>
      </Text>
    </>
  );
}
