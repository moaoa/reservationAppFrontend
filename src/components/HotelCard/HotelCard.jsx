import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

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

export default function MediaCard({title, hotelId}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1454388683759-ee76c15fee26?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, incidunt porro aliquid libero doloribus at dicta neque a quod sit illum, quam omnis ad vel. Alias omnis officiis quibusdam facilis.</Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={"/hotelRooms/" + hotelId}>
        <Button size="small" color="primary">
          See Rooms
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}