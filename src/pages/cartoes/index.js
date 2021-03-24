import React, {useEffect, useState} from 'react';
import {FiTrash2, FiEdit3} from 'react-icons/fi';
import Modal from 'react-modal';

import Menu from '../menu';
import Header from '../cabecalho';
import './styles.css';

import api from '../../services/api';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

export default function Cartoes(){
    const idUser = localStorage.getItem('Id');
    console.log(idUser);
    const [cartoes, setCartoes] = useState([]);
    
    useEffect(() => {
        api.get('cartoes')
            .then(response => {
            setCartoes(response.data);
        })
    }, [idUser])

    async function handleDeleteCartao(id){
        try {
            await api.delete(`cartoes/${id}`, {
                headers:{
                    autorizar: idUser,
                }
            });
        }
        catch(err) {

        }
        setCartoes(cartoes.filter(cartao => cartao.id !== id));
    }

    return (
        <div className="cartoes-container">
           <Header/>
            <main>
                <Menu/>
                <section>
                    <div className="bot">
                        <Link className="button" to="/profile/cartoes/novoCartao"><p>Novo Cartão</p></Link>
                    </div>
                    <div className="cartoes">                    
                        <ul>
                            {cartoes.map(cartao => (
                            <li key={cartao.id} style={{backgroundColor: `${cartao.cor}`}}>
                                <h2>{cartao.nomeCard}</h2>
                                <p>Limite total: {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cartao.limiteT)}</p>
                                <p>Limite disponível: R$ {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cartao.limiteD)}</p>
                                <p className="descricao">{cartao.descricao}</p>
                                <p className="fatura">Fechamento: dia {cartao.diaF}<br/>
                                                      Vencimento: dia {cartao.diaV}</p>
                                <Link className="pencil" to={"/profile/cartoes/editaCartao?"+cartao.id}>
                                    <FiEdit3 size={20} color="#a8a8b3"/>
                                </Link>
                                <button className="trash" onClick={() => handleDeleteCartao(cartao.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3"/>
                                </button>
                            </li>
                            ))}
                        </ul>
                    </div>                    
                </section>
            </main>
        </div>
    );
}