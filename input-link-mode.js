// input-link-mode.js v1.0.2
// more on https://github.com/haggen/input-link-mode
;(function(root) {
  function setLinkMode(input) {
    input.classList.add('link-mode');
    input.linkMode.isActive = true;
  }

  function unsetLinkMode(input) {
    input.classList.remove('link-mode');
    input.linkMode.isActive = false;
  }

  function setupLinkMode(input) {
    input.linkMode = {};

    var onInputMouseEnter = function onInputMouseEnter(e) {
      input.linkMode.hasMouseOver = true;
      if (e.ctrlKey || e.metaKey) {
        setLinkMode(input);
      }
    };

    var onInputMouseOut = function onInputMouseOut(e) {
      input.linkMode.hasMouseOver = false;
      if (input.linkMode.isActive) {
        unsetLinkMode(input);
      }
    };

    var preventDefaultInLinkMode = function preventDefaultInLinkMode(e) {
      if (input.linkMode.isActive) {
        e.preventDefault();
      }
    };

    var onInputClick = function onInputClick(e) {
      if (input.linkMode.isActive) {
        var url = input.value;
        if (url.indexOf('http') !== 0) url = 'http://' + url;
        window.open(url, '_blank');
      }
    };

    var onDocumentKeyDown = function onDocumentKeyDown(e) {
      if (input.linkMode.hasMouseOver && (e.ctrlKey || e.metaKey)) {
        setLinkMode(input);
      }
    };

    var onDocumentKeyUp = function onDocumentKeyUp(e) {
      if (input.linkMode.isActive) {
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

    input.linkMode.remove = function() {
      delete input.linkMode;
      input.removeEventListener('mouseenter', onInputMouseEnter);
      input.removeEventListener('mouseout', onInputMouseOut);
      input.removeEventListener('click', onInputClick);
      input.removeEventListener('mousedown', preventDefaultInLinkMode);
      input.removeEventListener('mouseup', preventDefaultInLinkMode);
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('keyup', onDocumentKeyUp);
    };
  }

  root.removeLinkMode = function removeLinkMode(input) {
    if (!input.linkMode) return;
    input.linkMode.remove();
  };

  root.setupLinkMode = setupLinkMode;
})(this);
