var faderNotes = [ 48, 49, 50, 51, 52, 53, 54, 55, 56]; //CC
var buttonNotes = [
	[56, 57, 58, 59, 60, 61, 62, 63],
	[48, 49, 50, 51, 52, 53, 54, 55],
	[40, 41, 42, 43, 44, 45, 46, 47],
	[32, 33, 34, 35, 36, 37, 38, 39],
	[24, 25, 26, 27, 28, 29, 30, 31],
	[16, 17, 18, 19, 20, 21, 22, 23],
	[ 8, 9, 10, 11, 12, 13, 14, 15],
	[ 0, 1, 2, 3, 4, 5, 6, 7],
]; // Notes
var sideButtonNotes = 	[82, 83, 84, 85, 86, 87, 88, 89];
var bottomButtonNotes = [64, 65, 66, 67, 68, 69, 70, 71, 98];

var noteValueObj = [];
var noteColorObj = [];
var notePulsingObj = [];
var ccValueObj = [];

var faderValueObj = [];
var buttonValueObj = [];

var colorParameterObj = [];
var pulsingParameterObj = [];

var pulsingSteps = 3;
// var pulsingSteps = 128;
var pulsingTable = [0, 1];
// var pulsingTable = [0, 13, 26, 40, 53, 67, 80, 93, 107, 120, 134, 147, 161, 174, 187, 201, 214, 228, 255, 255, 252, 250, 247, 245, 243, 240, 238, 236, 233, 231, 229, 226, 224, 222, 219, 217, 215, 212, 210, 208, 205, 203, 201, 198, 196, 194, 191, 189, 187, 184, 182, 180, 177, 175, 173, 170, 168, 166, 163, 161, 159, 156, 154, 152, 149, 147, 145, 142, 140, 138, 135, 133, 131, 128, 126, 123, 121, 119, 116, 114, 112, 109, 107, 105, 102, 100, 98, 95, 93, 91, 88, 86, 84, 81, 79, 77, 74, 72, 70, 67, 65, 63, 60, 58, 56, 53, 51, 49, 46, 44, 42, 39, 37, 35, 32, 30, 28, 25, 23, 21, 18, 16, 14, 11, 9, 7, 4, 0];
var pulsingRate = 0.20;
var previousStep = -1;

