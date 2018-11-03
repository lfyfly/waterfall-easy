var l = console.log
class WaterfallEasy {
  constructor(options = {}) {
    var defaultOptions = {
      scrollContainerEl: '.waterfall-scroll-container',
      cardsContainerEl: '.waterfall-cards-container',
      cardClassName: '.waterfall-card'
    }
    this.options = { ...defaultOptions, ...options }
    var { scrollContainerEl, cardsContainerEl, cardClassName } = this.options
    // els
    this.scrollContainerEl = typeof scrollContainerEl === 'string' ? document.querySelector(scrollContainerEl) : scrollContainerEl
    this.cardsContainerEl = typeof cardsContainerEl === 'string' ? document.querySelector(cardsContainerEl) : cardsContainerEl
    this.cardEls = document.querySelectorAll(cardClassName)
    if (this.cardEls.length < 1) throw 'no cards'

    this.cardWidth = this.cardEls[0].offsetWidth

    this.cols = NaN
    this.colsHeightArr = []
    this.startCardIndex = 0
    this.init()
  }
  init() {
    this.initCols()
    this.colsHeightArr = []
    this.startCardIndex = 0
    this.waterfall()
    this.bindEvent()
  }
  initCols() {
    this.cols = parseInt(window.innerWidth / this.cardWidth)
    this.cardsContainerEl.style.width = this.cols * this.cardWidth + 'px'
  }
  waterfall() {
    // 第一列 
    var cardEls = this.cardEls
    var cols = this.cols
    // 第一列排列
    if (this.startCardIndex === 0) {
      for (var i = 0; i < this.cols; i++) {
        cardEls[i].style.top = 0
        cardEls[i].style.left = this.cardWidth * i + 'px'
        this.colsHeightArr.push(cardEls[i].offsetHeight)

      }
      this.startCardIndex = this.cols
    }
    // 后续排列
    for (var i = this.startCardIndex; i < cardEls.length; i++) {
      var minHeight = Math.min.apply(null, this.colsHeightArr)
      var minColIndex = this.colsHeightArr.indexOf(minHeight)
      cardEls[i].style.top = minHeight + 'px'
      cardEls[i].style.left = this.cardWidth * minColIndex + 'px'
      this.colsHeightArr[minColIndex] = minHeight + cardEls[i].offsetHeight
    }
    var maxHeight = Math.max.apply(null, this.colsHeightArr)
    this.cardsContainerEl.style.height = maxHeight +'px'
  }
  reWaterfall() {
    this.reset()
    this.waterfall()
  }
  reset() {
    this.cardEls = document.querySelectorAll(this.options.cardClassName)
    this.colsHeightArr = []
    this.startCardIndex = 0
  }
  bindEvent() {
    this.resizeToRewaterfall()
    this.scollToLoad()
  }
  resizeToRewaterfall() {
    window.addEventListener('resize', () => {
      this.initCols()
      this.reWaterfall(this)
    })
  }
  scollToLoad(laodmore) {
    console.log('start scroll load')
    this.scrollContainerEl.onscroll= () => {
      var scrollTop = this.scrollContainerEl.scrollTop
      var maxHeight = Math.max.apply(null, this.colsHeightArr)
      var dis = 40
      if (maxHeight - scrollTop - this.scrollContainerEl.offsetHeight < dis) {
        this.options.scollToLoadCb && this.options.scollToLoadCb()
      }
    }
  }
  stopLoad(){
    console.log('stop scroll load')
    this.scrollContainerEl.onscroll = null
  }
}