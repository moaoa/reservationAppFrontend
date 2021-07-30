import React from 'react'
import {Context} from '../../App'
import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core'
import {getHotels} from '../../state/actions'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios';
import {toast} from 'react-toastify'





export default function AddRoom() {
    const context = React.useContext(Context)
    const [data, setData] = React.useState({
        room_number:null,
        hotel_id: null,
        price_per_night: null,
        capacity: null
    })
    const history = useHistory();
    const {user} = context.state.auth;
    const handleChange = e => setData(prevState =>( {...prevState, [e.target.name]: parseInt(e.target.value)} ))
    const handleSubmit = () => {
        axios.post('/api/rooms', data, {
            headers: {
                Authorization: "Bearer " + context.state.auth.token
            }
        })
        .then(res =>{
            toast('room created successfully')
            history.push('/')
        })
        .catch(console.log)
    }
    
    React.useEffect(() => {
        if(user){
            if(!context.state.hotels.length){
                getHotels(context)
            }
        }
    }, [])
    if(!user) return <Redirect to="/login"/>
    
    return (
        <div>
            <form>
                <Typography variant="h3"  >Add New Room</Typography>
                <div>
                    <TextField
                    onChange={handleChange}
                    required
                    name="room_number"
                    autoComplete="false" label="Room Number" />
                </div>
                <div>
                    <select onChange={handleChange} name="hotel_id">
                        <option>choose a hotel</option>
                            {context.state.hotels.map(hotel => <option
                            
                            key={`option-${hotel.id}`} value={hotel.id}>{hotel.name}</option>
                            )}
                    </select>
                </div>
                
                <div>
                    <TextField
                    onChange={handleChange}
                        required
                        name="price_per_night"
                        autoComplete="false" label="Room price_per_night per night" />
                </div>

                <div>
                    <TextField
                    onChange={handleChange}
                        required
                        name="capacity"
                        autoComplete="false" label="Room capacity" />
                </div>
                

                <Button onClick={handleSubmit} >Create Room</Button>
            </form>
        </div>
    )
}
