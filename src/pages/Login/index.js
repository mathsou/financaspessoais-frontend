import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FiLogIn, FiEyeOff, FiEye } from 'react-icons/fi';
import {Context} from '../../Context/AuthContext';

import './styles.css';

import titulo from '../../assets/name.svg'
import logo from '../../assets/logo.png'

var mSenha = false;

export default function Login(){
    const {authenticated, handleLogin} = useContext(Context)
    
    console.debug('login', authenticated)
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');


    function mostraSenha(){
        if(mSenha){
            document.getElementById("eyeOffSenha").style.display = 'block';
            document.getElementById("eyeSenha").style.display = 'none';

            document.getElementById('senha').type = 'password';
            mSenha = !mSenha
        }
        else{
            document.getElementById("eyeOffSenha").style.display = 'none';
            document.getElementById("eyeSenha").style.display = 'block';

            document.getElementById('senha').type = 'text';
            mSenha = !mSenha
        }
    }

    function enter(e){
        var tecla = e.key;
        if(tecla === 'Enter'){
            handleLogin({user, senha})
        }
    }

    return (
        <div className="login-container">

            <section className="titulo">
                <img src={titulo} alt="controle de dividas"/>
            </section>
            
            <div className="content">
            <section className="calculadora">
                <img src={logo} alt="calculadora"/>
            </section>
            

            <section className="form">
                <form>
                    <input 
                        id="user"
                        type="text" 
                        placeholder="Nome de usuario ou E-mail" 
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        onKeyPress={enter}
                        required
                        autoFocus
                    />
                    <input 
                        id="senha"
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        onKeyPress={enter}
                        required
                    />
                    <FiEyeOff
                            id="eyeOffSenha" 
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraSenha}
                            style={{display: 'block'}}
                        />
                        <FiEye 
                            id="eyeSenha"
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraSenha}
                            style={{display: 'none'}}
                        />
                    
                    <button className="button" type="button" onClick={() => handleLogin({user, senha})}>Entrar</button><p>.</p>
                    
                    <Link to="/register">
                    <FiLogIn id="registrar" size={16} color="#336EC6"/>
                    Cadastrar
                    </Link>
                </form>
            </section>
            </div>
        </div>
    );
}