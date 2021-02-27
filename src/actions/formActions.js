import{
    ADD_FORM_SUCCESS,
}from"../types";

export function dataNewForm(data){
    return (dispatch)=>{
      dispatch(addDataForm(data))
    }
}

const addDataForm  = forms =>({
    type: ADD_FORM_SUCCESS,
    payload: forms
});


export function getdataForm(state){
    return state.formdata;
}





