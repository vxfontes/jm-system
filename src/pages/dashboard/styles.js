import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => (
    {
        container: {
            width: '100%',
            height: '100vh',
            margin: 0,
            padding: 0,
            backgroundColor: 'white',
            textAlign: 'center',
            [theme.breakpoints.only('sm')]: {
                height: '100%',
            }
        },
        
        paper: {
            width: '97%',
            height: '95vh',
            margin: 0,
            padding: 0,
            backgroundColor: '#e8f4fc',
            textAlign: 'center',
            borderRadius: '20px',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                borderRadius: '0px',
                height: '100%',
            }
        },

        card: {
            position: 'relative',
            borderRadius: 16,
            padding: 12,
            backgroundColor: '#6034b4',
            minWidth: 256,
            boxShadow: 'none',
            display: 'flex',
            textAlign: 'flex-start'
        },

        cardRight: {
            position: 'relative',
            borderRadius: 16,
            backgroundColor: '#208ce4',
            minWidth: 256,
            boxShadow: 'none',
            display: 'flex',
            textAlign: 'flex-start'
        },

        actionArea: {
            borderRadius: 16,
            transition: '0.2s',
            '&:hover': {
                transform: 'scale(1.06)',
            },
        },

        text: {
            color: 'white',
            fontWeight: 'bolder',
            marginTop: '2vh'
        },

        lilText: {
            color: 'white',
        },

        icons: {
            color: 'white',
            fontSize: 30
        },

        lucros: {
            display: 'flex',
            textAlign: 'justify',
            height: '100%',
            width: '100%',
            margin: -20,
            marginLeft: '10px',
            marginBotton: '20px'
        },

        graficoPrincipal: {
            backgroundColor: '#fff',
            padding: '3%',
            borderRadius: '20px',
            height: '95%',
            width: '95%'
        },

        lateral: {
            borderRadius: '20px',
            backgroundColor: '#fff',
        },

        lateral2: {
            marginTop: '20px',
            backgroundColor: '#e8f4fc',
        },

        nomeDestaque: {
            fontWeight: 'bold'
        },

        despesa: {
            color: '#f44336'
        },

        venda: {
            color: '#4caf50'
        },

        margin: {
            margin: '5px 0 3px 0'
        }

    })
);

export default useStyles;