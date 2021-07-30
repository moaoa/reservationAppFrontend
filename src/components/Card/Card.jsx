import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Context} from '../../App'
import {reserveRoom} from '../../state/actions'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    minWidth: 400,
    marginBottom: '2rem',
    marginRight: '1rem'
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({title, number, price, capacity,  id}) {
  const classes = useStyles();
  const stateContainer = useContext(Context)
  

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Room Number:  {number}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price :  {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            capacity :  {capacity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => reserveRoom(stateContainer, id) }>
          Book now
        </Button>
      </CardActions>
    </Card>
  );
}