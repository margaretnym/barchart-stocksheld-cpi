
/* Stock Javascript/d3 */

           var margins = {top: 30, left: 280, right: 24, bottom: 34},
               width = (400 + margins.left + margins.right),
               height = (300 + margins.top + margins.bottom),
               topten_min = 0.89,
    
    dataset = [{data: [{rank: 1, company: 'General Electric Company',img: 'img/general.gif' ,freq: 67, stock: 2.52}, 
               {rank: 2,company: 'Intel Corporation',img: 'img/intel.gif' ,freq: 49, stock: 0.40},
               {rank: 3,company: 'Microsoft Corporation',img: 'img/microsoft.gif' ,freq: 48,stock: 0.52},
               {rank: 3,company: 'Exxon Mobil Corporation', img: 'img/exxon.gif' , freq:48 , stock: 3.73},
               {rank: 5,company: 'International Business Machines', img:'img/ibm.gif', freq: 46,stock: 1.50},
               {rank: 6,company: 'Apple Inc.', img:'img/apple.gif', freq: 45, stock: 0.72},
               {rank: 7,company: 'Chevron Corp.', img: 'img/chevron.gif',freq: 39, stock: 1.27},
               {rank: 8,company: 'Johnson & Johnson', img: 'img/jnj.gif', freq: 38, stock: 0.89},
               {rank: 9,company: 'Cisco Systems Inc.', img: 'img/cisco.gif', freq: 35, stock: 0.24},
               {rank: 9,company: 'Pepsico Inc.', img: 'img/pepsico.gif', freq: 35, stock: 0.45},
               {rank: 9,company: 'Pfizer Inc.', img: 'img/pfizer.gif',freq:35 , stock: 1.45},
               {rank: 9,company: "AT&T Inc", img: 'img/att.gif', freq:35 , stock: 0.78},
               {rank: '...',company: "   ........   ", img: '', freq:'' , stock: 0},
               {rank: 30,company: 'Royal Dutch Petroleum Shell',img: 'img/shell.gif', freq:21,stock: 1.65},
               {rank: 33,company: 'Bank of America Corp.', img: 'img/boa.gif', freq: 20, stock: 5.50},   
               {rank: 33,company: 'Berkshire Hathaway Inc.', img: 'img/berk.gif',freq:20 ,stock: 0.98},
               {rank: 51, company: 'Abbott Laboratories', img: 'img/abbott.gif', freq:16 ,stock: 1.30},],
               name: 'min'},


               {data: [{rank: 1, company: 'General Electric Company',img: 'img/general.gif' ,freq: 67, stock: 8.72}, 
               {rank: 2,company: 'Intel Corporation',img: 'img/intel.gif' ,freq: 49, stock: 1.42},
               {rank: 3,company: 'Microsoft Corporation',img: 'img/microsoft.gif' ,freq: 48,stock: 1.51},
               {rank: 3,company: 'Exxon Mobil Corporation', img: 'img/exxon.gif' , freq:48 , stock: 11.1},
               {rank: 5,company: 'International Business Machines', img:'img/ibm.gif', freq: 46,stock: 3.51},
               {rank: 6,company: 'Apple Inc.', img:'img/apple.gif', freq: 45, stock: 2.06},
               {rank: 7,company: 'Chevron Corp.', img: 'img/chevron.gif',freq: 39, stock: 3.05},
               {rank: 8,company: 'Johnson & Johnson', img: 'img/jnj.gif', freq: 38, stock: 2.24},
               {rank: 9,company: 'Cisco Systems Inc.', img: 'img/cisco.gif', freq: 35, stock: 0.8},
               {rank: 9,company: 'Pepsico Inc.', img: 'img/pepsico.gif', freq: 35, stock: 1.29},
               {rank: 9,company: 'Pfizer Inc.', img: 'img/pfizer.gif',freq:35 , stock: 3.52},
               {rank: 9,company: "AT&T Inc", img: 'img/att.gif', freq:35 , stock: 2.14},
               {rank: '...',company: "   ........   ", img: '', freq:'' , stock: 0},
               {rank: 30,company: 'Royal Dutch Petroleum Shell',img: 'img/shell.gif', freq:21,stock: 6.62},
               {rank: 33,company: 'Bank of America Corp.', img: 'img/boa.gif', freq: 20, stock: 26.2},   
               {rank: 33,company: 'Berkshire Hathaway Inc.', img: 'img/berk.gif',freq:20 ,stock: 2.23},
               {rank: 51, company: 'Abbott Laboratories', img: 'img/abbott.gif', freq:16 ,stock: 5.79},],
               name: 'max'},],

    series = dataset.map(function (d) {
        return d.name;}),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.stock,
                x: o.company, 
                image: o.img,
                freqtext:o.freq,
                ranktext:o.rank
                };
        });
    }),
    stack = d3.layout.stack();
    stack(dataset);

    function make_x_axis() {        
    return d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5)
    }

     function make_y_axis() {        
        return d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5)
    }

