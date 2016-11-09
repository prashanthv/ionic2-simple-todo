import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { TodoPage } from '../todo/todo';
import { TodoService } from '../../providers/todo-service';
@Component({
  selector: 'page-list',
  templateUrl: 'home.html',
})
export class HomePage {
  todos;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              public todoService: TodoService ) {
      this.todoService.getTodos().then((todos) => {
          this.todos = todos;
      })
  }

  
  ionViewDidLoad() {
  }

  showTodo(todo) {
      var mode = 'Edit';
      if(!todo) {
        todo = {title: '', description: ''};
        mode = 'Add';
      }
      let todoModal = this.modalCtrl.create(TodoPage, {todo: todo, mode: mode});
      todoModal.onDidDismiss((todo) => {
          if(mode == 'Add') {
            this.todos = this.todoService.addTodo(todo);
          } else {
            this.todos = this.todoService.updateTodo(todo.key, todo);
          }
      });
      todoModal.present();
  }

  addTodo() {
    this.showTodo(null);
  }

  editTodo(todo) {
    this.showTodo(todo);
  }

  markDone(todo) {
    todo['completed'] = true;
    this.todos = this.todoService.updateTodo(todo.key, todo);
  }

  deleteTodo(todo){
    this.todos = this.todoService.removeTodo(todo.key);
  }

}
