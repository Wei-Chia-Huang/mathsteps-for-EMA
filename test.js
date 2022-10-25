const mathsteps = require('mathsteps');
const print = require('mathsteps/lib/util/print');

const Change = require('./Chang.js');
const Template = require('./ChooseTemplate.js')

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

const input = "123 - 3 - 6";
const steps = isEquation(input)
    ? mathsteps.solveEquation(input)
    : mathsteps.simplifyExpression(input);

// console.log(print.ascii(steps[0].oldNode));
var StepsText = print.ascii(steps[0].oldNode) + '\n';
var CommandText = 'Template command of ' + input + '\n';

steps.forEach(step => {
    CommandText += Template.formatChange(step) + '\n';
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
        console.log('Write steps complete');
    }
});

fs.writeFile('./CommandTextList.txt', CommandText, function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log('Write command complete');
    }
});