var dataset = dataset.map(function (group) {
    return group.map(function (d) {
        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0, 
            image: d.image,
            freq:d.freqtext,
            rank:d.ranktext

        };
    });
}),
    
    svg = d3.select('body')
        .append('svg')
        //.attr('width', width + margins.left + margins.right )
        //.attr('height', 500 )
        .attr("viewBox","0 0 " + width* 1.4 + " " + height * 1.2)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),

   
    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),

    xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([0, width]),

    companies = dataset[0].map(function (d) {
        return d.y;
    }),

    yScale = d3.scale.ordinal()
        .domain(companies)
        .rangeRoundBands([0, height], .1),

    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom'),

    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right'),

    labelling = svg.append('text')      // text label for the x axis
        .attr("x", width /2 )
        .attr("y", height + 35)
        .attr("class", "labelling")
        .style("text-anchor", "middle")
        .text("Million ($)"),

    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')

    freqtext = groups.selectAll('text')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('text')
        .attr("class", "labelling") 
        .text(function (d){
            return d.freq;
        })
        .attr("x", -30)
        .attr("y", function (d, i){
            return (yScale(d.y) + yScale.rangeBand()/2 + 3);
        });


    rankingtext = groups.selectAll('rankingtext')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('text')
        .attr("class", "labelling") 
        .text(function (d){
            return d.rank;
        })
        .attr("x", -240)
        .attr("y", function (d, i){
            return (yScale(d.y) + yScale.rangeBand()/2 + 3);
        });

        headline_ranking = svg.append('text')
        .attr("class", "head_labelling ") 
        .text('Rank by Frequency')
        .style('text-anchor', 'start')
        .attr("x", -245)
        .attr("y", 0);

         headline_freq = svg.append('text')
        .attr("class", "head_labelling ") 
        .text('Frequency')
        .style('text-anchor', 'start')
        .attr("x", -50)
        .attr("y", 0);

//transparent part//
rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        
        .append('rect')
        .style('fill','white')
        .style('stroke-width', '2px')
        .style('stroke', 'white')
        .attr('y', function (d, i) {
        return yScale(d.y);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('x', function (d) {
        return xScale(0);
    })
        .attr('width', function (d) {
         return xScale(d.x0);   
        })
    
//the range bar chart//
rectx = groups.selectAll('rectx')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        //Johnson & Johnson min stock value as the separation
        .style('fill', function (d, i) { 
            if (d.x0 >= topten_min ) {
                return 'rgba(3, 137, 157, 0.4)'} {
                    return ' rgba(255, 182, 115, 0.4)'}    
    })

        .attr('x', function (d) {
        return xScale(d.x0);
    })
        .attr('y', function (d, i) {
        return yScale(d.y);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('width', function (d) {
         return xScale(d.x - d.x0);   
    })
        .on('mouseover', function (d) {
            
            var coords = d3.mouse(svg.node());
            d3.select('#tooltip_chart')
                .style('left', (coords[0]) +50+ 'px')
                .style('top', (coords[1]) + 'px')
                .select('#value')
                .html("<span class = 'window_text'><img src='" + d.image + "' height= 80px  ></ahref><br>Min. Stock Value: " +  d.x0 +" M<br>Max. Stock Value: " + d.x + " M </span>");
        d3.select('#tooltip_chart').classed('hidden', false);
    })
        .on('mouseout', function () {
        d3.select('#tooltip_chart').classed('hidden', true);
    })

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(-220,0)') //here the space created
        .call(yAxis);

    svg.append("g")         
            .attr("class", "grid") 
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );

range_line = groups.selectAll('range_line')
        .data(function (d) {
        return d;
    })
        .enter()
        .append("line")
        .attr("x1",function (d) {
        return xScale(d.x0);
    })
        .attr("y1", function (d, i) {
        return yScale(d.y) + yScale.rangeBand()/2;
    })
        .attr("x2", function (d) {
         return xScale(d.x - d.x0) + xScale(d.x0);   
    })
        .attr("y2", function (d, i) {
        return yScale(d.y) + yScale.rangeBand()/2;
    })
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .style("stroke-dasharray", ("2,2"))


boundary_line_left = groups.selectAll('range_line')
        .data(function (d) {
        return d;
    })
        .enter()
        .append("line")
        .attr("x1", function (d) {
            console.log(d.x0)
        return xScale(d.x0);
    })
        .attr("y1", function (d, i) {
        return yScale(d.y) ;
    })
        .attr("x2", function (d) {
        return xScale(d.x0);
    })
        .attr("y2", function (d, i) {
        return yScale(d.y) + yScale.rangeBand();
    })
        .attr('class', function (d) { 
            if (xScale(d.x0) === 0) { return false;
            }
            return "rangeline";
    })

boundary_line_right = groups.selectAll('range_line')
        .data(function (d) {
        return d;
    })
        .enter()
        .append("line")
        .attr("x1",function (d) { if (xScale(d.x0) >0) {
         return xScale(d.x - d.x0) + xScale(d.x0);   
    }})
        .attr("y1", function (d, i) {
        return yScale(d.y) ;
    })
        .attr("x2", function (d) { if (xScale(d.x0) >0) {
         return xScale(d.x - d.x0) + xScale(d.x0);   
    }})
        .attr("y2", function (d, i) {
        return yScale(d.y) + yScale.rangeBand();
    })
        .attr('class', function (d) { 
            if (xScale(d.x0) === 0) { return false;
            }
            return "rangeline";
    })

        svg.append("foreignObject")
          .attr("width", width)
          .attr("height", 100)
          .attr("x", width * 0.5)
          .attr("y", height * -0.01 )
        .append("xhtml:body")
          .attr("class", "legendtext")
          .html("<span style='background-color: rgba(3, 137, 157, 0.4); color:black; '> &nbsp;Bars&nbsp;</span> =  Top 10 Stocks by Value");

   /* annotation_line = groups.selectAll()
        .data(function (d) {
            return d;
        })
            .enter()
            .append("line")
            .style('stroke', 'grey')
            .style('stroke-width', '0.5px')
            .style('opacity', '0.1')
            .attr("x1",  xScale(0.89))
            .attr("x2", xScale(0.89))
            .attr("y1", 0)
            .attr("y2", height)*/

    /*svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
            .opacity
        );*/

