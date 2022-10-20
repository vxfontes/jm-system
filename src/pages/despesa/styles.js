import { makeStyles } from '@material-ui/core';

const styles = makeStyles({

    image: {
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'
    },

    containerPrincipal: {
        backgroundColor: '#f5ce99',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        paddingBottom: '20px',
        paddingTop: '10px',
        marginBottom: '5%',
        borderRadius: '10px'
    },

    textField: {
        marginBottom: '10px',
        borderRadius: '7px',
        minWidth: '70%',
        maxWidth: '70%',
    },

    button: {
        width: '70%',
        marginTop: '7px',
        marginBottom: '3%'
    },

});

export default styles;