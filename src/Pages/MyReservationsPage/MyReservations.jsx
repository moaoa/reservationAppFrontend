import React, {useEffect, useContext} from 'react'
import {Context} from '../../App'
import {Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getUserReservations} from '../../state/actions'
import Table from '../../components/Table/Table'



export default function MyReservations() {
    const context  = useContext(Context);
    useEffect(() => {
        if(context.state.auth.user){
            getUserReservations(context);
        }
    }, [context.state.auth.user, getUserReservations])
    
    if(!context.state.auth.user){
        toast('please login first')
        return <Redirect to="/login" />
    }
    return <Table rows={context.state.myReservations} />;
    
}
