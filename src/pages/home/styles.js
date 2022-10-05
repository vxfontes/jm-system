import { makeStyles } from '@material-ui/core';

const styles = makeStyles({

    root: {
        // flexGrow: 1,
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'row'
    },

    container: {
        marginTop: "2%",
        marginBottom:'5%',
        width: '80%',
        maxWidth: '80%',
        gap: '20px'
    },

    paper: {
        height: 200,
        width: '80%',
        marginLeft: '20px',
        marginRight: '100px',
        marginBottom: '20px',
    },

});

export default styles;