import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

import Link from '@material-ui/core/Link';
import {useSelector} from "react-redux";
import {getdataForm} from '../actions/formActions';

import TablePrice from "./TablePrice";
import ButtonPayment from "./ButtonPayment";

import {nanoid} from "nanoid";
import md5 from "md5";
import axios from "axios";
import Swal from 'sweetalert2'



const Formpart2 = (props) => {

    const _getStore = useSelector(getdataForm);
    const {price, product} = props;
    const state = {
        business: null,
        domain: null,
        ssl: null,
        type: null,
        price_plan: price || 0,
        product: product || '',
        domain_price: 69900,
        selectedFile: null,
        price_ssl: 0,
        state_upload: ''
    }

    const [values, setValues] = useState(state);
    const [error, setError] = useState('');
    const [validateSLL, setValidateSLL] = useState(state.price_ssl);
    const [checked, setChecked] = useState(false);
    const [urlFile, setUrlFile] = useState('');
    const [referenceSale, setReferenceSale] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event) => {
        let errors;
        let value = event.target.value;
        let name = event.target.name;

        setValues({...values, [name]: value});
        errors = {type: '', txt: '', validate: false}
        setError(errors);
    };

    const submitForm2 = e => {
        e.preventDefault();
        let errors;
        const INSERT_ENDPOINT_DB = 'http://comunicacionescloudberry.com/payment/Api/registro_invoice';
        const INSERT_ENDPOINT_DB_USER = 'http://comunicacionescloudberry.com/payment/Api/register_user';


        if (values.business === null || values.business.length <= 0) {
            errors = {type: 'business', txt: 'Ingresa la razon social', validate: false}
            setError(errors);
        } else if (values.domain === null || values.domain.length <= 0) {
            errors = {type: 'domain', txt: 'Ingresa si cuentas con dominio', validate: false}
            setError(errors);
        } else if (values.ssl === null || values.ssl.length <= 0) {
            errors = {type: 'ssl', txt: 'Ingresa si tienes cuenta de certificado sll', validate: false}
            setError(errors);
        } else if (checked === false) {
            Swal.fire({
                title: 'Alerta!',
                text: 'Acepte los terminos y condiciones de este servicio.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {

            const data_redux = _getStore.forms.value;
            const IDUSER = `ID-${nanoid()}`

            let formData = {
                "id_user": IDUSER,
                "id_sale": referenceSale,
                "cedula": data_redux.numbercc,
                "name": data_redux.name,
                "typedocument": data_redux.typedocument,
                "mobil": data_redux.mobil,
                "email": data_redux.email,
                "business": values.business,
                "type": values.type,
                "document": urlFile,
                "domain": values.domain,
                "certificado": values.ssl,
                "product": values.product,
                "totalmonth": values.price_plan,
                "plan": "Yes",
                "total": validateSLL + parseInt(values.price_plan) + values.domain_price,
                "estado": "Transacción Proceso"
            }

            let data = JSON.stringify(formData);

            //Insert Data User Payment
            axios.post(INSERT_ENDPOINT_DB, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log("Insertado la factura correctamente.");
            }).catch((error) => console.log(error))

            //Insert Data User
            let data_user = {
                "id_user": IDUSER,
                "cedula": data_redux.numbercc,
                "name": data_redux.name,
                "email": data_redux.email,
            }

            data_user = JSON.stringify(data_user);
            axios.post(INSERT_ENDPOINT_DB_USER, data_user)
                .then(() => console.log("Se ha registrado un nuevo usuario."))
                .catch((error) => console.log(error));

            errors = {type: '', txt: '', validate: true}
            setError(errors);

            setTimeout(function () {
                document.frmProduct.submit();
            }, 2000);

        }
    };

    const serviceSSL = () => {
        setValidateSLL(99900);
    }

    const serviceNoSSL = () => {
        setValidateSLL(0);
    }

    //** Upload Archive Document **//
    const onFileChange = event => {
        setValues({...values, state_upload: '' }) ;
        setDisableSubmit(true);
        const UPLOAD_ENDPOINT = 'http://comunicacionescloudberry.com/payment/Api/archive_upload';
        const file = event.target.files[0];
        const formData = new FormData();

        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') {
            setValues({...values, state_upload: '<div class="alert-info">Espera archivo subiendo...</div>' }) ;
            formData.append(
                'myFile',
                file,
            )
            //File Upload Document
            axios.post(UPLOAD_ENDPOINT, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response) => {
                setUrlFile(response.data.url);
                setValues({...values, state_upload: '<div class="alert-success">Archivo subido correctamente.</div>' }) ;
                setDisableSubmit(false);
            }).catch((error) => console.log(error))

        } else {
            Swal.fire({
                title: 'Alerta!',
                text: 'Solo se permite formato de imagenes como PDF, PNG, JPEG, JPG',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }

    }


    useEffect(() => {

        const idUnique = nanoid(12);
        const id_invoice = `TiendaVirtual-${idUnique}`;
        setReferenceSale(id_invoice);

    }, []);


    return (
        <div>
            <form onSubmit={submitForm2} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={1} sm={1}>
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <h3 style={{textAlign: 'center', color: '#7b7b7b'}}>¡Ya casi! Ahora llena algunos datos de tu
                            negocio:</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    id="business"
                                    label="Nómbre / Razón Social"
                                    placeholder="Ejemplo: Cloudberry"
                                    fullWidth
                                    required
                                    margin="normal"
                                    name="business"
                                    error={'business' === error.type ? true : false}
                                    helperText={'business' === error.type ? error.txt : ''}
                                    value={values.business}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Grid container>
                                    <FormControl>
                                        <RadioGroup aria-label="gender"
                                                    name="type"
                                                    id="type"
                                                    alue={values.type}
                                                    onChange={handleChange}>
                                            <FormControlLabel
                                                value="nit"
                                                control={<Radio color="primary"/>}
                                                label="NIT"/>
                                            <FormControlLabel
                                                value="rut"
                                                control={<Radio color="primary"/>}
                                                label="RUT"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <Grid container>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                id="selectedFile"
                                                label="Cargar Cámara de Comercio o Rut"
                                                fullWidth
                                                margin="normal"
                                                name="selectedFile"
                                                type="file"
                                                onChange={onFileChange}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: values.state_upload
                                                }}></div>
                                        </Grid>
                                        <Grid className="container" style={{marginTop: '20px'}} item xs={12}>
                                            <FormLabel component="legend">¿Cuentas con dominio?</FormLabel>
                                            <RadioGroup aria-label="gender"
                                                        value={values.domain}
                                                        name="domain"
                                                        id="domain"
                                                        onChange={handleChange}>
                                                <FormControlLabel
                                                    value="Si"
                                                    control={<Radio color="primary"/>}
                                                    label="Si"/>
                                                <FormControlLabel
                                                    value="No"
                                                    control={<Radio color="primary"/>}
                                                    label="No"/>
                                            </RadioGroup>
                                            {(() => {
                                                if ('domain' === error.type) {
                                                    if (values.domain === null) {
                                                        return (<div
                                                            className="txt-error-personalizate">
                                                            Ingresa si tienes cuenta de dominio
                                                        </div>)
                                                    }
                                                }
                                                if (values.domain !== null) {
                                                    if (values.domain === 'Si') {
                                                        return (
                                                            <div className="container-note">Debes transferir tu
                                                                dominio con nosotros.
                                                                <p><strong> Valor: $69.900 (pago anual)</strong></p>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (<div className="container-note">
                                                                Tu tienda virtual debe tener dominio. ¡Cómpralo
                                                                ahora!
                                                                <p><strong> Valor: $69.900 (pago anual)</strong></p>
                                                            </div>
                                                        );
                                                    }
                                                }

                                            })()}
                                        </Grid>
                                        <Grid className="container" style={{marginTop: '20px'}} item xs={12}>
                                            <FormLabel component="legend">¿Cuentas con certificado de
                                                seguridad?:</FormLabel>
                                            <RadioGroup aria-label="gender" name="ssl" id="ssl" value={values.ssl}
                                                        onChange={handleChange}>
                                                <FormControlLabel
                                                    value="Si"
                                                    control={<Radio color="primary"/>}
                                                    label="Si"/>
                                                <FormControlLabel
                                                    value="No"
                                                    control={<Radio color="primary"/>}
                                                    label="No"/>
                                            </RadioGroup>

                                            {(() => {
                                                if ('ssl' === error.type) {
                                                    if (values.ssl === null) {
                                                        return (<div
                                                            className="MuiFormHelperText-root Mui-error Mui-required">
                                                            Por favor responde si deseas certificado SSL
                                                        </div>)
                                                    }
                                                }

                                                if (values.ssl === 'No') {
                                                    return (
                                                        <div className="container-note"> No es obligatorio, pero te
                                                            recomendamos tener instalado
                                                            en tu tienda el certificado de seguridad para brindarle
                                                            confianza a tus clientes y proteger
                                                            datos personales.
                                                            <p><strong> Valor: $99.900 (pago anual)</strong></p>
                                                            {(() => {
                                                                if (validateSLL === 0) {
                                                                    return (
                                                                        <Button onClick={serviceSSL} variant="contained"
                                                                                color="secondary"> Adquirir </Button>)
                                                                } else {
                                                                    return (<Button onClick={serviceNoSSL}
                                                                                    variant="contained"
                                                                                    color="secondary"> No
                                                                        Adquirir </Button>)
                                                                }

                                                            })()}
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TablePrice domain={state.domain_price} ssl={validateSLL}
                                            plan={state.price_plan} txtplan={state.product}/>
                                <div className="txt-term">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChangeCheck}
                                    />
                                    <span>Acepto los
                                                <Link
                                                    href="http://comunicacionescloudberry.com/docs/TERMINOS%20Y%20CONDICIONES%20CAMPAN%CC%83A%20TIENDAS%20VIRTUALES%20.pdf"
                                                    target="_blank">
                                                 &nbsp; términos y condiciones  &nbsp;
                                                 </Link>
                                        de este servicio.
                                        </span>
                                </div>
                                {(() => {
                                    if (error.validate !== true) {
                                        return (<Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={disableSubmit}
                                            fullWidth
                                            style={{marginTop: '20px'}}
                                            type="submit"
                                        >
                                            Comprar
                                        </Button>)
                                    } else {
                                        const price_sll = validateSLL;
                                        const total = state.domain_price + parseInt(state.price_plan) + price_sll;
                                        const ApiKey = process.env.REACT_APP_KEY;
                                        const merchanId = process.env.REACT_APP_MERCHAN_ID;
                                        const accountId = process.env.REACT_APP_ACCOUNT_ID;
                                        const reference = referenceSale;
                                        const currency = 'COP';
                                        const product = values.product
                                        const emailuser = _getStore.forms.value.email;
                                        const telephone = _getStore.forms.value.mobil;
                                        const fullname = _getStore.forms.value.name;
                                        const signature = md5(ApiKey + "~" + merchanId + "~" + reference + "~" + total + "~" + currency);

                                        return (<ButtonPayment
                                            data={{
                                                ApiKey,
                                                merchanId,
                                                accountId,
                                                reference,
                                                total,
                                                currency,
                                                signature,
                                                emailuser,
                                                product,
                                                telephone,
                                                fullname
                                            }}
                                        />)
                                    }
                                })()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Formpart2;
