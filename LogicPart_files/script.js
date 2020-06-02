document.addEventListener('DOMContentLoaded', function () {

    let count = 4;

    let taskList = [{
            id: 0,
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid eaque eligendi error eveniet nostrum nulla pariatur repudiandae, veniam. Provident.',
            priority: 'High',
            date: '11.00 01.01.2000',
            completed: false
        },
        {
            id: 1,
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid eaque eligendi error eveniet nostrum nulla pariatur repudiandae, veniam. Provident.',
            priority: 'Low',
            date: '11.00 01.01.2010',
            completed: true
        },
        {
            id: 2,
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid eaque eligendi error eveniet nostrum nulla pariatur repudiandae, veniam. Provident.',
            priority: 'Low',
            date: '11.00 01.01.2020',
            completed: true
        },
        {
            id: 3,
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid eaque eligendi error eveniet nostrum nulla pariatur repudiandae, veniam. Provident.',
            priority: 'High',
            date: '11.00 01.01.2030',
            completed: true
        }
    ]

    createMarkup(taskList);


    let addTaskButton = document.querySelector('#add_task');
        addTaskButton.addEventListener('click', function () {
            event.preventDefault();
            createTask();
            $('#exampleModal').modal('hide');
        })

    

    function createMarkup(array) {
        let toDoList = document.querySelector('#currentTasks');
        let completedList = document.querySelector('#completedTasks');
        array.forEach(element => {
            if (element.completed === true) {
                let newLiForListElement = document.createElement('li');
                newLiForListElement.classList.add('list-group-item', 'd-flex', 'w-100', 'mb-2');
                newLiForListElement.setAttribute('data-li-id',`${element.id}`);
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
                newLiForListElement.classList.add('list-group-item', 'd-flex', 'w-100', 'mb-2');
                newLiForListElement.setAttribute('data-li-id',`${element.id}`);
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
        eventListenerForDeleteButton();
        eventListenerForCompleteButton();
        eventListenerForUnCompleteButton();
    }
    
    function createTask() {
        let date =  new Date();
        let dateString = `${date.getHours()}:${date.getMinutes()} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        let taskTitle = document.querySelector('#inputTitle');
        let taskText = document.querySelector('#inputText');
        let listTaskPriority = document.querySelectorAll('input[name=gridRadios]');
        let chekedRadio;
        
        for (let index = 0; index < listTaskPriority.length; index++) {  
                if(listTaskPriority[index].checked == true){
                    chekedRadio = listTaskPriority[index].defaultValue;
                }
        }
        let newObject = new Object(
            {
                id:count,
                title: taskTitle.value,
                description: taskText.value,
                priority: chekedRadio,
                date: dateString,
                completed: false
            }
        )
        taskList.push(newObject);
        count++;
        deleteMarkup();
        createMarkup(taskList);
        
    }

    function deleteMarkup(){
        let allLi = document.querySelectorAll('ul');
        allLi.forEach(element=>{
            element.innerHTML = '';
        })
    }

    function deleteTask(id){
        let currentObj = taskList.find(x=>x.id===id);
        let index = taskList.indexOf(currentObj);
        taskList.splice(index, 1);
        console.log(taskList);
        
    }

    function eventListenerForDeleteButton(){
        let deleteTaskButton = document.querySelectorAll('.btn-danger');
            deleteTaskButton.forEach(element=>{
                element.addEventListener('click',function(){          
                deleteTask(element.parentNode.parentNode.parentNode.getAttribute('data-li-id'));
                element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);
                })
            })
    }

    function eventListenerForCompleteButton(){
        let completeTaskButton = document.querySelectorAll('.btn-success');
        completeTaskButton.forEach(element=>{
            element.addEventListener('click',function(){
                taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].completed = true;
                deleteMarkup();
                createMarkup(taskList);
            })
        })
    }

    function eventListenerForUnCompleteButton(){
        let unCompleteTaskButton = document.querySelectorAll('.btn-dark');
        unCompleteTaskButton.forEach(element=>{
            element.addEventListener('click',function(){
                taskList[element.parentNode.parentNode.parentNode.getAttribute('data-li-id')].completed = false;
                deleteMarkup();
                createMarkup(taskList);
            })
        })
    }

})