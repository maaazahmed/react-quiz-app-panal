import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    aboutQuiz:{}
}




export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ActionTypes.ABOUT_QUIZ:
        // console.log( action.payload)
            return ({
                ...state,
                aboutQuiz: action.payload
            })
     
        default:
            return state;
    }

}

