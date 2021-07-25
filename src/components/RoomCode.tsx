import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

interface RoomCodeProp {
	code: string;
}

export function RoomCode(props: RoomCodeProp) {
	function copyRoomCodeClipboard() {
		navigator.clipboard.writeText(props.code);
	}

	return (
		<button className="room-code" onClick={copyRoomCodeClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span> Sala #{props.code}</span>
		</button>
	);
}
