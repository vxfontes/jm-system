import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboEmpresaPDF = (dados, vendas, perfil, dado, quantTotal) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let total = 0;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const data = today.toLocaleDateString();

    const paletes = vendas.map((v) => {
        total = Number(parseFloat(total) + (parseFloat(v.total))).toFixed(2);
        return [v.tipoDePalete, v.quantidade, "R$ " + v.valorUnitario, "R$ " + v.total]
    })

    const reportTitle = {
        columns: [
            {
                image: jmLogo,
                margin: [30, 50, 0, 0],
                width: 50,
            },
            {
                stack: [
                    {
                        columns: [
                            {
                                text: 'M. DE F. F. BOAVENTURA EIRELI ME',
                                fontSize: 12,
                                width: '100%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'CNPJ: 39.545.113/0001-08, TEL.: (75) 98122-7004 / (75) 98165-9822',
                                fontSize: 12,
                                width: '100%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'Av. Eduado Froes da Mota, nº 19030, 44020-292, Feira de Santana, Bahia, Brasil',
                                fontSize: 12,
                                width: '100%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'BR-324, KM 11, 44137-000, Feira de Santana, Bahia, Brasil',
                                fontSize: 12,
                                width: '100%'
                            },
                        ]
                    },
                ],
                fontSize: 12,
                width: '100%',
                margin: [40, 50, 0, 0],
            },
        ]
    };
    
    
    const content = [
        {
            stack: [
                {
                    text: "Recibo",
                    fontSize: 20,
                    bold: true,
                    margin: [250, 10, 0, 0], //letf top right botton
                    alignment: 'justify',
                },
                {
                    text: "R$ " + total,
                    fontSize: 20,
                    bold: true,
                    margin: [0, -24, 15, 0], //letf top right botton
                    alignment: 'right',
                }
            ],
        },
        
        {
            text: perfil.inicio + ' ' + dados.nome + ' de ' + perfil.masc + ' nº ' + dado + ' está realizando uma compra de ' + quantTotal + ' itens na unidade do(a) ' + dados.unidade + ' de total: ' + total,
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
                    ...paletes,
                    [{ text: 'Total', style: 'tableHeader' }, { text: '---', alignment: 'center' }, { text: '---', alignment: 'center' }, { text: 'R$ ' + total }]
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
            text: (dados.data).slice(8) + '/' + (dados.data).slice(5, -3) + ' de ' + (dados.data).slice(0, -6),
            alignment: 'right',
            margin: [15, 0, 15, 0],
            fontSize: 12,
        },
        {
            text: '__________________________________________________________________',
            alignment: 'right',
            margin: [15, 45, 15, 0],
        },
        {
            text: 'Responsável pela venda',
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