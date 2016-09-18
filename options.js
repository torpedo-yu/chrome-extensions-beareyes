function get_options() {
  var items={};
  items.moreEmotions = getCheck('moreEmotions');
  items.imageFix     = getCheck('imageFix');
  items.httpsLink    = getCheck('httpsLink');
  items.noHead       = getCheck('noHead');
  items.urlBlock     = getCheck('urlBlock');
  items.urlBlockList = getText('urlBlockList');
  items.imageShow    = getSelect('imageShow');
  items.imageShowX   = getText('imageShowX');
  items.imageShowY   = getText('imageShowY');
  items.imageLink    = getSelect('imageLink');
  items.imageLinkX   = getText('imageLinkX');
  items.imageLinkY   = getText('imageLinkY');
  items.videoLink    = getSelect('videoLink');
  items.videoLinkX   = getText('videoLinkX');
  items.videoLinkY   = getText('videoLinkY');
  return items;
}

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set(get_options(), function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '保存成功！';
    chrome.runtime.reload();
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function set_options(items) {
  setCheck('moreEmotions', items.moreEmotions);
  setCheck('imageFix'    , items.imageFix    );
  setCheck('httpsLink'   , items.httpsLink   );
  setCheck('noHead'      , items.noHead      );
  setCheck('urlBlock'    , items.urlBlock    );
  setText('urlBlockList' , items.urlBlockList);
  setSelect('imageShow'  , items.imageShow   );
  setText('imageShowX'   , items.imageShowX  );
  setText('imageShowY'   , items.imageShowY  );
  setSelect('imageLink'  , items.imageLink   );
  setText('imageLinkX'   , items.imageLinkX  );
  setText('imageLinkY'   , items.imageLinkY  );
  setSelect('videoLink'  , items.videoLink   );
  setText('videoLinkX'   , items.videoLinkX  );
  setText('videoLinkY'   , items.videoLinkY  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(callback) {
  chrome.storage.sync.get(init_options(), function(items) {
   setCheck('moreEmotions', items.moreEmotions);
   setCheck('imageFix'    , items.imageFix    );
   setCheck('httpsLink'   , items.httpsLink   );
   setCheck('noHead'      , items.noHead      );
   setCheck('urlBlock'    , items.urlBlock    );
   setText('urlBlockList' , items.urlBlockList);
   setSelect('imageShow'  , items.imageShow   );
   setText('imageShowX'   , items.imageShowX  );
   setText('imageShowY'   , items.imageShowY  );
   setSelect('imageLink'  , items.imageLink   );
   setText('imageLinkX'   , items.imageLinkX  );
   setText('imageLinkY'   , items.imageLinkY  );
   setSelect('videoLink'  , items.videoLink   );
   setText('videoLinkX'   , items.videoLinkX  );
   setText('videoLinkY'   , items.videoLinkY  );
   callback();
  });
}


function getCheck(id) {
  return $('#'+id)[0].checked;
}

function setCheck(id, val) {
  $('#'+id)[0].checked = val;
}

function getSelect(id) {
  return $('#'+id).val();
}

function setSelect(id, val) {
  $('#'+id).val(val);
}

function getText(id) {
  return $('#'+id).val();
}

function setText(id, val) {
  $('#'+id).val(val);
}

function init() {
  restore_options(function(){
    urlBlock();  
    imageShow();  
    imageLink();  
    videoLink();    
  });
}

function resetOptions() {
  set_options(init_options());
}

function saveOptions() {
  save_options();
}

function closeWindow() {
    window.close();
}

function urlBlock() {
  $("#urlBlockDiv").toggleClass("hide", !$("#urlBlock").is(':checked'));
}

function imageShow() {
  $("#imageShowDiv").toggleClass("hide", $("#imageShow").val()=="none");
}

function imageLink() {
  $("#imageLinkDiv").toggleClass("hide", $("#imageLink").val()=="none");
}

function videoLink() {
  $("#videoLinkDiv").toggleClass("hide", $("#videoLink").val()=="none");
}

document.addEventListener('DOMContentLoaded', init);

$(document).ready(function(){
  $("#closeWindow").click(closeWindow);
  $("#saveOptions").click(saveOptions);
  $("#resetOptions").click(resetOptions);
  $("#urlBlock").click(urlBlock);  
  $("#imageShow").change(imageShow);  
  $("#imageLink").change(imageLink);  
  $("#videoLink").change(videoLink);  
 
  
});