var displayLogoSwitch = false;
var frameRate = 8; //FPS frames per second
var frameCount = 0;
var frameCoordinate = [0,0];
var logoColorObj = [
	[5, 1, 1, 1, 1, 1, 1, 5], // 0
	[1, 5, 1, 1, 1, 1, 5, 1], // 1
	[1, 1, 5, 1, 1, 5, 1, 1], // 2
	[1, 1, 1, 5, 5, 1, 1, 1], // 3
	[1, 1, 1, 5, 5, 1, 1, 1], // 4
	[1, 1, 5, 1, 1, 5, 1, 1], // 5
	[1, 5, 1, 1, 1, 1, 5, 1], // 6
	[5, 1, 1, 1, 1, 1, 1, 5], // 7
]; 
var logoFrameDiff = [
	[[3, 3, 5],[3, 4, 5],[4, 3, 5],[4, 4, 5]], // Curent frame Number with Differences frome base frame
	[[2, 2, 5],[2, 5, 5],[5, 2, 5],[5, 5, 5]],
	[[1, 1, 5],[1, 6, 5],[6, 1, 5],[6, 6, 5]],
	[[0, 0, 5],[0, 7, 5],[7, 0, 5],[7, 7, 5]],

	[[3, 3, 1],[3, 4, 1],[4, 3, 1],[4, 4, 1]], // Curent frame Number with Differences frome base frame
	[[2, 2, 1],[2, 5, 1],[5, 2, 1],[5, 5, 1]],
	[[1, 1, 1],[1, 6, 1],[6, 1, 1],[6, 6, 1]],
	[[0, 0, 1],[0, 7, 1],[7, 0, 1],[7, 7, 1]],

	[[3, 3, 3],[3, 4, 3],[4, 3, 3],[4, 4, 3]], // Curent frame Number with Differences frome base frame
	[[2, 2, 3],[2, 5, 3],[5, 2, 3],[5, 5, 3]],
	[[1, 1, 3],[1, 6, 3],[6, 1, 3],[6, 6, 3]],
	[[0, 0, 3],[0, 7, 3],[7, 0, 3],[7, 7, 3]],

	[],
	[],
	[],

	[[0, 0, 5],[7, 7, 5],[5, 0, 5],[3, 7, 5]],
	[[0, 1, 5],[7, 6, 5],[5, 1, 5],[3, 6, 5]],
	[[0, 2, 5],[7, 5, 5],[5, 2, 5],[3, 5, 5]],
	[[0, 3, 5],[7, 4, 5],[5, 3, 5],[3, 4, 5]],
	[[0, 4, 5],[7, 3, 5],[5, 4, 5],[3, 3, 5]],
	[[0, 5, 5],[7, 2, 5],[5, 5, 5],[3, 2, 5]],
	[[0, 6, 5],[7, 1, 5],[5, 6, 5],[3, 1, 5]],
	[[0, 7, 5],[7, 0, 5],[5, 7, 5],[3, 0, 5]],

	[[1, 0, 5],[6, 7, 5],[4, 0, 5],[2, 7, 5]],
	[[1, 1, 5],[6, 6, 5],[4, 1, 5],[2, 6, 5]],
	[[1, 2, 5],[6, 5, 5],[4, 2, 5],[2, 5, 5]],
	[[1, 3, 5],[6, 4, 5],[4, 3, 5],[2, 4, 5]],
	[[1, 4, 5],[6, 3, 5],[4, 4, 5],[2, 3, 5]],
	[[1, 5, 5],[6, 2, 5],[4, 5, 5],[2, 2, 5]],
	[[1, 6, 5],[6, 1, 5],[4, 6, 5],[2, 1, 5]],
	[[1, 7, 5],[6, 0, 5],[4, 7, 5],[2, 0, 5]],

	[[0, 1, 0],[7, 6, 0],[0, 4, 0],[7, 2, 0]],
	[[1, 1, 0],[6, 6, 0],[1, 4, 0],[6, 2, 0]],
	[[2, 1, 0],[5, 6, 0],[2, 4, 0],[5, 2, 0]],
	[[3, 1, 0],[4, 6, 0],[3, 4, 0],[4, 2, 0]],
	[[4, 1, 0],[3, 6, 0],[4, 4, 0],[3, 2, 0]],
	[[5, 1, 0],[2, 6, 0],[5, 4, 0],[2, 2, 0]],
	[[6, 1, 0],[1, 6, 0],[6, 4, 0],[1, 2, 0]],
	[[7, 1, 0],[0, 6, 0],[7, 4, 0],[0, 2, 0]],

	[[0, 0, 0],[7, 7, 0],[0, 5, 0],[7, 3, 0]],
	[[1, 0, 0],[6, 7, 0],[1, 5, 0],[6, 3, 0]],
	[[2, 0, 0],[5, 7, 0],[2, 5, 0],[5, 3, 0]],
	[[3, 0, 0],[4, 7, 0],[3, 5, 0],[4, 3, 0]],
	[[4, 0, 0],[3, 7, 0],[4, 5, 0],[3, 3, 0]],
	[[5, 0, 0],[2, 7, 0],[5, 5, 0],[2, 3, 0]],
	[[6, 0, 0],[1, 7, 0],[6, 5, 0],[1, 3, 0]],
	[[7, 0, 0],[0, 7, 0],[7, 5, 0],[0, 3, 0]],
	

]; 
var frame =[];
var logoBaseColor = 0; // Hinergrundfarbe Schwarz / Off

// ------ System Functions ------

function softResetAll() {
	for (row = 0; row < 8; row++)
	{
		for (col = 0; col < 8; col ++)
		{
			setPulsingByPosition(row+1, col+1, false);
		}
	}
}

// ------ Feedback Functions ------

