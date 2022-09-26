import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboEmpresaPDF = (dados, perfil, dado) => {
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
                text: "Recibo",
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
            text: perfil.inicio + ' ' + dados.nome + ' de '+perfil.masc+' nº ' + dado + ' está realizando uma compra de ' + dados.quantidade + ' paletes na unidade do(a) ' + dados.unidade + ' de total: ' + total,
            fontSize: 12,
            margin: [15, 30, 15, 0]
        },
        {
            style: 'table',
            table: {
                headerRows: 1,
                widths: [250, '*', '*'],
                body: [
                    [{ text: 'Tipo de palete', style: 'tableHeader', alignment: 'center' }, { text: 'Quantidade de paletes', style: 'tableHeader', alignment: 'center' }, { text: 'Valor de cada palete', style: 'tableHeader', alignment: 'center' }],
                    ['Palete ' + dados.tipoDePalete, dados.quantidade, dados.valorUnitario],
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
            text: (dados.data).slice(8) + ' do mês ' + (dados.data).slice(5, -3) + ' de ' + (dados.data).slice(0, -6),
            alignment: 'right',
            margin: [15, 0, 15, 0],
            fontSize: 12,
        },
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
        footer: rodape,
    }

    pdfMake.createPdf(docDefinitions).download("Recibo=" + dados.nome + "-" + data);

}

export default ReciboEmpresaPDF;