import React, {useContext} from 'react'
import "./HotelsPage.css";
import HotelCard from '../../components/HotelCard/HotelCard'
import {Context} from '../../App'
import Typography from '@material-ui/core/Typography'
import {getHotels} from '../../state/actions'

export default function HotelsPage() {
    const context = useContext(Context)
    if(context.state.hotels.length === 0){
      getHotels(context)
    }
    
    return (
        <div>
          <Typography variant="h2">Hotels</Typography>
          <Typography vairant='subtitle1'>{context.state.hotels.length}: hotels available</Typography>
          <div className='hotels-grid'>
            {context.state.hotels.map(hotel => <HotelCard key={`hotel-${hotel.id}`} hotelId={hotel.id} title={hotel.name}/>)}
          </div>
        </div>
    )
}
