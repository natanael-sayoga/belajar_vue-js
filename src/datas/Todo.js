let todos = localStorage.getItem('todos')
let todosArr = JSON.parse(todos)

export default{
    getAllTodos(){
        return todosArr
    },
    getSingleTodo(index){
        return todosArr[index]
    },
    insertTodo(todoObj){
        todosArr.push(todoObj),
        localStorage.setItem('todos', JSON.stringify(todosArr))
    },
    updateTodo(index, updatedObj){
        todosArr[index] = updatedObj
        localStorage.setItem('todos', JSON.stringify(todosArr))
    },
    deleteTodo(indexSet){
        console.log(indexSet)
        if(indexSet.size>0){
            indexSet.forEach(index => {
                todosArr.splice(index, 1)
            });
            localStorage.setItem('todos', JSON.stringify(todosArr))
        }
        console.log(`${indexSet.size} item(s) deleted`)
    }
}