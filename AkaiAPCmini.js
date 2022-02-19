
//local.sendNoteOn(1, C0, 2);

    //var awnser = local.values.pads.pad1;

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
		var id = parseInt(param.name.substring(3));
		var val = param.get();
		//script.log("Test: "+val[0]+"/"+val[1]);
		local.sendNoteOn(1, val[0], val[1]);
	}

}

function moduleValueChanged(value) {
  script.log(value.name + " value changed, new value: " + value.get());
}

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
	i = pitch;
    local.values.pads.getChild("pad"+i).set(1);
    script.log(i);
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
	i = pitch;
    local.values.pads.getChild("pad"+i).set(0);
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}