function displayLogo()
{
	// script.log(" -- Diplay Logo: Starting Frame: " + frameCount);
	//Main Buttons
	var currentFrameDiff = logoFrameDiff[frameCount];
	// script.log(" -- Diplay Logo: currentFrameDiff " + currentFrameDiff);

	//Make Frame
	for(var row=0; row<8; row++){ // Go thoru logocolors and push them in the frame, manipulate the colors if you want per col and row
		for(var col=0; col<8; col++){

			for (var currFrameDiffPixel = 0; currFrameDiffPixel < currentFrameDiff.length; currFrameDiffPixel++) {
				// script.log(" -- Diplay Logo: MakeFrame " + " " + row + " " + col + " | " + currentFrameDiff[currFrameDiffPixel][0] + " " + currentFrameDiff[currFrameDiffPixel][1] + " " + currentFrameDiff[currFrameDiffPixel][2]);
				if (currentFrameDiff[currFrameDiffPixel][0] == row && currentFrameDiff[currFrameDiffPixel][1] == col) {
					// script.log(" -- Diplay Logo: Frame Pixel" + " " + row + " " + col + " | " + frame[row][col]);
					// script.log(" -- Diplay Logo: MakeFrame add Pixel" + " " + row + " " + col + " | " + currentFrameDiff[currFrameDiffPixel][2]);

					frame[row][col] = currentFrameDiff[currFrameDiffPixel][2];

					// script.log(" -- Diplay Logo: MakeFrame Pixel" + " " + row + " " + col + " | " + frame[row][col]);
				}
			}
		
		}
	}

	//Draw Frame
	for(var row=0; row<8; row++){
		for(var col=0; col<8; col++){
			// script.log(" -- Diplay Logo: Draw Frame " + " " + row + " " + col + " | " + frame[row][col]);
			sendButtonColor([row, col], frame[row][col]);
		}
	}

	if(logoFrameDiff.length == frameCount){
		script.log(" -- Diplay Logo: Finished " + frameCount);
		frameCount = 0;
		displayLogoSwitch = false;
		softResetAll();
		resync();
		for(var row=0; row<8; row++){
			for(var col=0; col<8; col++){
				frame[row][col] = logoBaseColor;
				// script.log(" -- Diplay Logo: init Logo Frame " + " " + row + " " + col + " | " + frame[row][col]);
			}
		}
	}

	frameCount++;
}

function sendButtonColorBrightness(id, color, brightness)
{
	var note = buttonNotes[id[0]][id[1]];

	// newColor[1] = Math.round((color[1] * intensity) / 255);
	// var r = Math.round(((color[0] * 127) * brightness) / 255);
	// var g = Math.round(((color[1] * 127) * brightness) / 255);
	// var b = Math.round(((color[2] * 127) * brightness) / 255);

	// var rMSBLSB = calcMSBLSB(r);
	// var gMSBLSB = calcMSBLSB(g);
	// var bMSBLSB = calcMSBLSB(b);

	// script.log("Set Color for note " + note + " to rgb:{"+r+","+g+","+b+"} Intensity: "+brightness);
	// local.sendSysex(0x47, 0x7F, 0x4F, 0x24, 0x00, 0x08, note, note, rMSBLSB[0], rMSBLSB[1], gMSBLSB[0], gMSBLSB[1], bMSBLSB[0], bMSBLSB[1]);
	if (brightness < 0.5) {
		local.sendNoteOn(1, note, 0);
		util.delayThreadMS(1);
	} else if (brightness > 0.5) {
		local.sendNoteOn(1, note, color);
		util.delayThreadMS(1);
	}
}


function sendButtonColor(id, color)
{
	var note = buttonNotes[id[0]][id[1]];
	// var r = Math.round(color[0] * 127);
	// var g = Math.round(color[1] * 127);
	// var b = Math.round(color[2] * 127);

	// var rMSBLSB = calcMSBLSB(r);
	// var gMSBLSB = calcMSBLSB(g);
	// var bMSBLSB = calcMSBLSB(b);

	// script.log("Set Color for note " + note + " to rgb:{"+r+","+g+","+b+"}");
	// local.sendSysex(0x47, 0x7F, 0x4F, 0x24, 0x00, 0x08, note, note, rMSBLSB[0], rMSBLSB[1], gMSBLSB[0], gMSBLSB[1], bMSBLSB[0], bMSBLSB[1]);
	local.sendNoteOn(1, note, color);
	util.delayThreadMS(1);
}

