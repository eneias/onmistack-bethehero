import React, {useState} from 'react';
import './styles.css';
import{Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function NovoCaso(){

    const [titulo,setTitulo] = useState('');
    const [descricao,setDesc] = useState('');
    const [value,setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNovoCaso(e){
        e.preventDefault();

        const data = {
            titulo, descricao,value
        };

        try{
            await api.post('casos', data,{
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }
        catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(

        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src = {logoImg} alt ="be The Hero" />
                <h1>Cadastrar Novo Caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>


                <Link className = "back-link" to="/profile"> 
                   <FiArrowLeft size ={16} color ="#e02041"/>
                   Voltar para Home</Link>
            </section>
            <form onSubmit ={handleNovoCaso}>
                <input 
                placeholder = "Título do Caso"
                value={titulo}
                onChange = {e =>setTitulo(e.target.value)}
                />
                <textarea 
                placeholder ="Descrição"
    
                value={descricao}
                onChange = {e => setDesc(e.target.value)}/>
                <input 
                placeholder = "Valor em Reais"
                value={value}
                onChange = {e => setValue(e.target.value)}
                />
            
                <button className = "button">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}