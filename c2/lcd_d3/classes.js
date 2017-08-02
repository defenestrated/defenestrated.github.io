'use strict'

var Chunk = class TextChunk {

  constructor() {
    this.init = this.init.bind(this)
    this.spitup = this.spitup.bind(this)
    this.update = this.update.bind(this)
    this.buffer = this.buffer.bind(this)
    this.placeRunByColumn = this.placeRunByColumn.bind(this)
    this.placeRandomByViewport = this.placeRandomByViewport.bind(this)
    this.getContent = this.getContent.bind(this)
    this.wipe = this.wipe.bind(this)

    // _.bindAll(this, [
    //   "init",
    //   "spitup",
    //   "update",
    //   "buffer",
    //   "placeRunByColumn",
    //   "placeRandomByViewport",
    //   "getContent",
    //   "wipe"
    // ])

  }

  init() {
    var self = this
    // console.log(self)

    self.text = {
      content: self.getContent(),
      lineheight: app.fontsize*1.2
    }

    switch (app.scenes.current.name) {
    case "randomsplatter":
      self.decay = (1 - Math.pow(self.text.content.length / (app.bank.meta.longest+1), 3)) * speed
      self.life = 1
      break
    case "test":
      self.life = 1
      self.decay = 0.1
      self.ticker = 0
      break
    case "runs":
      self.life = 1
      self.decay = 0.98
      self.ticker = 0
      break
    }
    return self
  }

  spitup() {
    return(this.text.content)
  }

  update() {
    var self = this
    // console.log(self.life);
    switch (app.scenes.current.name) {
    case "randomsplatter":
      self.life = (self.life >= self.decay) ? self.life - self.decay : 0
      break
    case "runs":
      self.life = (self.life >= 0.001) ? 1-Math.pow(self.ticker, 5) : 0
      self.ticker += self.speed
      break
    case "test":
      self.life = (self.life >= 0.1) ? self.life - 0.1 : 0
      // if (self.life >= 0.001) {
      //   self.life = 1-Math.pow(self.ticker, 5)
      //   self.ticker += 0.01
      // }
      // else {
      //   self.life = 0
      // //   delete self.ticker
      // }
      break
    }

  }

  buffer() {
    var self = this
    // console.log(this);
    // console.log("buffering", this.text.content);

    if (app.scenes.current.boxtext) {
      self.boxw = viewports[0].columns[0].width - margins
      self.boxh = viewports[0].columns[0].height - margins
    }


    // >>> move these into pg render, then use texture
    // textFont(font).textSize(app.fontsize)
    self.text.linewidth = app.p5_ctx.textWidth(self.text.content)+2

    self.text.lineheight = app.fontsize*1.2

    self.pg = (app.scenes.current.boxtext) ?
      app.p5_ctx.createGraphics(self.boxw, self.boxh)
      : app.p5_ctx.createGraphics(self.text.linewidth, self.text.lineheight)

    self.pg.fill(255)
    self.pg.textFont(app.settings.font)
    self.pg.textSize(app.fontsize)

    if (app.scenes.current.boxtext) self.pg.text(self.text.content,0,app.fontsize, self.boxw, self.boxh)
    else self.pg.text(self.text.content,0,app.fontsize)
    // self.pg.noFill();
    // self.pg.stroke(0,0,255);
    // self.pg.rect(0,0,self.boxw,self.boxh)

    // self.img = self.pg.get()
    // }

    // else {
    // self.pg = createGraphics(100,100)
    // }

    return self
  }

  placeRunByColumn(colnum) {
    // floor(x / column count)
  }

  placeRandomByViewport(which) {
    var self = this
    var vp = which
    // console.log(vp);
    // console.log("viewport w / off", vp.width, vp.offset);
    // console.log(vp.height-self.text.lineheight);

    self.x = vp.offset + _.sample(vp.columns).offset + app.settings.margins/2
    self.y = _.random(vp.height-self.text.lineheight)

    self.tw = vp.columns[0].width - app.settings.margins
    self.th = vp.columns[0].height



    // console.log(self.x, self.y);
    return self
  }

  getContent() {
    switch(app.scenes.current.name) {
    case "test":
      return _.sample(app.bank.cash)
    case "randomsplatter":
      return _.sample(app.bank.cash)
    case "runs":
      // index ++
      return app.bank.cash[index]
    }
  }


  wipe() {
    var self = this
    // console.log(self)
    self.el = self.pg.elt
    // console.log(el.parentNode)
    self.pg.elt.parentNode.removeChild(self.el)

    // this will kill all canvases but the main one:
    // var cvs = document.getElementsByTagName('canvas');
    // var cv = _.filter(cvs, function(c) {return !!!c.id})
    // _(cv).each(c => {
	  //   document.body.removeChild(c)
    // })

    self.pg.remove()
    // var keys = _.keys(self)
    // _(keys).each(function(k) {
      // console.log(self)
      // console.log(k)
      // if (typeof k !== undefined && k != "wipe") delete self[k]
    // })
    // delete self.wipe
    return true
  }

}

// END OF TEXTCHUNK CLASS



var ViewPort = class ViewPort {
  constructor(width, height, offset, number) {
    this.width = width
    this.height = height
    this.offset = offset
    this.number = number
    this.columnify = this.columnify.bind(this)
    this.draw = this.draw.bind(this)
  }

  columnify(num) {
    var vp = this
    vp.columns = []
    _(num).times((i) => {
      var c = {
        width: vp.width/num,
        height: vp.height,
        offset: vp.width/num * i,
        draw: function() {
          var col = this
          d3.select(".viewport_" + vp.number)
              .append("rect")
            .attr("class", "column")
            .attr("id", "col_"+i)
              .attr("x", vp.offset + col.offset)
              .attr("y", 0)
              .attr("width", col.width)
              .attr("height", col.height)
          // stroke(255,127)
          // line(vp.offset+this.offset, 0, vp.offset+this.offset, vp.height)
        }
      }
      vp.columns.push(c)
    })
  }

  draw() {
    var self = this
    d3.select(".grid")
        .insert("g", ":first-child")
        .attr("class", "viewport_" + self.number)
        .append("rect")
        .attr("x", self.offset+2)
        .attr("y", 2)
        .attr("width", self.width-4)
        .attr("height", self.height-4)
  }

}
