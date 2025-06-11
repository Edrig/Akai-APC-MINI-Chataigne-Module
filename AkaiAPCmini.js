
//Functions

function setLed(pad, colors)
{
	local.sendNoteOn(1, pad, colors[0]);
}

//Commands


function setPadColor(pad, colors)
{
	script.log(" -- setPadColor for %d", pad);

	//setLed(pad, color[0]);
	var i = parseInt(pad);
	script.log(" -- a: "+i+"/"+colors[0]);
	x = colors[0];

	if (i >= 0 && i<= 63) {
		if (i >= 0 && i<= 7) {
			i = i+1;
			i = "8."+i;
		}
		else if (i >= 8 && i<= 15) {
			i = i-7;
			i = "7."+i;
		}
		else if (i >= 16 && i<= 23) {
			i = i-15;
			i = "6."+i;
		}
		else if (i >= 24 && i<= 31) {
			i = i-23;
			i = "5."+i;
		}
		else if (i >= 32 && i<= 39) {
			i = i-31;
			i = "4."+i;
		}
		else if (i >= 40 && i<= 47) {
			i = i-39;
			i = "3."+i;
		}
		else if (i >= 48 && i<= 55) {
			i = i-47;
			i = "2."+i;
		}
		else if (i >= 56 && i<= 63) {
			i = i-55;
			i = "1."+i;
		}
	}

	script.log(" -- b: "+i+"/"+colors[0]);


	if (x == 0)
	{
		local.values.padColors.getChild("Pad "+ i).set("Black");
	}
	else if (x == 1)
	{
		local.values.padColors.getChild("Pad "+i).set("Green");
	}
	else if (x == 2)
	{
		local.values.padColors.getChild("Pad "+i).set("Green_Blink");
	}
	else if (x == 3)
	{
		local.values.padColors.getChild("Pad "+i).set("Red");	
	}
	else if (x == 4)
	{
		local.values.padColors.getChild("Pad "+i).set("Red_Blink");
	}
	else if (x == 5)
	{
		local.values.padColors.getChild("Pad "+i).set("Yellow");
	}
	else if (x == 6)
	{
		local.values.padColors.getChild("Pad "+i).set("Yellow_Blink");
	}
}


function setButtonColor(pad, colors)
{
	script.log(" -- set Button Color");

	//setLed(pad, color[0]);
	i = parseInt(pad);
	script.log(" -- a: "+i+"/"+colors[0]);

	if (i >= 82 && i<= 89) {
			i = i-81;
			i = "R"+i;
	}
	if (i >= 64 && i<= 71) {
			i = i-63;
			i = "F"+i;
	}

	script.log(" -- b: "+i+"/"+colors[0]);

	x = colors[0];
	if (x == 0)
	{
		local.values.buttonColors.getChild("Button "+i).set("Off");
	}
	else if (x == 1)
	{
		local.values.buttonColors.getChild("Button "+i).set("On");
	}
	else if (x == 2)
	{
		local.values.buttonColors.getChild("Button "+i).set("Blink");
	}
}
	


function resetColors()
{
	script.log(" -- reset color");

	for(var i=0;i<63;i++) 
		{
			setPadColor(i, 0);
		}

}

//Events

function moduleParameterChanged(param)
{
	script.log(" -- param change");
  	script.log(value.name + " param changed, new value: " + param.get());
}

function moduleValueChanged(value) {
	script.log(" -- value change");

  script.log(value.name + " value changed, new value: " + value);
  	if(value.getParent().name == "padColors")
	{
		script.log(" -- value change : padColors", value.name.substring(0, 7));

		script.log(" -- Value Change: ", value.name.substring(3, 4));
		script.log(" -- Value Change: ", value.name.substring(4, 5));


		if(value.name.substring(3, 4) == "8"){
			var id = parseInt(value.name.substring(4, 5)) - 1 ;
		}
		if(value.name.substring(3, 4) == "7"){
			var id = parseInt(value.name.substring(4, 5)) + 7 ;
		}
		if(value.name.substring(3, 4) == "6"){
			var id = parseInt(value.name.substring(4, 5)) + 15 ;
		}
		if(value.name.substring(3, 4) == "5"){
			var id = parseInt(value.name.substring(4, 5)) + 23 ;
		}
		if(value.name.substring(3, 4) == "4"){
			var id = parseInt(value.name.substring(4, 5)) + 31 ;
		}
		if(value.name.substring(3, 4) == "3"){
			var id = parseInt(value.name.substring(4, 5)) + 39 ;
		}
		if(value.name.substring(3, 4) == "2"){
			var id = parseInt(value.name.substring(4, 5)) + 47 ;
		}
		if(value.name.substring(3, 4) == "1"){
			var id = parseInt(value.name.substring(4, 5)) + 55 ;
		}

		script.log(" -- value change : padColors", id);
		var val = value.get();
		script.log(" -- Test 179: "+id+"/"+val[0]+"/"+val[1]);
		//setLed(id, val[0]);
		local.sendNoteOn(1, id, val[0]);

	}
	else if(value.getParent().name == "buttonColors")
	{
		script.log(" -- value change : button Colors", value.name.substring(0, 9));

		script.log(" -- Value Change: ", value.name.substring(6, 7));
		script.log(" -- Value Change: ", value.name.substring(7, 8));


		if(value.name.substring(6, 7) == "F"){
			var id = parseInt(value.name.substring(7, 8)) + 63;
			var val = value.get();
			script.log(" -- Test: "+value.name.substring(7, 8)+"/"+val[0]+"/"+val[1]);
			//setLed(id, val[0]);
			local.sendNoteOn(1, id, val[0]);
		}

		else if(value.name.substring(6, 7) == "R"){
			var id = parseInt(value.name.substring(7, 8)) + 81;
			var val = value.get();
			script.log(" -- Test: "+value.name.substring(7, 8)+"/"+val[0]+"/"+val[1]);
			//setLed(id, val[0]);
			local.sendNoteOn(1, id, val[0]);
		}

	}
}

