

function emotionsHtml() {
  if (_emotionsHtml == "") {
  var
    arrImg=["1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
    "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
    "33", "34", "35", "36", "37", "38", "40", "41", "42", "43", "44",
    "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55",
    "56", "57", "58", "59", "60", "61", "", "62", "63", "64", "65",
    "66", "67", "68", "69", "70", "71", "72", "001",  "002",  "003",
    "004",  "005",  "006",  "007",  "008",  "009",  "010",  "011",
    "012",  "013",  "014",  "015",  "016",  "017",  "018",  "019",
    "020",  "021",  "022",  "023",  "024",  "025",  "026",  "027",
    "028",  "029",  "030",  "031",  "032",  "033",  "034",  "035",
    "036",  "037",  "038",  "039",  "040",  "041",  "043",  "044",
    "045",  "046",  "047",  "048",  "049",  "050",  "051",  "052",
    "053",  "054",  "055",  "056",  "057",  "058",  "059",  "060",
    "061",  "062",  "063",  "064",  "065",  "066",  "067",  "068",
    "069",  "070",  "071",  "072",  "073",  "074",  "075",  "076",
    "077",  "078",  "079",  "080",  "081",  "082",  "083",  "084",
    "085",  "086",  "087",  "088",  "089",  "090",  "091",  "092",
    "093",  "094",  "095",  "096",  "097",  "098",  "100",  "101",
    "102",  "103",  "104",  "105",  "106",  "107",  "108",  "109",
    "110",  "111",  "112",  "", "200",  "201",  "202",  "203",  "204",
    "205",  "206",  "207",  "208",  "209",  "210",  "211",  "212",
    "213",  "214",  "215",  "216",  "217",  "218",  "219",  "220",
    "221",  "222",  "223",  "224",  "225",  "226",  "227",  "228",
    "229",  "230",  "231",  "232",  "233",  "234",  "235",  "236",
    "237",  "238",  "239",  "240",  "241",  "242",  "243",  "244",
    "245",  "246",  "247",  "248",  "249",  "250",  "251",  "252",
    "253",  "254",  "255",  "256",  "257",  "258",  "259",  "260",
    "261",  "262",  "263",  "264",  "265",  "266",  "267",  "268",
    "269",  "270",  "271",  "272",  "273",  "274",  "275",  "276",
    "277",  "278",  "279"];
    for (var i in arrImg) {
      s=arrImg[i];
      if (s=="") {
        _emotionsHtml += '<br>';

      }
      else
        _emotionsHtml += '<label for="lb'+s+'"><input id="lb'+s+'" type="radio" name="userface" value="'+s+'"> <img src="http://image1.beareyes.com.cn/joytlun/img/'+s+'.gif"></label>'
    }
    _emotionsHtml = '<div id="emotions">' + _emotionsHtml + '</div>';
  }
  return _emotionsHtml;
}

function showEmotions() {
  zk="KB95594Child";
  if(document.all(zk).style.visibility=="visible"){
    document.all(zk).style.visibility="hidden";
    document.all(zk).style.display="none";
  }else{
    document.all(zk).style.visibility="visible"
    document.all(zk).style.display="block";;
    if (document.all(zk).innerHTML.length < 10)
      document.all(zk).innerHTML=emotionsHtml();
  }
}

function addScript(js) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.textContent = js;
  document.body.appendChild(script);
}

function addCss(css, id) {
  var style = document.createElement('style');
  style.id = id;
  style.type = "text/css";
  style.textContent = css;
  document.body.appendChild(style);
}
  

