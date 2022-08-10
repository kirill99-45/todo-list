const holders = document.getElementsByClassName('holder');
const placeholders = document.querySelectorAll('.placeholder');
const containers = document.querySelectorAll('.placeholder__container');
let header = document.querySelector('.header')

let newHolders = []

for (let i = 0; i < holders.length; i++) {
  newHolders.push(holders[i]);
}

for (let j = 0; j < newHolders.length; j++) {
  newHolders[j].addEventListener('dragstart', dragStart);
  newHolders[j].addEventListener('dragend', dragEnd)
}

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver)
  placeholder.addEventListener('dragenter', dragEnter)
  placeholder.addEventListener('dragleave', dragLeave)
  placeholder.addEventListener('drop', dragDrop)
}

let div = 0;

function dragStart(event) {
  event.target.classList.add('hold');
  event.target.style.background = '#8FC1E3'
  setTimeout( () => event.target.classList.add('hide'), 0)
  div = newHolders.indexOf(event.target);
}

function dragEnd(event) {
  event.target.className = 'holder';
}

function dragOver(event) {
  event.preventDefault(true)
}

function dragEnter(event) {
  if (event.target.className.includes('placeholder')){
  event.target.classList.add('hovered');
  }
}

function dragLeave(event) {
  event.target.classList.remove('hovered')
}


function dragDrop(event) {
  const target = event.target

  if (target.className.includes('placeholder hovered')) {
    target.append(newHolders[div]);
    target.classList.remove('hovered');
  }
  if (target == placeholders[2]) {
    placeholders[2].children[target.children.length - 1].style.textDecoration = 'line-through';
    let child = placeholders[2].children[target.children.length - 1];
    child.draggable = false
    child.style.background = '#15DB95';
  } else if (target == placeholders[1]) {
    let child = placeholders[1].children[target.children.length - 1];
    child.style.background = '#FFE400';
  } else if (target == placeholders[0]) {
    let child = placeholders[0].children[target.children.length - 1];
    child.style.background = '#E85A4F';
  }
}

const btnCreate = document.querySelector('.create');
const newTask = document.querySelector('.task');

btnCreate.addEventListener('click', () => {
  if (newTask.value.trim().length > 0) {
    const task = document.createElement('div')
    task.classList.add('holder');
    task.draggable = 'true';
    task.innerText = newTask.value;

    placeholders[0].append(task);
    newHolders.push(task)

    localStorage.setItem('todo', JSON.stringify(newHolders))

    let last = newHolders.length - 1;

    newHolders[last].addEventListener('dragstart', dragStart);
    newHolders[last].addEventListener('dragend', dragEnd);

    newTask.value = ''

    let newHeight = placeholders[0].clientHeight + 'px';
    if (placeholders[0].children.length > placeholders.length) {
      for (let i = 0; i < placeholders[0].children.length; i++) {
        placeholders[i].style.height = holders.length * 70 + 'px';
      }
    }
  }
})
