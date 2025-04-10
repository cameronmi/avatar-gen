(function(document) {
    var metas = document.getElementsByTagName('meta'),
        changeViewportContent = function(content) {
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == "viewport") {
                    metas[i].content = content;
                }
            }
        },
        initialize = function() {
            changeViewportContent("width=device-width, minimum-scale=1.0, maximum-scale=1.0");
        },
        gestureStart = function() {
            changeViewportContent("width=device-width, minimum-scale=0.25, maximum-scale=1.6");
        },
        gestureEnd = function() {
            initialize();
        };


    if (navigator.userAgent.match(/iPhone/i)) {
        initialize();

        document.addEventListener("touchstart", gestureStart, false);
        document.addEventListener("touchend", gestureEnd, false);
    }
    var urlDom = document.getElementById('inputURL');
    var nameCheckDom = document.getElementById('nameCheck');
    var nicknameDom = document.getElementById('inputNickname');
    var sizeDom = document.getElementById('inputSize');
    var radioCSSDom = document.getElementById('radioCSS');
    var radioJSDom = document.getElementById('radioJS');
    var outputDom = document.getElementById('output');
    var styleDom =  document.getElementById('customStyle');
    
    urlDom.onchange = onEdit;
    nameCheckDom.onchange = function (e) {
        if (e.target.checked) {
            nicknameDom.disabled = false;
        } else {
            nicknameDom.disabled = true;
        }
        onEdit();
    };
    nicknameDom.onchange = onEdit;
    sizeDom.onchange = onEdit;
    radioCSSDom.onchange = onEdit;
    radioJSDom.onchange = onEdit;

    function onEdit() {
        var size = sizeDom.valueAsNumber;
        var nickname = nicknameDom.value;

        var styles = `
.group\\/conversation-turn.agent-turn:before {
    content: " ";
    display: block;
    background-image: url("${urlDom.value}");
    background-size: ${size}px ${size}px;
    border-radius: ${size / 2}px;
    height: ${size}px;
    width: ${size}px;
}
.group\\/conversation-turn.agent-turn > div:nth-child(1):before {
    content: "${nameCheckDom.checked ? nickname : " "}";
    display: block;
    position: relative;
    left: ${size+10}px;
    top: ${nameCheckDom.checked ? -5: 0}px;
    font-weight: 500;
}
.group\\/conversation-turn.agent-turn > div:nth-child(1) {
    margin-top: ${nameCheckDom.checked ? -21: 0}px;
}
        `

        var jsCode = `var style=document.createElement('style');style.innerHTML='${styles.trim().replaceAll('\n', '').replace('\\', '\\\\')}';document.head.appendChild(style);`
        jsCode = `javascript:(function(){${jsCode}})()`;
        if (radioCSSDom.checked) {
            outputDom.getElementsByTagName('code')[0].innerText = styles;
        } else {
            outputDom.getElementsByTagName('code')[0].innerText = jsCode;
        }
        styleDom.innerHTML = styles;
        console.log(styles);
    };
})(document);

