const mathsteps = require('mathsteps');
const print = require('mathsteps/lib/util/print');

const Change = require('./Chang.js');

var fs = require('fs');

function isEquation(mathInput) {
    const comparators = ['<=', '>=', '=', '<', '>'];
    let isEquation = false;

    comparators.forEach(comparator => {
        if (mathInput.includes(comparator))
            isEquation = true;
    });

    return isEquation;
}

const input = "123+456+789+36";
const steps = isEquation(input)
    ? mathsteps.solveEquation(input)
    : mathsteps.simplifyExpression(input);

// console.log(print.ascii(steps[0].oldNode));
var StepsText = print.ascii(steps[0].oldNode) + '\n';

steps.forEach(step => {
    StepsText += Change.formatChange(step) + '\n';
    StepsText += print.ascii(step.newNode) + '\n';
    // console.log(Change.formatChange(step));
    // console.log(print.ascii(step.newNode));
});

fs.writeFile('./StepsText.txt', StepsText, function(error){
    if (error){
        console.log('Write file fail!');
    }
    else {
        console.log('Write file success!');
    }
});