import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';

import { FiArrowLeft, FiEyeOff, FiEye} from 'react-icons/fi';
import logo from '../../assets/logo-name.png';
import mask from '../../functions/mascaraDinheiro';
import api from '../../services/api';
var okSenha = false;
var okUser = false;
var mSenha = false;
var mRSenha = false;

export default function Register(){ 
    const history = useHistory();  
    const [userName, setUserNome] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [rSenha, setRSenha] = useState('');
    var [salarioB, setSalarioB] = useState('');
    function validacaoSenha(){
        if(senha === rSenha){
            document.getElementById("msgSenha").style.display = 'none';
            okSenha = true;
            
        }
        else{
            document.getElementById("sBruto").style.marginTop = '23px';

            document.getElementById("msgSenha").style.display = 'block';
            okSenha = false;
        }
        
    }

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

    function mostraRSenha(){
        if(mRSenha){
            document.getElementById("eyeOffRSenha").style.display = 'block';
            document.getElementById("eyeRSenha").style.display = 'none';

            document.getElementById('rSenha').type = 'password';
            mRSenha = !mRSenha
        }
        else{
            document.getElementById("eyeOffRSenha").style.display = 'none';
            document.getElementById("eyeRSenha").style.display = 'block';

            document.getElementById('rSenha').type = 'text';
            mRSenha = !mRSenha
        }
        
    }
    

    async function validacaoUsuario(){
        const user = await api.post('/validaUser', {"userName": userName});
        
        if(user.data.userName === userName){
            document.getElementById("nome").style.marginTop = '23px';

            document.getElementById("msgUserCerto").style.display = 'none';
            document.getElementById("msgUserInvalido").style.display = 'none';
            document.getElementById("msgUserErrado").style.display = 'block';
            okUser=false;
        }
        else if(userName.length < 3){
            document.getElementById("nome").style.marginTop = '23px';

            document.getElementById("msgUserCerto").style.display = 'none';
            document.getElementById("msgUserInvalido").style.display = 'block';
            document.getElementById("msgUserErrado").style.display = 'none';
            okUser=false;
            
        }
        else {
            document.getElementById("nome").style.marginTop = '23px';

            document.getElementById("msgUserCerto").style.display = 'block';
            document.getElementById("msgUserInvalido").style.display = 'none';
            document.getElementById("msgUserErrado").style.display = 'none';
            okUser=true;
            
        }        

    }

    async function handleRegister(e){
        e.preventDefault();
        if(okUser && okSenha){
            const data = {
                userName,
                nome,
                email,
                senha,
                salarioB: mask.removeMascara(salarioB)
            };
            try {
                await api.post('usuarios', data);
                alert("Cadastro realizado com sucesso!");
                
            }
            catch (err){
                alert('Erro ao realizar o cadastro, tente novamente!');
            }
            history.push('/');
        }
        else {
            alert('N??o foi poss??vel concluir o cadastro, verifique se os dados est??o corretos')
        }
        

    }

    return (
        <div className="register-container"> 
            <div className="content">
                <section className="logo">
                    <img src={logo} alt="calculadora"/>
                    <Link to="/">
                        <FiArrowLeft size={16} color="#336EC6"/>
                        Voltar para a tela de Login
                    </Link>
                </section>
                
                <section className="form">
                    <form onSubmit={handleRegister}>
                        <input 
                            id="userName" 
                            type="text" 
                            placeholder="Nome de Usu??rio"
                            onBlur={validacaoUsuario}
                            value={userName}
                            onChange={e => setUserNome(e.target.value)}
                            required
                            autoFocus
                            
                        />
                        <p id="msgUserErrado" style={{display: 'none'}}>Nome de usu??rio j?? est?? sendo usado</p>
                        <p id="msgUserCerto" style={{display: 'none'}}>Nome de usu??rio dispon??vel</p>
                        <p id="msgUserInvalido" style={{display: 'none'}}>O nome de usu??rio precisa ter no m??nimo 3 caracteres</p>
                        <input 
                            id="nome"
                            type="text" 
                            placeholder="Nome completo"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            id="senha"
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}required
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
                        <input 
                            id="rSenha"
                            type="password" 
                            placeholder="Repetir a Senha"
                            value={rSenha}
                            onChange={e => setRSenha(e.target.value)}
                            onBlur={validacaoSenha}
                            required
                        />
                        <FiEyeOff 
                            id="eyeOffRSenha" 
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraRSenha}
                            style={{display: 'block'}}
                        />
                        <FiEye 
                            id="eyeRSenha"
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraRSenha}
                            style={{display: 'none'}}
                        />
                        <p id="msgSenha" style={{display: 'none'}}>As senhas n??o correspondem!</p>
                        <input 
                            id="sBruto"
                            name="salarioB"
                            type="text" 
                            placeholder="Sal??rio Bruto"
                            value={salarioB}
                            onChange={e => setSalarioB(e.target.value)}
                            onKeyUp={() => {document.forms[0].salarioB.value = mask.mascaraDinheiro(salarioB)}}
                            required
                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form> 
                </section>
            </div>
            
        </div>
    );
}