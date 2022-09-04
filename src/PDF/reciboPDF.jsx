import React from "react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jmLogo from '../image/jmLogo.png'

const ReciboPDF = (dados) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const total = Number(parseFloat(dados.valorUnitario) * parseFloat(dados.quantidade));

    // data
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.toLocaleDateString();

    const reportTitle = {
        columns: [
            {
                image: jmLogo,
                margin: [30, 60, 0, 0],
                width: 50,
            },
            {
                text: "Recibo de comissão",
                fontSize: 24,
                bold: true,
                margin: [100, 60, 0, 20], //letf top right botton
                alignment: 'center',
                width: 300,
            }, 
            {
                text: "R$ "+ total,
                fontSize: 24,
                bold: true,
                margin: [0, 60, 30, 20], //letf top right botton
                alignment: 'right',
            }
          ]
        };


    const details = [{
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
                [
                    {
                        text: '',
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
                        text: dados.nome,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ],
                [
                    {
                        text: "Valor",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.valorUnitario,
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    }
                ],
                [
                    {
                        text: "Quantidade",
                        fontSize: 9,
                        margin: [0, 2, 0, 2]
                    },
                    {
                        text: dados.quantidade,
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
        pageMargins: [15, 120, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape,
    }

    pdfMake.createPdf(docDefinitions).download();
}

export default ReciboPDF;