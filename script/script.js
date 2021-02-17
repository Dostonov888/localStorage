'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


const todoData = localStorage.getItem('list');
if (todoData) {
    todoList.innerHTML = JSON.parse('list');
}





const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';



    todoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplate = li.querySelector('.todo-complete');
        btnTodoComplate.addEventListener('click', function () {

            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            todoData.splice(i, 1);
            localStorage.removeItem('list', JSON.stringify(todoData));
            render();
        });

    });
    localStorage.setItem('list', JSON.stringify(todoData));
};



todoControl.addEventListener('submit', function (event) {
    event.preventDefault();


    const newTodo = {
        value: headerInput.value,
        completed: false
    };


    todoData.push(newTodo);
    localStorage.setItem('list', JSON.stringify(todoControl));

    render();

});