function sendButton(side, index, state)
{
	if (side)
	{
		var note = sideButtonNotes[index];
		local.sendNoteOn(0, note, state);
	}
	else
	{
		var note = bottomButtonNotes[index];
		local.sendNoteOn(0, note, state);
	}
}
// ---- User Commands ----

function resendColors()
{
	for(var i = 0; i < 8; i++)
	{
		for(var j = 0; j < 8; j++)
		{
			var color = colorParameterObj[i][j].get();
			sendButtonColor([i,j], color);
		}
	}
}

function resync()
{
	// Main Buttons
	for (var row = 0; row < 8; row++)
	{
		for (var col = 0; col < 8; col ++)
		{
			var color = colorParameterObj[row][col].get();
			var pulsing = pulsingParameterObj[row][col].get();

			sendButtonColor([row, col], color);
			util.delayThreadMS(5);
		}
	}

	// Other Buttons
	for (var i = 0; i < 8; i++)
	{
		// Side Buttons
		var value = colorParameterObj[i][8].get();
		sendButton(true, i, value);
		util.delayThreadMS(5);

		// Bottom Buttons
		var value = colorParameterObj[8][i].get();
		sendButton(false, i, value);
		util.delayThreadMS(5);
	}
}

// ---- Module Common Functions ----

function init()
{
	script.log("Setting up Akai APC mini Module");
	// init variable
	for (var i = 0; i < 9; i++) 
	{
		buttonValueObj[i] = [];
		colorParameterObj[i] = [];
		pulsingParameterObj[i] = [];
		frame[i] = [];
	}

	// Faders
	for (var i = 0; i < 9; i++) {
		faderValueObj[i] = local.values.faders.getChild("fader" + (i+1));
		ccValueObj[faderNotes[i]] = local.values.faders.getChild("fader" + (i+1));
	}

	// Main Buttons
    for (var i = 0; i < 8; i++) 
	{
		for (var column = 0; column < 8; column++) 
		{
			buttonValueObj[i][column] = local.values.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");
			colorParameterObj[i][column] = local.parameters.colors.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");
			pulsingParameterObj[i][column] = local.parameters.pulsing.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");

			var note = buttonNotes[i][column];
			noteValueObj[note] = local.values.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");
			noteColorObj[note] = local.parameters.colors.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");
			notePulsingObj[note] = local.parameters.pulsing.getChild("Main Buttons").getChild("button" + (i + 1) + (column + 1) + "");

		}
    }

	// Side Buttons
    for (var i = 0; i < 8; i++) 
	{
        buttonValueObj[i][8] = local.values.getChild("Side Buttons").getChild("sideButton" + (i + 1));
        colorParameterObj[i][8] = local.parameters.colors.getChild("Side Buttons").getChild("sideButton" + (i + 1));

		var note = sideButtonNotes[i];
        noteValueObj[note] = local.values.getChild("Side Buttons").getChild("sideButton" + (i + 1));
        noteColorObj[note] = local.parameters.colors.getChild("Side Buttons").getChild("sideButton" + (i + 1));
    }

	// Bottom Buttons
    for (var i = 0; i < 9; i++) 
	{
        buttonValueObj[8][i] = local.values.getChild("Bottom Buttons").getChild("bottomButton" + (i + 1) + "");

		if (i < 8)
        colorParameterObj[8][i] = local.parameters.colors.getChild("Bottom Buttons").getChild("bottomButton" + (i + 1) + "");

		var note = bottomButtonNotes[i];
        noteValueObj[note] = local.values.getChild("Bottom Buttons").getChild("bottomButton" + (i + 1) + "");

		if (i < 8)
			noteColorObj[note] = local.parameters.colors.getChild("Bottom Buttons").getChild("bottomButton" + (i + 1) + "");
    }

	// Logo Frame
	for(var row=0; row<8; row++){
		for(var col=0; col<8; col++){
			frame[row][col] = logoBaseColor;
			// script.log(" -- Diplay Logo: init Logo Frame " + " " + row + " " + col + " | " + frame[row][col]);
		}
	}


	if (local.parameters.isConnected) {
		displayLogoSwitch = true;
	}
}


