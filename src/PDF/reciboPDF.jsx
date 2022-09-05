import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboPDF = (dados, cpf) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const total = Number(parseFloat(dados.valorUnitario) * parseFloat(dados.quantidade));

    // data
    const date = new Date();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const data = today.toLocaleDateString();

    const currentMonth = date.getMonth() + 1;

    const reportTitle = {
        columns: [
            {
                image: jmLogo,
                margin: [30, 50, 0, 0],
                width: 50,
            },
            {
                text: "Recibo de Comissão",
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
            text: "Eu " + dados.nome + " inscrito no CPF nº "+cpf+", comprovo o recebimento da comissão referente ao total de " + dados.quantidade + " paletes do valor de " + dados.valorUnitario + " por unidade. Totaliza\-se " + total + " reais referente ao mês " + currentMonth + " de 2022.",
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

    pdfMake.createPdf(docDefinitions).download("Comissao="+dados.nome+"-"+data);
}

export default ReciboPDF;