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
        maxWidth: '50%',
        maxHeight: "50%",
        marginBottom: '2%',
        borderRadius: '10px'
    },

    textField: {
        marginBottom: '10px',
        borderRadius: '7px',
        minWidth: '70%',
        maxWidth: '70%',
    },

    button: {
        width: '90%',
    },

    maxSpace: {
        width: '70%',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        justifyContent: "space-between",
        marginLeft: '15%'
    },

});

export default styles;