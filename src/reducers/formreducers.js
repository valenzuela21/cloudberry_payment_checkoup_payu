import{
    ADD_FORM_SUCCESS,
} from '../types';

const initialState = {
    forms:'',
    loading: false,
    option: true,
    price:'',
}

export default  function( state = initialState, action){
    switch (action.type){
        case ADD_FORM_SUCCESS:
            return {
                ...state,
                forms: action.payload
            }
        default:
            return state;
    }
}
