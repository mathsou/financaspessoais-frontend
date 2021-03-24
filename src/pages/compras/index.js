import React, {useState, useEffect} from 'react';
import {FiTrash2, FiEdit3} from 'react-icons/fi';

import api from '../../services/api';
import Menu from '../menu';
import Header from '../cabecalho';

import './styles.css';
import { Link } from 'react-router-dom';



export default function Compras() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        api.get('compras')
            .then(response => {
            setCompras(response.data);
        })
    }, []);
    async function handleDeletaCompra(id){
        try {
            await api.delete(`compras/${id}`);
        }
        catch(err) {

        }
        setCompras(compras.filter(compra => compra.id !== id));

    }

    function formataData(data){
        var ano = data.slice(0, 4);
        var mes = data.slice(5, 7);
        var dia = data.slice(8);
        data = dia+'/'+mes+'/'+ano;
        return data;
    }

    return (
        <div className="compras-container">
            <Header/>
            <main>
                <Menu/>
                <section>
                    <div className="filter">
                        <p>Mês</p>
                        <select name="inicioMesAno">
                            <option value="202001">Janeiro de 2020</option>
                            <option value="202002">Fevereiro de 2020</option>
                            <option value="202003">Março de 2020</option>
                            <option value="202004">Abril de 2020</option>
                        </select>   
                        <Link className="btnCompra" to="/profile/compras/novaCompra">Nova compra</Link>                   
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr id="cabecalho">
                                    <td>Produto</td>
                                    <td>Loja</td>
                                    <td>Cartão</td>
                                    <td>Valor</td>
                                    <td>Data da compra</td>
                                    <td>Parcelas</td>
                                    <td>Valor da Parcela</td>
                                    <td></td>
                                </tr>
                            </thead>  
                            <tbody>
                            {compras.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.produto}</td>
                                <td>{compra.nome}</td>
                                <td>{compra.nomeCard}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(compra.valor)}</td>
                                <td>{formataData(compra.dataCompra)}</td>
                                <td>{compra.numParcelas}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(compra.valorParcelas)}</td>
                                <td>
                                    <Link className="pencil" to={"compras/editaCompra?"+compra.id}>
                                        <FiEdit3 size={20} color="#818181"/>
                                    </Link>
                                    <button className="trash" onClick={() => handleDeletaCompra(compra.id) }>
                                        <FiTrash2 size={20} color="#818181"/>
                                    </button>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}