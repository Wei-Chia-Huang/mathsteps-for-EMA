const mathsteps = require('mathsteps');

const print = require('./print.js');
const Step = require('./Step.js');

class Steps {
    constructor(mathInput) {
        this.input = mathInput;
    }

    isEquation(mathInput) {
        const comparators = ['<=', '>=', '=', '<', '>'];
        let isEquation = false;

        comparators.forEach(comparator => {
            if (mathInput.includes(comparator))
                isEquation = true;
        });

        return isEquation;
    }

    renderSteps = (steps) => {
        const renderedSteps = steps.map(
            (step, index) => new Step({step: step, index: index})
        );

        return print.oldNode(steps[0]), renderedSteps;
    }

    render() {
        const isEquation = this.isEquation(this.input);
        const steps = isEquation
            ? mathsteps.solveEquation(this.input)
            : mathsteps.simplifyExpression(this.input);
        
        if (steps.length === 0) {
            return "No steps for this input";
        }

        return this.renderSteps(steps);
    }
}

let answer = new Steps("1 + 2");
console.log(answer.render());