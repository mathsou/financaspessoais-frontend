import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import hexCor from '../../functions/formataCor'
import mask from '../../functions/mascaraDinheiro';
import Menu from '../menu';
import Header from '../cabecalho';
import './styles.css';




var codigoCor, cor;

export default function Cartoes(){
    const history = useHistory();

    var url = window.location.href;
    var idCartao = url.split('?');
    var id = parseInt(idCartao[1]);

    const [nomeCard, setNomeCard] = useState('');
    const [limiteTotal, setlimiteTotal] = useState('');
    const [diaF, setDiaF] = useState('');
    const [diaV, setDiaV] = useState('');
    const [bandeiraId, setBandeiraId] = useState('0');
    const [cores, setCores] = useState(0);
    const [brilho, setBrilho] = useState(0);

    const [bandeiras, setBandeiras] = useState(['']);

    useEffect(() => {
        codigoCor = hexCor.formataCor(cores, brilho);
        document.getElementById("cartao").style.background = `${codigoCor[0]}`;
        document.documentElement.style.setProperty('--corBrilho', codigoCor[0]);
        document.documentElement.style.setProperty('--cor', codigoCor[1]);
        cor=codigoCor[0];
        console.log(cor)
    }, [cores, brilho])

    useEffect(() => {
        api.get('bandeira').then(response => {
            setBandeiras(response.data);
        });
        
        api.get(`cartoes/${id}`)
            .then(response => {
                setNomeCard(response.data[0].nomeCard)
                setlimiteTotal(mask.mascaraDinheiro(response.data[0].limiteT+"00"))
                setDiaF(response.data[0].diaF)
                setDiaV(response.data[0].diaV)
                setBandeiraId(response.data[0].bandeira_id)
                cor = response.data[0].cor;
                document.getElementById("cartao").style.background = `${response.data[0].cor}`;
        })

    }, [id])


    async function handleEditaCartao(e){
        e.preventDefault();
        const bandeira_id = bandeiraId; 
        if(bandeiraId !== '0'){
        const data = {
            id,
            nomeCard,
            limiteT: mask.removeMascara(limiteTotal),
            diaF,
            diaV,
            cor,
            bandeira_id
       };
       console.log(data)
        try {
            await api.put('cartoes/', data);
            alert("Cartão alterado com sucesso!");
            
        }
        catch (err){
            alert('Erro ao alterar o cartão, tente novamente!');
        }
        history.push('/profile/cartoes');
    }
    else {
        alert('Você precisa selecionar o banco do seu cartão')
    }
    }
    return (
        <div className="editaCard-container">
           <Header/>
            <main>
                <Menu/>
                <section>
                    <h1>Edite seu cartão</h1>
                    <div className="editaCartao">
                        <form onSubmit={handleEditaCartao}>
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
                                <select 
                                value={bandeiraId}
                                onChange={e => setBandeiraId(e.target.value)}
                                >
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