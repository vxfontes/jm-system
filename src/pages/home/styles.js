import { makeStyles } from '@material-ui/core';

const styles = makeStyles({

    root: {
        flexGrow: 1,
        minWidth: '100%',
        minHeight: '100%',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
    },

    container: {
        marginTop: "15%",
        width: '80%',
        maxWidth: '80%',
    },

    paper: {
        height: 260,
        width: 300,
        marginLeft: '1vw',
        marginRight: '1vw',
        marginBottom: '20px',
        borderRadius: '10px'
    },

});

export default styles;