// ------ Chataigne Events ------

var midiDeviceOutLast;
var resyncReady = false;

function moduleValueChanged(value) {
}

function moduleParameterChanged(param)
{
	// script.log("Parameter Changed: " + param.name + " Parent: " + param.getParent().name + " GrandParent: " + param.getParent().getParent().name + " Value: " + param.get());


	if (param.name == "devices") {
		var midiOutDevice = param.get()[1];
		if (param.get()[1] != midiDeviceOutLast) {
			midiDeviceOutLast = midiOutDevice;

			if (midiOutDevice) {
				script.log("New Midi out Device detected");
				displayLogoSwitch = true;
				// resync();
			}
		}
	}


	// Color Feedback
	if(param.getParent().getParent().name == "colors")
	{
		var color = param.get();
		// script.log("color Value: "+color);

		if(param.getParent().name == "mainButtons")
		{
			var id = [(parseInt(param.name.charAt(6))-1), (parseInt(param.name.charAt(7))-1)];
			script.log(color);
			sendButtonColor(id, color);
		}
		else if(param.getParent().name == "sideButtons")
		{
			var index = parseInt(param.name.charAt(10)) - 1;
			sendButton(true, index, param.get());
		}
		else if(param.getParent().name == "bottomButtons")
		{
			var index = (parseInt(param.name.charAt(12)) - 1);
			// script.log(index);
			sendButton(false, index, param.get());
		}
	}

	// Pulsing
	if(param.getParent().getParent().name == "pulsing")
	{

		// if pulsing just got turned of send full brightness color again
		if (param.get() == false){
			if(param.getParent().name == "mainButtons")
			{
				// var id = [(parseInt(param.name.charAt(6))-1), (parseInt(param.name.charAt(7))-1)];
				var id = [(parseInt(param.name.charAt(6))-1), (parseInt(param.name.charAt(7))-1)];
				var color = colorParameterObj[id[0]][id[1]].get();
				sendButtonColor(id, color);
			}
		}
	}

	// Pulsing Control
	if(param.name == "pulseRate")
	{
		pulsingRate = param.get();
		script.log("Pulsing Rate changed to: " + pulsingRate);
	}
	if(param.name == "pulseSpeed")
	{
		pulsingSpeed = param.get();
		pulsingSteps = pulsingSpeed;
		script.log("Pulsing Speed changed to: " + pulsingSpeed);
	}
}

function update(delta)
{
	if (!local.parameters.isConnected) return;

	if (resyncReady)
	{
		resyncReady = false;
		resync();
	}

	var time = util.getTime(); // time in seconds ( 28772.9140625, s, ms)
	// script.log(" -- Update Time: " + time);

	//Logo Update
	var ms = Math.round(((time*10000)));
	//script.log(" -- displayLogo ms: " + ms);
	var frameSwitch = Math.round((ms*(frameRate*1e-4))); // gives 0 or 1 to trigger next frame
	// script.log(" -- Update FrameSwitch: " + frameSwitch4);

	if (displayLogoSwitch)	
	{
		if(frameSwitch !== previousFrameSwitch){
			// script.log(" -- displayLogo Frame: " + frameSwitch);
			displayLogo();
		}
	}
	previousFrameSwitch = frameSwitch;


	//Pulsing Update
	var step = Math.round(((time % pulsingRate) / pulsingRate) * pulsingSteps);
	if (step !== previousStep)
	{
		var intensity = pulsingTable[step];
		// script.log("Step: "+step+" intensity: "+intensity);

		for (var i = 0; i < 8; i ++)
		{
			for (var j = 0; j < 8; j ++)
			{
				// script.log(i + " " + j);
				if (pulsingParameterObj[i][j].get())
				{
					// scale color with intensity
					var color = colorParameterObj[i][j].get();
					sendButtonColorBrightness([i,j], color, intensity);
				}
			}
		}
	}
	previousStep = step;
}


