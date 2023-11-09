class User {

    // atributos
    constructor() { 
        this.cpf_cnpj = ' ';
        this.email = ' ';
        this.user_password = ' ';
        this.user_name = ' ';
        this.phone = ' ';
        this.flag_active = 1;
        this.fk_user_type = ' ';
    };


    lerDadosCadastro() {
        let user = {};	

        // buscando o valor do input radio
        let tipoUser = null;
        const radioEstudante = document.getElementById('rd_estudante').value;
        const radioProfessor = document.getElementById('rd_prof').value;
        const radioInstituicao = document.getElementById('rd_instituto').value;

        // verificando qual radio foi selecionado
        if (document.getElementById('rd_estudante').checked) { tipoUser = radioEstudante;} 
        else if (document.getElementById('rd_prof').checked) { tipoUser = radioProfessor;} 
        else if (document.getElementById('rd_instituto').checked) { tipoUser = radioInstituicao;}
        
        // declarando os valores para o objeto
        user.cpf_cnpj = document.getElementById('inp_doc').value;
        user.email = document.getElementById('inp_email').value;
        user.user_password = document.getElementById('inp_senha').value;
        user.user_name = document.getElementById('inp_nome').value;
        user.phone = document.getElementById('inp_tel').value;
        user.flag_active = 1;
        user.fk_user_type = tipoUser;
        user.confSenhaUser = document.getElementById('inp_conf_senha').value;

        return user;    
    };

    exibirCorrecoes(elemento, texto) {
        elemento.innerHTML = texto;
    };

    validarDocumento(doc){
        const documento = doc;
        //verificar se é cpf ou cnpj
        if(documento.length == 11){
            //validar formato do cpf ()

            return true;
        }
        if(documento.length == 14 || documento.length == 15){
            //cnpj
            return true;
        }
    }


    validarCamposCadastro(user){
        const elementos = document.querySelectorAll('.valid-text');

        elementos.forEach(elemento => {
            elemento.innerHTML = '';
        });

        //validar formato do cpf ou do cnpj


        if(user.fk_user_type == null){
            this.exibirCorrecoes(document.getElementById('erro_tipo_user'), 'Selecione um tipo de usuário!');
            return false;
        }

        if(user.user_name == ''){
            this.exibirCorrecoes(document.getElementById('erro_nome'), 'O campo nome é obrigatório!');
            return false;
        }

        if(user.cpf_cnpj == ''){
            this.exibirCorrecoes(document.getElementById('erro_doc'), 'O campo documento é obrigatório!');
            return false;
        }

        //professor
        if(user.fk_user_type == 2 && user.cpf_cnpj.length != 11){
            this.exibirCorrecoes(document.getElementById('erro_doc'), 'O campo documento deve ter 11 caracteres!');
            return false;
        }

        //estudante
        if(user.fk_user_type == 3 && user.cpf_cnpj.length != 11){
            this.exibirCorrecoes(document.getElementById('erro_doc'), 'O campo documento deve ter 11 caracteres!');
            return false;
        }

        //instituicao
        if(user.fk_user_type == 1 && user.cpf_cnpj.length < 14 || user.cpf_cnpj.length > 15){
            this.exibirCorrecoes(document.getElementById('erro_doc'), 'O campo documento deve ter 14 caracteres!');
            return false;
        };

        if(user.phone == ''){
            this.exibirCorrecoes(document.getElementById('erro_tel'), 'O campo telefone é obrigatório!');
            return false;
        }
        
        if(user.email == '' ){
            this.exibirCorrecoes(document.getElementById('erro_email'), 'O campo email é obrigatório!');
            return false;
        }

        //validando formato do email
        if(user.email.indexOf('@') == -1 || user.email.indexOf('.') == -1 ){
            this.exibirCorrecoes(document.getElementById('erro_email'), 'O campo de email está no formato inválido!');
            return false;
        }

        if(user.user_password.trim() == ''){
            this.exibirCorrecoes(document.getElementById('erro_senha'), 'O campo senha é obrigatório!');
            return false;
        }

        //validando tamanho da senha
        if(user.user_password.length < 8){
            this.exibirCorrecoes(document.getElementById('erro_senha'), 'O campo senha deve ter no mínimo 8 caracteres!');
            return false;
        }

        if(user.confSenhaUser == ''){
            this.exibirCorrecoes(document.getElementById('erro_conf_senha'), 'O campo confirmar senha é obrigatório!');
            return false;
        }
        if(user.user_password != user.confSenhaUser){
            this.exibirCorrecoes(document.getElementById('erro_conf_senha'), 'O campo confirmar senha deve ser igual ao campo senha!');
            return false;
        }

        return true;
    };

    cadastrar() {
        let novoUsuario = this.lerDadosCadastro();
        if(this.validarCamposCadastro(novoUsuario)){
            delete novoUsuario.confSenhaUser;
            fetch('http://localhost:3000/users/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = 'login.html';
            })
            
        }else{
            alert('Erro ao cadastrar usuário!');
        }
    };

    logar() {
        let email = document.getElementById('inp_email_login').value;
        let senha = document.getElementById('inp_senha_login').value;
        let user = {
            email: email,
            user_password: senha,
        };
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.length > 0){
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data[0]));
                if(data[0].fk_user_type == 1){
                    window.location.href = 'interno/instuicao/home.html';
                }else if(data[0].fk_user_type == 2 || data[0].fk_user_type == 3){
                    window.location.href = '/interno/usuarios/home.html';
                }
            }else{
                alert('Usuário ou senha inválidos!');
            }
        })
        .catch(error => console.log(error));
    };
};


let user = new User();


/* 

{
    "workbench.colorTheme": "Andromeda Bordered",
    "files.autoSave": "afterDelay",
    "window.zoomLevel": -1,
    "workbench.iconTheme": "vs-seti",
    "explorer.confirmDelete": false,
}
*/