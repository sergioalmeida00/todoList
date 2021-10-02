const inputField = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
let quantidade = document.querySelector('.quantidade');
let btnRemoveAll = document.querySelector('.footer button');

// OBJETO RESPONSAVEL POR ARMAZENAR AS INFORMAÇÕES NO LOCALSTORAGE
let dbStorage = {
    getStorage: () => {
        return localStorage.getItem('New Todo')
    },
    setStorage: (data) => {
        return localStorage.setItem('New Todo', JSON.stringify(data));
    },
    removeAll: btnRemoveAll.onclick = () => {
        listArray = [];
        dbStorage.setStorage(listArray);
        show();
    }
}



// RESPONSAVEL POR VERIFICAR SE EXISTE ALGUM VALOR NO INPUT, SENDO TRUE ATIVA O BTN ADD CASO CONTRARIO INABILITA
inputField.onkeyup = () => {
    let userData = inputField.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove('active');

    }
}

// RESPONSAVEL POR VEREFICAR O CLIQUE DO BTN ADD, CASO SEJA CLICADO SALVA O VALOR NA VARIAVEL E ADD NO LOCAL STORAGE
inputField.addEventListener('keypress', (event) => {
    // console.log(event);
    let userData = inputField.value;
    if (event.key == 'Enter' && userData.trim() != 0) {
        cadastrar(userData);
    }

});

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let userData = inputField.value;
    if (userData.trim() == 0) {
        alert("Campo não pode ser vazio")
    } else {
        cadastrar(userData);
    }

});

function cadastrar(data) {
    if (dbStorage.getStorage() == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(dbStorage.getStorage());
    }
    if (data.trim() != 0) {
        listArray.push(data);
        dbStorage.setStorage(listArray);
        show();
    }
}

function show() {

    if (dbStorage.getStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(dbStorage.getStorage());
    }

    console.log(listArray)
    quantidade.textContent = listArray.length;
    //ARMAZENA A QUANTIDADE DE DADOS DO ARRAY E JOGA NO HTML NA CLASS QUANTIDADE

    // VERIFICA SE O TAMANHO DO ARRAY É MAIOR QUE 0 E ATIVA/REMOVE O BTN REMOVE ALL
    if (listArray.length > 0) {
        btnRemoveAll.classList.add('active');
    } else {
        btnRemoveAll.classList.remove('active');
    }

    let newTag = '';

    listArray.forEach((element, index) => {
        newTag += `<li>${element}<span onclick="deleteItem(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></span></li>`;
    });
    todoList.innerHTML = newTag;
    inputField.value = '';
}
show(); //INICIA OS DADOS EM TELA
function deleteItem(index) {
    listArray = JSON.parse(dbStorage.getStorage());
    listArray.splice(index, 1);
    dbStorage.setStorage(listArray);
    show();
}