import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'

import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import nebula from '../../assets/nebula.png'
import logo from '../../assets/logo.png'

export default function Logon() {
    const [id,setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()
    
        try {
            const response = await api.post('sessions',{id})

            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',response.data.name)

            history.push('/profile')

        }catch (err){
            alert('Falha no login')
        }
    
    }
 
    return (
        <div className="logon-container">
        <section className="form">
            <img className ="logo" src={logo} alt="Nebula" />

            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>

                <input 
                placeholder="Sua ID" 
                value={id}
                onChange={e=> setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#9400ff"/>
                    Não tenho cadastro
                </Link>

            </form>
        
        </section>

        <img className="nebula" src={nebula} alt="Nebula" />
        </div>
    );
}