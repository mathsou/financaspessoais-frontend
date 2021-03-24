import React from 'react';
import {Link} from 'react-router-dom';
import './style.css'

export default function Menu(){
    return (
        <div className="menu">
                    <ul>
                        <li><Link to="/profile">INÍCIO</Link></li>
                        <li><Link to="/profile/cartoes">CARTÕES</Link></li>
                        <li><Link to="/profile/compras">COMPRAS</Link></li>
                        {/* <li><Link to="/profile/simulacoes">SIMULAÇÕES</Link></li> */}
                    </ul>
                </div>
    );
}