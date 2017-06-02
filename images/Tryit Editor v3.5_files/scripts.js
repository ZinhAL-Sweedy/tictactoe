window.onload = function() {
    addevents();
    frame1Animation();
};

var count=0;

/*clicktag*/
function addevents(){
    document.getElementById("banner728x90").addEventListener("click", trackClick); 
}

function trackClick(){
    window.open(clickTag,'_blank');
}

var browser=navigator.userAgent.toLowerCase();
if(browser.indexOf('firefox') > -1) {
    cta_text1.style.top = "6px";
    cta_text2.style.top = "6px";
	cta_text1.style.height = "21px";
    cta_text2.style.height = "21px";
}

function frame1Animation(){
	TweenLite.set([footer_div1, bg],{alpha:1});

    /*girl motion*/
    TweenLite.to(girl,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(girl,1.5,{x:28, ease:Quad.easeInOut});
    TweenLite.to(girl,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked paper motion*/
    TweenLite.to(stack_paper,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(stack_paper,1.5,{x:20, y:10, ease:Quad.easeInOut});
    TweenLite.to(stack_paper,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked left paper1 motion*/
    TweenLite.to(paper1,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper1,1.5,{x:42, ease:Quad.easeInOut});
    TweenLite.to(paper1,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked left paper2 motion*/
    TweenLite.to(paper2,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper2,1.5,{x:62, ease:Quad.easeInOut});
    TweenLite.to(paper2,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked top paper3 motion*/
    TweenLite.to(paper3,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper3,1.5,{x:30, ease:Quad.easeInOut});
    TweenLite.to(paper3,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked top paper4 motion*/
    TweenLite.to(paper4,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper4,1.5,{scale:1.4, x:70, y:40, ease:Quad.easeInOut});
    TweenLite.to(paper4,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked middle paper5 motion*/
    TweenLite.to(paper5,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper5,1.5,{scale:1.3, x:-10, y:15, ease:Quad.easeInOut});
    TweenLite.to(paper5, 0.5, {css:{filter: "grayscale(2)"}, delay:1});
    TweenLite.to(paper5, 0.5, {css:{"-webkit-filter": "grayscale(2)"}, delay:1});
    TweenLite.to(paper5,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked top right paper6 motion*/
    TweenLite.to(paper6,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper6,1.5,{scale:1.6, x:-5, y:26, ease:Quad.easeInOut});
    TweenLite.to(paper6, 0.5, {css:{filter: "grayscale(2)"}, delay:1});
    TweenLite.to(paper6, 0.5, {css:{"-webkit-filter": "grayscale(2)"}, delay:1});
    TweenLite.to(paper6,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});

    /*Stacked right paper7 motion*/
    TweenLite.to(paper7,0.65,{opacity:1, ease:Quad.easeIn});
    TweenLite.to(paper7,1.5,{scale:1, x:5, y:36, ease:Quad.easeInOut});
    TweenLite.to(paper7, 0.5, {css:{filter: "grayscale(2)"}, delay:1});
    TweenLite.to(paper7, 0.5, {css:{"-webkit-filter": "grayscale(2)"}, delay:1});
    TweenLite.to(paper7,0.5,{opacity:0, ease:Quad.easeOut, delay:2.5});
    TweenLite.delayedCall(3,frame2Animation);
}

function frame2Animation(){
    TweenLite.to(copy1,0.5,{opacity:1, ease:Quad.easeIn});

     TweenLite.to(copy1,0.5,{opacity:0, ease:Quad.easeOut, delay:2.0});
    TweenLite.to(copy2,0.5,{opacity:1, ease:Quad.easeIn, delay:2.5});
	
	TweenLite.to(copy2,0.5,{opacity:0, ease:Quad.easeOut, delay:6.0});
    TweenLite.to(copy3,0.5,{opacity:1, ease:Quad.easeIn, delay:6.5});
    TweenLite.delayedCall(9.5,frame3Animation);
}

function frame3Animation(){
    count++;
    if(count<2){
        TweenLite.to(copy3,0.8,{x:-728, ease:Quad.easeOut});
        TweenLite.to([girl,stack_paper,paper1,paper2,paper3,paper4,paper5,paper6,paper7],0,{opacity:0, scale:1, x:0, y:0});

        TweenLite.to(".footer_bg1", 0.8,{x:-1220, ease:Linear.easeNone});
    	TweenLite.to(".holder1",1,{x:-920, ease:Linear.easeNone});
    	TweenLite.to([".footer_bg2",".holder2"],1.4,{x:-650, ease:Sine.easeOut});

        TweenLite.set([".footer_bg1",".holder1"],{x:728, delay:2});

        TweenLite.set(copy3,{x:0, opacity:0, delay:2});
        TweenLite.delayedCall(1.25,frame1Animation);
    }
}

