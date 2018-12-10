import React, { Component } from "react"
import "./index.css"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AboutQuiz from "./AboutQuiz/index";
import CreateQuiz from "./CreateQuiz/index"
import { connect } from "react-redux"


function getSteps() {
    return ['Additional Information', 'Create a Quiz'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AboutQuiz />;
        case 1:
            return <CreateQuiz />;
        default:
            return 'Unknown step';
    }
}


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            activeStep: 0,
            completed: {},
        };

    }
    totalSteps = () => {
        return getSteps().length;
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        const {
            numberOfQuestion,
            totalMarks,
            passingMarks,
            markofaQuistion,
            time,
            discription,
            title
        } = this.props.aboutQuizData.aboutQuiz
        if ( title !== "" && numberOfQuestion !== undefined && totalMarks !== undefined && passingMarks !== undefined && markofaQuistion !== undefined && time !== undefined && discription !== undefined) {
            const { completed } = this.state;
            completed[this.state.activeStep] = true;
            this.setState({
                completed,
            });
            this.handleNext();
        }
        else{
            alert("Requied All  feilds")
        }
    };


    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
    }

    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <diiv className="dashboardContainer" >
                <div className="createQuizContainer" >
                    <Stepper className="stapperContainer" nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepButton
                                        completed={this.state.completed[index]}>
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        {this.allStepsCompleted() ? (
                            <div>
                                <Typography>
                                    All steps completed - you&apos;re finished  Maaz
                                 </Typography>
                            </div>) : (
                                <div>
                                    <div style={{}} >{getStepContent(activeStep)}</div>
                                    <div className="formButtonContainer" >
                                        {/* <Button
                                            variant="contained" color="primary"
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}>
                                            Back
                                         </Button> */}
                                        {/* <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={this.handleNext}>
                                              Next
                                           </Button> */}
                                        {activeStep !== steps.length &&
                                            (this.state.completed[this.state.activeStep] ? (
                                                <Typography variant="caption" >
                                                    Step {activeStep + 1} already completed
                                                </Typography>
                                            )
                                                :
                                                (
                                                    this.completedSteps() === this.totalSteps() - 1 ?
                                                        // <Button variant="contained" color="primary" onClick={this.nextQuestion.bind()}>
                                                        //     Submit 
                                                        // </Button>
                                                        null
                                                        :
                                                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                                            {'Next'}
                                                        </Button>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </diiv>
        )
    }
}



const mapStateToProp = (state) => {
    return ({
        aboutQuizData: state.root
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


export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)


