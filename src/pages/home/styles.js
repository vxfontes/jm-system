import { makeStyles } from '@material-ui/core';
import { BorderBottom } from '@material-ui/icons';
import deitado from '../../image/paleteDeitado.JPG';
import emPe from '../../image/paleteEmPe.JPG';

const styles = makeStyles((theme) => ({

    image: {
        height: '100vh',
        width: '100%',
        position: 'absolute',
        margin: 0,

        backgroundImage: (`url(${deitado})`),
        filter: "blur(5px)",
        border: 'none',
        boxShadow: 'none',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        [theme.breakpoints.down('sm')]: {
            backgroundImage: (`url(${emPe})`),
        }

    },

    root: {
        filter: "blur(0)",
        // marginTop: "2%",
        // marginBottom: '5%',
        // width: '80%',
        // maxWidth: '80%',
        // gap: '20px'
        textAlign: 'center',
        paddingTop: 80
    },

    btn: {
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },

    grid: {
        display: 'flex', 
        justifyContent: 'center',
    },
    
    rooters: {
        marginTop: 50,
        minWidth: 310,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 310,
        },
        [theme.breakpoints.only('sm')]: {
            minWidth: 450,
            maxWidth: 450,
        },
        [theme.breakpoints.up('md')]: {
            minWidth: 310,
            maxWidth: 310,
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: 390,
            maxWidth: 390,
            marginTop: 100,
        },
        [theme.breakpoints.up('xl')]: {
            minWidth: 600,
            maxWidth: 600,
            marginTop: 100,
        },
    },
    bullet: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

}));

export default styles;