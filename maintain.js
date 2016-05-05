function getNumberBackgroundColor(num){
	switch(num){
		case 2: return "rgba(83, 196, 205, 0.83)";break;
		case 4: return "rgba(83, 196, 205, 0.83)";break;
		case 8: return "rgba(48, 62, 205, 0.77)";break;
		case 16: return "rgba(4,58,185,0.6)";break;
		case 32: return "rgba(39, 58, 186, 0.91)";break;
		case 64: return "rgba(30,37,187,0.6)";break;
		case 128: return "rgba(4,58,185,1)";break;
		case 256: return "rgba(30,37,187,1)";break;
		case 512: return "rgba(17,31,106,0.6)";break;
		case 1024: return "rgba(17,31,106,1)";break;
		case 2048: return "rgba(186, 32, 131, 0.81)";break;
		case 4096: return "rgba(118, 20, 166, 0.9)";break;
		case 8192: return "rgba(188,46,46,0.8)";break;
	}
}

function getNumberColor(num)
{
	if (num==2||num==4) {
		return "rgba(4,58,185,0.8)";
	}
	else
	{
		return "white";
	}
}

function showNumberAnimation(x,y,val)
{
	positionX=20+y*120;
	positionY=20+x*120;
	var numberCell=$("#number-"+x+"-"+y);
	numberCell.text(val);
	numberCell.css("background",getNumberBackgroundColor(val));
	numberCell.css("color",getNumberColor(val));

	numberCell.animate({
		width:"100px",
		height:"100px",
		top:positionY,
		left:positionX
	},50);
}

function canMoveLeft(block)
{
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
		{	
			if (block[i][j]!=0) {
				if (block[i][j-1]==0||block[i][j-1]==block[i][j]) 
				{
					return true;
				}
			}
		}

	return false;
}

function canMoveUp(block)
{
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++)
		{	
			if (block[i][j]!=0) {
				if (block[i-1][j]==0||block[i-1][j]==block[i][j]) 
				{
					return true;
				}
			}
		}

	return false;
}

function canMoveRight(block)
{
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++)
		{	
			if (block[i][j]!=0) {
				if (block[i][j+1]==0||block[i][j+1]==block[i][j]) 
				{
					return true;
				}
			}
		}

	return false;
}

function canMoveDown(block)
{
	for(var i=0;i<3;i++)
		for(var j=0;j<4;j++)
		{	
			if (block[i][j]!=0) {
				if (block[i+1][j]==0||block[i+1][j]==block[i][j]) 
				{
					return true;
				}
			}
		}

	return false;
}

function noBlockHoriz(horiz,start,end,block)
{
	for(var i=start+1;i<end;i++)
		{
			if(block[horiz][i]!=0)
				return false;
		}

	return true;
}

function noBlockVertical(verti,start,end,block)
{
	for(var i=start+1;i<end;i++)
		{
			if(block[i][verti]!=0)
				return false;
		}

	return true;
}

function showMoveAnimation(si,sj,ei,ej)
{
	positionX=20+ej*120;
	positionY=20+ei*120;
	var numberCell=$("#number-"+si+"-"+sj);
	numberCell.animate({
		top: positionY,
		left: positionX
	},200);
}

function noMove(block)
{
	if(canMoveDown(block)||canMoveRight(block)||
		canMoveUp(block)||canMoveLeft(block))
		return false;

	return true;
}