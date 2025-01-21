let modInfo = {
	name: "The Low Taper Fade Tree",
	author: "Epic Stat Battles",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.6.1",
	name: "Low Taper Fade Zeta",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.1</h3><br>
		- Created game.<br>
		- Added low taper fade and upgrades.<br>
	<h3>v0.0.2</h3><br>
		- Added 3 new upgrades!<br>
		- Improved point gain system with scaling effects.<br>
		- Planning on reworking the buyable in v0.1<br>
		- Made the game have a higher ceiling (approx. 1.0e6).<br>
	<h3>v0.1</h3><br>
		- Added new Ninja layer!<br>
		- Added new layer upgrades!<br>
		- Low Taper Fade Buyable completely removed.<br>
		- Made the game have a higher ceiling (approx. 1.0e15).<br>
  	<h3>v0.1.1</h3><br>
		- Fixed Upgrades doing unnecessary things.<br>
		- Nerfed Ninja Upgrade 1:3<br>
		- Fixed incorrect ceiling display on v0.1.<br>
	<h3>v0.2</h3><br>
		- Added new massive layer!<br>
		- slightly reworked a few upgrades.<br>
		- Ceiling should now be ~1.0e30!<br>
  	<h3>v0.2.1</h3><br>
		- Heavily nerfed massive upgrade 1 since it had an incredibly powerful effect.<br>
	<h3>v0.2.2</h3><br>
		- Swapped Upgrade 1 and 2 in the massive layer<br>
		- Reworked point boost formula in massive upgrade 2 (prev. upg 1)<br>
	<h3>v0.2.3</h3><br>
		- Weakened the first 3 massive upgrades by around 25%<br>
		- Weakened massive upgrade 4 so the boost becomes balanced and not absolutely massive.<br>
		- Fixed changelog html showing version next to last change in previous version.<br>
	<h3>v0.3</h3><br>
		- Added new CT layer, which resets everything before it (including points, LTF, Ninja, and massive points).<br>
		- Added 6 new CT upgrades, 3 more will come soon as those will boost 2 other future layers (in the same row as CT layer)<br>
		- Ceiling/endgame should now be ~1.0e60. <br>
	<h3>v0.3.1</h3><br>
		- Fixed CT layer not branching visually.<br>
		- Fixed new ceiling not showing in v0.3 changelog.<br>
		- Fixed CT layer disappearing after prestiging.<br>
	<h3>v0.3.2</h3><br>
		- Reworked LTF upgrade 6's formula to be a bit stronger early game but slightly weaker late-game.<br>
	<h3>v0.3.3</h3><br>
		- Reworked a few CT upgrade formulas.<br>
		- Nerfed massive upgrade 4 AGAIN (not as much as the last time though).<br>
	<h3>v0.3.4</h3><br>
		- Slightly buffed massive upgrade 4, but not to its pre-v0.3.3 strength.<br>
	<h3>v0.3.5</h3><br>
		- Nerfed Ninja Upgrade 2:3.<br>
		- Slightly nerfed massive upgrades 1, 3, and 4.<br>
	<h3>v0.3.6</h3><br>
		- Slightly rebuffed Ninja Upgrade 2:3.<br>
	<h3>v0.3.7</h3><br>
		- Introduced softcaps for LTF upgrade 6 (at 1e15) and Ninja upgrade 2:2 (at 1e10).<br>
	<h3>v0.3.8</h3><br>
		- Also introduced a softcap for Ninja upgrade 1:3 at 1e10 Ninja points.<br>
	<h3>v0.3.9</h3><br>
		- Fixed softcap for LTF upgrade 6 being based on regular points.<br>
	<h3>v0.3.10</h3><br>
		- Added small base effects to Ninja upgrades 1:2, 1:3, and 2:2.<br>
	<h3>v0.3.11</h3><br>
		- Slightly buffed LTF upgrade 6.<br>
	<h3>v0.3.12</h3><br>
		- Active Softcaps now have an indicator next to their effect.<br>
        <h3>v0.3.13</h3><br>
                - Fixed Ninja upgrade 3 boosting normal point gain.<br>
	<h3>v0.3.14</h3><br>
                - Slightly buffed LTF upgrade 6 and massive upgrade 2 to compensate for the "nerf" to progression from the v0.3.13 change.<br>
	<h3>v0.3.14.1</h3><br>
                - Fixed previous changelog showing wrong massive upgrade.<br>
	<h3>v0.3.15</h3><br>
                - Slightly buffed Ninja upgrade 2:3.<br>
	<h3>v0.3.16</h3><br>
                - Delayed the softcap on LTF upgrade 6 to 1e20 LTF points.<br>
	<h3>v0.3.17</h3><br>
                - Reduced CT prestige requirement to 1e30 points.<br>
	<h3>v0.3.18</h3><br>
                - Slightly weakened LTF upgrade 6's softcap strength.<br>
		- Added small initial multipliers to massive upgrades 1 and 3.<br>
	<h3>v0.3.18.1</h3><br>
                - Fixed massive upgrade 2 getting the 1.2x initial boost instead of massive upgrade 3.<br>
	<h3>v0.3.19</h3><br>
                - Added a new massive upgrade!<br>
	<h3>v0.3.20</h3><br>
                - Nerfed massive upgrade 5's effect.<br>
	<h3>v0.4</h3><br>
                - FINALLY ADDED A NEW LAYER.<br>
		- Rebalanced several upgrades.<br>
		- Ceiling should be ~1e120 now.<br>
	<h3>v0.4.1</h3><br>
                - Fixed a bunch of upgrade effects malfunctioning.<br>
	<h3>v0.4.2</h3><br>
                - Fixed LTF upgrade 2:2 point boost effect malfunctioning.<br>
		- Slightly buffed Madelizer 2:2 upgrade formula.<br>
	<h3>v0.4.3</h3><br>
                - Added a softcap to massive upgrade 5 at 1e10 massive points.<br>
	<h3>v0.4.4</h3><br>
                - Added a softcap to Madelizer upgrade 2:2 at 100,000 Madelizers.<br>
	<h3>v0.5.-1</h3><br>
                - Added, but then removed a layer due to malfunction.<br>
	<h3>v0.5</h3><br>
                - Added the layer again. It is very simple at the moment due to fear of another malfunction.<br>
	<h3>v0.6</h3><br>
                - Added LOTS of features to the new layer and 3 new CT upgrades!<br>
	<h3>v0.6.1</h3><br>
                - Rebalanced the new CT upgrade costs.`


let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
        if (hasUpgrade("ltf", 11)) gain = gain.times(2);
	if (hasUpgrade("ltf", 14)) gain = gain.times(2.5)
   	if (hasUpgrade("ltf", 15)) gain = gain.times(upgradeEffect("ltf", 15));
   	if (hasUpgrade("ltf", 21)) gain = gain.times(upgradeEffect("ltf", 21));
	if (hasUpgrade("ninja", 11)) gain = gain.times(3);
    	if (hasUpgrade("ninja", 12)) gain = gain.times(upgradeEffect("ninja", 12));
    	if (hasUpgrade("ninja", 21)) gain = gain.times(upgradeEffect("ninja", 21));
    	if (hasUpgrade("ninja", 22)) gain = gain.times(upgradeEffect("ninja", 22));
	if (hasUpgrade("massive", 12)) gain = gain.times(upgradeEffect("massive", 12));
	if (hasUpgrade("ct", 11)) gain = gain.times(upgradeEffect("ct", 11));
	if (hasUpgrade("ct", 13)) gain = gain.times(upgradeEffect("ct", 13));
	if (hasUpgrade("mady", 12)) gain = gain.times(upgradeEffect("mady", 12));
	if (hasUpgrade("mady", 31)) gain = gain.times(upgradeEffect("mady", 31));
	if (hasUpgrade("aub", 13)) gain = gain.times(upgradeEffect("aub", 13));
	if (hasUpgrade("ltf", 22)) gain = gain.times(upgradeEffect("ltf", 22).pointsBoost);
	if (hasUpgrade("ct", 31)) gain = gain.times(upgradeEffect("ct", 31));
	if (hasUpgrade("massive", 15)) gain = gain.pow(upgradeEffect("massive", 15));
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
