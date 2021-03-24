import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import mask from '../../functions/mascaraDinheiro';
import Menu from '../menu';
import Header from '../cabecalho';
import './styles.css';

export default function Cartoes(){

    const history = useHistory();

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
        api.get('loja').then(response => {
            setLojas(response.data);
        });
        api.get('cartoes')
            .then(response => {
                setCartoes(response.data);
        })
    }, [])

    useEffect(() => {
        if(numParcelas !== '' && valorCompra !== ''){
            var novoValor = mask.removeMascara(valorCompra)/numParcelas*100;
            setValorParc(mask.mascaraDinheiro(novoValor));
        }
        else{
            setValorParc('');
        }
        

    }, [numParcelas, valorCompra]);
    
    async function handleNovaCompra(e){
        e.preventDefault();
        var valor = mask.removeMascara(valorCompra);
        var valorParcelas = mask.removeMascara(valorParc);
       if(loja_id !== '0' && cartao_id !=='0'){
            const data = {
                produto,
                valor,
                dataCompra,
                numParcelas,
                valorParcelas,
                loja_id,
                cartao_id
        };
            try {
                await api.post('compras', data);
                alert("Compra registrada com sucesso!");
                
            }
            catch (err){
                alert('Erro ao registrar a compra, tente novamente!');
            }
            history.push('/profile/compras');
        }
        else {
            alert('Você precisa selecionar o cartão e a loja utilizada')
        }
    }
    return (
        <div className="novaCompra-container">
           <Header/>
            <main>
                <Menu/>
                <section>
                    <h1>Crie um novo cartão</h1>
                    <div className="novaCompra">
                        <form onSubmit={handleNovaCompra}>
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
                            <select onChange={e => setLojaId(e.target.value)}>
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
                            <select onChange={e => setCartaoId(e.target.value)}>
                                <option key={0} value={'0'}>
                                    Selecione o cartao utilizado
                                </option>
                                {console.log(cartoes)}
                                {cartoes.map(cartao => (
                                <option
                                    key={0}
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