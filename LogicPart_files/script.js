document.addEventListener('DOMContentLoaded', function () {

    let count = 0;

    let taskList = [];
    let userList = [];

    let userLoginLabel = document.querySelector('#userLogin');
    let signOutButton = document.querySelector('#sign-out');
    let toDoHeader = document.querySelector('#to-do-header');
    let completedHeader = document.querySelector('#completed-header');
    let registrationButton = document.querySelector('#registration');
    let signInButton = document.querySelector('#sign-in');
    let addTaskMainButton = document.querySelector('#add-task');
    let hr = document.querySelector('hr');

    if (localStorage.getItem('taskList') != undefined) {
        taskList = JSON.parse(localStorage.getItem('taskList'))
    }
    if (localStorage.getItem('userList') != undefined) {
        userList = JSON.parse(localStorage.getItem('userList'))
    }
    if (localStorage.getItem('userLogin') != undefined) {
        userLoginLabel.innerHTML = `${localStorage.getItem('userLogin')}`;
    }
    if(userLoginLabel.textContent == ''){
        signOutButton.style.display='none';
        toDoHeader.style.display='none';
        completedHeader.style.display='none';
        addTaskMainButton.style.display='none';
        hr.style.display='none';
    }
    if (localStorage.getItem('bgColor') != undefined) {
        let wrapper = document.querySelector('.wrapper');
        let nav = document.querySelector('nav');
        wrapper.style.backgroundColor = localStorage.getItem('bgColor');
        nav.style.setProperty("background-color", `${localStorage.getItem('bgColor')}`, "important");
    }

    function clearModal() {
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

    function colorForTask(element, li) {
        if (element.priority == 'Low') {
            li.style.backgroundColor = 'rgb(153, 255, 204)';
        } else if (element.priority == 'Medium') {
            li.style.backgroundColor = 'rgb(255, 204, 102)';
        } else {
            li.style.backgroundColor = 'rgb(255, 102, 0)'
        }
    }

    createMarkup(taskList);

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
        setTimeout(createMarkup(taskList), 0);
    })

    function addCountOfListElements() {
        let toDoCount = 0;
        let completedCount = 0;
        let resultArray = taskList.filter(user => user.user == userLoginLabel.textContent);
        for (let index = 0; index < resultArray.length; index++) {
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
        let resultArray = array.filter(user => user.user == userLoginLabel.textContent);
        resultArray.forEach(element => {
            if (element.completed === true) {
                let newLiForListElement = document.createElement('li');
                colorForTask(element, newLiForListElement);
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
                colorForTask(element, newLiForListElement);
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
        let allUl = document.querySelectorAll('ul');
        let allLi = document.querySelectorAll('li');

        allLi.forEach(element => {
            element.addEventListener('dragstart', e => {
                element.classList.add('dragging');
                console.log(element);

            })
            element.addEventListener('dragend', () => {
                element.classList.remove('dragging');
                let id = element.getAttribute('data-li-id');
                let currentObj = taskList.find(x => x.id == id);
                currentObj.completed = !currentObj.completed;
                localStorage.setItem('taskList', JSON.stringify(taskList));
                deleteMarkup();
                createMarkup(taskList);
            })
        });
        allUl.forEach(element => {
            element.addEventListener('dragover', e => {
                e.preventDefault();
            });
            element.addEventListener('drop', e => {
                e.preventDefault();
                let draggable = document.querySelector('.dragging');
                console.log("dragAndDrop -> draggable", draggable)
                element.append(draggable);
            })
        })
        if (userLoginLabel.textContent != ''){
            localStorage.setItem('taskList', JSON.stringify(array));
        }
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
            user: userLoginLabel.textContent,
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
                    if (chekedRadio.value == listTaskPriority[index].defaultValue) {
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
    colorPickerForBackground.addEventListener('change', function () {
        let wrapper = document.querySelector('.wrapper');
        let nav = document.querySelector('nav');
        wrapper.style.backgroundColor = colorPickerForBackground.value;
        nav.style.setProperty("background-color", `${colorPickerForBackground.value}`, "important");
        localStorage.setItem('bgColor', colorPickerForBackground.value);
    })

    /**
     * Secure Hash Algorithm (SHA256)
     * http://www.webtoolkit.info/
     * Original code by Angel Marin, Paul Johnston
     **/

    function SHA256(s) {
        var chrsz = 8;
        var hexcase = 0;

        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        function S(X, n) {
            return (X >>> n) | (X << (32 - n));
        }

        function R(X, n) {
            return (X >>> n);
        }

        function Ch(x, y, z) {
            return ((x & y) ^ ((~x) & z));
        }

        function Maj(x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        }

        function Sigma0256(x) {
            return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
        }

        function Sigma1256(x) {
            return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
        }

        function Gamma0256(x) {
            return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
        }

        function Gamma1256(x) {
            return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
        }

        function core_sha256(m, l) {
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;

            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;

            for (var i = 0; i < m.length; i += 16) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];

                for (var j = 0; j < 64; j++) {
                    if (j < 16) W[j] = m[j + i];
                    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }

                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }

        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
            }
            return bin;
        }

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, '\n');
            var utftext = '';

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        function binb2hex(binarray) {
            var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
            var str = '';
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        }

        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    }

    //Validation and Registration

    let registrationForm = document.querySelector('#registrationForm');
    let loginInput = document.querySelector('#inputLogin');
    let emailInput = document.querySelector('#inputEmail');
    let passwordInput = document.querySelector('#inputPassword');
    let confirmPasswordInput = document.querySelector('#inputConfirmPassword');
    let fields = registrationForm.querySelectorAll('.field');
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regLogin = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/;
    const regPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        removeValidation(registrationForm);
        checkFieldsPresence();

        if (checkLogin() && checkEmail() && checkPassword() && checkPasswordMatch()) {
            addUser();
            clearForm(registrationForm);
            $('#registrationModal').modal('hide');
        }
    })

    function generateError(text) {
        var error = document.createElement('div')
        error.className = 'error'
        error.style.color = 'red'
        error.innerHTML = text
        return error
    }

    function removeValidation(form) {
        let errors = form.querySelectorAll('.error')

        errors.forEach(element => {
            element.remove();
        })
    }

    function checkFieldsPresence() {
        fields.forEach(element => {
            if (!element.value) {
                let error = generateError(`Can't be empty`);
                element.parentElement.insertBefore(error, element);
                return false
            } else {
                return true
            }
        })
    }

    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            let error = generateError('Password doesnt match');
            passwordInput.parentElement.insertBefore(error, passwordInput);
            return false
        } else {
            return true
        }
    }

    function checkEmail() {
        if (!regEmail.test(emailInput.value)) {
            let error = generateError('Invalid email');
            emailInput.parentElement.insertBefore(error, emailInput);
            return false
        } else {
            return true
        }
    }

    function checkLogin() {
        if (!regLogin.test(loginInput.value)) {
            let error = generateError('Login must begin with a letter and be 4 to 20 characters long');
            loginInput.parentElement.insertBefore(error, loginInput);
            return false
        } else {
            return true
        }
    }

    function checkPassword() {
        if (!regPassword.test(passwordInput.value)) {
            let error = generateError('Password must be between 6 and 20 characters and contain at least one lowercase and one uppercase letter');
            passwordInput.parentElement.insertBefore(error, passwordInput);
            return false
        } else {
            return true
        }
    }

    function addUser() {

        let newUser = new Object({
            login: loginInput.value.toLowerCase(),
            email: emailInput.value,
            password: SHA256(passwordInput.value)
        })

        userList.push(newUser);
        localStorage.setItem('userList', JSON.stringify(userList));
    }

    //Auth

    let authForm = document.querySelector('#authForm');
    let loginAuthInput = document.querySelector('#inputAuthLogin');
    let passwordAuthInput = document.querySelector('#inputAuthPassword');

    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        removeValidation(authForm);
        if (validateUserLogin() && validateUserPassword()) {
            addUserToLabel();
            clearForm(authForm);
            $('#authModal').modal('hide');
            deleteMarkup();
            createMarkup(taskList);
            registrationButton.style.display = 'none';
            signInButton.style.display = 'none';
            signOutButton.style.display = 'inline-block';
            toDoHeader.style.display='block';
            completedHeader.style.display='block';
            hr.style.display='block';
            addTaskMainButton.style.display='inline-block';
        }
    })

    function validateUserLogin() {
        if (!userList.find(x => x.login == loginAuthInput.value.toLowerCase())) {
            let error = generateError('Unknown user');
            loginAuthInput.parentElement.insertBefore(error, loginAuthInput);
            return false
        } else {
            return true
        }
    }

    function validateUserPassword() {
        let findUser = userList.find(x => x.login == loginAuthInput.value.toLowerCase());
        if (findUser.password != SHA256(passwordAuthInput.value)) {
            let error = generateError('Wrong password');
            passwordAuthInput.parentElement.insertBefore(error, passwordAuthInput);
            return false
        } else {
            return true
        }
    }

    function addUserToLabel() {
        userLoginLabel.innerHTML = `${loginAuthInput.value}`;
        localStorage.setItem('userLogin', loginAuthInput.value);
    }

    //Sign Out

    signOutButton.addEventListener('click', function () {
        deleteMarkup();
        userLoginLabel.innerHTML = '';
        localStorage.setItem('userLogin', '');
        createMarkup(taskList);
        registrationButton.style.display = 'inline-block';
        signInButton.style.display = 'inline-block';
        signOutButton.style.display = 'none';
        toDoHeader.style.display='none';
        completedHeader.style.display='none';
        addTaskMainButton.style.display='none';
        hr.style.display='none';
    })

    function clearForm(form){
        let allInputInForm = form.querySelectorAll('input');
        allInputInForm.forEach(input => {
            input.value = '';
        })
    }
})