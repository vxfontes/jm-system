import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Button } from "@material-ui/core";


const ColorButtonBlue = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[700]),
        backgroundColor: blue[700],
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
}))(Button);

export default ColorButtonBlue;