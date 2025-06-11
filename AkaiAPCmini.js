///////////////////////
////////Functions
///////////////////////

/**
 * Sets the LED color for a specific pad on the Akai APC Mini.
 *
 * @param {number} pad - The pad number to set the LED for.
 * @param {number[]} colors - An array of color values, where the first element is used for the LED.
 */
function setLed(pad, colors)
{
	local.sendNoteOn(1, pad, colors[0]);
}


///////////////////////
////////Commands
///////////////////////
/**
 * Sets the color of a specified pad on the Akai APC Mini controller.
 *
 * The function maps the pad index (0-63) to a corresponding pad identifier string,
 * then sets the pad color based on the provided color code.
 *
 * @param {number|string} pad - The index of the pad (0-63) to set the color for.
 * @param {number[]} colors - An array where the first element is a color code:
 *   0 = Black,
 *   1 = Green,
 *   2 = Green_Blink,
 *   3 = Red,
 *   4 = Red_Blink,
 *   5 = Yellow,
 *   6 = Yellow_Blink.
 */
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


/**
 * Sets the color state of a button (pad) on the Akai APC Mini.
 *
 * Depending on the pad index, this function maps the pad to a specific button identifier,
 * then sets its color state ("Off", "On", or "Blink") based on the provided color value.
 *
 * @param {number|string} pad - The pad index or identifier to set the color for.
 * @param {number[]} colors - An array where the first element determines the color state:
 *   0 = "Off", 1 = "On", 2 = "Blink".
 */
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
	


/**
 * Resets the color of all pads to the default color (0).
 * Iterates through all pad indices (0 to 62) and sets their color to 0.
 * Logs the reset action for debugging purposes.
 */
function resetColors()
{
	script.log(" -- reset color");

	for(var i=0;i<63;i++) 
		{
			setPadColor(i, 0);
		}

}
///////////////////////
//////////Events
///////////////////////	

/**
 * Handles changes to a module parameter.
 *
 * Logs the parameter change event and its new value.
 *
 * @param {Object} param - The parameter object that has changed.
 * @param {Function} param.get - Function to retrieve the new value of the parameter.
 */
function moduleParameterChanged(param)
{
	script.log(" -- param change");
  	script.log(value.name + " param changed, new value: " + param.get());
}

/**
 * Handles changes to module values, specifically for "padColors" and "buttonColors" parents.
 * Depending on the value's parent and name, calculates the corresponding pad/button ID,
 * retrieves the new value, and sends a MIDI Note On message to update the LED state.
 *
 * @param {Object} value - The value object that has changed.
 * @param {string} value.name - The name of the value, used to determine pad/button and index.
 * @param {function} value.getParent - Returns the parent object of the value.
 * @param {function} value.get - Returns the new value as an array [velocity, ...].
 */
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

/**
 * Handles a MIDI Note On event for the Akai APC Mini controller.
 *
 * Depending on the pitch value, this function updates the state of buttons or pads
 * in the local.values object to reflect the received note.
 *
 * - Pitches 64-71: Set "Button F1" to "Button F8".
 * - Pitches 82-89: Set "Button R1" to "Button R8".
 * - Pitches 0-63: Set "Pad X.Y" where X is the row (1-8) and Y is the column (1-8).
 * - Pitch 98: Set "Square" button.
 *
 * @param {number} channel - The MIDI channel number (0-15).
 * @param {number} pitch - The MIDI note number (0-127).
 * @param {number} velocity - The velocity of the note (0-127).
 */
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


/**
 * Handles a MIDI Note Off event for the Akai APC Mini controller.
 *
 * Depending on the pitch value, this function updates the corresponding button or pad state
 * in the local.values object to indicate the note has been released.
 *
 * @param {number} channel - The MIDI channel number (0-15) on which the note off event was received.
 * @param {number} pitch - The MIDI note number (0-127) indicating which note was released.
 * @param {number} velocity - The velocity value associated with the note off event (usually 0).
 */
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

/**
 * Handles a MIDI Control Change (CC) event by logging the event and updating the corresponding fader value.
 *
 * @param {number} channel - The MIDI channel number on which the CC event was received.
 * @param {number} number - The MIDI CC number (controller number).
 * @param {number} value - The value of the CC event (typically 0-127).
 */
function ccEvent(channel, number, value)
{
		script.log(" -- cc Event");

	script.log(" -- ControlChange received "+channel+", "+number+", "+value);
	i = number-47;
	local.values.faders.getChild("Fader " + i).set(value);
}

/**
 * Handles a System Exclusive (SysEx) MIDI event.
 *
 * Logs the receipt of a SysEx message and its length in bytes.
 *
 * @param {Uint8Array|Array<number>} data - The SysEx message data as an array of bytes.
 */
function sysExEvent(data)
{
	script.log(" -- Sysex Message received, "+data.length+" bytes :");
}


resetColors();