// ----- Midi Events ------

function noteOnEvent(channel, note, velocity)
{
	if (channel != 1) return;

	var button = noteValueObj[note];
	if (!!button)
	{
		button.set((velocity==127));
	}
}


function noteOffEvent(channel, note, velocity)
{
	if (channel != 1) return;

	var button = noteValueObj[note];
	if (!!button)
	{
		button.set(false);
	}
}


function ccEvent(channel, note, value)
{
	if (channel != 1) return;

	var fader = ccValueObj[note];
	if (!!fader)
	{
		fader.set(value/127);
	}
}


function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}


// ----- User Functions ------
function setColorEnum(id, color)
{
	var colorObj = colorParameterObj[id[0]][id[1]];
	if (!!colorObj)
	{
		script.log("color Balck");
		colorObj.set(color);
	}
}

function setColorByNote(note, color)
{
	var colorObj = noteColorObj[note];
	if (!!colorObj)
	{
		colorObj.set(color);
	}
}

function setColorByIndex(index, color)
{
	var x = Math.floor(index / 8);
	var y = index % 8;
	var colorObj = colorParameterObj[x][y];
	if (!!colorObj)
	{
		colorObj.set(color);
	}
}

function setColorByPosition(x, y, color)
{
	var colorObj = colorParameterObj[x-1][y-1];
	if (!!colorObj)
	{
		colorObj.set(color);
	}
}

function setPulsingEnum(id, pulsing)
{
	var pulsingObj = pulsingParameterObj[id[0]][id[1]];
	if (!!pulsingObj)
	{
		pulsingObj.set(pulsing);
	}
}

function setPulsingByNote(note, pulsing)
{
	var pulsingObj = notePulsingObj[note];
	if (!!pulsingObj)
	{
		pulsingObj.set(pulsing);
	}
}

function setPulsingByIndex(index, pulsing)
{
	var x = Math.floor(index / 8);
	var y = index % 8;
	var pulsingObj = pulsingParameterObj[x][y];
	if (!!pulsingObj)
	{
		pulsingObj.set(pulsing);
	}
}

function setPulsingByPosition(x, y, pulsing)
{
	var pulsingObj = pulsingParameterObj[x-1][y-1];
	if (!!pulsingObj)
	{
		pulsingObj.set(pulsing);
	}
}

function setButtonLed(isBottom, index, state)
{
	var obj = isBottom ? colorParameterObj[8][index-1] : colorParameterObj[index-1][8];
	if (!!obj)
	{
		obj.set(state);
	}
}

function setButtonLedByNote(note, state)
{
	var obj = noteColorObj[note];
	if (!!obj)
	{
		obj.set(state);
	}
}

function resetAllButtons()
{
	resetMainButtons();
	resetSideButtons();
	resetBottomButtons();
}
function resetMainButtons()
{
		// Main Buttons
		for (row = 0; row < 8; row++)
		{
			for (col = 0; col < 8; col ++)
			{
				setPulsingByPosition(row+1, col+1, false);
				setColorByPosition(row+1, col+1, "Black");
			}
		}
		resyncReady = true;
}
function resetSideButtons()
{
		// Side Buttons
		for (i = 0; i < 8; i++)
		{
			// Side Buttons
			setButtonLed(false, i+1, "Off");
		}
		resyncReady = true;
}
function resetBottomButtons()
{
		// Other Buttons
		for (i = 0; i < 8; i++)
		{
			// Bottom Buttons
			setButtonLed(true, i+1, "Off");
		}
		resyncReady = true;
}
function displayLogoNow()
{
	displayLogoSwitch = true;
	script.log(" -- Diplay Logo: Switch " + displayLogoSwitch);	
}