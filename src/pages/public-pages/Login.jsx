import Text from "../../ui/Text";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";

const loginValidator = z.object({
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({ message: "Email inválido" }),
  senha: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, { message: "Senha precisa ter no mínimo 5 caracteres" }),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginValidator),
  });
  const { login, authError, authSaving } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data) {
    await login(data);
    navigate("/");
  }

  return (
    <>
      <header>
        <Text as="h1" variation="3xl">
          Livraria - Login
        </Text>
        <Text className="italic text-gray-500">
          Entre com email e senha para acessar o sistema...
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
          {...form.register("email")}
        />
        <Input
          id="password"
          type="password"
          placeholder="ex: ********"
          label="Senha"
          error={form.formState.errors.senha}
          {...form.register("senha")}
        />

        {authError && (
          <Text as="div" className="text-red-500 text-sm font-bold text-center">
            {authError}
          </Text>
        )}

        <Button variation="primary" type="submit" disabled={authSaving}>
          Entrar
        </Button>
      </form>

      <Text as="div" className="mt-5 text-center">
        Não possuí acesso?{" "}
        <Link to="/auth/cadastro" className="text-blue-500">
          Crie sua conta
        </Link>
      </Text>
    </>
  );
}
