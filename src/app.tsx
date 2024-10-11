import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";
import "./index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z.string(),
  sobrenome: z.string(), //Validação do zod: nome, sobrenome,empresa são obrigatórios e devem ser strings.
  empresa: z.string(), // email deve ser uma string e ter formato de e-mail.
  email: z.string().email(), //datadenascimento é um objeto que pode conter mes, dia e ano, todos opcionais.
  datadenascimento: z.object({
    mes: z.string().optional(),
    dia: z.string().optional(),
    ano: z.string().optional(),
  }),
});

type formData = z.infer<typeof schema>; //Tipo de Dados:Este tipo inferido formData é criado a partir do esquema
//definido. Ele descreve a forma dos dados que serão manipulados no formulário.
export function App() {
  //Componente Principal:
  const { handleSubmit, register, formState } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: formData) {
    console.log(data);
  }

  return (
    //Renderização do Formulário
    <div className="flex items-center justify-center h-screen w-full bg-zinc-100">
      <div className="w-full max-w-xl bg-white shadow rounded-md p-8">
        <h1 className="text-2xl font-bold text-center">Registro</h1>
        <form
          className="flex gap-6 flex-col mt-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input type="text" {...register("nome")} />
              {formState.errors.nome?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.nome?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input type="text" {...register("sobrenome")} />
              {formState.errors.sobrenome?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.sobrenome?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>E-mail</Label>
              <Input type="email" {...register("email")} />
              {formState.errors.email?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.email?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Empresa</Label>
              <Input type="text" {...register("empresa")} />
              {formState.errors.empresa?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.empresa?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <Label>Data de nascimento</Label>
              <Select {...register("datadenascimento.mes")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {Array(12) //Lógica
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1).padStart(2, "0");
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {formState.errors.datadenascimento?.dia?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.datadenascimento?.mes?.message}
                </span>
              )}
            </div>
            <div>
              <Select {...register("datadenascimento.dia")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Dia" />
                </SelectTrigger>
                <SelectContent>
                  {Array(31)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1).padStart(2, "0");
                      return (
                        <SelectItem id={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {formState.errors.datadenascimento?.dia?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.datadenascimento?.dia?.message}
                </span>
              )}
            </div>
            <div>
              <Select {...register("datadenascimento.ano")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {Array(200)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1901).padStart(4, "0");
                      return (
                        <SelectItem id={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {formState.errors.datadenascimento?.dia?.message && (
                <span className="text-red-500 text-xs">
                  {formState.errors.datadenascimento?.ano?.message}
                </span>
              )}
            </div>
          </div>
          <Button className="mt-8" type="submit">
            Registre-se
          </Button>
        </form>
      </div>
    </div>
  );
}
