## 综述

CustomScrollbar
为了让夸平台滚动条视觉统一，也为了windows下的滚动条像MAC OS下那样优雅.

#### 版本:1.0.1
#### 作者:诗俊

## 初始化组件
		
    S.use('kg/custom-scrollbar/1.0.1/index', function (S,CustomScrollbar) {
        new CustomScrollbar({
        	ele: S.one('.custom-scrollbar'), //mouseHover:true  TODO
        	onMac: true
    	});
    })

## 属性说明

属性名 | 类型|只读|默认值|说明
------------ | -------------| -------------| -------------| -------------
ele | Nodelist|N|''| 目标元素
onMac | Boolean|N|true| MAC OS系统下是否开启 不开启使用系统默认