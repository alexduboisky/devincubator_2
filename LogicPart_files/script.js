document.addEventListener('DOMContentLoaded', function () {

    let count = 0;

    let taskList = []

    if(localStorage.getItem('taskList')!=undefined){
       taskList = JSON.parse(localStorage.getItem('taskList'))
    }
    if(localStorage.getItem('bgColor')!=undefined){
        let wrapper = document.querySelector('.wrapper');
        let nav = document.querySelector ('nav');
        wrapper.style.backgroundColor = localStorage.getItem('bgColor');
        nav.style.setProperty("background-color", `${localStorage.getItem('bgColor')}`, "important");
    }

    function clearModal(){
        addTaskButton.setAttribute('data-edit', '');
            addTaskButton.innerHTML = 'Add task';
            let taskTitle = document.querySelector('#inputTitle');
            let taskText = document.querySelector('#inputText');
            let listTaskPriority = document.querySelectorAll('input[name=gridRadios]');
            taskTitle.value = '';
            taskText.value = '';
            listTaskPriority.forEach(element => {
                element.checked = '';
            })
    }
    
    let addTaskButton = document.querySelector('#add_task');
    let taskForm = document.querySelector('#taskForm');
    taskForm.onsubmit = function (event) {
        event.preventDefault();
        if (addTaskButton.getAttribute('data-edit') == '') {
            createTask();
            clearModal();
        } else {
            editTask(addTaskButton.getAttribute('data-edit'));
        }
        $('#exampleModal').modal('hide');
        deleteMarkup();
        createMarkup(taskList);
    }


    $('#exampleModal').on('hidden.bs.modal', function (e) {
        clearModal();
      })
    
      function colorForTask(element,li){
        if(element.priority == 'Low'){
            li.style.backgroundColor = 'rgb(153, 255, 204)';
        }
        else if(element.priority == 'Medium'){
            li.style.backgroundColor = 'rgb(255, 204, 102)';
        }
        else{
            li.style.backgroundColor = 'rgb(255, 102, 0)'
        }
    }

    const dragAndDrop = () => {
        let allUl = document.querySelectorAll('ul');
        let allLi = document.querySelectorAll('li');
        allLi.forEach(element =>{
            element.setAttribute('draggable','true');
            element.addEventListener('dragstart',()=>{
                element.classList.add('dragging')
            })
            element.addEventListener('dragend',()=>{
                element.classList.remove('dragging')
            })
        });
        let draggable;
        allUl.forEach(element =>{
            element.addEventListener('dragover',e=>{
                e.preventDefault();
                draggable = document.querySelector('.dragging');
                element.append(draggable);
            });
            element.addEventListener('dragend',e=>{
                e.preventDefault();
                let id = draggable.getAttribute('data-li-id');
                let currentObj = taskList.find(x => x.id == id);
                currentObj.completed = !currentObj.completed;
                localStorage.setItem('taskList',JSON.stringify(taskList));
                deleteMarkup();
                createMarkup(taskList);
            })
        })

    }

    createMarkup(taskList);
    dragAndDrop();
    

    let upSortButton = document.querySelector('#sort-up');
    upSortButton.addEventListener('click', function () {
        taskList.sort((a, b) => a.date > b.date ? 1 : -1);
        deleteMarkup();
        createMarkup(taskList);
    })

    let downSortButton = document.querySelector('#sort-down');
    downSortButton.addEventListener('click', function () {
        taskList.sort((a, b) => a.date > b.date ? 1 : -1).reverse();
        deleteMarkup();
        createMarkup(taskList);
    })

    function addCountOfListElements() {
        let toDoCount = 0;
        let completedCount = 0;
        for (let index = 0; index < taskList.length; index++) {
            if (taskList[index].completed == false) {
                toDoCount++;
            } else {
                completedCount++;
            }
        }
        let headerToDo = document.querySelector('#to-do-header');
        let headerCompleted = document.querySelector('#completed-header');
        headerToDo.innerHTML = `ToDo (${toDoCount})`;
        headerCompleted.innerHTML = `Completed (${completedCount})`;
    }

    function createMarkup(array) {
        let toDoList = document.querySelector('#currentTasks');
        let completedList = document.querySelector('#completedTasks');
        array.forEach(element => {
            if (element.completed === true) {
                let newLiForListElement = document.createElement('li');
                colorForTask(element,newLiForListElement);
                newLiForListElement.classList.add('list-group-item', 'd-flex', 'w-100', 'mb-2');
                newLiForListElement.setAttribute('data-li-id', `${element.id}`);
                newLiForListElement.setAttribute('draggable', `true`);
                let divForListElement = document.createElement('div');
                divForListElement.classList.add('w-100', 'mr-2');
                let divForListElementTitle = document.createElement('div');
                divForListElementTitle.classList.add('d-flex', 'w-100', 'justify-content-between');
                let headerForListElementTitle = document.createElement('h5');
                headerForListElementTitle.classList.add('mb-1');
                headerForListElementTitle.innerHTML = `${element.title}`;
                let divForListElementDateAndPriority = document.createElement('div');
                let smallForListElementPriority = document.createElement('small');
                smallForListElementPriority.classList.add('mr-2');
                smallForListElementPriority = `${element.priority} priority`
                let smallForListElementDate = document.createElement('small');
                smallForListElementDate.innerHTML = ` ${element.date}`
                divForListElementDateAndPriority.append(smallForListElementPriority, smallForListElementDate);
                divForListElementTitle.append(headerForListElementTitle, divForListElementDateAndPriority);
                let descriptionForListElement = document.createElement('p');
                descriptionForListElement.classList.add('mb-1', 'w-100');
                descriptionForListElement.innerHTML = `${element.description}`;
                divForListElement.append(divForListElementTitle, descriptionForListElement);
                let divForDropdownMenu = document.createElement('div');
                divForDropdownMenu.classList.add('dropdown', 'm-2', 'dropleft');
                let buttonForOpenDropdownMenu = document.createElement('button');
                buttonForOpenDropdownMenu.classList.add('btn', 'btn-secondary', 'h-100');
                buttonForOpenDropdownMenu.setAttribute('type', 'button');
                buttonForOpenDropdownMenu.setAttribute('id', 'dropdownMenuItem1');
                buttonForOpenDropdownMenu.setAttribute('data-toggle', 'dropdown');
                buttonForOpenDropdownMenu.setAttribute('aria-haspopup', 'true');
                buttonForOpenDropdownMenu.setAttribute('aria-expanded', 'false');
                let fontForDropdownMenu = document.createElement('i');
                fontForDropdownMenu.classList.add('fas', 'fa-ellipsis-v');
                fontForDropdownMenu.setAttribute('aria-hidden', 'true');
                buttonForOpenDropdownMenu.append(fontForDropdownMenu);
                let hiddenDivForDropdownMenu = document.createElement('div');
                hiddenDivForDropdownMenu.classList.add('dropdown-menu', 'p-2', 'flex-column');
                hiddenDivForDropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuItem1');
                let unCompleteButtonForDropdown = document.createElement('button');
                unCompleteButtonForDropdown.classList.add('btn', 'btn-dark', 'w-100', 'mb-2');
                unCompleteButtonForDropdown.setAttribute('type', 'button');
                unCompleteButtonForDropdown.innerHTML = 'Uncomplete';
                let dangerButtonForDropdown = document.createElement('button');
                dangerButtonForDropdown.classList.add('btn', 'btn-danger', 'w-100');
                dangerButtonForDropdown.setAttribute('type', 'button');
                dangerButtonForDropdown.innerHTML = 'Delete';
                hiddenDivForDropdownMenu.append(unCompleteButtonForDropdown, dangerButtonForDropdown);
                divForDropdownMenu.append(buttonForOpenDropdownMenu, hiddenDivForDropdownMenu);
                newLiForListElement.append(divForListElement, divForDropdownMenu);
                completedList.append(newLiForListElement);
                

            } else if (element.completed === false) {
                let newLiForListElement = document.createElement('li');
                colorForTask(element,newLiForListElement);
                newLiForListElement.classList.add('list-group-item', 'd-flex', 'w-100', 'mb-2');
                newLiForListElement.setAttribute('data-li-id', `${element.id}`);
                newLiForListElement.setAttribute('draggable', `true`);
                let divForListElement = document.createElement('div');
                divForListElement.classList.add('w-100', 'mr-2');
                let divForListElementTitle = document.createElement('div');
                divForListElementTitle.classList.add('d-flex', 'w-100', 'justify-content-between');
                let headerForListElementTitle = document.createElement('h5');
                headerForListElementTitle.classList.add('mb-1');
                headerForListElementTitle.innerHTML = `${element.title}`;
                let divForListElementDateAndPriority = document.createElement('div');
                let smallForListElementPriority = document.createElement('small');
                smallForListElementPriority.classList.add('mr-2');
                smallForListElementPriority = `${element.priority} priority`
                let smallForListElementDate = document.createElement('small');
                smallForListElementDate.innerHTML = ` ${element.date}`
                divForListElementDateAndPriority.append(smallForListElementPriority, smallForListElementDate);
                divForListElementTitle.append(headerForListElementTitle, divForListElementDateAndPriority);
                let descriptionForListElement = document.createElement('p');
                descriptionForListElement.classList.add('mb-1', 'w-100');
                descriptionForListElement.innerHTML = `${element.description}`;
                divForListElement.append(divForListElementTitle, descriptionForListElement);
                let divForDropdownMenu = document.createElement('div');
                divForDropdownMenu.classList.add('dropdown', 'm-2', 'dropleft');
                let buttonForOpenDropdownMenu = document.createElement('button');
                buttonForOpenDropdownMenu.classList.add('btn', 'btn-secondary', 'h-100');
                buttonForOpenDropdownMenu.setAttribute('type', 'button');
                buttonForOpenDropdownMenu.setAttribute('id', 'dropdownMenuItem1');
                buttonForOpenDropdownMenu.setAttribute('data-toggle', 'dropdown');
                buttonForOpenDropdownMenu.setAttribute('aria-haspopup', 'true');
                buttonForOpenDropdownMenu.setAttribute('aria-expanded', 'false');
                let fontForDropdownMenu = document.createElement('i');
                fontForDropdownMenu.classList.add('fas', 'fa-ellipsis-v');
                fontForDropdownMenu.setAttribute('aria-hidden', 'true');
                buttonForOpenDropdownMenu.append(fontForDropdownMenu);
                let hiddenDivForDropdownMenu = document.createElement('div');
                hiddenDivForDropdownMenu.classList.add('dropdown-menu', 'p-2', 'flex-column');
                hiddenDivForDropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuItem1');
                let completeButtonForDropdown = document.createElement('button');
                completeButtonForDropdown.classList.add('btn', 'btn-success', 'w-100');
                completeButtonForDropdown.setAttribute('type', 'button');
                completeButtonForDropdown.innerHTML = 'Complete';
                let editButtonForDropdown = document.createElement('button');
                editButtonForDropdown.classList.add('btn', 'btn-info', 'w-100', 'my-2');
                editButtonForDropdown.setAttribute('type', 'button');
                editButtonForDropdown.innerHTML = 'Edit';
                let dangerButtonForDropdown = document.createElement('button');
                dangerButtonForDropdown.classList.add('btn', 'btn-danger', 'w-100');
                dangerButtonForDropdown.setAttribute('type', 'button');
                dangerButtonForDropdown.innerHTML = 'Delete';
                hiddenDivForDropdownMenu.append(completeButtonForDropdown, editButtonForDropdown, dangerButtonForDropdown);
                divForDropdownMenu.append(buttonForOpenDropdownMenu, hiddenDivForDropdownMenu);
                newLiForListElement.append(divForListElement, divForDropdownMenu);
                toDoList.append(newLiForListElement);
            } else {
                console.log('Any errors');
            }
        });
        localStorage.setItem('taskList',JSON.stringify(array));
        eventListenerForDeleteButton();
        eventListenerForCompleteButton();
        eventListenerForUnCompleteButton();
        eventListenerForEditButton();
        addCountOfListElements();
    }

    function createTask() {
        let date = new Date();
        let dateString = `${date.getHours()}:${date.getMinutes()} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        let taskTitle = document.querySelector('#inputTitle');
        let taskText = document.querySelector('#inputText');
        let listTaskPriority = document.querySelectorAll('input[name=gridRadios]');
        let chekedRadio;

        for (let index = 0; index < listTaskPriority.length; index++) {
            if (listTaskPriority[index].checked == true) {
                chekedRadio = listTaskPriority[index].defaultValue;
            }
        }
        let newObject = new Object({
            id: count,
            title: taskTitle.value,
            description: taskText.value,
            priority: chekedRadio,
            date: dateString,
            completed: false,
        })
        taskList.push(newObject);
        count++;
        deleteMarkup();
        createMarkup(taskList);

    }

    function deleteMarkup() {
        let allLi = document.querySelectorAll('ul');
        allLi.forEach(element => {
            element.innerHTML = '';
        })
    }

    function deleteTask(id) {
        let currentObj = taskList.find(x => x.id == id);
        let index = taskList.indexOf(currentObj);
        taskList.splice(index, 1);

    }

    function eventListenerForDeleteButton() {
        let deleteTaskButton = document.querySelectorAll('.btn-danger');
        deleteTaskButton.forEach(element => {
            element.addEventListener('click', function () {
                deleteTask(element.parentNode.parentNode.parentNode.getAttribute('data-li-id'));
                deleteMarkup();
                createMarkup(taskList);
            })
        })
    }

    function eventListenerForCompleteButton() {
        let completeTaskButton = document.querySelectorAll('.btn-success');
        completeTaskButton.forEach(element => {
            element.addEventListener('click', function () {
                taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].completed = true;
                deleteMarkup();
                createMarkup(taskList);
            })
        })
    }

    function eventListenerForUnCompleteButton() {
        let unCompleteTaskButton = document.querySelectorAll('.btn-dark');
        unCompleteTaskButton.forEach(element => {
            element.addEventListener('click', function () {
                taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].completed = false;
                deleteMarkup();
                createMarkup(taskList);
            })
        })
    }

    function eventListenerForEditButton() {
        let editTaskButton = document.querySelectorAll('.btn-info');
        let idOfEditElement;
        editTaskButton.forEach(element => {
            element.addEventListener('click', function () {
                $('#exampleModal').modal('show');
                idOfEditElement = taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].id;
                addTaskButton.innerHTML = 'Edit';
                addTaskButton.setAttribute('data-edit', `${idOfEditElement}`);
                let inputTitle = document.querySelector('#inputTitle');
                let inputText = document.querySelector('#inputText');
                inputTitle.value = taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].title;
                inputText.value = taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].description;
                let chekedRadio = document.querySelector(`#${taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].priority}`);         
                let listTaskPriority = document.querySelectorAll('input[name=gridRadios]');
                for (let index = 0; index < listTaskPriority.length; index++) {
                    if(chekedRadio.value == listTaskPriority[index].defaultValue){
                        listTaskPriority[index].checked = true;
                    }
                }                        
                editTask(idOfEditElement);
            })
        })
    }

    function editTask(id) {
        let taskTitle = document.querySelector('#inputTitle');
        let taskText = document.querySelector('#inputText');
        let listTaskPriority = document.querySelectorAll('input[name=gridRadios]');
        let chekedRadio;      
        for (let index = 0; index < listTaskPriority.length; index++) {
            if (listTaskPriority[index].checked == true) {
                chekedRadio = listTaskPriority[index].defaultValue;
            }
        }
        
        let currentObj = taskList.find(x => x.id == id);
        currentObj.title = taskTitle.value;
        currentObj.description = taskText.value;
        currentObj.priority = chekedRadio;
        
        
    }

    let colorPickerForBackground = document.querySelector('#colorForBackground');
    colorPickerForBackground.addEventListener('change',function(){
        let wrapper = document.querySelector('.wrapper');
        let nav = document.querySelector ('nav');
        wrapper.style.backgroundColor = colorPickerForBackground.value;
        nav.style.setProperty("background-color", `${colorPickerForBackground.value}`, "important");
        localStorage.setItem('bgColor', colorPickerForBackground.value);
    })

    
})