var Chunk = class TextChunk {

  constructor() {
    this.rando = this.rando.bind(this)
    this.spitup = this.spitup.bind(this)
    this.init = this.init.bind(this)
    this.buffer = this.buffer.bind(this)
  }

  init() {
    this.rando("np")
    this.decay = (1 - this.thetext.length / longest) * speed
    this.life = 1
    console.log("new text init: " + this.thetext);
  }

  rando() {
    this.thetext = np[_.random(np.length)]
  }

  spitup() {
    return(this.thetext)
  }

  update() {
    // console.log(this.life);
    this.life = (this.life >= this.decay) ? this.life - this.decay : 0
  }

  buffer() {
    textFont(font).textSize(fontsize)
    var tw = textWidth(this.thetext)+2
    var lh = fontsize*1.2

    this.x = _.random(width-tw)
    this.y = _.random(height-lh)


    this.pg = createGraphics(tw, lh)
    this.pg.fill(255)
    this.pg.textFont(font)
    this.pg.textSize(fontsize)
    this.pg.text(this.thetext,0,fontsize)

    this.img = this.pg.get()
  }


}
