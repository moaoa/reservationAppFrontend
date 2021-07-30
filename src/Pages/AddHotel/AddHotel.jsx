import React, {useContext, useState} from 'react'
import {Context} from '../../App'
import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core'
import {CreateHotel} from '../../state/actions'
import { Redirect } from 'react-router-dom'


export default function AddHotel() {
    const context = useContext(Context);
    const [name, setName] = useState('')
    if(!context.state.auth.user) return <Redirect to='/login'/>
    
    return (
        <div>
            <form>
                <Typography variant="h3" >add new hotel</Typography>
                <div>
                <TextField
                onChange={e => setName(e.target.value)}
                autoComplete="false" name="name" label="Hotel Name" />
                </div>
                <Button onClick={() => CreateHotel(context, name)} >Create</Button>
            </form>
        </div>
    )
}
