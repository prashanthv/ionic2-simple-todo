import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {
  todo;
  mode;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController) {

      this.todo = this.params.get('todo');
      this.mode = this.params.get('mode');

  }

  ionViewDidLoad() {
  }

  updateTodo(){

      this.viewCtrl.dismiss(this.todo);

  }

}
