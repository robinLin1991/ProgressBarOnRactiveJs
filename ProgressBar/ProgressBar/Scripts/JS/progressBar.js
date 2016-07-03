var buttons = [-25, -10, 10, 25];
var colours = {
    Green: 'progress-bar-info',
    Red: 'progress-bar-danger'
};
var progressBars = [
    { id: 1, name: '#progressBar 1', value: 0, colour: colours["Green"] },
    { id: 2, name: '#progressBar 2', value: 0, colour: colours["Green"] },
    { id: 3, name: '#progressBar 3', value: 0, colour: colours["Green"] }
];


var ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: {
        progressBars : progressBars,
        buttons: buttons,
        targetBar: progressBars[0]
    }
});

ractive.observe('barSelections', function (newValue, oldValue) {
    if (oldValue !== newValue)
    {
        ractive.set('targetBar', progressBars[(newValue - 1)]);
    }
});

ractive.on('calculate', function (event, targetBar, value) {
    if (targetBar)
    {
        targetBar.value += value;

        if (targetBar.value > 100)
        {
            targetBar.colour = colours["Red"];
        }
        else if (targetBar.value < 0)
        {
            targetBar.value = 0;
        }
        else
        {
            targetBar.colour = colours["Green"];
        }

        ractive.set('progressBars[' + (targetBar.id - 1) + ']', targetBar);
    }
});