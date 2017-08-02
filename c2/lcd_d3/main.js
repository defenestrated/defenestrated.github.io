'use strict'
var app = app || {}

app.parchment = d3.select("#frame")
  .append("svg")
  .attr("id", "parchment")
app.settings.grid = app.parchment.append("g")
  .attr("class", "grid hidden")

// app.settings.drawGrid()

app.settings.defs = app.parchment.append("svg:defs")


app.makerun = function(wrap_num, thisdata) {
  var self = this
  var wrapper_el = document.querySelector("g.run#runcount" + wrap_num)
  var vp = app.settings.viewports[wrap_num]
  var col = vp.columns[1]

  var mask_el = document.querySelector("#parchment #mask" + wrap_num)
  if (!!!mask_el) {
    app.settings.defs
      .append("svg:mask")
      .attr("id", () => { return "mask" + wrap_num})
      .attr("x", vp.offset)
      .attr("y", 0)
      .attr("width", vp.width)
      .attr("height", vp.height)
      .append("rect")
      .attr("x", vp.offset)
      .attr("y", 0)
      .attr("width", vp.width)
      .attr("height", vp.height)
      .style("fill", "white")
  }


  app.scenes.runs.runboxes[wrap_num] = (!!wrapper_el) ? d3.select(wrapper_el).data(thisdata)
    : app.scenes.current.container
    .append("g")
    .data(thisdata)
    .attr("class", "run")
    .attr("id", () => { return "runcount" + wrap_num })
    // .attr("mask", function() {return "url(#mask" + wrap_num + ")"})

  // var mask = (!!mask_el) ? d3.select(mask_el)
    // : d3.select(wrapper_el)
    // .insert("mask", ":first-child")
    // .attr("id", "mask" + wrap_num)
    // .append("rect")
    // .attr("x", 0)
    // .attr("y", 0)
    // .attr("width", vp.width)
    // .attr("height", vp.height)
  // .style("fill", "white")
  app.scenes.runs.runboxes[wrap_num].selectAll("text").remove()

  var t = app.scenes.runs.runboxes[wrap_num].selectAll("text")
      .data(d => d)

  t.enter().append("text")
    .each(function(d, i) {
      d3.select(this)
        .attr("class", (d) => {
          return "textline run" + wrap_num + " line" + i
        })
        .attr("x", function(d) {
          var tot = vp.offset + col.offset
          return tot
        })
        .attr("y", (d) => {
          return i*app.settings.fontsize * app.settings.leading + app.settings.fontsize + app.settings.margins
        })
        .text(d => d)
        .transition("starter")
        .delay((d) => { return i*100 + wrap_num*500 })
        .duration(100)
        .ease(t => d3.easePolyOut(t, 5.0))
        .style("opacity", 1)
        .style("font-size", app.settings.fontsize + "px")
        .on("end", function() {
          runFinished(this, wrap_num, true, function(num) {
            app.wiperun(num)
          })
        })
    })


  t.exit().remove()
}

app.wiperun = function(which) {
  var self = this
  var vp = app.settings.viewports[which]
  var col = vp.columns[1]

  var count = 0

  d3.select("g#runcount" + which).selectAll("text")
    .each(function(d, i) {
      var cmp = this
      var len = d.length*500
      d3.select(cmp)
        .transition("wiper")
        .duration(len)
        .ease(t => d3.easePolyIn(t, 5.0))
        .style("opacity", 0)
        .attr("x", (d) => {
          var pos = vp.offset + col.offset
          return pos + _.random(-vp.width, vp.width)
        })
        .on("end", function() {
          var justended = cmp
          var jcl = justended.classList
          // console.log(justended.classList + " ended ")
          runFinished(count, which, false, function(num) {
            var now_vacant = num
            var sampled = [_.sample(app.state.bank.cash)]
            // var pulled = _.pullAt(app.state.bank.cash, 0)
            app.makerun(now_vacant, sampled)
            // console.warn(now_vacant + "vacant")
            // })
          })

          count++
        })
    })



//   var runbox = document.querySelectorAll("g.run")
//   _(runbox).each((el, ix) => {
//     if (el.children.length === 0) console.log(el.id)
//   })
//   // console.log(!!runbox)
}
