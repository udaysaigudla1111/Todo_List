var Todo = document.querySelector(".Todo")
var btn =  document.querySelector("#btn-task")
var input = document.querySelector("#task-input")

var todos=[];
let ctr=0;

function addItem(todos)
{
    if(input.value==="")
    {
        alert("please enter the TODO item")
        return;
    }
    todos.push({
        todoId: "todo-input-" + ctr,
        editId: "edit-" + ctr,
        deleteId: "delete-" + ctr,
        TodoTextId: "todo-text-" + ctr,
        checkId: "check-" + ctr,
        title: input.value,
        isEditing: false, 
        isCompleted: false
    });
    ctr++;
    renderTodos(todos);
    input.values="";
}
//-------------------------------------------------------------------------------
function deleteItem(todoId)
{
    todos = todos.filter((todo)=>{
       return todo.todoId!==todoId
    })
    renderTodos(todos);
}
//-------------------------------------------------------------------------------
function toggleEditItem(todoId)
{
   todos= todos.map((todo)=>{
        if(todo.todoId===todoId)
        {
            let prevtodo = todo.tittle;
            var input= document.getElementById(todo.TodoTextId)
            if(input.value.trim()==="")
            {
               todo.tittle = prevtodo;
            }else{
                todo.title=input.value
            }
            todo.isEditing = !todo.isEditing
        }
        return todo
    })
   
    renderTodos(todos)
}
//-------------------------------------------------------------------------------

function checkItem(todoId)
{
    todos = todos.map((todo)=>{
        if(todo.todoId===todoId)
        {
            todo.isCompleted=!todo.isCompleted;
        }
        return todo;
    })
    renderTodos(todos);
}


//-------------------------------------------------------------------------------
function renderTodos(todos)
{
    Todo.innerHTML="";
    todos.forEach((todo)=>{
    Todo.innerHTML+=`<div id='${todo.todoId}' class="flex items-center justify-between bg-gray-700 p-2 rounded-lg my-4" >
    <div >
        <input type="checkbox" id="${todo.checkId}" ${todo.isCompleted? 'checked':'' } >
            <input type="text" id="${todo.TodoTextId}" value="${todo.title}"
            ${todo.isEditing?'class="bg-transparent border-none text-white focus:outline-none focus:ring focus:ring-blue-500"':'class="bg-transparent border-none text-white focus:outline-none caret-transparent" readonly'}
            >
        
        </div>
        <div>
        <button id="${todo.editId}" class="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"> ${todo.isEditing?'Save':'Edit'}  </button>
          <button id="${todo.deleteId}" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" >Delete </button>
        </div>
     </div>
       `
    })

    todos.forEach((todo)=>{
        document.getElementById(todo.deleteId).addEventListener('click',()=>{
            deleteItem(todo.todoId);
        })
        document.getElementById(todo.editId).addEventListener('click',()=>{
            toggleEditItem(todo.todoId)
        })
        if(todo.isEditing)
        {
            const inputfield = document.getElementById(todo.TodoTextId);
            inputfield.focus();
        }
        document.getElementById(todo.checkId).addEventListener('click',()=>{
                checkItem(todo.todoId)
        })
        if(todo.isCompleted)
        {
          const input =   document.getElementById(todo.TodoTextId)
          input.classList.add('line-through','text-gray-500')
        }
    })
}

btn.addEventListener("click",()=>{
    addItem(todos)
})