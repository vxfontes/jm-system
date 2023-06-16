import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboPDF = (dados, cpf) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const data = today.toLocaleDateString();


    const reportTitle = {
        columns: [
            {
                image: jmLogo,
                margin: [30, 50, 0, 0],
                width: 50,
            },
            {
                text: "Recibo de comissão",
                fontSize: 20,
                bold: true,
                margin: [100, 60, 0, 20], //letf top right botton
                alignment: 'right',
            },
            {
                text: "R$ " + dados.valor,
                fontSize: 20,
                bold: true,
                margin: [0, 60, 30, 20], //letf top right botton
                alignment: 'right',
            }
        ]
    };


    const content = [
        {
            text: "Eu " + dados.nome + " inscrito no CPF nº "+cpf+", comprovo o recebimento do adiantamento referente à semana. Totaliza-se " + dados.valor + " reais.",
            fontSize: 12,
            margin: [15, 30, 15, 0]
        },
        {
            text: 'Feira de Santana, Bahia',
            alignment: 'right',
            margin: [15, 70, 15, 0],
            fontSize: 12,
        },
        {
            text: '__________________________________________________________________',
            alignment: 'right',
            margin: [15, 45, 15, 0],
        },
        {
            text: dados.nome,
            alignment: 'right',
            margin: [15, 3, 15, 0],
            fontSize: 12,
        }
    ]


    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                bold: true,
                margin: [0, 10, 20, 0], //letf top right botton
            }
        ]
    };

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 120, 15, 40],

        header: [reportTitle],
        content: [content],
        footer: rodape,
    }

    pdfMake.createPdf(docDefinitions).download("Adiantamento="+dados.nome+"-"+data);
}

export default ReciboPDF;