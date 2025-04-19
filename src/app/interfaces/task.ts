import { Status } from "../shared/enum/status";

export interface ITask {
  id: string,
  titulo: string;
  conteudo: string,
  status: Status
}




