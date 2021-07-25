import { useEffect, useState } from "react"
import { database } from "../services/firebase"

interface QuestionsProps {
	id: string;
	author: {
		name: string,
		avatar: string,
	}
	content: string,
	isAnswered: boolean,
	isHighLighted: boolean,
}

type FirebaseQuestions = Record<string, {
	author: {
		name: string,
		avatar: string,
	}
	content: string,
	isAnswered: boolean,
	isHighLighted: boolean,
}>


export function useRoom(roomId :string){
	const [questions, SetQuestions] = useState<QuestionsProps[]>([])
	const [title, setTitle] = useState('')


	useEffect(()=>{
		console.log(roomId)
	
		const roomRef = database.ref(`rooms/${roomId}`)

		roomRef.on('value' , room => {
			const databaseRoom = room.val();
			const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

			const parsedQuestions = Object.entries(FirebaseQuestions ).map(([key, value]) => {
				return {
					id: key,
					content: value.content,
					author: value.author,
					isHighLighted: value.isHighLighted,
					isAnswered: value.isAnswered,
				}
			})
			setTitle(databaseRoom.title);
			SetQuestions(parsedQuestions)
		})
	},[roomId])


  return{ questions, title}
}