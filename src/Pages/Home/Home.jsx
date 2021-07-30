import React, {useContext} from 'react'
import './Home.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DateInput from '../../components/DateInput/DateInput';
import TextField from '@material-ui/core/TextField';
import Card from '../../components/Card/Card'
import {Context} from '../../App';
import {setFromDate, setToDate, getAvailableRooms} from '../../state/actions'


export default function Home() {
    const stateContainer = useContext(Context);
    const [capacity, setCapacity]  = React.useState(1);
    const [filteredList, setFilteredList] = React.useState([]);
    React.useEffect(() => {
        setFilteredList(stateContainer.state.availableRooms.filter(room => room.capacity >= capacity))
    }, [capacity, stateContainer.state.availableRooms])
 
    return (
        <div className="home">
        <div style={{display: 'flex', marginTop: "2rem"}}>
            <DateInput dateSetter={setFromDate(stateContainer)} label={'from'} />
            <DateInput dateSetter={setToDate(stateContainer)} label={'to'} />
            <TextField 
                onChange={e => setCapacity(e.target.value)}
                error={stateContainer.state.error.isError}
                label="capaciy"
                type="number"
                variant='outlined'
                helperText={stateContainer.state.error.errorText}/>
            <IconButton onClick={() => getAvailableRooms(stateContainer)}>
                <Button 
                    style={{marginLeft:'1rem'}}
                    variant="contained" color="primary"
                    >Search
                </Button>
            </IconButton>

            
        </div>
            {filteredList.length ? <Typography varaint="subtitle1">Available rooms : {filteredList.length}</Typography>: ""}
        <div className="grid">
            {
                filteredList.map(room => {
                    return (
                        <Card 
                            title={room.hotel_name} 
                            number={room.room_number} 
                            price= {room.price_per_night}
                            capacity={room.capacity}
                            id={room.id}
                        >
                        </Card>
                    )
                })
            }
        </div>
        </div>
    )
}
