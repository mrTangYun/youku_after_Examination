!function () {
    var isRelease = true;
    window.onload = function () {
        window.viewportUnitsBuggyfill && window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
        // 曝光事件
        window.HollywoodLog && window.HollywoodLog.expose('homepage.loaded', '首页.加载完毕', '');
        window.passiveShare('');
    };
    window.HollywoodConfig = {
        actid: '20180608gaokao',
        actpage: 'main_page',
        // 自行设定全局唤端方案的接口，可以在不改变url中call_type的，修改代码的情况下实现对某些情况的唤端类型的修改。
        // 比如，uc在投放时url地址设定的call_type是3，此时需要将uc唤端更改为2：
        // 1 2 3 4，灵活设置全局的跳转方案，具体方案含义见下面跳转方案部分。
        setGlobalCallType: function () {
            if (window.HollywoodBrowser.isUC) {
                return 2;
            }
        },
        // 是否开启错误监控，默认关闭
        enableErrorMonitor: false,
        // 默认情况下，安卓用sheme的方式唤端，唤端失败无任何响应，通过该方法可以对唤端后的操作进行干预。
        // 设定该方法后，唤端后不管是否唤端成功均会延迟100ms执行该方法。
        // 该方法接受参数为一个http地址，可自行决定是否在唤端后同时跳转到该http地址。
        onAndroidAfterJump: function (url) { },
        // IOS默认用universiallink的方式唤端，唤端失败跳下载页。 
        // 设定该方法后，IOS也会使用scheme的方式唤端，不管是否唤端成功均会延迟100ms执行该方法。
        // 该方法接受参数为一个http地址，可自行决定是否在唤端后同时跳转到该http地址。
        onIOSAfterJump: function (url) { }
    };
    // 测试taskId: 2018-gaokao-test
    // 线上taskId: 2018-gaokao
    // 分享图片里面的二维码的url请追加sharekey参数: 
    // 测试：57e88e655d1d438c9953baa8c7ac964a5
    // 线上：bca46993a8395f89974e46fc2722faab5
    var TASK_ID = function () {
        // TODO: 上线时一定要切换到正式版
        return isRelease ? '2018-gaokao' : '2018-gaokao-test';
    }();
    var ENV = function () {
        var env = {
            daily: {
                prefix: 'daily-acs',
                appKey: '4272'
            },
            pre: {
                prefix: 'pre-acs',
                appKey: '24679788'
            },
            acs: {
                prefix: 'acs',
                appKey: '24679788'
            }
        };
        var param = url_params_decode(location.hash) || {};
        return env[param.env] || env['acs'];
    }();

    document.addEventListener('ShareResultCallback', function (e) {
        console.log('分享回调', JSON.stringify(e.param));
        switch (e.param.callbackresult) {
            case 1:
                console.log('分享成功');
                break;
            case 2:
                console.log('取消分享');
                break;
            case 0:
                console.log('分享失败');
                break;
        }
    });
    var titleArray = [
        '惊了！高考之后玩儿这么大？',
        '现在高考后的狂欢，你不懂！',
        '考前一本正经，考后欢脱放浪',
        '同学说考完嗨一下，然后看到了这一幕…...'
    ];
    var shareTitle = titleArray[Math.floor(Math.random() * titleArray.length)], shareLink = window.location.href, thumbnailUrl = 'https://g.alicdn.com/ku/gaokao/static/images/share.jpg';
    function share(imgResultFinal) {
        if (navigator.userAgent.indexOf('Youku/') < 0) {
            return;
        }
        var params = {
            taskId: TASK_ID,
            sourceId: 10,
            outputType: 1,
            url: shareLink,
            titleText: shareTitle,
            descText: '在这里，放肆嗨！',
            thumbnailUrl: thumbnailUrl
        };
        if (imgResultFinal) {
            params.webImageDownloadUrl = imgResultFinal;
            params.outputType = 3;
        }
        WindVane.call('WVBehavioursBridge', 'showShareView', params, function (e) {
            console.log('唤起分享控件成功', JSON.stringify(e));
        }, function (e) {
            if (!isRelease) {
                document.write('唤起分享控件失败: ' + JSON.stringify(e, null, 4));
            }
            alert('分享未成功，请重试！');
            console.log('唤起分享控件失败', JSON.stringify(e));
        });
    }
    function passiveShare(imgResultFinal) {
        if (navigator.userAgent.indexOf('Youku/') > -1) {
            var params = {
                taskId: TASK_ID,
                sourceId: 10,
                outputType: 1,
                url: shareLink,
                titleText: shareTitle,
                descText: '在这里，放肆嗨！',
                thumbnailUrl: thumbnailUrl
            };
            if (imgResultFinal) {
                params.webImageDownloadUrl = imgResultFinal;
                params.outputType = 3;
            }
            WindVane.call('DYKBaseJSBridge', 'passShareInfoToNative', params, function (e) {
                console.log('唤起分享控件成功', JSON.stringify(e));
            }, function (e) {
                if (!isRelease) {
                    document.write('唤起分享控件失败2: ' + JSON.stringify(e, null, 4));
                }
                alert('分享未成功，请重试！');
                console.log('唤起分享控件失败', JSON.stringify(e));
            });
        }
        if (!imgResultFinal) {
            try {
                window.shareH5 && window.shareH5({
                    title: shareTitle,
                    timelineTitle: shareTitle,
                    desc: '在这里，放肆嗨！',
                    link: shareLink,
                    shareImage: thumbnailUrl
                });
            }
            catch (err) { }
        }
    }
    // 上传图片
    function uploadImg(imgBase64, resovle, reject) {
        // var _imgBase64 = testImg;
        var _imgBase64 = imgBase64;
        var promise = mtopUploadImg(_imgBase64);
        promise.then(function (res) {
            if (res.retType) {
                if (!isRelease) {
                    document.write('上传失败1: ' + JSON.stringify(res, null, 4));
                }
                console.log('err:', JSON.stringify(res.ret));
                reject && reject(res);
                return;
            }
            if (res.data.status) {
                if (!isRelease) {
                    document.write('上传失败2: ' + JSON.stringify(res, null, 4));
                }
                console.log('err:', JSON.stringify(res.data.errInfo));
                reject && reject(res);
                return;
            }
            resovle && resovle(res.data.data.content);
        }, function (res) {
            if (!isRelease) {
                document.write('上传失败: ' + JSON.stringify(res, null, 4));
            }
            reject && reject(res);
        });
    }

    function mtopUploadImg(imgBase64) {
        lib.mtop.config.prefix = ENV.prefix;
        lib.mtop.config.subDomain = '';
        lib.mtop.config.mainDomain = 'youku.com';
        var promise = lib.mtop.request({
            appKey: ENV.appKey,
            api: 'mtop.com.youku.aplatform.weakGet',
            v: '1.0',
            ecode: 0,
            type: 'post',
            dataType: 'jsonp',
            timeout: 20000,
            data: {
                bizType: 'OSS.upload',
                bizParam: JSON.stringify({
                    taskId: TASK_ID,
                    name: '2018-gaokao/' + Math.random().toString(16).substr(2) + '_' + Math.floor(Math.random() * 1e9) + '_' + new Date().getTime() + '.jpg',
                    content: imgBase64
                })
            }
        });
        return promise;
    }

    function url_params_decode(str) {
        if (str) {
            var arr = (/^[?#]/.test(str) ? str.substr(1) : str).split("&");
            if (arr.length) {
                var obj = {};
                for (var i = arr.length; i;) {
                    var a = arr[--i].split("=");
                    var v = decodeURIComponent(a[1]);
                    if (/^[+-]?\d*\.?\d+(e|e\+\d+)?$/g.test(v)) {
                        v = parseFloat(v);
                    }
                    obj[a[0]] = v;
                }
                return obj;
            }
        }
        return null;
    }

    window.uploadImg = uploadImg;
    window.share = share;
    window.passiveShare = passiveShare;
}();
