// input-link-mode.js v1.0.0
// more on https://github.com/haggen/input-link-mode
;(function(root) {
  function setLinkMode(input) {
    input.classList.add('link-mode');
    input.isLinkMode = true;
  }

  function unsetLinkMode(input) {
    input.classList.remove('link-mode');
    input.isLinkMode = false;
  }

  function setupLinkMode(input) {
    var onInputMouseEnter = function onInputMouseEnter(e) {
      input.hasMouseOver = true;
      if (e.ctrlKey || e.metaKey) {
        setLinkMode(input);
      }
    };
    
    var onInputMouseOut = function onInputMouseOut(e) {
      input.hasMouseOver = false;
      if (input.isLinkMode) {
        unsetLinkMode(input);
      }
    };
    
    var preventDefaultInLinkMode = function preventDefaultInLinkMode(e) {
      if (input.isLinkMode) {
        e.preventDefault();
      }
    };
    
    var onInputClick = function onInputClick(e) {
      if (input.isLinkMode) {
        var url = input.value;
        if (url.indexOf('http') !== 0) url = 'http://' + url;
        window.open(url, '_blank');
      }
    };
    
    var onDocumentKeyDown = function onDocumentKeyDown(e) {
      if (input.hasMouseOver && (e.ctrlKey || e.metaKey)) {
        setLinkMode(input);
      }
    };
    
    var onDocumentKeyUp = function onDocumentKeyUp(e) {
      if (input.isLinkMode) {
        unsetLinkMode(input);
      }
    };

    input.addEventListener('mouseenter', onInputMouseEnter);
    input.addEventListener('mouseout', onInputMouseOut);
    input.addEventListener('click', onInputClick);
    input.addEventListener('mousedown', preventDefaultInLinkMode);
    input.addEventListener('mouseup', preventDefaultInLinkMode);
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('keyup', onDocumentKeyUp);

    input.removeLinkMode = function removeLinkMode() {
      input.addEventListener('mouseenter', onInputMouseEnter);
      input.addEventListener('mouseout', onInputMouseOut);
      input.addEventListener('click', onInputClick);
      input.addEventListener('mousedown', preventDefaultInLinkMode);
      input.addEventListener('mouseup', preventDefaultInLinkMode);
      document.addEventListener('keydown', onDocumentKeyDown);
      document.addEventListener('keyup', onDocumentKeyUp);
    };
  }

  root.removeLinkMode = function removeLinkMode(input) {
    input.removeLinkMode();
  };

  root.setupLinkMode = setupLinkMode;
})(this);
