import React, {useEffect, useState} from 'react';
import {FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi';



import './styles.css';
import Header from '../cabecalho';
import Menu from '../menu';
import api from '../../services/api';

var cont = 0;
export default function Profile(){
    
    const [atualiza, setAtualiza] = useState(false);
    const [page, setPage] = useState(1);
    const [faturas, setFaturas] = useState([]);
    const [mesesAnos, setMesesAnos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    
    useEffect(() => {
        api.get(`faturas?page=${page}`)
            .then(response => {
                if(response.data.length!==0){
                    setFaturas(response.data[0]);
                    setMesesAnos(response.data[1]);
                    setProdutos(response.data[2]);
                }
                else if(page>1){
                    setPage(page-1);
                }
        })
        cont=0;
    }, [page, atualiza])

    const Coluna = ({idCompra, idFatura, valor, ano, mes}) => {
        var i = []
        while(true){
            if(idFatura===idCompra){
                if(mesesAnos[cont]){
                    if(ano === mesesAnos[cont].ano && mes === mesesAnos[cont].mes_id){
                        cont++
                        if(cont===mesesAnos.length){
                            cont=0
                        }
                        i.push(<td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor)}</td>)
                        return (i);
                    }
                    else{
                        cont++
                        i.push(<td style={{color: 'red'}}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0)}</td>)
                        continue
                    }; 
                }
                
            }
            if(cont===mesesAnos.length){
                cont=0
            }
            else if(cont<mesesAnos.length){
                i.push(<td style={{color: 'red'}}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0)}</td>)
                cont++
                continue
            }
            return ''
        }
    }

    const Soma = ({ano, mes}) => {
        var somando=0;
        faturas.map(total => {
            if(ano === total.ano && mes === total.mes_id){
                somando+=total.valor;
            }
        })
        return <td style={{color: 'blue'}}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(somando)}</td>
    }

    async function handlePagarFatura(ano, mes){
        if(String(mes).length === 1){
            mes = "0" + String(mes);
        }

        const data = String(ano)+String(mes);
        try {
            await api.get(`pagarFatura/${data}`);
            setAtualiza(!atualiza);
        }
        catch(err) {

        }
    }

    function handleTrocaPagina(valor){
        if(valor === 0){
            if(page > 1){
                setPage(page-1);
            }
        }
        else if(valor === 1){
            setPage(page+1);
        }
    }

    return (
        <div className="profile-container">
            <Header/>
            <main>
                <Menu/>
                <section>
                    <div className="filter">
                        <p>Mês inicial</p>
                        <select name="inicioMesAno">
                            <option value="202001">Janeiro de 2020</option>
                            <option value="202002">Fevereiro de 2020</option>
                            <option value="202003">Março de 2020</option>
                            <option value="202004">Abril de 2020</option>
                        </select>
                        <p>Mês final</p>
                        <select name="fimMesAno">
                            <option value="202001">Janeiro de 2020</option>
                            <option value="202002">Fevereiro de 2020</option>
                            <option value="202003">Março de 2020</option>
                            <option value="202004">Abril de 2020</option>
                        </select>
                    </div>
                    <div className="table">
                    <h2>Página {page}</h2>
                    <table id="Faturas">
                        <thead>
                            <tr>
                                <td></td>
                                {mesesAnos.map(meses => (
                                <td key={meses.ano+meses.mes_id}>
                                    {meses.mes+" de "+meses.ano}
                                    <br/>
                                    <button style={meses.paga === 1 ? {backgroundColor: 'green'}:{backgroundColor: 'red'}} onClick={() => handlePagarFatura(meses.ano, meses.mes_id)}>
                                        Pagar
                                    </button>
                                </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                            produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.produto}</td>
                                        {faturas.map(fatura => <Coluna 
                                                                idCompra={produto.id} 
                                                                idFatura={fatura.compras_id} 
                                                                valor={fatura.valor} 
                                                                ano={fatura.ano} 
                                                                mes={fatura.mes_id}/>)}
                                </tr>
                            ))
                            } 
                            {
                                <tr>
                                    <td style={{color: 'blue'}}>Total</td>
                                    {mesesAnos.map(somas => <Soma
                                                            ano={somas.ano}
                                                            mes={somas.mes_id}/>)}
                                    
                                </tr>
                            }
                        </tbody>
                    </table>
                    <div className="setas">
                        <FiArrowLeftCircle onClick={() => {handleTrocaPagina(0)}} size={20} color="#000"></FiArrowLeftCircle>
                        <FiArrowRightCircle onClick={() => {handleTrocaPagina(1)}} size={20} color="#000"></FiArrowRightCircle>
                    </div>
                    </div>                    
                </section>

            </main>
        </div>
    );
}