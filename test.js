const mathsteps = require('mathsteps');
const print = require('mathsteps/lib/util/print');

const Change = require('./Chang.js');

function isEquation(mathInput) {
    const comparators = ['<=', '>=', '=', '<', '>'];
    let isEquation = false;

    comparators.forEach(comparator => {
        if (mathInput.includes(comparator))
            isEquation = true;
    });

    return isEquation;
}

const input = "(12 + 5) * (34 - 70) / 6";
const steps = isEquation(input)
    ? mathsteps.solveEquation(input)
    : mathsteps.simplifyExpression(input);

console.log(print.ascii(steps[0].oldNode));

steps.forEach(step => {
    console.log(Change.formatChange(step));
    console.log(print.ascii(step.newNode));
});