Flv 地址寻找器
=========

用于记录在线视频网站的视频源真实链接，for jnu 网络维护小组

##安装

1. 下载扩展Crx文件：[从Github下载](http://horsley.github.com/flv-hunter/flv-hunter.crx)，*注意*请勿直接点击链接否则Chrome会提示不允许安装
请通过右键链接另存为等方式下载
2. 从Chrome工具菜单打开扩展程序设置(chrome://extensions/)
3. 把下载到的Crx文件拖放到扩展程序页面中，会出现安装授权提示，允许后即安装成功

*注意*：双击下载回来的Crx文件打开的话会同样会提示不允许安装，因为Chrome默认不允许从Chrome Web Store之外的第三方安装浏览器扩展

##使用
浏览视频播放页面，视频加载开始后，点击浏览器栏的FLV URL按钮，可以打开记录页面，里面按照时间倒序列出记录里面的所有flv地址

##原理
跟踪chrome浏览器的webRequest，通过HTTP响应头的content-type字段识别flv的mime，如果匹配则记录下来

##已知问题
有一些在线视频网站使用私有的视频格式或者mime类型，例如新浪视频为hlv，mime为普通二进制流

##TODO
清空列表功能，特殊网站的特殊处理