chrome.storage.sync.get(init_options(), function(items) {
  console.log('chrome.storage.sync.get');
  

  //$("ul>img,ul>font>img").each(function(){
  //  if (!$(this)[0].complete) {
  //    console.log('stop:' + $(this).attr("src"));
  //    $(this).attr("data-src", $(this).attr("src"));
  //    $(this).attr("src","");
  //  }
  //});  
  
  //more emotions
  if (items.moreEmotions) {
    var a=$("form table tr td a[href='#here']");
    if (a.length>0) {
      a.html('<font onclick="showEmotions();">' + a.text() + '！</font>');
      addScript('var _emotionsHtml = "";\n' + emotionsHtml.toString() + '\n' + showEmotions.toString() + '\n');
    }
  }
    //img link
  if (items.imageFix) {
    var img=$("img[src^='http://bimg.beareyes.com.cn/123.php?url=']");
    img.each(function(){
      $(this).attr("src", $(this).attr("src").replace(/http.*\/123\.php\?url=/,""));
    });
  }
    //https link
  if (items.httpsLink) {
    var ul=$("body>ul");
    ul.each(function(){
      $(this).html($(this).html().replace(/(https:\/\/[^" '<>]+)/gm ,"<a href=\"$1\" target=\"_blank\">$1</a>"));
    });
  }
    //no head
  if (items.noHead) {
    var head=$("ul>li>a[href^='/cgi-bin/']");
    head.each(function(){
      if ($(this).text().trim()=="") {
        $(this).html($(this).prev()[0].outerHTML);
        $(this).prev().remove();
      }
    });
  }

  // image Show
  var imgCss="";
  if (items.imageShow!=='none') {
    imgCss += "max-width:" + items.imageShowX + ";max-height:" + items.imageShowY + ";";
  }

  if (items.imageShow!='click') {
    imgCss += "display:block;";
  }

  if (imgCss!="") {
    addCss('ul>img,ul>font>img,ul>a>img,ul>font>a>img{'+ imgCss +'}', 'imgCss');
  }

  console.log("items.imageShow:"+items.imageShow);
  if (items.imageShow=='click') {
    var img= $("ul>img,ul>font>img");
    img.each(function(){
      $(this).wrap("<div class=\"img-wrap img-hide\"></div>");
      var btn= $('<button class="btn btn-mini btn-primary" href="#"><i class="icon-resize-full icon-white"></i>图片</button>').insertBefore(this);
      btn.next().addClass('img-click');
      btn.bind('click', function(){
        $(this).toggleClass('btn-primary');
        $(this).find("i").toggleClass('icon-white').toggleClass('icon-resize-full').toggleClass('icon-resize-small');
        var next = $(this).next();
        if (next.attr("data-src")!="") {
          console.log('reload:' + next.attr("data-src"));
          next.attr("src", next.attr("data-src"))
          next.attr("data-src", "");
        }
        $(this).parent().toggleClass('img-hide');
      });
      $(this).next().bind('click', function(){
        $(this).toggleClass('img-full');
      });
    });

/*
    var btn= $('<button class="btn btn-mini btn-primary" href="#"><i class="icon-resize-full icon-white"></i>图片</button>').insertBefore( "ul>img,ul>font>img" );
    btn.each(function(){
      $(this).next().addClass('img-click');
      $(this).bind('click', function(){
        $(this).toggleClass('btn-primary');
        $(this).find("i").toggleClass('icon-white').toggleClass('icon-resize-full').toggleClass('icon-resize-small');
        var next = $(this).next();
        if (next.attr("data-src")!="") {
          console.log('reload:' + next.attr("data-src"));
          next.attr("src", next.attr("data-src"))
          next.attr("data-src", "");
        }

        next.toggleClass('show');
      });
      $(this).next().bind('click', function(){
        $(this).toggleClass('img-full');
      });
    });
*/

    var aimg= $("ul>a>img,ul>font>a>img");
    aimg.each(function(){
      $(this).parent().wrap("<div class=\"img-wrap img-hide\"></div>");
      var btn= $('<button class="btn btn-mini btn-primary" href="#"><i class="icon-resize-full icon-white"></i>图片</button>').insertBefore($(this).parent()[0]);
      console.log(btn);
      btn.bind('click', function(){
        $(this).toggleClass('btn-primary');
        $(this).find("i").toggleClass('icon-white').toggleClass('icon-resize-full').toggleClass('icon-resize-small');
        $(this).parent().toggleClass('img-hide');
      });
    });
  }
  else if (items.imageShow=='thumbnail') {
    var img=$( "ul>img,ul>font>img" );
    img.each(function(){
      $(this).addClass('img-click');
      $(this).bind('click', function(){
        $(this).toggleClass('img-full');
      });
    });
  }

});
//});



document.addEventListener('DOMContentLoaded',function(){
    console.log('DOMContentLoaded');

    console.log( chrome.runtime   );
});  

