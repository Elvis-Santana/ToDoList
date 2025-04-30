import { ITask } from "../interfaces/task";
import { Status } from "../shared/enum/status";


Array.prototype.filterFromStatus = function (status: Status): ITask[] {
  return this.filter((task: ITask) => task.status === status);
};
Array.prototype.empty = function () {
  this.length =0;
}

declare global {
  interface Array<T> {
    filterFromStatus(this: ITask[], status: Status): ITask[];
    empty(): void
  }

}


export { };