import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';




export default function Profile(){

    const[casos,setCasos] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect(() =>{
        api.get('profile', {headers:{
            Authorization:ongId,
        }
    }).then(response =>{setCasos(response.data);

    })
    },[ongId]);
    
     async function handleDeleteCaso(id){
        try{
            await api.delete(`casos/${id}`,{
            headers:{
                Authorization: ongId,
            }
        });

        setCasos(casos.filter(caso => caso.id !== id));

        }
        catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
    
        <div className="profile-container">
            <header>
                <img src ={logoImg} alt = "Be The Hero"/>
                <span> Bem vinda, {ongName}</span>

                <Link className ="button" to ='/casos/new'>Cadastrar Novo Caso</Link>
                <button type ="button">
                <FiPower size ={18} color ="#e02041" onClick = {handleLogout}/>
                </button>
              
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {casos.map(caso => (<li key = {caso.id}>
                    <strong>Caso:</strong>
                    <p>{caso.titulo}</p>
                    <strong>Descrição</strong>
                    <p>{caso.descricao}</p>
                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(caso.value)}</p>

                    <button onClick={() => handleDeleteCaso(caso.id)} type ="button"><FiTrash2 size= {20} color="#a8a8b3"/></button>
                </li>))}
            </ul>

        </div>
        
        
        );
}

https://tylermcginnis.com/react-router-protected-routes-authentication/