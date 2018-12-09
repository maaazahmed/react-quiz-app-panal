import ActionTypes from "../constant/constant"


export const AboutQuizAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ABOUT_QUIZ,
            payload: data
        })
    }
}
