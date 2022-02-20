//Functions

function setLed(pad, color)
{
	//script.log("SetLed:  "+pad+"/"+colors[0]);
	local.sendNoteOn(1, pad, colors[0]);
}

//Commands


function setPadColor(pad, colors)
{
	setLed(pad, color[0]);

	i = parseInt(pad);
	script.log("a: "+i+"/"+colors[0]);
	//a = local.parameters.padColors.getChild("pad"+i);
	x = colors[0];
	if (x == 0)
	{
		local.parameters.padColors.getChild("pad"+i).set("Black");
	}
	else if (x == 1)
	{
		local.parameters.padColors.getChild("pad"+i).set("Green");
	}
	else if (x == 2)
	{
		local.parameters.padColors.getChild("pad"+i).set("Green_Blink");
	}
	else if (x == 3)
	{
		local.parameters.padColors.getChild("pad"+i).set("Red");	
	}
	else if (x == 4)
	{
		local.parameters.padColors.getChild("pad"+i).set("Red_Blink");
	}
	else if (x == 5)
	{
		local.parameters.padColors.getChild("pad"+i).set("Yellow");
	}
	else if (x == 6)
	{
		local.parameters.padColors.getChild("pad"+i).set("Yellow_Blink");
	}
		
}

function resetColors()
{
	for(var i=0;i<63;i++) setLed(i, 0);;
}

//Events

function moduleParameterChanged(param)
{
	if(param.getParent().name == "padColors")
	{
		var id = parseInt(param.name.substring(3, 5));
		var val = param.get();
		script.log("Test: "+param.name.substring(3, 5)+"/"+val[0]+"/"+val[1]);
		local.sendNoteOn(1, param.name.substring(3, 5), val[1]);
	}
}

function moduleValueChanged(value) {
  script.log(value.name + " value changed, new value: " + value.get());
}

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
	i = pitch;
    local.values.pads.getChild("pad" + i).set(1);
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
	i = pitch;
    local.values.pads.getChild("pad" + i).set(0);
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}