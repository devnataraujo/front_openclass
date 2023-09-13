// buscando infos do user
const formCadastro = document.querySelector('.form-cadastro');

// cadastro de usuario

function buscandoValores() {
    // buscando o valor do input radio
    let tipoUser = null;
    const radioEstudante = document.getElementById('rd_estudante').value;
    const radioProfessor = document.getElementById('rd_prof').value;
    const radioInstituicao = document.getElementById('rd_instituto').value;

    if (document.getElementById('rd_estudante').checked) { tipoUser = radioEstudante;} 
    else if (document.getElementById('rd_prof').checked) { tipoUser = radioProfessor;} 
    else if (document.getElementById('rd_instituto').checked) { tipoUser = radioInstituicao;};

    // buscando o valor do input text
    let nomeUser = document.getElementById('inp_nome').value;
    let emailUser = document.getElementById('inp_email').value;
    let docUser = document.getElementById('inp_doc').value;
    let telUser = document.getElementById('inp_tel').value;

    // buscando o valor do input password
    let senhaUser = document.getElementById('inp_senha').value;
    let confSenhaUser = document.getElementById('inp_conf_senha').value;

    // jogando os valores para o objeto
    let user = {
        cpf_cnpj: docUser,
        email: emailUser,
        user_password: senhaUser,
        user_name: nomeUser,
        phone: telUser,
        flag_active: 1,
        fk_user_type: tipoUser,
    };

    return user; 
};

const cadastrandoUsuario = async (event) => { // cadastrar usuario
    const user = buscandoValores();
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    console.log(user);
};

formCadastro.addEventListener('submit', cadastrandoUsuario);


// login de usuario

const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    return users;
};


// funcao para criar elementos html
const createElement = (tag, text) => {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
};
