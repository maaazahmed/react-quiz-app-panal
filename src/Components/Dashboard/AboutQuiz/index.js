import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux"
import {
    AboutQuizAction
} from "../../store/action/action"




class AboutQuiz extends Component {
    constructor() {
        super();
        this.state = {
            numberOfQuestion: "",
            totalMarks: "",
            passingMarks: "",
            markofaQuistion: "",
            time: "",
            discription: ""
        }
    }


    on_ChangeHeandler(eve) {
        let {
            numberOfQuestion,
            totalMarks,
            passingMarks,
            markofaQuistion,
            time,
            discription
        } = this.state

        this.setState({
            [eve.target.name]: eve.target.value
        })

        let obj = {
            numberOfQuestion,
            totalMarks,
            passingMarks,
            markofaQuistion,
            time,
            discription
        }
        this.props.AboutQuizAction(obj)
    }





    render() {
        let {
            numberOfQuestion,
            totalMarks,
            passingMarks,
            markofaQuistion,
            time,
            discription
        } = this.state
        return (
            <div className="detailContainer" >
                <div className="DetiolFormContainer" >
                    <br />
                    <br />
                    <input
                        type="number"
                        className="input"
                        name="numberOfQuestion"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        value={numberOfQuestion}
                        placeholder="Number Of Question" />
                    <br />
                    <br />
                    <br />
                    <input
                        type="number"
                        className="input"
                        name="totalMarks"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        value={totalMarks}
                        placeholder="Total Marks" />
                    <br />
                    <br />
                    <br />
                    <input
                        type="number"
                        className="input"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        name="passingMarks"
                        value={passingMarks}
                        placeholder="Passing Marks" />
                    <br />
                    <br />
                    <br />
                    <input
                        type="number"
                        className="input"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        name="markofaQuistion"
                        value={markofaQuistion}
                        placeholder="Mark of a Quistion" />
                    <br />
                    <br />
                    <br />
                    <input
                        type="Number"
                        className="input"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        name="time"
                        value={time}
                        placeholder="Time (Minuts) " />
                    <br />
                    <br />
                    <br />
                    <textarea
                        type="text"
                        className="input"
                        name="discription"
                        onChange={this.on_ChangeHeandler.bind(this)}
                        value={discription}
                        placeholder="Discription"
                        style={{ maxWidth: "100%", minWidth: "100%" }} ></textarea>
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return ({
        BookingLis: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        AboutQuizAction: (data) => {
            dispatch(AboutQuizAction(data))
        },

    };
};


export default connect(mapStateToProp, mapDispatchToProp)(AboutQuiz)


