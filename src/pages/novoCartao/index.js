import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import hexCor from '../../functions/formataCor'
import mask from '../../functions/mascaraDinheiro';
import Menu from '../menu';
import Header from '../cabecalho';
import './styles.css';


var codigoCor = [];
export default function Cartoes(){

    const history = useHistory();
    
    const [nomeCard, setNomeCard] = useState('');
    const [limiteTotal, setlimiteTotal] = useState('');
    const [diaF, setDiaF] = useState('');
    const [diaV, setDiaV] = useState('');
    const [bandeiraId, setBandeiraId] = useState('0');
    const [cores, setCores] = useState(1);
    const [brilho, setBrilho] = useState(0);

    const [bandeiras, setBandeiras] = useState(['']);
    
    

    useEffect(() => {
        api.get('bandeira').then(response => {
            setBandeiras(response.data)
        });
            

        codigoCor = hexCor.formataCor(cores, brilho);
        document.getElementById("cartao").style.background = `${codigoCor[0]}`;
        document.documentElement.style.setProperty('--corBrilho', codigoCor[0]);
        document.documentElement.style.setProperty('--cor', codigoCor[1]);
    }, [cores, brilho]);

    async function handleNovoCartao(e){
        e.preventDefault();
        var limiteT = mask.removeMascara(limiteTotal);
        const cor = codigoCor[0];
        const bandeira_id = bandeiraId;
       if(bandeiraId !== '0'){
        const data = {
            nomeCard,
            limiteT,
            diaF,
            diaV,
            cor,
            bandeira_id
       };
        try {
            await api.post('cartoes', data);
            alert("Cartão criado com sucesso!");
            
        }
        catch (err){
            alert('Erro ao criar o cartão, tente novamente!');
        }
        history.push('/profile/cartoes');
    }
    else {
        alert('Você precisa selecionar o banco do seu cartão')
    }
       console.log(bandeiras);
    }
    return (
        <div className="novoCard-container">
           <Header/>
            <main>
                <Menu/>
                <section>
                    <h1>Crie um novo cartão</h1>
                    <div className="novoCartao">
                        <form onSubmit={handleNovoCartao}>
                            <div className="form">
                                <input 
                                    type="range" 
                                    id="cor" 
                                    min={0} 
                                    max={1530} 
                                    value={cores}
                                    onChange={e => setCores(e.target.value)}
                                    />
                                <input 
                                    type="range" 
                                    id="brilho" 
                                    min={-255} 
                                    max={255} 
                                    value={brilho}
                                    onChange={e => setBrilho(e.target.value)}
                                    />
                                <input 
                                    type="text" 
                                    id="nomeCard" 
                                    placeholder="Nome para o seu cartão"
                                    value={nomeCard}
                                    onChange={e => setNomeCard(e.target.value)}
                                    required
                                />
                                <input 
                                    type="text" 
                                    id="limiteT" 
                                    placeholder="Limite Total do seu cartão"
                                    value={limiteTotal}
                                    onChange={e => setlimiteTotal(e.target.value)}
                                    onKeyUp={() => {setlimiteTotal(document.forms[0].limiteT.value = mask.mascaraDinheiro(limiteTotal))}}
                                    required
                                />
                                <input 
                                    type="number" 
                                    id="diaF" 
                                    placeholder="Dia do fechamento da fatura"
                                    value={diaF}
                                    onChange={e => setDiaF(e.target.value)}
                                    required
                                />
                                <input type="number" 
                                    id="diaV" 
                                    placeholder="Dia do vencimento da fatura"
                                    value={diaV}
                                    onChange={e => setDiaV(e.target.value)}
                                    required
                                />
                                <select onChange={e => setBandeiraId(e.target.value)}>
                                    <option value={'0'}>
                                        Selecione o banco do seu cartão
                                    </option>
                                    {bandeiras.map(bandeira => (
                                    <option
                                        value={bandeira.id}                                    
                                    >
                                        {bandeira.descricao}
                                    </option>))}
                                </select><br/>

                            </div>
                            <div className="botConf">
                                <div id="cartao">
                                    <h2>{nomeCard}</h2>
                                    <p>Limite total: {limiteTotal}</p>
                                    <p>Limite disponível: {limiteTotal}</p>
                                    <p className="descricao">{bandeiraId === '0' ? 'banco' : Object.values(bandeiras[parseInt(bandeiraId)-1])[1]}</p>
                                    <p className="fatura">Fechamento: dia {diaF}<br/>
                                                          Vencimento: dia {diaV}</p>
                                </div>
                                <button className="button" type="submit">Confirmar</button>                       
                            </div>     
                        </form>
                    </div>                    
                </section>
            </main>
        </div>
    );
}