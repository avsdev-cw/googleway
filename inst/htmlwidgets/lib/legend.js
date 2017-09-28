
function add_legend(map_id, layer_id, legendValues) {
    
    'use strict';
    
    var i = 0;
    console.log(legendValues);
    
    for (i = 0; i < legendValues.length; i++) {

        if (legendValues[i].type === "category") {
            add_legend_category(map_id, layer_id, legendValues[i]);
        } else {
            add_legend_gradient(map_id, layer_id, legendValues[i]);
        }
    }
}

// TODO:
// - label formats
function add_legend_gradient(map_id, layer_id, legendValues) {
    // fill gradient
    
    'use strict';
    
    if (window[map_id + 'legend' + layer_id + legendValues.colourType] === undefined) {
        window[map_id + 'legend' + layer_id + legendValues.colourType] = document.createElement("div");
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('id', map_id + 'legend' + layer_id + legendValues.colourType);
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('class', 'legend');
    }

    var legendContent = document.createElement("div"),
        legendTitle = document.createElement("div"),
        tickContainer = document.createElement("div"),
        labelContainer = document.createElement("div"),
        legendColours = document.createElement('div'),
        jsColours = [],
        colours = '',
        i = 0,
        legendTextColour = '#828282',
        style = '';
    
    legendContent.setAttribute('class', 'legendContent');
    
    legendTitle.setAttribute('class', 'legendTitle');
    legendTitle.innerHTML = legendValues.title;
    window[map_id + 'legend' + layer_id + legendValues.colourType].appendChild(legendTitle);
     
    tickContainer.setAttribute('class', 'tickContainer');
    labelContainer.setAttribute('class', 'labelContainer');

    if (legendValues.css !== null) {
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('style', legendValues.css);
    }

    for (i = 0; i < legendValues.legend.colour.length; i++) {
        jsColours.push(legendValues.legend.colour[i]);
    }
    
    colours = '(' + jsColours.join() + ')';

    style = 'display: inline-block; height: ' + jsColours.length * 20 + 'px; width: 15px;';
    style += 'background: ' + jsColours[1] + ';';
    style += 'background: -webkit-linear-gradient' + colours + ';';
    style += 'background: -o-linear-gradient' + colours + ';';
    style += 'background: -moz-linear-gradient' + colours + ';';
    style += 'background: linear-gradient' + colours + ';';

    legendColours.setAttribute('style', style);
    legendContent.appendChild(legendColours);

    for (i = 0; i < legendValues.legend.colour.length; i++) {
        
        var legendValue = 'text-align: left; color: ' + legendTextColour + '; font-size: 12px; height: 20px;',
            divTicks = document.createElement('div'),
            divVal = document.createElement('div');

        divTicks.setAttribute('style', legendValue);
        divTicks.innerHTML = '-';
        tickContainer.appendChild(divTicks);

        divVal.setAttribute('style', legendValue);
        divVal.innerHTML = legendValues.legend.variable[i];
        labelContainer.appendChild(divVal);
    }
    
    legendContent.appendChild(tickContainer);
    legendContent.appendChild(labelContainer);

    window[map_id + 'legend' + layer_id + legendValues.colourType].appendChild(legendContent);
    
    placeControl(map_id, window[map_id + 'legend' + layer_id + legendValues.colourType], legendValues.position);
}

function generateColourBox(colourType, colour) {
    'use strict';
    
    if (colourType === "fill_colour") {
        return ('height: 20px; width: 15px; background: ' + colour);
    } else {
        // http://jsfiddle.net/UES6U/2/
        return ('height: 20px; width: 15px; background: linear-gradient(to bottom, white 25%, ' + colour + ' 25%, ' + colour + ' 45%, ' + 'white 45%)');
    }
}

function add_legend_category(map_id, layer_id, legendValues) {
    
    'use strict';

    if (window[map_id + 'legend' + layer_id + legendValues.colourType] === undefined) {
        window[map_id + 'legend' + layer_id + legendValues.colourType] = document.createElement("div");
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('id', map_id + 'legend' + layer_id + legendValues.colourType);
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('class', 'legend');
    }
    
    var legendContent = document.createElement("div"),
        legendTitle = document.createElement("div"),
        colourContainer = document.createElement("div"),
        tickContainer = document.createElement("div"),
        labelContainer = document.createElement("div"),
        legendColours = document.createElement('div'),
        colourBox = '',
        //colourAttribute = '',
        i = 0,
        legendTextColour = '#828282';
    
    legendContent.setAttribute('class', 'legendContent');
    
    legendTitle.setAttribute('class', 'legendTitle');
    legendTitle.innerHTML = legendValues.title;
    window[map_id + 'legend' + layer_id + legendValues.colourType].appendChild(legendTitle);
    
    colourContainer.setAttribute('class', 'labelContainer');
    tickContainer.setAttribute('class', 'tickContainer');
    labelContainer.setAttribute('class', 'labelContainer');
    
    if (legendValues.css !== null) {
        window[map_id + 'legend' + layer_id + legendValues.colourType].setAttribute('style', legendValues.css);
    }

    for (i = 0; i < legendValues.legend.colour.length; i++) {

        var tickVal = 'text-left: center; color: ' + legendTextColour + '; font-size: 12px; height: 20px;',
            divCol = document.createElement('div'),
            divTicks = document.createElement('div'),
            divVal = document.createElement('div');

        //colourBox = 'height: 20px; width: 15px; background: ' + legendValues.legend.colour[i];
        colourBox = generateColourBox(legendValues.colourType, legendValues.legend.colour[i]);
        divCol.setAttribute('style', colourBox);
        colourContainer.appendChild(divCol);

        divTicks.setAttribute('style', tickVal);
        divTicks.innerHTML = '-';
        tickContainer.appendChild(divTicks);

        divVal.setAttribute('style', tickVal);
        divVal.innerHTML = legendValues.legend.variable[i];
        labelContainer.appendChild(divVal);
    }

    legendContent.appendChild(colourContainer);
    legendContent.appendChild(tickContainer);
    legendContent.appendChild(labelContainer);
    
    window[map_id + 'legend' + layer_id + legendValues.colourType].appendChild(legendContent);
    
    placeControl(map_id, window[map_id + 'legend' + layer_id + legendValues.colourType], legendValues.position);
}

