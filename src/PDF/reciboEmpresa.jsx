import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboEmpresaPDF = (dados, cnpj) => {
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
            table: {
                headerRows: 1,
                body: [
                    ['teste, alo, alo']
                ]
            }
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

    pdfMake.createPdf(docDefinitions).download("Recibo="+dados.nome+"-"+data);

}

export default ReciboEmpresaPDF;