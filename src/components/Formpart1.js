import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Swal from 'sweetalert2'
//Actions of Redux
import {useDispatch} from 'react-redux';
import {dataNewForm} from '../actions/formActions';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const Formpart1 = ({sendDataOption}) => {
    //Redux Action Dispatch
    const dispatch = useDispatch();
    const addInformation = (form) => {
        dispatch(dataNewForm(form))
    };

    const classes = useStyles();

    const state = {
        name: '',
        typedocument: '',
        numbercc: '',
        mobil: '',
        email: ''
    }

    const [value, setValue] = useState(state);
    const [validateEmail, setValidateEmail] = useState({});
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(false);
    const [disableSubmit,  setDisableSubmit] = useState(false);

     const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let result = event.target.value;
        setValue({...value, [name]: result});

        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if(name === 'email' ){
            if(regexEmail.test(result)){
                setValidateEmail(true)
            }else{
                setValidateEmail(false);
            }
        }

    };


    const handleBlurChange =  async (event) => {
        let name = event.target.name;
        let result = event.target.value;
        if(name ===  'numbercc') {

                let _validatecc = await axios.get(`http://comunicacionescloudberry.com/payment/Api/user/${result}`);
                let _count = _validatecc.data.length;
                if(_count >= 1){
                    setDisableSubmit(true);
                    Swal.fire({
                        title: 'Alerta!',
                        text: 'Este número de cédula ya se encuantra activo intenta con otro.',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                }else{
                    setDisableSubmit(false);
                }

        }
    }



    const currencies = [
        {
          value: ' ',
          label: 'Seleccione tipo de documento',
        },
        {
            value: 'Cc.',
            label: 'Cédula Ciudadania',
        },
        {
            value: 'Cc.Extr',
            label: 'Cédula Extrajeria',
        },
        {
            value: 'Dc.Personal.ID',
            label: 'Documento Personal Identificación',
        },
        {
            value: 'Pasaporte',
            label: 'Pasaporte',
        },
        {
            value: 'Registro',
            label: 'Registro',
        },
    ];


    const submitForm1 = e => {
        e.preventDefault();
        let errors;
        if (value.name.length <= 0) {
            errors = {type: 'name',txt: 'Ingresa el nombre completo', validate: true }
            setError(errors);
        } else if (value.typedocument.length <= 0 ) {
            errors = {type: 'typedocument',txt: 'Ingresa el tipo de documento completo', validate: true }
            setError(errors);
        } else if (value.numbercc.length <= 0) {
            errors = {type: 'numbercc',txt: 'Ingresa el número de documento', validate: true }
            setError(errors);
        } else if (value.mobil.length <= 0 ) {
            errors = {type: 'mobil',txt: 'Ingresa el número telefónico', validate: true }
            setError(errors);
        } else if (value.email.length <= 0) {
            errors = {type: 'email',txt: 'Ingresa el correo electrónico', validate: true }
            setError(errors);
        } else if(validateEmail === false){
            errors = {type: 'email',txt: 'El correo es invalido', validate: true }
            setError(errors);
        } else if(checked === false){
            Swal.fire({
                title: 'Alerta!',
                text: 'Acepte el tratamiento de mis datos personales de conformidad.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }else {
            addInformation({value, option: false});
            sendDataOption();
            errors = {}
            setError(errors);
        }

    }

    return (
        <div>
            <form onSubmit={submitForm1} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={1} sm={2}>
                    </Grid>
                    <Grid item xs={10} sm={8}>
                        <h3 style={{textAlign: 'center', color: '#7b7b7b'}}>Llena el siguiente formulario con tu
                            información personal:</h3>

                        <TextField
                            id="name"
                            label="Nombres y Apellidos"
                            placeholder="Ingresa el nombre completo"
                            fullWidth
                            required
                            error={'name' === error.type? true: false}
                            helperText={'name' === error.type? error.txt : ''}
                            margin="normal"
                            variant="outlined"
                            name="name"
                            value={value.name}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    id="typedocument"
                                    select
                                    required
                                    label="Tipo Identificación"
                                    error={'typedocument' === error.type? true: false}
                                    helperText={'typedocument' === error.type? error.txt : ''}
                                    name="typedocument"
                                    value={value.typedocument}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                >
                                    {currencies.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="numbercc"
                                    label="No."
                                    required
                                    placeholder="Ejemplo: 109089965"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    name="numbercc"
                                    error={'numbercc' === error.type? true: false}
                                    helperText={'numbercc' === error.type? error.txt : ''}
                                    value={value.numbercc}
                                    onChange={handleChange}
                                    onBlur={handleBlurChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="mobil"
                                    required
                                    label="Celular"
                                    placeholder="Ejemplo: 3213487458"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    name="mobil"
                                    variant="outlined"
                                    error={'mobil' === error.type? true: false}
                                    helperText={'mobil' === error.type? error.txt : ''}
                                    value={value.mobil}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="email"
                                    required
                                    label="Correo Electrónico"
                                    placeholder="Ejemplo: miempresa@gmail.com"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    error={'email' === error.type? true: false}
                                    helperText={'email' === error.type? error.txt : ''}
                                    value={value.email}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                        </Grid>
                         <div className="txt-term">
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheck}
                                />
                                            <span>Acepto el tratamiento de mis datos personales de conformidad con la Política de Protección de Datos Personales y la Ley 1581 de 2012
                                                <Link href="http://comunicacionescloudberry.com/docs/POLITICA-TRATAMIENTO-DATOS-PERSONALES-CLOUDBERRY-CREATIVOS.pdf" target="lank" > aqui </Link>
                                                </span>
                               </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="medium"
                            disabled={disableSubmit}
                            style={{float: 'right'}}
                            className={classes.button}
                            type="submit"
                            endIcon={<NavigateNextIcon/>}
                        >
                            Siguiente
                        </Button>
                    </Grid>
                    <Grid item xs={1} sm={2}>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Formpart1;
