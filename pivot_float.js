    const squareHeight = 25;
    const squareWidth = 40;

    svg.append("text")
        .text("Next step")
        .attr("class", "button")
        .attr('x', d => 22 + 45)
        .attr('y', d => 85 + squareHeight/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-weight", "bold")
    
    var button = svg.append("rect")
        .attr("width", 90)
        .attr("height", squareHeight)
        .attr("class", "button")
        .classed("buttonRect", true)
        .attr("x", 22)
        .attr("y", 85)
        .attr("fill-opacity", 0)
        .attr("stroke", "black")
    
    data.forEach(function (d) {
        d.x = +d.x
        d.y = +d.y
    });
    
    svg.append("text")
        .text('pivot_longer(data, cols = c("c1", "c2", "c3"), names_to = "key", values_to = "vals")')
        .attr("y", 540)
        .attr("x", 395)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .attr("opacity", 0)

    let squares = svg.selectAll('.square')
        .data(data)
        .enter()
    	.append('g')
    	.attr('class', 'square')

    svg.selectAll(".square")
        .append("rect")
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', squareWidth)
        .attr('height', squareHeight)
        .attr("fill", d => d.color)
        .attr("stroke", "white")
        .attr("stroke-width", 3)

    
    svg.selectAll(".square")
        .append("text")
        .text(d => d.text)
        .attr('x', d => d.x + squareWidth/2)
        .attr('y', d => d.y + squareHeight/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-weight", "bold")
        .style("font-size", "12px")

    var arc = d3.arc()
        .innerRadius(30)
        .outerRadius(30)
        .startAngle(4*Math.PI/4)
        .endAngle(6*Math.PI/4);

    var arc2 = d3.arc()
        .innerRadius(30)
        .outerRadius(30)
        .startAngle(6*Math.PI/4)
        .endAngle(8*Math.PI/4);


    svg.append("path")
        .attr("fill", "none")
        .attr("class", "textButton")
        .attr("stroke-width", 1)
        .attr("stroke", "darkgrey")
        .attr("transform", "translate(170, 340)")
        .attr("d", arc2)
        .attr("opacity", 1)

    svg
        .append("text")
        .attr("class", "textButton")
        .text("Click")
        .attr("x", 180)
        .attr("y", 314)
        .attr("font-weight", "bold")
        .attr("text-anchor", "left")
        .attr("fill", "darkblue")
        .style("font-size", "12px")
        .attr("opacity", 1)

    svg
        .append("text")
        .attr("class", "textButton")
        .text("To see next step")
        .attr("x", 180)
        .attr("y", 327)
        .attr("text-anchor", "left")
        .style("font-size", "11px")
        .attr("opacity", 1)

    var textGroupButton = svg
        .append("g")
        .attr("class", "textGroupButton")

    svg.selectAll(".textButton")
        .each(function() { 
            textGroupButton.append(() => this) 
        });

    svg.selectAll("g.textGroupButton")
        .attr("transform", "translate(-72, -263)")

    var del = 75

    function moveFirst(){

        svg.selectAll("g.square") // Moves second col
            .filter(function(d, i) { return i > 11 && i < 16})
            .classed("second", true)
            .transition()
            .delay(200)
            .duration(1000)
            .ease(d3.easeCubicIn)
            .attr("transform", "translate(10, 0)")
        
        svg.selectAll("g.square") // Moves third col
            .filter(function(d, i) { return i > 15 && i < 20})
            .classed("third", true)
            .transition()
            .delay(100)
            .duration(1000)
            .ease(d3.easeCubicIn)
            .attr("transform", "translate(20, 0)")
        
        svg.selectAll("g.square") // Moves fourth col
            .filter(function(d, i) { return i > 19})
            .classed("fourth", true)
            .transition()
            .delay(0)
            .duration(1000)
            .ease(d3.easeCubicIn)
            .attr("transform", "translate(30, 0)")
            
        var sector = svg.append("path")
            .attr("fill", "none")
            .attr("class", "text1")
            .attr("stroke-width", 1)
            .attr("stroke", "darkgrey")
            .attr("transform", "translate(170, 280)")
            .attr("d", arc)
            .attr("opacity", 0)

        sector
            .transition()
            .delay(1400)
            .duration(250)
            .attr("opacity", 1)

        svg
            .append("text")
            .attr("class", "text1")
            .text("Step 1")
            .attr("x", 180)
            .attr("y", 314)
            .attr("font-weight", "bold")
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text1")
            .text("Selected columns")
            .attr("x", 180)
            .attr("y", 327)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text1")
            .text("are separated")
            .attr("x", 180)
            .attr("y", 339)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg.selectAll(".text1")
            .transition()
            .delay(1400)
            .duration(250)
            .attr("opacity", 1)

    }

    function moveSecond(){

        svg.selectAll("g")
            .filter(function(d, i) { return i < 4 || i > 11})
            .clone(true)
            .attr("class", "stay")

        svg.selectAll("g.stay")
            .transition()
            .delay(0)
            .duration(2100)
            .ease(d3.easeCubicIn)
            .attr("opacity", 0.2)

        svg.selectAll(".text1")
            .transition()
            .delay(0)
            .duration(2100)
            .attr("opacity", 0.2)

        svg.selectAll("g.square")
            .filter(function(d, i) { return i < 4})
            .transition()
            .delay(function(d,i){ return i * del+ (del * 13)})
            .duration(1000)
            .attr("transform", "translate(310, -140)")
        
        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 11 && i < 16})
            .transition()
            .delay(function(d,i){ return i * del + (del * 9)})
            .duration(1000)
            .attr("transform", "translate(310, -140)")

        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 3 && i < 8})
            .transition()
            .delay(function(d,i){ return i * del + (del * 13)})
            .duration(1000)
            .attr("transform", "translate(310, 0)")

        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 15 && i < 20})
            .transition()
            .delay(function(d,i){ return i * del + (del * 5)})
            .duration(1000)
            .attr("transform", "translate(270, 0)")

        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 7 && i < 12})
            .transition()
            .delay(function(d,i){ return i * del + (del * 13)})
            .duration(1000)
            .attr("transform", "translate(310, 140)")

        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 19})
            .transition()
            .delay(function(d,i){ return i * del})
            .duration(1000)
            .attr("transform", "translate(230, 140)")


        var sector = svg.append("path")
            .attr("fill", "none")
            .attr("class", "text2")
            .attr("stroke-width", 1)
            .attr("stroke", "darkgrey")
            .attr("transform", "translate(170, 280)")
            .attr("d", arc)
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text2")
            .text("Step 2")
            .attr("x", 180)
            .attr("y", 314)
            .attr("font-weight", "bold")
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text2")
            .text("Columns are")
            .attr("x", 180)
            .attr("y", 327)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text2")
            .text("grouped with ID")
            .attr("x", 180)
            .attr("y", 339)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        var textGroup2 = svg
            .append("g")
            .attr("class", "textGroup2")

        svg.selectAll(".text2")
            .each(function() { 
                textGroup2.append(() => this) 
            });

        svg.selectAll("g.textGroup2")
            .attr("transform", "translate(230, 140)")
            
        
        svg.selectAll(".text2")
            .transition()
            .delay(2300)
            .duration(250)
            .attr("opacity", 1)

    }

    function moveThird(){
        svg.selectAll(".text2")
            .transition()
            .delay(0)
            .duration(100)
            .attr("opacity", 0.2)

        svg.selectAll("g.second")
            .filter(function(d, i) { return i > 0})
            .transition()
            .duration(1500)
            .delay(100)
            .attr("transform", "translate(350, -140)")

        svg.selectAll("g.third")
            .filter(function(d, i) { return i > 0})
            .transition()
            .duration(1500)
            .delay(100)
            .attr("transform", "translate(310, 0)")

        svg.selectAll("g.fourth")
            .filter(function(d, i) { return i > 0})
            .transition()
            .duration(1500)
            .delay(100)
            .attr("transform", "translate(270, 140)")

        var sector = svg.append("path")
            .attr("fill", "none")
            .attr("class", "text3")
            .attr("stroke-width", 1)
            .attr("stroke", "darkgrey")
            .attr("transform", "translate(170, 340)")
            .attr("d", arc2)
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text3")
            .text("Step 3")
            .attr("x", 180)
            .attr("y", 314)
            .attr("font-weight", "bold")
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text3")
            .text("Values are")
            .attr("x", 180)
            .attr("y", 327)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text3")
            .text("copied to")
            .attr("x", 180)
            .attr("y", 339)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text3")
            .text("new column")
            .attr("x", 180)
            .attr("y", 351)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        var textGroup3 = svg
            .append("g")
            .attr("class", "textGroup3")

        svg.selectAll(".text3")
            .each(function() { 
                textGroup3.append(() => this) 
            });

        svg.selectAll("g.textGroup3")
            .attr("transform", "translate(290, -153)")
            
        
        svg.selectAll(".text3")
            .transition()
            .delay(1500)
            .duration(250)
            .attr("opacity", 1)

    }

    function moveFourth(){
        svg.selectAll(".text3")
        .transition()
        .delay(0)
        .duration(100)
        .attr("opacity", 0.2)

        svg.select("g.second")
            .clone(true)
            .classed("secondCloned", true)

        svg.select("g.second")
            .clone(true)
            .classed("secondCloned2", true)

        svg.select("g.third")
            .clone(true)
            .classed("thirdCloned", true)

        svg.select("g.third")
            .clone(true)
            .classed("thirdCloned2", true)

        svg.select("g.fourth")
            .clone(true)
            .classed("fourthCloned", true)

        svg.select("g.fourth")
            .clone(true)
            .classed("fourthCloned2", true)
        
        svg.select("g.second")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(310, -115)")
        
        svg.select("g.secondCloned2")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(310, -90)")
    
        svg.select("g.secondCloned")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(310, -65)")

        svg.select("g.third")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(270, 25)")
        
        svg.select("g.thirdCloned2")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(270, 50)")
    
        svg.select("g.thirdCloned")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(270, 75)")

        svg.select("g.fourth")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(230, 165)")
        
        svg.select("g.fourthCloned2")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(230, 190)")
    
        svg.select("g.fourthCloned")
            .transition()
            .delay(0)
            .duration(1000)
            .attr("transform", "translate(230, 215)")

        var sector = svg.append("path")
            .attr("fill", "none")
            .attr("class", "text4")
            .attr("stroke-width", 1)
            .attr("stroke", "darkgrey")
            .attr("transform", "translate(170, 340)")
            .attr("d", arc2)
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text4")
            .text("Step 4")
            .attr("x", 180)
            .attr("y", 314)
            .attr("font-weight", "bold")
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text4")
            .text("Column names are")
            .attr("x", 180)
            .attr("y", 327)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text4")
            .text("converted to column")
            .attr("x", 180)
            .attr("y", 339)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        var textGroup4 = svg
            .append("g")
            .attr("class", "textGroup4")

        svg.selectAll(".text4")
            .each(function() { 
                textGroup4.append(() => this) 
            });

        svg.selectAll("g.textGroup4")
            .attr("transform", "translate(250, -293)")
            
        
        svg.selectAll(".text4")
            .transition()
            .delay(1200)
            .duration(250)
            .attr("opacity", 1)

    }

    function moveFifth(){

        svg.selectAll(".text4")
            .transition()
            .delay(0)
            .duration(100)
            .attr("opacity", 0.2)

        svg.selectAll("g")    
            .filter(function() {
                return !this.classList.contains('stay')
              })
            .clone(true)
            .attr("class", "stay2")


        svg.selectAll("g.stay2")
            .transition()
            .delay(0)
            .duration(1600)
            .ease(d3.easeCubicIn)
            .attr("opacity", 0.2)

        svg.selectAll("g.square")
            .filter(function(d, i) { return i < 4})
            .transition()
            .delay(function(d,i){ return i * del + (del * 7)})
            .duration(1000)
            .attr("transform", "translate(550, -75)")
        
        svg.select("g.second")
            .transition()
            .delay(function(d,i){ return i * del + (del * 4)})
            .duration(1000)
            .attr("transform", "translate(550, -50)")

        svg.selectAll("g.second")
            .filter(function(d, i) { return i == 1})
            .transition()
            .delay(function(d,i){ return i * del + (del * 5)})
            .duration(1000)
            .attr("transform", "translate(550, -25)")

        svg.selectAll("g.second")
            .filter(function(d, i) { return i == 2})
            .transition()
            .delay(function(d,i){ return i * del + (del * 6)})
            .duration(1000)
            .attr("transform", "translate(550, 0)")

        svg.selectAll("g.second")
            .filter(function(d, i) { return i > 2})
            .transition()
            .delay(function(d,i){ return i * del})
            .duration(1000)
            .attr("transform", "translate(590, -75)")
        
        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 3 && i < 8})
            .lower()
            .transition()
            .delay(function(d,i){ return i * del + (del * 7)})
            .duration(1000)
            .attr("transform", "translate(550, 0)")

        svg.select("g.third")
            .transition()
            .delay(function(d,i){ return i * del + (del * 4)})
            .duration(1000)
            .attr("transform", "translate(510, 25)")

        svg.selectAll("g.third")
            .filter(function(d, i) { return i == 1})
            .transition()
            .delay(function(d,i){ return i * del + (del * 5)})
            .duration(1000)
            .attr("transform", "translate(510, 50)")

        svg.selectAll("g.third")
            .filter(function(d, i) { return i == 2})
            .transition()
            .delay(function(d,i){ return i * del + (del * 6)})
            .duration(1000)
            .attr("transform", "translate(510, 75)")

        svg.selectAll("g.third")
            .filter(function(d, i) { return i > 2})
            .transition()
            .delay(function(d,i){ return i * del})
            .duration(1000)
            .attr("transform", "translate(550, 0)")

        svg.selectAll("g.square")
            .filter(function(d, i) { return i > 7 && i < 12})
            .lower()
            .transition()
            .delay(function(d,i){ return i * del + (del * 7)})
            .duration(1000)
            .attr("transform", "translate(550, 75)")

        svg.select("g.fourth")
            .transition()
            .delay(function(d,i){ return i * del + (del * 4)})
            .duration(1000)
            .attr("transform", "translate(470, 100)")

        svg.selectAll("g.fourth")
            .filter(function(d, i) { return i == 1})
            .transition()
            .delay(function(d,i){ return i * del + (del * 5)})
            .duration(1000)
            .attr("transform", "translate(470, 125)")

        svg.selectAll("g.fourth")
            .filter(function(d, i) { return i == 2})
            .transition()
            .delay(function(d,i){ return i * del + (del * 6)})
            .duration(1000)
            .attr("transform", "translate(470, 150)")

        svg.selectAll("g.fourth")
            .filter(function(d, i) { return i > 2})
            .transition()
            .delay(function(d,i){ return i * del})
            .duration(1000)
            .attr("transform", "translate(510, 75)")

        var sector = svg.append("path")
            .attr("fill", "none")
            .attr("class", "text5")
            .attr("stroke-width", 1)
            .attr("stroke", "darkgrey")
            .attr("transform", "translate(170, 280)")
            .attr("d", arc)
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text5")
            .text("Step 5")
            .attr("x", 180)
            .attr("y", 314)
            .attr("font-weight", "bold")
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text5")
            .text("All rows are")
            .attr("x", 180)
            .attr("y", 327)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        svg
            .append("text")
            .attr("class", "text5")
            .text("bound together")
            .attr("x", 180)
            .attr("y", 339)
            .attr("text-anchor", "left")
            .style("font-size", "11px")
            .attr("opacity", 0)

        var textGroup5 = svg
            .append("g")
            .attr("class", "textGroup5")

        svg.selectAll(".text5")
            .each(function() { 
                textGroup5.append(() => this) 
            });

        svg.selectAll("g.textGroup5")
            .attr("transform", "translate(490, 75)")
            
        
        svg.selectAll(".text5")
            .transition()
            .delay(1800)
            .duration(250)
            .attr("opacity", 1)

        }

        function moveSixth(){
            svg.selectAll(".text5")
                .transition()
                .delay(0)
                .duration(100)
                .attr("opacity", 0.2)
    
            svg.append("rect")
                .attr("class", "colname")
                .attr('x', 610)
                .attr('y', 95)
                .attr('width', squareWidth)
                .attr('height', squareHeight)
                .attr("fill", "#a3a3a3")
                .attr("stroke", "white")
                .attr("stroke-width", 3)
                .attr("opacity, 0")
    
                svg.append("rect")
                .attr("class", "colname")
                .attr('x', 650)
                .attr('y', 95)
                .attr('width', squareWidth)
                .attr('height', squareHeight)
                .attr("fill", "#a3a3a3")
                .attr("stroke", "white")
                .attr("stroke-width", 3)
                .attr("opacity, 0")
    
                svg.append("text")
                .attr("class", "colname")
                .text("key")
                .attr('x', 610 + squareWidth/2)
                .attr('y', 95 + squareHeight/2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("font-weight", "bold")
                .style("font-size", "12px")
                .attr("fill", "black")
                .attr("opacity, 0")
                
    
                svg.append("text")
                .attr("class", "colname")
                .text("vals")
                .attr('x', 650 + squareWidth/2)
                .attr('y', 95 + squareHeight/2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("font-weight", "bold")
                .style("font-size", "12px")
                .attr("fill", "black")
                .attr("opacity, 0")

                svg.selectAll(".colname")
                    .transition()
                    .delay(0)
                    .duration(500)
                    .attr("opacity", 1)

                var sector = svg.append("path")
                    .attr("fill", "none")
                    .attr("class", "text6")
                    .attr("stroke-width", 1)
                    .attr("stroke", "darkgrey")
                    .attr("transform", "translate(170, 340)")
                    .attr("d", arc2)
                    .attr("opacity", 0)
        
                svg
                    .append("text")
                    .attr("class", "text6")
                    .text("Step 6")
                    .attr("x", 180)
                    .attr("y", 314)
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "left")
                    .style("font-size", "12px")
                    .attr("opacity", 0)
        
                svg
                    .append("text")
                    .attr("class", "text6")
                    .text("Names are added")
                    .attr("x", 180)
                    .attr("y", 327)
                    .attr("text-anchor", "left")
                    .style("font-size", "11px")
                    .attr("opacity", 0)
        
                svg
                    .append("text")
                    .attr("class", "text6")
                    .text("to new columns")
                    .attr("x", 180)
                    .attr("y", 339)
                    .attr("text-anchor", "left")
                    .style("font-size", "11px")
                    .attr("opacity", 0)
        
                var textGroup6 = svg
                    .append("g")
                    .attr("class", "textGroup6")
        
                svg.selectAll(".text6")
                    .each(function() { 
                        textGroup6.append(() => this) 
                    });
        
                svg.selectAll("g.textGroup6")
                    .attr("transform", "translate(510, -255)")
                    
                
                svg.selectAll(".text6")
                    .transition()
                    .delay(700)
                    .duration(250)
                    .attr("opacity", 1)
    
                
                }

                function moveSeventh(){
                    svg.selectAll("g.stay, g.stay2")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)
        
                    svg.selectAll(".text1")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)
                    
                    svg.selectAll(".text2")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)
        
                    svg.selectAll(".text3")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)
        
                    svg.selectAll(".text4")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)
        
                    svg.selectAll(".text5")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .attr("opacity", 1)

                    svg.selectAll(".button")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .style("opacity", 0)

                    svg.selectAll(".textButton")
                        .transition()
                        .delay(0)
                        .duration(200)
                        .style("opacity", 0)
        
                    }

    var count = 0


    button
		.on('click', function() {

            if (count == 0) {
                moveFirst()
                count += 1 
            }
            else if (count == 1) {
                moveSecond()
                count += 1
            }
            else if (count == 2) {
                moveThird() 
                count += 1 
            }
            else if (count == 3) {
                moveFourth()
                count += 1
            }
            else if (count == 4){
                moveFifth()
                count += 1
            }
            else if (count == 5){
                moveSixth()
                count += 1
            }
            else {
                moveSeventh()
            }
		})