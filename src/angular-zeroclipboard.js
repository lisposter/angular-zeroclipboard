angular.module('angular.zeroclipboard', []).provider('uiZeroclipConfig', function() {
    this.zeroclipConfig = {
        buttonClass: '',
        moviePath: "../bower_components/zeroclipboard/ZeroClipboard.swf",
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
    this.options = {
        buttonClass: '',
        buttonText: 'Copy',
        load: null,
        mouseover: null,
        mouseout: null,
        mousedown: null,
        mouseup: null,
        complete: null,
        noflash: null,
        wrongflash: null,
        dataRequested: null
    };
    this.$get = ['$rootScope',
        function($rootScope) {
            return {
                zeroclipConfig: this.zeroclipConfig,
                options: this.options
            }
        }
    ];
}).
directive('uiZeroclip', ['$document', '$window', 'uiZeroclipConfig',
    function($document, $window, uiZeroclipConfig) {
        var zeroclipConfig = uiZeroclipConfig.zeroclipConfig || {};
        var options = uiZeroclipConfig.options;
        var copyBtns = [];
        var _id = 0;

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        return {
            priority: 10,
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                // config
                ZeroClipboard.config(zeroclipConfig);
                if (!attrs.id) {
                    attrs.$set('id', 'uiZeroclip' + _id);
                    var btn = document.createElement('button');
                    btn.appendChild(document.createTextNode(options.buttonText));
                    btn.setAttribute('data-clipboard-target', 'uiZeroclip' + _id);
                    _id++;
                    insertAfter(btn, elm[0]);
                    copyBtns.push(btn);
                }
                if (angular.isFunction(ZeroClipboard)) {
                    scope.client = new ZeroClipboard(copyBtns);
                }
                scope.client.on('load', options.load);
                scope.client.on('mouseover', options.mouseover);
                scope.client.on('mouseout', options.mouseout);
                scope.client.on('mouseup', options.mouseup);
                scope.client.on('mousedown', options.mousedown);
                scope.client.on('complete', options.complete);
                scope.client.on('dataRequested', options.dataRequested);
                scope.client.on('noflash', options.noflash);
                scope.client.on('wrongflash', options.wrongflash);
            }
        }
    }
]);