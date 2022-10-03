// import PropTypes from 'prop-types';

// import print from './print.js';
// import Change from './Chang.js';
const print = require('./print.js');
const Change = require('./Chang.js');

class Step {
    constructor(steps) {
        this.step = steps.step;
        this.index = steps.index;
    }

    state = {
        substepsExpanded: false
    }

    toggleSubsteps = () => {
        const {substepsExpanded} = this.state;

        this.setState({
            substepsExpanded: !substepsExpanded
        });
    }

    renderStep = (step) => {
        return print.newNode(step);
    }

    renderSubsteps = (step) => {
        const substeps = step.substeps;

        if (substeps.length === 0)
            return null;

        return print.oldNode(substeps[0]), 
               substeps.map((step, index) => new Step({step: step, index: index}));
    }

    render() {
        const {step} = this.props;
        const {substepsExpanded} = this.state;

        return print.oldNode(step),
               Change.formatChange(step),
               this.renderStep(step);
    }
}

module.exports = Step; 