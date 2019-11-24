const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path =require('path');

const validator = require('validator');

const errorView = require('./views/errorView');
const signUpView = require('./views/signUpView');
const signInView = require('./views/signInView');

//#region Firebase

const firebase = require('firebase');
const firebaseConfig = require(path.join(__dirname,'./config/firebase.json'));

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//#endregion

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/cadastro', (req, resp) => {
    const { email, confirmEmail, senha, confirmSenha, empresa, cnpj } = req.body;

    if (!email || !confirmEmail || !senha || !confirmSenha || !empresa || !cnpj) {
        resp.send(errorView('Preencha todos os campos.'));
    }
    else {
        if(senha.length < 6){
            resp.send(errorView('Senha deve conter mais de 5 caracteres.'))
        }
        if (!validator.isEmail(email)) {
            resp.send(errorView('E-mail inválido.'));
        }
        else if (email != confirmEmail) {
            resp.send(errorView('Email de confirmação inválido.'));
        }
        else if (senha != confirmSenha) {
            resp.send(errorView('Senha de confirmação inválida.'));
        }
        else if (cnpj.length != 14) {
            resp.send(errorView('CNPJ inválido.'));
        }
        else {

            auth.createUserWithEmailAndPassword(email, senha)
                .then(result => {
                    result.user.updateProfile({displayName: empresa});
                    resp.send(signUpView());
                })
                .catch(err => {
                    console.log(err.code);
                    if(err.code == 'auth/email-already-in-use'){
                        resp.send(errorView('Este endereço de e-mail já está em uso.'))
                    }
                    else{
                        resp.send(errorView(err.message));
                    }
                });
        }
    }
});

app.post('/login', (req, resp) =>{
    const { email, senha } = req.body;

    auth.signInWithEmailAndPassword(email, senha)
        .then(user =>{
            resp.send(signInView(user.user.displayName));
        })
        .catch(err =>{
            resp.send(errorView('E-mail ou senha inválidos.'));
        })
})

// app.get('/deslogar', (req, resp) =>{
//     auth.signOut()
//         .then(result => resp.end())
//         .catch(err => console.log(err));
// })

app.listen(8080, () => console.log('Servidor rodando na porta 8080!'));