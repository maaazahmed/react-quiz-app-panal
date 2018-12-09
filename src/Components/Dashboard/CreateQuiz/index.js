import React, { Component } from "react"
import "./index.css"
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import $ from "jquery";


var quizArr = []
class CreateQuiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfQuestion: Number(this.props.aboutQuiz.aboutQuiz.numberOfQuestion),
            question: "",
            option_1: "",
            option_2: "",
            option_3: "",
            option_4: "",
            isSubmintQuizbtin: false
        };
    }


    on_ChangeHeandler(eve) {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }


    nextQustionBtn() {
        const { question, option_1, option_2, option_3, option_4 } = this.state
        let obj = {
            question, option_1, option_2, option_3, option_4
        }


        if (this.state.numberOfQuestion >= 1) {
            this.setState({
                numberOfQuestion: this.state.numberOfQuestion - 1,
            })
            quizArr.push(obj)
        }
        if (this.state.numberOfQuestion === 1) {
            console.log(quizArr)
            this.setState({
                isSubmintQuizbtin: true,
            })
        }


        // console.log(this.props.aboutQuiz.aboutQuiz.numberOfQuestion)

        // this.setState({
        //     question: "",
        //     option_1: "",
        //     option_2: "",
        //     option_3: "",
        //     option_4: "",
        // })
    }

    submintQuiz() {
        if (this.state.numberOfQuestion === 1) {
            console.log(quizArr)
            this.setState({
                isSubmintQuizbtin: true,
            })
        }
        console.log(this.state.numberOfQuestion)
    }


    render() {
        let { question, option_1, option_2, option_3, option_4, isSubmintQuizbtin } = this.state
        return (
            <div className="quiz_form_container">
                {(!isSubmintQuizbtin) ?
                    <div>
                        <h3 className="h3" >Question : {this.state.numberOfQuestion}</h3>
                        <div>
                            <div className="textarea-div" >
                                <textarea
                                    name="question"
                                    type="text"
                                    placeholder="Question"
                                    onChange={this.on_ChangeHeandler.bind(this)}
                                    value={question}
                                    className="textarea"></textarea>
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="input-div" >
                                <input
                                    name="option_1"
                                    value={option_1}
                                    type="text"
                                    className="input"
                                    onChange={this.on_ChangeHeandler.bind(this)}
                                    placeholder="Option 1" />
                            </div>
                            <div className="input-div" >
                                <input
                                    name="option_2"
                                    type="text"
                                    className="input"
                                    value={option_2}
                                    onChange={this.on_ChangeHeandler.bind(this)}
                                    placeholder="Option 2" />
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <div className="input-div" >
                                <input
                                    name="option_3"
                                    type="text"
                                    className="input"
                                    value={option_3}
                                    onChange={this.on_ChangeHeandler.bind(this)}
                                    placeholder="Option 3" />
                            </div>
                            <div className="input-div" >
                                <input
                                    name="option_4"
                                    type="text"
                                    value={option_4}
                                    onChange={this.on_ChangeHeandler.bind(this)}
                                    className="input"
                                    placeholder="Option 4" />
                            </div>
                        </div>
                    </div>
                    : null}<br /><br /><br />
                {(isSubmintQuizbtin) ?
                    <div style={{ marginTop: "10%" }} >
                        <h2 className="h3" >Submint Quiz</h2>
                        <Button onClick={this.submintQuiz.bind(this)} variant="contained" color="primary">
                            Submit
                     </Button>
                    </div>
                    :
                    <Button variant="contained" color="primary" onClick={this.nextQustionBtn.bind(this)}>
                        Next
                    </Button>}
            </div>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        aboutQuiz: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // AllBookings: (data) => {
        //     dispatch(AllBookings(data))
        // },
        // deleteAllbooking: (data) => {
        //     dispatch(deleteAllbooking(data))
        // },

    };
};


export default connect(mapStateToProp, mapDispatchToProp)(CreateQuiz)


