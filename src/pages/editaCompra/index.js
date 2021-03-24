import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import mask from '../../functions/mascaraDinheiro';
import Menu from '../menu';
import Header from '../cabecalho';
import './styles.css';

export default function Cartoes(){

    const history = useHistory();

    var url = window.location.href;
    var idCartao = url.split('?');
    var id = parseInt(idCartao[1]);

    const [produto, setProduto] = useState('');
    const [valorCompra, setValorCompra] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [numParcelas, setNumParcelas] = useState('');
    const [valorParc, setValorParc] = useState('');
    const [loja_id, setLojaId] = useState('');
    const [cartao_id, setCartaoId] = useState('');

    const [lojas, setLojas] = useState([]);
    const [cartoes, setCartoes] = useState([]);

    useEffect(() => {
        if(numParcelas !== '' && valorCompra !== ''){
            var novoValor = mask.removeMascara(valorCompra)/numParcelas*100;
            setValorParc(mask.mascaraDinheiro(novoValor));
        }
        else{
            setValorParc('');
        }
        

    }, [numParcelas, valorCompra]);
    
    useEffect(() => {
        api.get('loja').then(response => {
            setLojas(response.data);
        });
        api.get('cartoes')
            .then(response => {
                setCartoes(response.data);
        })
        api.get(`compras/${id}`)
            .then(response => {
                var compras = response.data[0];
                setProduto(compras.produto);
                setValorCompra(Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(compras.valor));
                setDataCompra(compras.dataCompra);
                setNumParcelas(compras.numParcelas);
                setValorParc(Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(compras.valorParcelas));
                setLojaId(compras.loja_id);
                setCartaoId(compras.cartao_id);
        })
    }, [id])

    
    async function handleEditaCompra(e){
        e.preventDefault();
        var valor = mask.removeMascara(valorCompra);
        var valorParcelas = mask.removeMascara(valorParc);
       if(loja_id !== '0' && cartao_id !=='0'){
            const data = {
                id,
                produto,
                valor,
                dataCompra,
                numParcelas,
                valorParcelas,
                loja_id,
                cartao_id
        };
            try {
                await api.put('compras', data);
                alert("Compra alterada com sucesso!");
                
            }
            catch (err){
                alert('Erro ao alterar a compra, tente novamente!');
            }
            history.push('/profile/compras');
        }
        else {
            alert('Você precisa selecionar o e a loja utilizada')
        }
    }
    return (
        <div className="editaCompra-container">
           <Header/>
            <main>
                <Menu/>
                <section>
                    <h1>Crie um novo cartão</h1>
                    <div className="editaCompra">
                        <form onSubmit={handleEditaCompra}>
                            <input 
                                type="text" 
                                id="produto" 
                                placeholder="Nome do seu produto"
                                value={produto}
                                onChange={e => setProduto(e.target.value)}
                                required
                            />
                            <input 
                                type="text" 
                                id="valor" 
                                placeholder="Valor total do seu produto"
                                value={valorCompra}
                                onChange={e => setValorCompra(e.target.value)}
                                onKeyUp={() => {setValorCompra(document.forms[0].valor.value = mask.mascaraDinheiro(valorCompra))}}
                                required
                            />
                            <input 
                                type="date" 
                                id="dataCompra" 
                                placeholder="Data da sua Compra"
                                value={dataCompra}
                                onChange={e => setDataCompra(e.target.value)}
                                required
                            />
                            <input type="number" 
                                id="numParcelas" 
                                placeholder="Numero de parcelas"
                                value={numParcelas}
                                onChange={e => setNumParcelas(e.target.value)}
                                required
                            />
                            <input 
                                type="text" 
                                id="valorParcelas" 
                                placeholder="Valor das parcelas"
                                value={valorParc}
                                onChange={e => setValorParc(e.target.value)}
                                onKeyUp={() => {setValorParc(document.forms[0].valorParcelas.value = mask.mascaraDinheiro(valorParc))}}
                                required
                            />
                            <select 
                            value={loja_id}
                            onChange={e => setLojaId(e.target.value)}
                            >
                                <option key={0} value={'0'}>
                                    Selecione a loja que foi comprada
                                </option>
                                {lojas.map(loja => (
                                <option 
                                    key={loja.id}
                                    value={loja.id}                                    
                                >
                                    {loja.nome}
                                </option>))}
                            </select>
                            <select 
                            value={cartao_id}
                            onChange={e => setCartaoId(e.target.value)}
                            >
                                <option value={'0'}>
                                    Selecione o cartao utilizado
                                </option>
                                {cartoes.map(cartao => (
                                <option
                                    key={cartao.id}
                                    value={cartao.id}                                    
                                >
                                    {cartao.nomeCard}
                                </option>))}
                            </select>
                                <button className="button" type="submit">Confirmar</button>                          
                        </form>
                    </div>                    
                </section>
            </main>
        </div>
    );
}