'use strict';

const todoControl = document.querySelector('.todo-control'),//форма
    headerInput = document.querySelector('.header-input'),//Какие планы?
    todoList = document.querySelector('.todo-list'),//Сварить кофе
    todoCompleted = document.querySelector('.todo-completed'),//Помыть посуд
    headerButton = document.querySelector('.header-button');

let todoData = [];
document.addEventListener('keydown', function () {
    if (headerInput.value === '') {
        headerButton.disabled = true;
    } else {
        headerButton.disabled = false;
    }
});
document.addEventListener('mousedown', function () {
    if (headerInput.value === '') {
        headerButton.disabled = true;
    } else {
        headerButton.disabled = false;
    }
});


let storageGetItem = function () {
    if (localStorage.todoList) {
        todoData = JSON.parse(localStorage.todoList);
    } else { todoData = []; }
};
storageGetItem();

const render = function () { //очищает содержание текста
    headerInput.value = '';
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
            localStorage.todoList = JSON.stringify(todoData);
            render();
        });
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            todoData.splice(i, 1);
            localStorage.removeItem('list', JSON.stringify(todoData));
            render();
        });


    });
    localStorage.todoList = JSON.stringify(todoData);
};



todoControl.addEventListener('submit', function (event) {
    event.preventDefault();


    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoData.push(newTodo);

    localStorage.todoList = JSON.stringify(todoData);

    render();

});
localStorage.todoList = JSON.stringify(todoData);
render();

