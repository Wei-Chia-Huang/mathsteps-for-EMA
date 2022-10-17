const ChangeTypes = require('mathsteps/lib/ChangeTypes.js');
const NodeType = require('./NodeType.js');

const Template = {
    templateFormatFunctionMap: {}
};

const OP_TO_STRING = {
    '+': 'Combine',
    '-': 'Combine',
    '*': 'Multiply',
    '/': 'Divide'
};

const COMPARATOR_TO_STRING = {
    '=': 'equal to',
    '>': 'greater than',
    '>=': 'greater than or equal to',
    '<': 'less than',
    '<=': 'less than or equal to',
};

// Given a step, will return the template for the change
// from the oldNode, newNode, and changeType
Template.formatChange = function(step) {
    if (!(step.changeType in Template.templateFormatFunctionMap)) {
        // TODO: add tests that will alert us when a new change type doesn't
        // have a template yet
        console.error(step.changeType + ' does not have a template!');
        return step.changeType;
    }

    const templateFormatFunctionMap = Template.templateFormatFunctionMap[step.changeType];
    let templateDescription = templateFormatFunctionMap(step);
    if (!templateDescription) {
        return Template.ChangeText[step.changeType];
    }
    
    return templateDescription;
};

function getChangeNodes(node) {
    return node.filter(node => node.changeGroup);
}

function getOldChangeNodes(step) {
    if (step.oldNode) {
        return getChangeNodes(step.oldNode);
    }
    else if (step.oldEquation) {
        const leftChangeNodeStrings = getChangeNodes(step.oldEquation.leftNode);
        const rightChangeNodeStrings = getChangeNodes(step.oldEquation.rightNode);
        return [...leftChangeNodeStrings, ...rightChangeNodeStrings];
    }
    return null;
}

function getNewChangeNodes(step) {
    if (step.newNode) {
        return getChangeNodes(step.newNode);
    }
    else if (step.newEquation) {
        const leftChangeNodeStrings = getChangeNodes(step.newEquation.leftNode);
        const rightChangeNodeStrings = getChangeNodes(step.newEquation.rightNode);
        return [...leftChangeNodeStrings, ...rightChangeNodeStrings];
    }
    return null;
}

function nodesToString(nodes, duplicates=false) {
    // get rid of changeGroup so we can find duplicates
    nodes.forEach(node => { node.changeGroup = undefined; });

    let strings = nodes.map(node => node.toTex());
    if (!duplicates) {
        strings = [...new Set(strings)];
    }

    if (strings.length === 0) {
        return '';
    }
    else if (strings.length === 1) {
        return strings[0];
    }
    else {
        return strings.slice();
    }
}

// e.g. 2 + 2 -> 4 or 2 * 2 -> 4
Template.templateFormatFunctionMap[ChangeTypes.SIMPLIFY_ARITHMETIC] = function(step) {
    const oldNodes = getOldChangeNodes(step);
    const newNodes = getNewChangeNodes(step);
    if (oldNodes.length !== 1 || newNodes.length !== 1) {
        return null;
    }

    const opNode = oldNodes[0];
    if (!NodeType.isOperator(opNode) || '+-*/^'.indexOf(opNode.op) === -1) {
        return null;
    }

    const before = nodesToString(opNode.args, true);
    const after = newNodes[0].toTex();

    switch (OP_TO_STRING[opNode.op]) {
        case 'Combine': 
            return 'AddTemplate.py (' + before + ')';
        case 'Multiply': 
            return 'MulTemplate.py (' + before + ')';
        case 'Divide': 
            return 'DivTemplate.py (' + before + ')';
        default: 
            return null;
    }
};

module.exports = Template;