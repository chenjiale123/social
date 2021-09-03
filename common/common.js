// 防止处理多次点击
function noMultipleClicks(methods, info) {
    // methods是点击后需要执行的函数， info是函数需要传的参数
    let that = this;
	console.log(that.noClick)
    if (that.noClick) {
        // 第一次点击
        that.noClick= false;
        if((info && info !== '') || info ==0) {
            // info是执行函数需要传的参数
            methods(info);
        } else {
            methods();
        }
        setTimeout(()=> {
            that.noClick= true;
        }, 1000)
    } else {
        //  这里是重复点击的判断
		console.log("点击太快");
    }
}

function million(value){//过万处理
  let num;
 if(value > 9999){//大于9999显示x.xx万
    num=(Math.floor(value/1000)/10) + 'W';
 }else if( value < 9999 && value>-9999){
   num=value
 }else if(value<-9999){//小于-9999显示-x.xx万
    num = -(Math.floor(Math.abs(value)/1000)/10)+'W'
 }
 return num;
}
//导出
export default {
    noMultipleClicks, 
		 million// 禁止多次点击
}