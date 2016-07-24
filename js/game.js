function game(sence){
	this.sence=sence;//保存对象
	// console.log(this.sence)
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];//所有元素
	this.letterArr=[];//当前操作的东西
	this.num=5;//数量
	this.leve=1;//等级
	this.speed=3;//数度
	this.score=0;//初始化的分数
	this.t=null;
	this.flag=false;
	this.lw=document.documentElement.clientWidth;//浏览器宽
	this.lh=document.documentElement.clientHeight;//浏览器高
	this.getletter(5);
}
//game的原型
game.prototype.getletter=function(num){
	var that=this;
	for(var i=0;i<num;i++){
		// console.log(num)
		var let=this.letter[Math.floor(Math.random()*this.letter.length)];
		while(check(let)){
			let=this.letter[Math.floor(Math.random()*this.letter.length)];
		}
		function check(let){
			for(var j=0;j<that.letterArr.length;j++){
				if(let==that.letterArr[j]){
					return true;
				}
			}
			return false;
		}
		var img=document.createElement("img");			
		img.className=let;
		img.src="imgs/"+let+".png";
		img.style.cssText="position:absolute;left:"+(Math.random()*(this.lw-150)+50)+"px;top:"+(-200*Math.random()-50)+"px";
		this.sence.appendChild(img);
		this.letterArr.push(let);
	}	
	// console.log(this.letterArr);	
}
game.prototype.play=function(){
	var that=this;	
	this.t=setInterval(function(){
		//下到屏幕底没有了再添img
		// if(that.num>that.letterArr.length){
			that.getletter(that.num-that.letterArr.length);
		// }		
		var l=document.getElementsByTagName('img');
		for(var i=0;i<l.length;i++){
			var ltop=l[i].offsetTop+that.speed;
			l[i].style.top=ltop+"px";
			if(ltop>that.lh){
				that.sence.removeChild(l[i]);
				l[i]=null;
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==l[i].className){
						that.letterArr.splice(j,1);
					}
				}
			}
		}
	},50)
}
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		//按下键盘码时查找键盘码
		var k=String.fromCharCode(ev.keyCode);
		// console.dir(k)
			var now=that.sence.getElementsByClassName(k);
			// console.log(now)
			if(now.length>0){
				that.score++;
				document.title=that.score;
				that.sence.removeChild(now[0]);
				for(var i=0;i<that.letterArr.length;i++){
					if(that.letterArr[i]==k){
						that.letterArr.splice(i,1);
					}
				}
			}
		
	}
}
game.prototype.stop=function(){
	clearInterval(this.t);
	this.flag=false;
}
