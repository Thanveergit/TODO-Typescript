type TaskStatus = 'pending' | 'completed';


abstract class BaseTask {
     public id: number;
     public title: string;
     public status: TaskStatus;

     constructor(id: number, title: string, status: TaskStatus) {
          this.id = id;
          this.title = title;
          this.status = status;
     }
}

export class Task extends BaseTask {}

export class TodoList {
     private tasks: Task[] = [];
     private nextId: number = 1;
     
     getTasks():Task[]{
          return this.tasks;
     }
     addTask(title: string){
          const newTask = new Task(this.nextId++,title,"pending");
          this.tasks.push(newTask);
          console.log(this.tasks)
          return newTask;
     }
     findTaskById(id:number):Task | undefined{
          return this.tasks.find(task=>task.id == id);
     }
     deleteTask(id:number):boolean{
          const index = this.tasks.findIndex(task=>task.id == id);
          console.log(index)
          if(index !== -1){
               this.tasks.splice(index,1);
               return true;
          }
          return false;
     }
     updateTask(id:number,newTitle:string):boolean{
          const task = this.findTaskById(id);
          if(task){
               task.title = newTitle;
               return true
          }
          return false
     }
     taskStatus(id:number):boolean{
          const task = this.findTaskById(id);
          if(task){
               task.status = task.status === 'completed'?'pending':'completed';
               console.log('task:',task)
               return true;
          }
          return false;
     }
}