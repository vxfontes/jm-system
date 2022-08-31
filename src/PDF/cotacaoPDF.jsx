import React from "react";
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const CotacaoPDF = (dados) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    console.log(dados)
    const reportTitle = [
        {
            text: "Cotação",
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45], //letf top right botton
        }
    ];


    const details = [{
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
                [
                    {
                        text: 'Informações',
                        style: 'tableHeader',
                        fontSize: 10
                    },
                    {
                        text: '',
                        style: 'tableHeader',
                        fontSize: 10
                    }
                ],
                [
                    {
                        text: "Nome",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.name,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ],
                [
                    {
                        text: "Email",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.email,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ],
                [
                    {
                        text: "Idade",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.age,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ],
                [
                    {
                        text: "Sexo",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.gender,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ]
            ]
        }, layout: 'headerLineOnly'
    }];

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
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape,
    }

    pdfMake.createPdf(docDefinitions).download();
}

export default CotacaoPDF;