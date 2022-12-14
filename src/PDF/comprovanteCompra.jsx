import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ComprovantePDF = (dados) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const total = Number(parseFloat(dados.valorUnitario) * parseFloat(dados.quantidade));

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
                text: "Comprovante de compra",
                fontSize: 20,
                bold: true,
                margin: [100, 60, 0, 20], //letf top right botton
                alignment: 'right',
            },
            {
                text: "R$ " + total,
                fontSize: 20,
                bold: true,
                margin: [0, 60, 30, 20], //letf top right botton
                alignment: 'right',
            }
        ]
    };


    const content = [
        {
            text: "Foi efetuada uma compra de " + dados.tipoDePalete + " no total de " + dados.quantidade + " itens no valor de " + dados.valorUnitario + " por unidade. Totaliza-se " + total + " reais na data: " + (dados.data).slice(8) + '/' + (dados.data).slice(5, -3) + '/' + (dados.data).slice(0, -6),
            fontSize: 12,
            margin: [15, 30, 15, 0]
        },
        {
            style: 'table',
            table: {
                headerRows: 1,
                widths: [170, '*', '*', '*'],
                body: [
                    [{ text: 'Tipo', style: 'tableHeader', alignment: 'center' }, { text: 'Quantidade', style: 'tableHeader', alignment: 'center' }, { text: 'Valor individual', style: 'tableHeader', alignment: 'center' }, { text: 'Total', style: 'tableHeader', alignment: 'center' }],
                    [dados.tipoDePalete, dados.quantidade, "R$ " + dados.valorUnitario, "R$ " + total],
                ],
            }
        },
        {
            text: 'Feira de Santana, Bahia',
            alignment: 'right',
            margin: [15, 70, 15, 0],
            fontSize: 12,
        },
        {
            text: dados.unidade,
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
        styles: {
            table: {
                margin: [15, 30, 15, 0],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
    }

    pdfMake.createPdf(docDefinitions).download("Comprovante=" + dados.tipoDePalete + "-" + data);
}

export default ComprovantePDF;