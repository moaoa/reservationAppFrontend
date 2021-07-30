import React , {useContext} from 'react';
import {Context} from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({dateSetter, label}) {
    const stateContainer = useContext(Context);
    const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
      
      onChange={e => dateSetter(e.target.value)}
      error={stateContainer.state.error.isError}
        id="date"
        label={label}
        type="date"
        defaultValue={stateContainer.state.fromDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}