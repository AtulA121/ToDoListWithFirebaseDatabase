import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from './shared/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  toDoListArray : any[]
  constructor(private _toDoService : TodoServiceService) { }

  ngOnInit() {
    
    this._toDoService.getToDoList().snapshotChanges().subscribe(item=>{

      console.log("cahnged... : ",item);

      this.toDoListArray=[];

      item.forEach(element=>{
        var x=element.payload.toJSON();
        x["$key"]=element.key;
        this.toDoListArray.push(x);
        console.log("...");
        
      })

      // this.toDoListArray.sort((a,b)=>{
      //   return a.isChecked - b.isChecked;
      // });

    });

  }

  onAdd(itemTitle)
  {
    this._toDoService.addTitle(itemTitle.value);
    itemTitle.value=null;7

    // console.log(this._toDoService.getToDoList());

  }

  alertCheck($key : string,isChecked)
  {
    // alert($key);
    this._toDoService.checkOrUnCheckTitle($key,!isChecked);

  }

  onDelete($key : any)
  {
    this._toDoService.removeTitle($key);
  }

}
