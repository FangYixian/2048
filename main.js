var block = new Array();
var hasConflicted =new Array();
var score = 0;

var positionX=0;
var positionY=0;

$(function(){
	newGame();
});

function newGame()
{
	//初始化
	init();
	//随机生成两个新的数字
	generateOneNumber();
	generateOneNumber();

}

function init()
{
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			var gridCell=$("#grid-"+i+"-"+j);
			positionX=20+j*120;
			positionY=20+i*120;
			gridCell.css("top",positionY);
			gridCell.css("left",positionX);
		}

	for(var i=0;i<4;i++)
    {
    	block[i]=new Array();
    	hasConflicted[i]=new Array();
    	for(var j=0;j<4;j++)
    		block[i][j]=0;
    		hasConflicted[i][j]=false;
    }

    updateNumber();
    score=0;
}

function updateNumber(){

	$(".number").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			positionX=20+j*120;
			positionY=20+i*120;
			$("#container").append('<div class="number" id="number-'+i+'-'+j+'"></div>');
			var numberCell=$("#number-"+i+"-"+j);
			if (block[i][j]==0) 
			{
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",positionY+50);
			    numberCell.css("left",positionX+50);

			}
			else{
				numberCell.css("width","100px");
				numberCell.css("height","100px");
				numberCell.css("top",positionY);
			    numberCell.css("left",positionX);
			    numberCell.text(block[i][j]);
			    numberCell.css("background",getNumberBackgroundColor(block[i][j]));
			    numberCell.css("color",getNumberColor(block[i][j]));
			    if (block[i][j]>100) {
			    	numberCell.css("font-size","50px");
			    }
			    if (block[i][j]>1000) {
			    	numberCell.css("font-size","40px");
			    }
			}
			hasConflicted[i][j]=false;
		}
}

function generateOneNumber(){
	if(noSpace(block))
		return false;

	var randx=parseInt(Math.floor(4*Math.random()));
	var randy=parseInt(Math.floor(4*Math.random()));

	var chance=0
	while(chance<50) {		
		if(block[randx][randy]==0)
			break;
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		chance++;
	}
	if(chance==50)
	{
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
			{
				if(block[i][j]==0)
				{
					randx=i;
					randy=j;
				}
			}
	}

	var randnum=Math.random()>0.5?2:4;
	block[randx][randy]=randnum;
	showNumberAnimation(randx,randy,randnum);

	return true;
}

function noSpace(block)
{
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			if (block[i][j]==0) {
				return false;
			}
		}
	return true;
}



$(document).keydown(function(event)
{
	event.preventDefault();
	switch(event.keyCode){
		case 37:
		if(moveLeft(block))
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
		case 38:
		if(moveUp(block))
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
		case 39:
		if(moveRight(block))
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
		case 40:
		if(moveDown(block))
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
		default:
		break;
	}
});

function isGameOver()
{
	if(noSpace(block)&&noMove(block))
		alert("Game Over");
}

function moveLeft(block)
{
	if(!canMoveLeft(block))
		return false;

	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
		{
			if(block[i][j]!=0)
			{
				for(var k=0;k<j;k++){
					if(block[i][k]==0&&noBlockHoriz(i,k,j,block))
					{
						showMoveAnimation(i,j,i,k);
						block[i][k]=block[i][j];
						block[i][j]=0;
						continue;
					}
					else if(block[i][k]==block[i][j]&&
							noBlockHoriz(i,k,j,block)&& !hasConflicted[i][k])
					{
						showMoveAnimation(i,j,i,k);
						block[i][k]+=block[i][j];
						block[i][j]=0;
						score+=block[i][k];
						updateScore();
						hasConflicted[i][k]=true;
						continue;
					}
			}
			}
		}

	setTimeout("updateNumber()",200);
	return true;
}

function moveUp(block)
{
	if(!canMoveUp(block))
		return false;

	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++)
		{
			if(block[i][j]!=0)
			{
				for(var k=0;k<i;k++){
					if(block[k][j]==0&&noBlockVertical(j,k,i,block))
					{
						showMoveAnimation(i,j,k,j);
						block[k][j]=block[i][j];
						block[i][j]=0;
						continue;
					}
					else if(block[k][j]==block[i][j]&&
						noBlockVertical(j,k,i,block)&& !hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						block[k][j]+=block[i][j];
						block[i][j]=0;
						score+=block[k][j];
						updateScore();
						hasConflicted[k][j]=true;
						continue;
					}
			}
			}
		}

	setTimeout("updateNumber()",200);
	return true;
}

function moveRight(block)
{
	if(!canMoveRight(block))
		return false;

	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--)
		{
			if(block[i][j]!=0)
			{
				for(var k=3;k>j;k--){
					if(block[i][k]==0&&noBlockHoriz(i,j,k,block))
					{
						showMoveAnimation(i,j,i,k);
						block[i][k]=block[i][j];
						block[i][j]=0;
						continue;
					}
					else if(block[i][k]==block[i][j]&&
						noBlockHoriz(i,j,k,block)&& !hasConflicted[i][k])
					{
						showMoveAnimation(i,j,i,k);
						block[i][k]+=block[i][j];
						block[i][j]=0;
						score+=block[i][k];
						updateScore();
						hasConflicted[i][k]=true;
						continue;
					}
			}
			}
		}

	setTimeout("updateNumber()",200);
	return true;
}

function moveDown(block)
{
	if(!canMoveDown(block))
		return false;

	for(var i=2;i>=0;i--)
		for(var j=0;j<4;j++)
		{
			if(block[i][j]!=0)
			{
				for(var k=3;k>i;k--){
					if(block[k][j]==0&&noBlockVertical(j,i,k,block))
					{
						showMoveAnimation(i,j,k,j);
						block[k][j]=block[i][j];
						block[i][j]=0;
						continue;
					}
					else if(block[k][j]==block[i][j]&&
						noBlockVertical(j,i,k,block)&& !hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						block[k][j]+=block[i][j];
						block[i][j]=0;
						score+=block[k][j];
						updateScore();
						hasConflicted[k][j]=true;
						continue;
					}
			}
			}
		}

	setTimeout("updateNumber()",200);
	return true;
}

function updateScore()
{
	$("#score").text(score);
}