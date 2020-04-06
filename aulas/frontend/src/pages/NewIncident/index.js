import React, {useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import '../../global.css'

import logo from '../../assets/logo.png'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile')
        }catch(err){
            alert('Erro ao cadastrar')
        }
    }
 
    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                <img src={logo} alt="NebulaLogo" className="logo"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#9400ff"/>
                    Voltar para HOME
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Titulo do caso"
                value={title}
                onChange={e=> setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e=> setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em reais"
                value={value}
                onChange={e=> setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}