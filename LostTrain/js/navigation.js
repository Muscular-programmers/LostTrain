/**
 * Created by junge on 2018/3/28.
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function getStyle(obj,attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
}

/*当前页面的导航条高亮*/
var linkText;
function highlightPage(){
    var link = $('header nav li');
    var links = $('header nav a');
    var article = $('article');
    var linkurl;
    for(var i = 0;i < links.length;i ++){
        linkurl = links[i].href;
        if(window.location.href.indexOf(linkurl) != -1){
            $(links[i]).addClass('here');
            linkText = links[i].innerHTML.toLowerCase();
            document.body.id = linkText;
        }
    }
}

/*每个页面不同背景图片*/
function backgorund(){
    $('body header').css({
        backgroundImage:'url(img/'+linkText+'bg.jpg)'
    });
}

/*指示导航链接的小图片*/
function indicate(){
    var links = $('header nav a');
    var article = $('article');
    var img = document.createElement('img');
    img.alt = 'Lost Train!';
    img.id = 'indicate';
    img.src = 'img/'+linkText+'bg.jpg';
    article.prepend(img);

    for(var i = 0;i < links.length;i ++){
        links[i].onmousemove=function (){
            var url = this.innerHTML.toLocaleLowerCase();
            img.src = 'img/'+url+'bg.jpg';
        };
        links[i].onmouseout=function (){
            img.src = 'img/'+linkText+'bg.jpg';
        }
    }
}



/*about页面内部导航*/
function showSection(id){
    var sections = $('section');
    for(var i = 0;i < sections.length;i ++){
        if(sections[i].id == id){
            sections[i].style.display = "block";
        }
        else{
            sections[i].style.display = 'none';
        }
    }

}
function Pnavigation(){
    var links = $('article nav a');
    for(var i = 0;i < links.length; i ++){
        links[i].onclick = function (){
            var sectionId = this.href.split('#')[1];
            showSection(sectionId);
        };

        //显示全部
        links[links.length-1].onclick = function (){
            var sections = $('section');
            for(var i = 0;i < sections.length;i ++){
                sections[i].style.display = 'block';
            }
        }
    }
}


/*photos页面土图片滚动*/
function scroll(){
    var space = 5;/*每个图片之间的margin，即左右间距*/
    var ul = $('article .scroll ul');
    if (ul.length == 0) return false;
    ul[0].innerHTML += ul[0].innerHTML;
    var li = $('article .scroll li');
    ul[0].style.width = (parseInt(getStyle(li[0],'width'))+space) * li.length +"px";
    var speed = 2;/*图片移动速度*/
    var time = 15;/*图片移动依次的时间距*/
    var timer = setInterval(move,time);
    function move(){
        ul[0].style.left = parseInt(getStyle(ul[0],'left')) - speed +'px';
        if(parseInt(getStyle(ul[0],'left')) <= -parseInt(getStyle(ul[0],'width'))/2){
            ul[0].style.left = 0;
        }
        else if(parseInt(getStyle(ul[0],'left')) > 0){
            ul[0].style.left = -parseInt(getStyle(ul[0],'width'))/2 + 'px';
        }
    }

    for(var i = 0;i < li.length;i ++){
        li[i].onmouseover = function (){
            clearInterval(timer);
        };
        li[i].onmouseout = function (){
          timer = setInterval(move,time);
        }
    }
}

/*photos页面图片库*/
function showPic(whichPic){
    /*据我所知，jQuery选择器不能选择通过js动态创建的元素*/

    var placeholder = document.getElementById('placeholder');
    var description = document.getElementById('description');
    var src,alt;
    src = whichPic.href;
    alt = whichPic.firstChild.alt;
    placeholder.src = src;
    description.innerHTML = alt;

    return true;
}
function click(){
    var link = $('article .show li a');
    for(var i = 0;i < link.length;i ++){
        link[i].onclick = function (){
            return showPic(this)?false:true;
        }
    }
}
function prepare(){
    var show = $('article .show');
    if(show.length == 0) return false;
    var h2 = $('article .show h2');
    /*动态创建元素*/
    var img = document.createElement('img');
    img.id = 'placeholder';
    img.src = 'img/z.jpg';
    img.alt = '';
    var pare = document.createElement('p');
    pare.id = 'description';
    var pareText = document.createTextNode('This is the description');
    pare.appendChild(pareText);
    /*jQuery中的insertAfter函数    $(内容).insertAfter(目标点)*/
    $(img).insertAfter(h2);
    $(pare).insertAfter(img);

    click();
}

/*Live页面表格完善页面内容(abbr)*/
function displayAbbr(){
    var table = $('article table');
    if(table.length == 0) return false;
    var abbr = $('article table abbr');
    if(abbr.length < 1) return false;
    var defs = Object();
    for(var i = 0;i < abbr.length;i ++){
        var title = abbr[i].title;
        var text = abbr[i].lastChild.nodeValue;
        defs[title] = text;
    }

    var dl = document.createElement('dl');
    for(title in defs){
        var defin = defs[title];
        var dt = document.createElement('dt');
        var dtText = document.createTextNode(defin);
        dt.appendChild(dtText);

        var dd = document.createElement('dd');
        var ddText = document.createTextNode(title);
        dd.appendChild(ddText);

        dl.appendChild(dt);
        dl.appendChild(dd);

        $(dl).insertAfter(table);
    }
    var h2 = document.createElement('h2');
    var h2_text = document.createTextNode('Abbreviations');
    h2.appendChild(h2_text);
    $(h2).insertAfter(table);
}


/*Contact页面表单字段获得焦点*/
function focusLables(){
    var form = $('article form');
    var lables = $('article form label');
    for(var i = 0;i < lables.length;i ++){
        lables[i].onclick = function (){
            var id = this.for;
            var element = $('#id');
            element.focus();
        }
    }
}

function resetField(whichform){
    //if(Modernizr.input.placeholder) return;
    for(var i=0;i<whichform.elements.length;i ++){
        var element = whichform.elements[i];
        if(element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute('placeholder');
        //alert(check);
        if(!check) continue;
        element.onfocus = function(){
            var text = this.placeholder || this.getAttribute('placeholder');
            if(text == this.value){
                this.value = "";
                this.class="";
            }
        };
        element.onblur = function(){
            if(this.value == ""){
                this.value = this.palceholder || this.getAttribute('placeholder');
            }
        };
        element.onblur();
    }
}
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform = document.forms[i];
        resetField(thisform);
    }
}
addLoadEvent(highlightPage);
addLoadEvent(backgorund);

addLoadEvent(indicate);
addLoadEvent(Pnavigation);

addLoadEvent(scroll);
addLoadEvent(prepare);

addLoadEvent(displayAbbr);

addLoadEvent(focusLables);

addLoadEvent(prepareForms);

