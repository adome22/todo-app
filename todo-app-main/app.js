// count
const itemCnt = document.querySelector('.count span')

// CHANGE THEME

const themeIcon = document.querySelector('.theme');

themeIcon.addEventListener('click', ()=> {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')){
        themeIcon.src = 'images/icon-moon.svg'
    } else {
        themeIcon.src = 'images/icon-sun.svg'
    }
})

// input
const addBtn = document.querySelector('.todo-input button')
const todo = document.querySelector('.items .list')
const input = document.querySelector('.todo-input input');
const itemID = document.querySelector('.filters input[type="radio"]:checked')

addBtn.addEventListener('click', () => {
    if(input.value.length > 0) {
        addItems(input.value);
        input.value = '';
    }
});

input.addEventListener('keypress', (e)=>{
    if(e.charCode === 13 && input.value.length > 0) {
        addItems(input.value);
        input.value = '';
    }
});

function addItems(text) {
    const item = document.createElement('li');
    item.innerHTML = 
    `
    <label class="list">
    <input class="checkbox" type="checkbox"> 
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>`;

    if(itemID.id === 'completed') {
        item.classList.add('hidden');
    }
    todo.append(item);
}

// REMOVE

function removeItems(item) {
    item.remove();
}

todo.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        removeItems(e.target.parentElement);
    }
});

// FILTERS

document.querySelectorAll('.filters input').forEach(radio => {
    radio.addEventListener('change',(event)=>{
        filterTodo(e.target.id);
    })
});

function filterTodo(id) {
    const allItems = document.querySelectorAll('li');


    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
        })
        break;
        case 'active':
            allItems.forEach(item =>{
                if(item.querySelector('input').checked){
                    item.classList.add('hidden')
                } else {
                    item.classList.remove('hidden');
                }
        })
        break;       
        default:
            allItems.forEach(item =>{
                if(item.querySelector('input').checked){
                    item.classList.remove('hidden')
                } else {
                    item.classList.add('hidden');
                }
            })
            
    }
}

// CLEAR

const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    const itemChecked = document.querySelectorAll('.list input[type="checkbox"]:checked');
    itemChecked.forEach(item => {
        removeItems(item.closest('li'));
    })
})
