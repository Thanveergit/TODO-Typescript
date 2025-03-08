import { Request,Response } from "express";
import { TodoList } from "../model/todoModel";

let todoList = new TodoList();

export const home = async(req:Request,res:Response)=>{
     try {
          const tasks = todoList.getTasks();

          res.render('index',{tasks})
     } catch (error) {
          console.log(error)
     }
}

export const addTask = async(req:Request,res:Response)=>{
     try {
          const title:string = req.body.title;
          console.log(title)
          if(!title){
               res.status(400).json({message:"Title is required"})
          }
          todoList.addTask(title);
          res.sendStatus(200);
     } catch (error) {
          console.log('error adding the task');

          
     }
}

export const deleteTask = async(req:Request,res:Response)=>{
     try{
          const id:number = req.body.id
          console.log(id)
          if(!id){
               res.status(400).json({message:"Id is required"})
               return 
          }
          todoList.deleteTask(id);
          console.log('after deletion',todoList)
          res.json({success:true,message:"Task deleted successfully"})
     }
     catch(errot){
          console.log('error deleting the task');
     }
}

export const updateTask = async(req:Request,res:Response)=>{
     try {
          const id:number = req.body.id;
          const title:string = req.body.title;
          if(!id || !title){
               res.status(400).json({message:'task id and new id are required'});
               return 
          }
          todoList.updateTask(id,title);
          res.sendStatus(200);

     } catch (error) {
          console.log('error updating the task');
     }

}

export const completeTask = async(req:Request,res:Response)=>{
     try {
          const id:number = req.body.id;
          if(!id){
               res.status(400).json({message:'task id is required'});
               return 
          }
          todoList.taskStatus(id);
          res.sendStatus(200)
     } catch (error) {
          console.log('task completing error');
     }
}     