function noteOnEvent(channel, pitch, velocity)
{
	script.log(" -- note On event");

	script.log(" -- Note on received "+channel+", "+pitch+", "+velocity);
	i = pitch;
	if(i >= 64 && i <= 71){
		i = i-63;
    	local.values.buttons.getChild("Button F" + i).set(1);
	}
	else if (i >= 82 && i<= 89) {
		i = i-81;
    	local.values.buttons.getChild("Button R" + i).set(1);
	}
	else if (i >= 0 && i<= 63) {
		if (i >= 0 && i<= 7) {
			i = i+1;
			i = "8."+i;
		}
		else if (i >= 8 && i<= 15) {
			i = i-7;
			i = "7."+i;
		}
		else if (i >= 16 && i<= 23) {
			i = i-15;
			i = "6."+i;
		}
		else if (i >= 24 && i<= 31) {
			i = i-23;
			i = "5."+i;
		}
		else if (i >= 32 && i<= 39) {
			i = i-31;
			i = "4."+i;
		}
		else if (i >= 40 && i<= 47) {
			i = i-39;
			i = "3."+i;
		}
		else if (i >= 48 && i<= 55) {
			i = i-47;
			i = "2."+i;
		}
		else if (i >= 56 && i<= 63) {
			i = i-55;
			i = "1."+i;
		}

    	local.values.pads.getChild("Pad " + i).set(1);
	}
	else if (i == 98) {
		i = i-0;
    	local.values.buttons.getChild("Square").set(1);
	}
}


function noteOffEvent(channel, pitch, velocity)
{
		script.log(" -- note oOff event");

	script.log(" -- Note off received "+channel+", "+pitch+", "+velocity);
	var i = pitch;
	if(i >= 64 && i <= 71){
		i = i-63;
    	local.values.buttons.getChild("Button F" + i).set(0);
	}
	else if (i >= 82 && i<= 89) {
		i = i-81;
    	local.values.buttons.getChild("Button R" + i).set(0);
	}
	else if (i >= 0 && i<= 63) {
		if (i >= 0 && i<= 7) {
			i = i+1;
			i = "8."+i;
		}
		else if (i >= 8 && i<= 15) {
			i = i-7;
			i = "7."+i;
		}
		else if (i >= 16 && i<= 23) {
			i = i-15;
			i = "6."+i;
		}
		else if (i >= 24 && i<= 31) {
			i = i-23;
			i = "5."+i;
		}
		else if (i >= 32 && i<= 39) {
			i = i-31;
			i = "4."+i;
		}
		else if (i >= 40 && i<= 47) {
			i = i-39;
			i = "3."+i;
		}
		else if (i >= 48 && i<= 55) {
			i = i-47;
			i = "2."+i;
		}
		else if (i >= 56 && i<= 63) {
			i = i-55;
			i = "1."+i;
		}
    	local.values.pads.getChild("Pad " + i).set(0);
	}
	else if (i == 98) {
		i = i-0;
    	local.values.buttons.getChild("Square").set(0);
	}
}

function ccEvent(channel, number, value)
{
		script.log(" -- cc Event");

	script.log(" -- ControlChange received "+channel+", "+number+", "+value);
	i = number-47;
	local.values.faders.getChild("Fader " + i).set(value);
}

function sysExEvent(data)
{
	script.log(" -- Sysex Message received, "+data.length+" bytes :");
}


resetColors();
