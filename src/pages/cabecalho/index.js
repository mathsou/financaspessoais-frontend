import React, {useState, useContext, useEffect} from 'react';
import logo from '../../assets/logo.png';
import usuario from '../../assets/usuario.png';
// import {FiSettings} from 'react-icons/fi';
import Modal from 'react-modal';

import {Context} from '../../Context/AuthContext';

import './style.css'
import api from '../../services/api';

Modal.setAppElement('#root');


export default function Cabecalho(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {handleLogout} = useContext(Context);

    const [nome, setNome] = useState('');
    const [salarioB, setSalarioB] = useState(0.0);

    useEffect(() => {
        api.get('/usuarios')
        .then(response => {
            if(response.data.length > 0){
                setNome(response.data[0].nome);
                setSalarioB(response.data[0].salarioB);
            }
        });
    }, [])  

    return(
        <header>
                <img src={logo} alt="Logo" id="logo"/>
                <h1>CONTROLE DE DÍVIDAS PESSOAIS</h1>
                <button className="unvisible" onClick={() => setModalIsOpen(true)}><img src={usuario} alt="" className="user"/></button>
                <Modal 
                    className="box" 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)'
                        }}}
                    >
                    <button className="unvisible" onClick={() => setModalIsOpen(false)}><img src={usuario} alt="Logo" id="user"/></button><br/>
                    <h1>{nome}</h1><br/>
                    <ul>
                        <li>
                            {/* <Link to="/profile/settings">
                                <FiSettings size={20} color="#fff" />
                                Configurações
                            </Link> */}
                        </li>
                        <li><p>Salário Bruto<br/>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(salarioB)}</p></li>
                        <li><h2 onClick={handleLogout}>Desconectar</h2></li>
                    </ul>                    
                </Modal>
            </header>
    );
}
