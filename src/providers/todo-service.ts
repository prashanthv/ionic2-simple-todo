import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TodoService {

  KEY_TODOS = 'st.todos';
  todos;

  constructor(public storage: Storage) {
      
  }

  generateKey(){
    return Object.keys(this.todos).length+1;
  }

  addTodo(todo) {
      let key = this.generateKey()
      todo['key'] = key;
      this.todos[key] = todo;
      this.storage.set(this.KEY_TODOS, this.todos);
      return this.getTodosArray();
  }

  updateTodo(key, todo) {
      this.todos[key] = todo;
      this.storage.set(this.KEY_TODOS, this.todos);
      return this.getTodosArray();
  }

  removeTodo(key) {
      delete this.todos[key];
      this.storage.set(this.KEY_TODOS, this.todos);
      return this.getTodosArray();
  }

  getTodosArray(){
    var values = [];
    for(var key in this.todos) {
        values.push(this.todos[key]);
    }
    return values;
  }

  getTodos() {
      
      return new Promise((resolve,reject) => {
            this.storage.get(this.KEY_TODOS).then((todos) => {
                if(!todos) {
                    this.todos = {}
                } else {
                    this.todos = todos;
                }
                resolve(this.getTodosArray());
            })
      })
   
  }

}
