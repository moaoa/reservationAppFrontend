import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
// import axios from 'axios';
// import { toast } from 'react-toastify'
import Card from '../../components/Card/Card';
import {Context} from '../../App'
import {getAvailableRooms} from '../../state/actions'

export default function HotelsRooms() {
    const [rooms, setRooms] = useState([]);
    const context = useContext(Context);
    const { hotelId } = useParams();
    useEffect( () => {
        // axios.get('http://localhost:8000/api/rooms/' + hotelId)
        // .then(res => {
        //     setRooms(res.data);
        // })
        // .catch(e => {
        //     console.log(e);
        //     toast.error('error getting the rooms' );
        // })
        if(context.state.availableRooms.length === 0){
            getAvailableRooms(context);
        }
        const filteredRooms = context.state.availableRooms.filter(room => parseInt(room.hotel_id) === parseInt(hotelId))
        setRooms(filteredRooms)
    }, [hotelId, context.state.availableRooms, context])
    return (
        <div>
            {rooms.length > 0 ? <h2>rooms for {rooms[0].hotel_name} HOTEL</h2>: <div>no rooms</div>}
            {rooms.map(room => {
                return <Card 
                            title={room.hotel_name} 
                            number={room.room_number} 
                            price= {room.price_per_night}
                            capacity={room.capacity}
                            id={room.id}
                         />
            })}
        </div>
    )
}
