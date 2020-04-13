import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';
import Auth from '../../Auth';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const  [username, setUsername] = useState('');
    const  [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('login', {username, password});

            localStorage.setItem('id', response.data.id);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('token', response.data.token);

            Auth.authenticate("user");

            history.push('/profile');
        }

        catch(err){
            alert('Falha no login, tente novamente.')
        }
    }
    return(

       <div className="logon-back">
           <div className="logon-container">
               <section className="form">
                   <img src ={logoImg} alt ="Be The Hero" />
                   <form onSubmit = {handleLogin}>
                       <h1>Faça seu Logon</h1>
                       <input placeholder="email" value ={username} onChange = {e=> setUsername(e.target.value)}/>
                       <input placeholder="senha" type="password" onChange = {e=> setPassword(e.target.value)}/>
                       <button className ="button" type ="submit">Entrar</button>

                       <Link className = "back-link" to="/register"> 
                       <FiLogIn size ={16} color ="#e02041"/>
                       Não tenho cadastro</Link>
                   </form>

               </section>
           </div>
       </div>
    );
}