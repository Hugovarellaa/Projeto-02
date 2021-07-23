import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { FormEvent } from 'react';
import { useState } from 'react';

export function NewRoom() {
	// const {user} = useAuth()
	const [ newRoom, SetNewRoom ] = useState();

	async function hadleCreateRoom(event: FormEvent) {
		event.preventDefault();
	}
	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="ilustração" />
				<strong>Toda pergunta tem uma resposta.</strong>
				<p>Aprenda e compartilhe conhecimento com outras pessoas</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="logo letmeask" />
					<h2>Crie uma nova Sala</h2>
					<form onSubmit={hadleCreateRoom}>
						<input type="text" placeholder="Nome da Sala" />
						<Button type="submit">Criar sala</Button>
					</form>
					<p>
						quer entra em uma sala existente <Link to="/">Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
