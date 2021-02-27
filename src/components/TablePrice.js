import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TablePrice(props){

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    const useStyles = makeStyles({
        table: {
            minWidth: '100%',
        },
    });

    const classes = useStyles();


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Dominio / Pago Anual', formatter.format(props.domain)),
        createData('Certificado SSL / Pago Anual', formatter.format(props.ssl)),
        createData('Tienda Virtual Primer Mes', formatter.format(props.plan)),
    ];


    const total = () => {
        let price = parseInt(props.domain) + parseInt(props.ssl) + parseInt(props.plan);
        return formatter.format(price)
    };


    return(<div>
       
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Servicio</TableCell>
                        <TableCell align="right">Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                        </TableRow>

                    ))}
                    <TableRow>
                        <TableCell component="th" scope="row">
                         <h3>Total</h3>
                        </TableCell>
                        <TableCell align="right"><h3>{total()}</h3></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}
export default TablePrice;
