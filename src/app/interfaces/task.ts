export interface ITask {
  id: string,
  titulo: string;
  conteudo: string,
  status: "a fazer" | "fazendo" | "feita"
}
