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
        //note: it is better to use delete() rather than spile() when deleting a lot of elements in an array
        //then filter elements that is undefined
        console.log(indexSet)
        if(indexSet.size>0){
            indexSet.forEach(index => {
                delete todosArr[index]
            })
            todosArr = todosArr.filter((element) => {
                return (typeof element !== "undefined")
            })
            localStorage.setItem('todos', JSON.stringify(todosArr))
        }
        console.log(`${indexSet.size} item(s) deleted`)
    }
}