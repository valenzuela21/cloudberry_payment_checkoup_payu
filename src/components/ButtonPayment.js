import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f50057',
    border: 0,
    borderRadius: 4,
    marginTop: '20px',
    fontSize: '16px',
    color: 'white',
    padding: '8px 22px',
    height: '43px',
    cursor: 'pointer',
    lineHeight: '40px'
    },
});

const ButtonPayment = (props) => {
    const classes = useStyles();
    const {accountId, currency, merchanId, total, reference, signature, emailuser, product, telephone, fullname } = props.data;

    return (
        <div>
            <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" name="frmProduct" id="frmProduct" >
                <input name="merchantId" type="hidden" value={merchanId} />
                <input name="accountId" type="hidden" value={accountId} />
                <input name="description" type="hidden" value={product} />
                <input name="referenceCode" type="hidden" value={reference} />
                <input name="amount" type="hidden" value={total} />
                <input name="tax" type="hidden" value="0" />
                <input name="taxReturnBase" type="hidden" value="0" />
                <input name="currency" type="hidden" value={currency} />
                <input name="signature" type="hidden"
                       value={signature} />
                <input name="test" type="hidden" value="1" />
                <input name="buyerEmail" type="hidden" value={emailuser} />
                <input name="buyerFullName" type="hidden" value={fullname} />
                <input name="mobilePhone" type="hidden" value={telephone} />
                <input name="responseUrl" type="hidden"
                       value="http://comunicacionescloudberry.com/payment/respuesta_payu.php" />
                <input name="confirmationUrl" type="hidden"
                       value="http://comunicacionescloudberry.com/payment/confirmation_payu.php" />
            </form>

            <div style={{marginTop: '15px'}} className={classes.root}>
                Procesando Pedido ...
            </div>
        </div>
    )
}
export default ButtonPayment;
