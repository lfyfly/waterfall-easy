    import WaterfallEasy from './WaterfallEasy/WaterfallEasy.js'

    var waterfallCardsContainerEl = document.querySelector('.waterfall-cards-container')
    function insertCards(num, waterfallCardsContainerEl) {
      waterfallCardsContainerEl.innerHTML += generateCardsEls(generateCardsData(num))
    }
    insertCards(10, waterfallCardsContainerEl)
    // 布局

    var waterfallEasy = new WaterfallEasy({
      scollToLoadCb: function () {
        console.log('滚动触底了')
        insertCards(10, waterfallCardsContainerEl)
        waterfallEasy.reWaterfall()
      }
    })
    console.log(waterfallEasy)
    setTimeout(function () {
      waterfallEasy.stopLoad()
      setTimeout(function () {
        waterfallEasy.scollToLoad()
      }, 3000)
    }, 3000)



    function generateCardsEls(cardsData) {
      return cardsData.map(function (cardItem, i) {
        var cardStyleStr = cardItem.height ? 'height:' + cardItem.height + 'px;' : ''
        return '<div class="waterfall-card" style="' + cardStyleStr + '">第' + '张</div>'
      }).join('')
    }

    function generateCardsData(num) {
      var minHeight = 200
      var maxHeight = 400
      var cardsData = []
      for (var i = 0; i < num; i++) {
        let randomHeight = minHeight + parseInt(Math.random() * (maxHeight - minHeight))
        cardsData.push({ height: randomHeight })
      }
      return cardsData
    }
