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
    width: '100%',
    height: '43px',
    cursor: 'pointer',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
  },
});

const ButtonPayment = (props) => {
    const classes = useStyles();
    const {accountId, currency, merchanId, total, reference, signature, emailuser, product } = props.data;

    return (
        <div>
            <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
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
                <input name="responseUrl" type="hidden"
                       value="http://comunicacionescloudberry.com/payment/respuesta_payu.php" />
                <input name="confirmationUrl" type="hidden"
                       value="http://comunicacionescloudberry.com/payment/confirmation_payu.php" />
                <input name="Submit"
                       style={{marginTop: '15px'}}
                       className={classes.root}
                       type="submit"
                       value="Comprar Ahora"/>
            </form>
        </div>
    )
}
export default ButtonPayment;
