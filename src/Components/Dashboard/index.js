import React, { Component } from "react"
import "./index.css"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getSteps() {
    return ['Additional Information', 'Create an ad group', 'Create an ad', ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <h1>1</h1> ;
        case 1:
            return <h1>2</h1>;
        case 2:
            return <h1>3</h1>;
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
        // alert("complete")
        return getSteps().length;
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
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
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed,
        });
        this.handleNext();
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
        const { classes } = this.props;
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
                                      
                                        onClick={this.handleStep(index)}
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
                                    <Typography>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}>
                                            Back
                                     </Button>
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
                                            ) : (
                                                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                                        {this.completedSteps() === this.totalSteps() - 1 ? 'Submit' : 'Complete Step'}
                                                    </Button>
                                                ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </diiv>
        )
    }
}


export default Dashboard