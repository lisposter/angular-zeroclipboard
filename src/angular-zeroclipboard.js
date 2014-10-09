angular.module('angular.zeroclipboard', []).
provider('uiZeroclipConfig', function() {
    // default configs
    var _zeroclipConfig = {
        buttonClass: '',
        swfPath: "ZeroClipboard.swf",
        trustedDomains: [window.location.host],
        cacheBust: true,
        forceHandCursor: false,
        zIndex: 999999999,
        debug: true,
        title: null,
        autoActivate: true,
        flashLoadTimeout: 30000,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active"
    };
    var _options = {
        buttonClass: '',
        buttonText: 'Copy',
        emitEvent: false
    };
    this.setZcConf = function(zcConf) {
        angular.extend(_zeroclipConfig, zcConf);
    };
    this.setOptions = function(options) {
        angular.extend(_options, options);
    };
    this.$get = function() {
        return {
            zeroclipConfig: _zeroclipConfig,
            options: _options
        }
    };
}).
directive('uiZeroclip', ['$document', '$window', 'uiZeroclipConfig',
    function($document, $window, uiZeroclipConfig) {
        var zeroclipConfig = uiZeroclipConfig.zeroclipConfig || {};
        var options = uiZeroclipConfig.options;
        var _id = 0;

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        return {
            priority: 10,
            link: function(scope, elm, attrs) {
                // config
                ZeroClipboard.config(zeroclipConfig);
                var btn = elm[0];
                if (!attrs.id) {
                    attrs.$set('id', 'uiZeroclip' + _id);
                    btn = document.createElement('button');
                    btn.appendChild(document.createTextNode(options.buttonText));
                    btn.setAttribute('data-clipboard-target', 'uiZeroclip' + _id);
                    btn.setAttribute('class', options.buttonClass);
                    _id++;
                    insertAfter(btn, elm[0]);
                }
                if (angular.isFunction(ZeroClipboard)) {
                    scope.client = new ZeroClipboard(btn);
                }
                var _events = ['load', 'mouseover', 'mouseout', 'mouseup', 'mousedown', 'complete', 'dataRequested', 'noflash', 'wrongflash'];
                _events.forEach(function(evt) {
                    if (options.emitEvent) {
                        scope.client.on(evt, function() {
                            scope.$emit('ZeroClipboard.' + evt);
                        });
                    } else {
                        scope.client.on(evt, options[evt]);
                    }
                })
            }
        }
    }
]);
