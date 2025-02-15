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
	num: "4.0",
	name: "Low Taper Fade Final",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.1 (Sorry if it's in reverse order)</h3><br>
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
                - Rebalanced the new CT upgrade costs.<br>
	<h3>v0.6.2</h3><br>
                - Swapped Aubrinator upgrade effects of 2:2 and 3:1.<br>
	<h3>v0.6.3</h3><br>
                - Rebalanced massive upgrade costs.<br>
	<h3>v0.6.4</h3><br>
                - Slightly buffed massive upgrade 4.<br>
	<h3>v0.6.5</h3><br>
                - Added initial multipliers to some of the CT subscriber, Madelizer, and Aubrinator upgrades.<br>
	<h3>v0.6.6</h3><br>
                - Reworked Aubrinator and Madelizer upgrade costs.<br>
	<h3>v0.6.7</h3><br>
                - Fixed Madelizer upgrade 1:1 not working as intended.<br>
	<h3>v0.6.8</h3><br>
                - Buffed Aubrinator and Madelizer conversion rates.<br>
	<h3>v0.6.9</h3><br>
                - Fixed a few unlock conditions being buggy.<br>
		- Fixed accidental mega-buffing of Madelizer upgrade 2:2.<br>
	<h3>v0.6.10</h3><br>
                - Buffed Madelizer upgrade 3:1.<br>
		- Reduced softcap effectiveness of massive upgrade 5 to prevent its effect from decaying at ~2e10 massive points.<br>
	<h3>v0.6.11</h3><br>
                - Slightly rebalanced Aubrinator costs.<br>
		- Nerfed LTF upgrade 2:2.<br>
	<h3>v0.6.12</h3><br>
                - Slightly nerfed all dynamic boosts for CT subs, Madelizers, and Aubrinators.<br>
	<h3>v0.6.13</h3><br>
                - Added a super softcap for LTF upgrade 2:1 at 1e80 LTF points.<br>
		- Added super softcaps for Ninja upgrades 1:3 and 2:2 at 1e40 Ninja points.<br>
		- Added a softcap for Ninja upgrade 1:2 at 1e20 Ninja points.<br>
	<h3>v0.6.14</h3><br>
                - Added softcaps for every massive upgrade except massive upgrade 2. For massive upgrade 1 and 3, 1e15, and for massive upgrade 4, 1e20.<br>
	<h3>v1.0</h3><br>
                - Ultra released!!!! Added Infinity prestige layer at 1.7976e308 points with 6 upgrades.<br>
	<h3>v1.1</h3><br>
                - Rebalanced/fixed several upgrades and made the game not crash when buying Infinity upgrade 1:1.<br>
		- Fixed infinity layer not showing up at the correct amount of points.<br>
	<h3>v1.1.1</h3><br>
                - Slightly nerfed Madelizer upgrade 2:2.<br>
	<h3>v1.1.2</h3><br>
                - Slightly buffed Infinity upgrade 1:2.<br>
		- Reduced massive upgrade 5's cost to 100,000 and slightly buffed its effect.<br>
	<h3>v1.2</h3><br>
                - Rebalanced several mid to late-game upgrades.<br>
	<h3>v1.2.1</h3><br>
                - Added a softcap to LTF upgrade 2:5 at 1e300 points.<br>
		- Nerfed Aubrinator upgrade 2:1.<br>
	<h3>v1.2.2</h3><br>
                - Added softcaps to both LTF upgrade 2:2 effects (at 1e200 points and 1e180 LTF points)<br>
	<h3>v1.2.3</h3><br>
                - Slightly buffed Aubrinator upgrade 2:1.<br>
	<h3>v1.2.4</h3><br>
                - Buffed Madelizer upgrade 2:2.<br>
	<h3>v1.2.5</h3><br>
                - Nerfed the Ninja self-boost part of Aubrinator upgrade 2:1.<br>
	<h3>v1.2.6</h3><br>
                - Added a buyable to Infinity layer, costing 40 IP.<br>
	<h3>v1.2.6.1</h3><br>
                - Set an endgame at 1e800 points.<br>
	<h3>v1.3</h3><br>
                - Added softcaps to Madelizer upgrades 1:3, 2:3, and 3:1, all at 1e40 Madelizers.<br>
		- Added softcaps to Aubrinator upgrades 1:3 (at 1e32), 2:1 (at 1e28), and 2:3 (at 1e32).<br>
		- Slightly buffed Infinity buyable effect.<br>
		- Changed Infinity milestone requirement to 1,000 IP.<br>
	<h3>v1.4</h3><br>
                - Added 2 new Infinity upgrades.<br>
                - Added 2 new Ninja and massive upgrades (try to find out the softcaps yourself before v1.5).<br>
	<h3>v1.4.1</h3><br>
                - Added an Infinity challenge!<br>
	<h3>v1.4.2</h3><br>
                - Delayed 1:3, 2:3, and 3:3 Madelizer softcaps to 1e50.<br>
		- Delayed 1:3 and 2:3 Aubrinator softcaps to 1e40 and 2:1 to 1e36.<br>
	<h3>v1.4.3</h3><br>
                - Significantly buffed CT upgrades 1:3 and 2:1, and slightly buffed CT upgrades 2:3 and 3:1.<br>
		- Added softcaps to all mentioned CT upgrades at 1e45 CT subscribers.<br>
	<h3>v1.4.4</h3><br>
                - Returned 1:3 and 2:1 formulas to before v1.4.3 (and removed the softcaps), but slightly buffed.<br>
		- Slightly weakened softcap effectiveness of CT upgrades 2:3 and 3:1 and adjusted the softcap start to 1e40.<br>
	<h3>v1.4.5</h3><br>
                - Delayed CT upgrades 2:3 and 3:1 to 1e45.<br>
		- Delayed Aubrinator upgrades 1:3 and 2:3 to 1e45 and Aubrinator upgrade 2:1 to 1e40.<br>
		- Delayed Madelizer upgrades 1:3, 2:3, and 3:1 to 1e55.<br>
		- Slightly reduced the effectiveness of most of the above mentioned's softcaps.<br>
	<h3>v1.4.6</h3><br>
                - Rebalanced the recently added massive and Ninja upgrade costs.<br>
	<h3>v1.4.7</h3><br>
                - Reduced the exponent-based nerf (now 0.85) in the first Infinity challenge.<br>
		- Added a new Infinity challenge and buyable!<br>
	<h3>v1.4.8</h3><br>
                - Exponent nerf in IC1 is now 0.9.<br>
	<h3>v1.4.9</h3><br>
                - Added softcaps for Infinity upgrades 1:3, 1:4, 2:1, and 2:2 at 1,000,000 Infinity points.<br>
	<h3>v1.4.10</h3><br>
                - Slightly buffed massive upgrade 2:2.<br>
	<h3>v1.4.11</h3><br>
                - Added softcaps to the buyables at 1,000,000 Infinity points.<br>
		- Adjusted goal of IC2 to be 1e84 points.<br>
	<h3>v1.4.12</h3><br>
                - Added a third Infinity challenge.<br>
		- Adjusted endgame to be 1e1000 points.<br>
		- Added 2 new Infinity upgrades.<br>
	<h3>v1.4.13</h3><br>
                - Adjusted IC3 goal to 1e450 points.<br>
		- Adjusted endgame to be 1e1200 points.<br>
	<h3>v1.4.14</h3><br>
                - Slightly reworked Infinity upgrade 3:1 and 3:2 upgrade costs and formulas.<br>
	<h3>v1.4.15</h3><br>
                - Strengthened the softcaps of CT upgrades 2:3 and 3:1 to be similar to those of Aubrinator and Madelizer upgrade softcaps.<br>
	<h3>v1.4.16</h3><br>
                - Slightly nerfed Infinity upgrade 3:1 and made its softcap start sooner (1e18).<br>
	<h3>v1.4.17</h3><br>
                - Added a new infinity upgrade and reworked Infinity upgrade 3:1 entirely.<br>
		- Adjusted endgame to be at 1e1500 points.<br>
	<h3>v1.4.18</h3><br>
                - Added super softcaps for every CT, Madelizer, and Aubrinator upgrade that has softcaps. (except for Madelizer upgrade 2:2.<br>
	<h3>v2.0</h3><br>
                - Added a new post-infinity layer! (2 more are on the way).<br>
		- Adjusted endgame to now be at 1e3000 points.<br>
	<h3>v2.1</h3><br>
                - Added another post-infinity layer! (1 more is on the way).<br>
	<h3>v2.2</h3><br>
                - Added the final post-infinity layer in the set (all basic right now with 3 upgrades).<br>
	<h3>v2.2.1</h3><br>
                - Changed Vexbolts requirement amount to 1e400.<br>
		- Buffed enhancer upgrade 1 to be based on enhancers instead of just being static.<br>
		- Fixed SunnyV2 description showing enhancer description.<br>
	<h3>v2.2.2</h3><br>
                - Buffed Aubrinator upgrade 3:1.<br>
		- Changed SunnyV2 requirement amount to 1e310.<br>
	<h3>v2.2.3</h3><br>
                - Buffed a few Vexbolts, enhancers, and SunnyV2 upgrades.<br>
		- Changed Infinity upgrade 3:4 softcap to 1e33.<br>
		- Reworked cost scaling for the Infinity buyables.<br>
	<h3>v2.3</h3><br>
                - Added softcaps to many layer 5 currency upgrades at 10,000 of their respective currencies.<br>
		- Added 1 new upgrade for each layer 5 currency.<br>
		- Made the Infinity buyable cost scaling for both buyables a bit more aggressive.<br>
	<h3>v2.3.1</h3><br>
                - Added super softcaps to several Infinity upgrades, those being 1:3, 1:4, 2:1, 2:2, 3:1, and 3:4.<br>
	<h3>v2.4</h3><br>
                - Added galaxies!! They boost Ninja and massive point gain and cost Infinity points. It's also a static layer, so you cannot obtain them in bulk.<br>
	<h3>v2.5</h3><br>
                - Added 2 new upgrades to each layer 5 currency. One of the upgrades now makes milestones actually do something!<br>
	<h3>v2.5.Valentine</h3><br>
                - Added a limited-time Valentine's Day currency! It will award some small boosts to layers 1-3 and will extend to the 15th of February. On Valentine's Day, the bonuses will be squared.<br>
	<h3>v3.0.Valentine</h3><br>
                - Added point slowdowns to Infinity points past 1e30.<br>
		- Added 2 more upgrades to each 5 layer currency!<br>
		- Added 2 more Madelizer and Aubrinator upgrades!<br>
		- Made Enhancer upgrade 2:1's formula dynamic.<br>
		- Added point slowdowns to all layer 3 currencies after getting a good amount of their layer 5 points.<br>
		- Added 1 new Valentine's Day upgrade.<br>
	<h3>v3.1.Valentine</h3><br>
                - Added a challenge to each layer 5 currency!<br>
		- Added a buyable to each 5 layer currency (Enhancers get 2)!<br>
		- Added 2 more Madelizer and Aubrinator upgrades!<br>
		- Reworked how the Enhancer challenge's decay works, and buffed its reward.<br>
	<h3>v3.1.1</h3><br>
                - Reworked the Vexbolts and SunnyV2 challenge requirements.<br>
		- Removed the Valentine's Day event.<br>
		- Slightly changed some layer 5 upgrade formulas to prepare for the last layer!<br>
	<h3>v4.0</h3><br>
                - Added a new (and the final) layer with 5 upgrades right now (now we have 6 layers).<br>
		- Added 3 new galaxy upgrades. The last two introduce a new mechanic (Passive prestige point generation, which is why you see per sec values).`


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
	if (hasUpgrade("ltf", 14)) gain = gain.times(2.5);
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
	if (hasUpgrade("infi", 11)) gain = gain.times(upgradeEffect("infi", 11));
        if (hasUpgrade("infi", 13)) gain = gain.times(upgradeEffect("infi", 13));
    	gain = gain.times(buyableEffect("infi", 11));
	if (hasChallenge("infi", 11)) gain = gain.times(challengeEffect("infi", 11));
	if (hasUpgrade("infi", 34)) gain = gain.times(upgradeEffect("infi", 34));
	if (hasUpgrade("vex", 11)) gain = gain.times(upgradeEffect("vex", 11));
	if (hasUpgrade("vex", 14)) gain = gain.times(upgradeEffect("vex", 14));
	if (hasUpgrade("gal", 11)) gain = gain.times(upgradeEffect("gal", 11));
	if (hasUpgrade("enhance", 12)) gain = gain.times(upgradeEffect("enhance", 12));
	if (hasUpgrade("sunny", 11)) gain = gain.times(upgradeEffect("sunny", 11));
	let eboupg = upgradeEffect("enhance", 23).sub(1);
        if (hasUpgrade("enhance", 23) && hasUpgrade("gal", 11)) gain = gain.times(upgradeEffect("gal", 11).pow(eboupg));
	if (hasUpgrade("mady", 33)) gain = gain.times(upgradeEffect("mady", 33));
	let enhanceTime = new Decimal(player.enhance.resetTime);
	let decayFactor = new Decimal(10).pow(enhanceTime.div(10));
	if (inChallenge("enhance", 11)) gain = gain.div(1e12).div(decayFactor);
	if (hasChallenge("enhance", 11)) gain = gain.times(challengeEffect("enhance", 11));
	if (hasUpgrade("liquid", 11)) gain = gain.times(upgradeEffect("liquid", 11));
	if (hasUpgrade("enhance", 21) && hasMilestone("ltf", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("ninja", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("massive", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("mady", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("ct", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("aub", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("infi", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("gal", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("vex", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("enhance", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	if (hasUpgrade("enhance", 21) && hasMilestone("sunny", 0)) gain = gain.times(upgradeEffect("enhance", 21));
	gain = gain.pow(buyableEffect("enhance", 11));
	if (hasUpgrade("massive", 15)) gain = gain.pow(upgradeEffect("massive", 15));
	if (inChallenge("infi", 11)) gain = gain.pow(0.9).div(100);
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
	return player.points.gte(new Decimal("1e3000"))
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
