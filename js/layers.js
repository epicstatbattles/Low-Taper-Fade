addLayer("ltf", {
    name: "Low Taper Fade", // Full name of the layer
    symbol: "L", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#1E90FF", // A stylish blue color for the layer
    requires: new Decimal(10), // Points required to gain this layer
    resource: "low taper fade points", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.5, // Scaling factor for prestige points
    softcap: new Decimal("1e2000"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500));
        if (getResetGain("ltf", "normal").gte("1e5000")) scpwr = scpwr.div(getResetGain("ltf", "normal").log10().div(5000).pow(0.25));
        return scpwr;
    },
    autoUpgrade() { return hasUpgrade("infi", 13) || hasMilestone("liquid", 0) || (hasMilestone("ct", 1) && player.ct.engagement.gte(1000)); },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 0)) passive = passive.add(1);
        if (player.ct.engagement.gte(0.001)) passive = passive.add(player.ct.engagement.pow(0.5).div(100));
        return passive;
    },
    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ltf", 12)) mult = mult.times(upgradeEffect("ltf", 12)); // Double gains with Upgrade 12
        if (hasUpgrade("ltf", 13)) mult = mult.times(upgradeEffect("ltf", 13)); // Scale gains further
        if (hasUpgrade("ninja", 13)) mult = mult.times(upgradeEffect("ninja", 13)); // Scale gains further
        if (hasUpgrade("ninja", 14)) mult = mult.times(upgradeEffect("ninja", 14)); // Scale gains further
        if (hasUpgrade("ninja", 24)) mult = mult.times(upgradeEffect("ninja", 24)); // Scale gains further
        if (hasUpgrade("massive", 11)) mult = mult.times(upgradeEffect("massive", 11));
        if (hasUpgrade("ct", 12)) mult = mult.times(upgradeEffect("ct", 12));
        if (hasUpgrade("ct", 21)) mult = mult.times(upgradeEffect("ct", 21));
        if (hasUpgrade("ltf", 22)) mult = mult.times(upgradeEffect("ltf", 22).ltfBoost);
        if (hasUpgrade("mady", 13)) mult = mult.times(upgradeEffect("mady", 13));
        if (hasUpgrade("mady", 21)) mult = mult.times(upgradeEffect("mady", 21));
        if (hasUpgrade("ltf", 25)) mult = mult.times(upgradeEffect("ltf", 25));
        if (hasUpgrade("aub", 12)) mult = mult.times(upgradeEffect("aub", 12));
        if (hasUpgrade("ct", 31)) mult = mult.times(upgradeEffect("ct", 31));
        if (hasUpgrade("infi", 11)) mult = mult.times(4);
        if (hasUpgrade("infi", 14)) mult = mult.times(upgradeEffect("infi", 14));
        if (hasUpgrade("ninja", 31)) mult = mult.times(upgradeEffect("ninja", 31));
        if (hasUpgrade("infi", 31)) mult = mult.times(upgradeEffect("infi", 31));
        if (hasUpgrade("infi", 32)) mult = mult.times(upgradeEffect("infi", 32));
        if (hasUpgrade("vex", 12)) mult = mult.times(upgradeEffect("vex", 12));
        if (hasUpgrade("vex", 22)) mult = mult.times(upgradeEffect("vex", 22));
        if (hasUpgrade("revo", 22)) mult = mult.times(upgradeEffect("revo", 22));
        mult = mult.times(buyableEffect("revo", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasChallenge("sunny", 11)) mult = mult.times(challengeEffect("sunny", 11));
        if (hasMilestone("revo", 0)) mult = mult.times(1.4);
        if (hasUpgrade("gal", 12)) mult = mult.times(upgradeEffect("gal", 12));
        if (hasUpgrade("sunny", 13)) mult = mult.times(upgradeEffect("sunny", 13));
        if (hasUpgrade("sunny", 21)) mult = mult.times(upgradeEffect("sunny", 21));
        if (hasMilestone("liquid", 0)) mult = mult.times(1000);
        if (hasUpgrade("liquid", 12)) mult = mult.times(upgradeEffect("liquid", 12));
        mult = mult.times(buyableEffect("infi", 12));
        return mult; // Ensure the function closes correctly
    },

    gainExp() {
        let exp = new Decimal(1); // Default exponent
        if (hasMilestone("vex", 1)) exp = exp.times(1.015);
        if (hasMilestone("enhance", 2)) exp = exp.times(1.015);
        if (hasMilestone("sunny", 1)) exp = exp.times(1.015);
        return exp;
    },

    row: 0, // Row in the tree (0 = top row)
    hotkeys: [
        { key: "l", description: "L: Reset for low taper fade points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The Low Taper Fade Haircut is all about precision and style. Prestige in this layer to show off your hair-styling skills, with a bit of meme culture along the way!",
            unlocked() { return player.ltf.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Fresh Comb",
            description: "Multiply point gain by 2, simple little upgrade.",
            cost: new Decimal(2),
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant",11));
                if (hasUpgrade("enchant", 11)) expBoost = expBoost.times(5);
                return new Decimal(2).pow(expBoost);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Sharp Clippers",
            description: "Double low taper fade point gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("ltf", 11); },
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant",11));
                if (hasUpgrade("enchant", 11)) expBoost = expBoost.times(5);
                return new Decimal(2).pow(expBoost);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "The Meme begins to grow... Grow MASSIVE!",
            description: "Boost low taper fade points based on their amount.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("ltf", 12); },
            effect() {
                return player.ltf.points.add(1).log10().add(1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "People are getting the haircut",
            description: "Increase point gain by 2.5x.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("ltf", 13); },
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant",11));
                if (hasUpgrade("enchant", 11)) expBoost = expBoost.times(5);
                return new Decimal(2.5).pow(expBoost);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        15: {
            title: "Ninja's Dragging The Meme",
            description: "Increase point gain based on your low taper fade points.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("ltf", 14); },
            effect() {
                return player.ltf.points.add(10).log10().pow(1.625); // Logarithmic growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Imagine If Ninja got a LOW TAPER FADE",
            description: "Boost point gain MASSIVELY based on low taper fade points.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("ltf", 15); },
            effect() {
                let base = player.ltf.points.times(4).add(1).pow(0.375); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for points >= 1e20
                if (player.ltf.points.gte(new Decimal(1e20))) {
                    firstDiminishingFactor = player.ltf.points.div(1e20).pow(0.175);
                }

                // Apply second diminishing factor for points >= 1e80
                if (player.ltf.points.gte(new Decimal(1e80))) {
                    secondDiminishingFactor = player.ltf.points.div(1e80).pow(0.125);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.ltf.points.gte(1e20); // Check if softcap applies
                let isSuperSoftcapped = player.ltf.points.gte(1e80); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "The Edits Go VIRAL!",
            description: "Points and LTF points boost each other.",
            cost: new Decimal(1e33),
            unlocked() { return hasUpgrade("mady", 21) && hasUpgrade("ltf", 21); },
            effect() {
                // LTF point boost calculation
                let baseLtfBoost = player.points.div(1e40).add(1).pow(0.05); // Original effect formula for LTF boost
                let diminishingFactorLtfBoost = new Decimal(1); // Default factor for LTF boost

                // Apply diminishing factor for LTF boost if points exceed 1e200
                if (player.points.gte(new Decimal(1e200))) {
                    diminishingFactorLtfBoost = player.points.div(1e200).pow(0.025); // Softcap factor for LTF points
                }

                // Points boost calculation
                let basePointsBoost = player.ltf.points.div(1e27).add(1).pow(0.0675); // Original effect formula for points boost
                let diminishingFactorPointsBoost = new Decimal(1); // Default factor for points boost

                // Apply diminishing factor for points boost if LTF points exceed 1e200
                if (player.ltf.points.gte(new Decimal(1e180))) {
                    diminishingFactorPointsBoost = player.ltf.points.div(1e180).pow(0.03375); // Softcap factor for LTF points
                }

                // Calculate final effects after applying both diminishing factors
                let finalLtfBoost = baseLtfBoost.div(diminishingFactorLtfBoost);
                let finalPointsBoost = basePointsBoost.div(diminishingFactorPointsBoost);

                return { ltfBoost: finalLtfBoost, pointsBoost: finalPointsBoost };
            },

            effectDisplay() {
                let eff = this.effect();
                // Check if the respective points exceed the threshold for softcap
                let isLtfBoostSoftcapped = player.points.gte(1e200);  // LTF Boost softcap check
                let isPointsBoostSoftcapped = player.ltf.points.gte(1e180);  // Points Boost softcap check
                // Build the display string
                let display = `LTF Boost: x${format(eff.ltfBoost)}`;
                if (isLtfBoostSoftcapped) {
                    display += " (SC)";  // Append "(SC)" if the LTF Boost exceeds the softcap threshold
                }
                display += `, Point Boost: x${format(eff.pointsBoost)}`;
                if (isPointsBoostSoftcapped) {
                    display += " (SC)";  // Append "(SC)" if the Points Boost exceeds the softcap threshold
                }

                return display;  // Return the final string
            },
        },
        23: {
            title: "The 2 Draggers",
            description: "Ninja and Madelyn drag the meme A LOT! Massive point gain is boosted by LTF points.",
            cost: new Decimal(1e39),
            unlocked() { return hasUpgrade("ltf", 22); },
            effect() {
                return player.ltf.points.div(1e20).add(1).pow(0.025); // Slow but steady growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        24: {
            title: "Codename Low Taper Fade",
            description: "CT sub gain is boosted by LTF points.",
            cost: new Decimal(1e45),
            unlocked() { return hasUpgrade("ltf", 23); },
            effect() {
                return player.ltf.points.div(1e25).add(1).pow(0.01625); // Logarithmic growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        25: {
            title: "Widespread Meme",
            description: "Boost LTF, Ninja, and massive points based on points.",
            cost: new Decimal(1e60),
            unlocked() { return hasUpgrade("ltf", 24); },
            effect() {
                let base = player.points.div(1e50).add(1).pow(0.0125); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.points.gte(new Decimal(1e300))) {
                    diminishingFactor = player.points.div(1e300).pow(0.00625); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.points.gte(1e300); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1000 Low Taper Fade Points",  // Milestone requirement
            effectDescription: "Certified Low Taper Fade Specialist",  // Updated effect description
            done() { return player.ltf.points.gte(1000); },  // Milestone unlock condition
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.ltf.points.gte(new Decimal("1e1800"))) {
                    return '<span style="color: red;">LTF point gains will slow down beyond 1e2000 LTF points.</span>';
                }
                return "";
            }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("ninja", {
    name: "Ninja", // Full name of the layer
    symbol: "N", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#70f3ff", // Lighter than LTF
    requires: new Decimal(10000), // Points required to unlock this layer
    resource: "Ninja points", // Prestige currency name
    baseResource: "low taper fade points", // Resource used to gain prestige points
    baseAmount() { return player.ltf.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.4, // Scaling factor for prestige points
    softcap: new Decimal("1e1500"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("ninja", "normal").gte("1e3750")) scpwr = scpwr.div(getResetGain("ninja", "normal").log10().div(3750).pow(0.25));
        return scpwr;
    },
    autoUpgrade() { return hasUpgrade("infi", 13) || hasMilestone("liquid", 4); },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 0)) passive = passive.add("1e-12");
        if (hasMilestone("enhance", 1)) passive = passive.add("1e-16");
        if (hasMilestone("liquid", 4)) passive = passive.add("1");
        return passive;
    },
    layerShown() {
        // Check if the player has at least 1e3 LTF points
        return player.ltf.points.gte(new Decimal(1000)) || player.ninja.unlocked==true;
    },
    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ninja", 23)) mult = mult.times(upgradeEffect("ninja", 23));
        if (hasUpgrade("massive", 13)) mult = mult.times(upgradeEffect("massive", 13));
        if (hasUpgrade("ct", 23)) mult = mult.times(upgradeEffect("ct", 23));
        if (hasUpgrade("ltf", 25)) mult = mult.times(upgradeEffect("ltf", 25));
        if (hasUpgrade("aub", 21)) mult = mult.times(upgradeEffect("aub", 21));
        if (hasUpgrade("mady", 11)) mult = mult.times(upgradeEffect("mady", 11));
        if (hasUpgrade("infi", 11)) mult = mult.times(4);
        if (hasUpgrade("infi", 21)) mult = mult.times(upgradeEffect("infi", 21));
        if (hasUpgrade("infi", 24)) mult = mult.times(upgradeEffect("infi", 24));
        if (hasUpgrade("infi", 32)) mult = mult.times(upgradeEffect("infi", 32));
        if (hasUpgrade("vex", 12)) mult = mult.times(upgradeEffect("vex", 12));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("sunny", 13)) mult = mult.times(upgradeEffect("sunny", 13));
        if (hasUpgrade("enhance", 14)) mult = mult.times(upgradeEffect("enhance", 14));
        if (hasUpgrade("revo", 14)) mult = mult.times(upgradeEffect("revo", 14));
        if (hasUpgrade("vex", 24)) mult = mult.times(upgradeEffect("vex", 24));
        if (hasUpgrade("aub", 32)) mult = mult.times(upgradeEffect("aub", 32));
        if (hasChallenge("vex", 11)) mult = mult.times(challengeEffect("vex", 11));
        if (hasMilestone("liquid", 1)) mult = mult.times(100);
        if (hasUpgrade("liquid", 14)) mult = mult.times(upgradeEffect("liquid", 14));
        if (inChallenge("infi", 21)) mult = mult.times(0);
        if (inChallenge("vex", 11)) mult = mult.times(0);
        return mult;
    },

    gainExp() {
        let exp = new Decimal(1); // Default exponent
        if (hasUpgrade("mady", 22)) exp = exp.times(upgradeEffect("mady", 22)); // Example upgrade adding 0.2 to the exponent
        return exp;
    },
    row: 1, // Row in the tree (1 = second row)
    branches: ["ltf"], // Branch from the LTF layer visually

    hotkeys: [
        { key: "e", description: "E: Reset for Ninja points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "Ninja has dragged the meme too far and now the Low Taper Fade is a MASSIVE haircut!",
            unlocked() { return player.ninja.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Ninja, Certified Meme Dragger",
            description: "Multiply point gain by 3. This should get you back on your feet.",
            cost: new Decimal(1),
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant",12));
                if (hasUpgrade("enchant", 12)) expBoost = expBoost.times(5);
                return new Decimal(3).pow(expBoost); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Hair Dye Incident",
            description: "Points are now boosted based on your Ninja points (initial multiplier of 1.2x).",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("ninja", 11); },
            effect() {
                let initMulti = new Decimal(1.2).pow(new Decimal(1).add(buyableEffect("enchant",12)));
                if (hasUpgrade("enchant", 12)) initMulti = initMulti.pow(5);
                let base = player.ninja.points.add(1).pow(0.175).times(initMulti);
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ninja.points.gte(new Decimal(1e20))) {
                    diminishingFactor = player.ninja.points.div(1e20).pow(0.0875); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.ninja.points.gte(1e20); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "Operation Meme Drag",
            description: "Low taper fade points are boosted based on your Ninja points (initial multiplier of 1.2x).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ninja", 12); },
            effect() {
                let initMulti = new Decimal(1.2).pow(new Decimal(1).add(buyableEffect("enchant",12)));
                if (hasUpgrade("enchant", 12)) initMulti = initMulti.pow(5);
                let base = player.ninja.points.div(3).add(1).pow(0.35).times(initMulti); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for points >= 1e20
                if (player.ninja.points.gte(new Decimal(1e10))) {
                    firstDiminishingFactor = player.ninja.points.div(1e10).pow(0.15);
                }

                // Apply second diminishing factor for points >= 1e80
                if (player.ninja.points.gte(new Decimal(1e40))) {
                    secondDiminishingFactor = player.ninja.points.div(1e40).pow(0.1);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.ninja.points.gte(1e10); // Check if softcap applies
                let isSuperSoftcapped = player.ninja.points.gte(1e40); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "Prolonged Lifespan",
            description: "Low taper fade point gain increases based on their amount.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("ninja", 13); },
            effect() {
                return player.ltf.points.div(20).add(1).pow(0.055);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Perpetual Fame",
            description: "Points will now boost themselves!",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("ninja", 14); },
            effect() {
                return player.points.div(1000).add(1).pow(0.1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "Massive Meme Enhancer",
            description: "MASSIVELY boost point gain based on Ninja points (initial multiplier of 1.44x).",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("ninja", 21); },
            effect() {
                let initMulti = new Decimal(1.44).pow(new Decimal(1).add(buyableEffect("enchant",12)));
                if (hasUpgrade("enchant", 12)) initMulti = initMulti.pow(5);
                let base = player.ninja.points.div(4).add(1).pow(0.55).times(initMulti);
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for points >= 1e20
                if (player.ninja.points.gte(new Decimal(1e10))) {
                    firstDiminishingFactor = player.ninja.points.div(1e10).pow(0.25);
                }

                // Apply second diminishing factor for points >= 1e80
                if (player.ninja.points.gte(new Decimal(1e40))) {
                    secondDiminishingFactor = player.ninja.points.div(1e40).pow(0.15);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.ninja.points.gte(1e10); // Check if softcap applies
                let isSuperSoftcapped = player.ninja.points.gte(1e40); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Second Drag",
            description: "Points boost Ninja point gain.",
            cost: new Decimal(125),
            unlocked() { return hasUpgrade("ninja", 22); },
            effect() {
                return player.points.add(1).pow(0.036);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        24: {
            title: "Improved Meme Spreading",
            description: "Same as Prolonged Lifespan, but stronger.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("ninja", 23); },
            effect() {
                return player.ltf.points.div(20).add(1).pow(0.065);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        31: {
            title: "Fanmade LTF Convention",
            description: "A fan makes a Low Taper Fade convention to honor Ninja's meme dragging. Boost LTF point gain based on Ninja points.",
            cost: new Decimal(1e260),
            unlocked() { return hasUpgrade("ninja", 24) && hasUpgrade("infi", 24); },
            effect() {
                let base = player.ninja.points.div(1e250).add(1).pow(0.08); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ninja.points.gte(new Decimal("1e480"))) {
                    diminishingFactor = player.ninja.points.div("1e480").pow(0.04); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.ninja.points.gte("1e480"); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        32: {
            title: "Codename Madelize",
            description: "Madelizer and CT sub gain are boosted based on Ninja points.",
            cost: new Decimal("1e320"),
            unlocked() { return hasUpgrade("ninja", 31); },
            effect() {
                let base = player.ninja.points.div("1e310").add(1).pow(0.035); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ninja.points.gte(new Decimal("1e540"))) {
                    diminishingFactor = player.ninja.points.div("1e540").pow(0.0175); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.ninja.points.gte("1e540"); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
    },

    milestones: {
        0: {
            requirementDescription: "10000 Ninja Points",
            effectDescription: "Meme Dragging Specialist",
            done() { return player.ninja.points.gte(10000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.ninja.points.gte(new Decimal("1e1350"))) {
                    return '<span style="color: red;">Ninja point gains will slow down beyond 1e1500 Ninja points.</span>';
                }
                return "";
            }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("massive", {
    name: "Massive", // Full name of the layer
    symbol: "MS", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#adadad", // Light Gray
    requires: new Decimal(1000000), // Points required to unlock this layer
    resource: "massive points", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.25, // Scaling factor for prestige points
    softcap: new Decimal("1e800"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("massive", "normal").gte("1e2000")) scpwr = scpwr.div(getResetGain("massive", "normal").log10().div(2000).pow(0.25));
        return scpwr;
    },
    autoUpgrade() { return hasUpgrade("infi", 13) || hasMilestone("liquid", 4); },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 0)) passive = passive.add("1e-12");
        if (hasMilestone("enhance", 1)) passive = passive.add("1e-16");
        if (hasMilestone("liquid", 4)) passive = passive.add("1");
        return passive;
    },
    layerShown() {
        // Check if the player has at least 1e5 points
        return player.points.gte(new Decimal(100000)) || player.massive.unlocked==true;
    },
    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("massive", 14)) mult = mult.times(upgradeEffect("massive", 14));
        if (hasUpgrade("ct", 23)) mult = mult.times(upgradeEffect("ct", 23));
        if (hasUpgrade("ltf", 25)) mult = mult.times(upgradeEffect("ltf", 25));
        if (hasUpgrade("mady", 23)) mult = mult.times(upgradeEffect("mady", 23));
        if (hasUpgrade("ltf", 23)) mult = mult.times(upgradeEffect("ltf", 23));
        if (hasUpgrade("aub", 11)) mult = mult.times(upgradeEffect("aub", 11));
        if (hasUpgrade("aub", 23)) mult = mult.times(upgradeEffect("aub", 23));
        if (hasUpgrade("infi", 11)) mult = mult.times(4);
        if (hasUpgrade("infi", 21)) mult = mult.times(upgradeEffect("infi", 21));
        if (hasUpgrade("infi", 23)) mult = mult.times(upgradeEffect("infi", 23));
        if (hasUpgrade("infi", 24)) mult = mult.times(upgradeEffect("infi", 24));
        if (hasUpgrade("infi", 32)) mult = mult.times(upgradeEffect("infi", 32));
        if (hasUpgrade("vex", 12)) mult = mult.times(upgradeEffect("vex", 12));
        if (hasUpgrade("sunny", 13)) mult = mult.times(upgradeEffect("sunny", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("enhance", 14)) mult = mult.times(upgradeEffect("enhance", 14));
        if (hasUpgrade("revo", 14)) mult = mult.times(upgradeEffect("revo", 14));
        if (hasUpgrade("vex", 24)) mult = mult.times(upgradeEffect("vex", 24));
        if (hasChallenge("vex", 11)) mult = mult.times(challengeEffect("vex", 11));
        if (hasMilestone("liquid", 1)) mult = mult.times(100);
        if (hasUpgrade("liquid", 14)) mult = mult.times(upgradeEffect("liquid", 14));
        if (inChallenge("sunny", 11)) mult = mult.times(0);
        return mult;
    },

    gainExp() {
        let exp = new Decimal(1); // Default exponent
        if (hasUpgrade("infi", 33)) exp = exp.times(upgradeEffect("infi", 33));
        return exp;
    },

    row: 1, // Row in the tree (1 = second row)
    branches: ["ltf"], // Branch from the LTF layer visually

    hotkeys: [
        { key: "m", description: "M: Reset for Massive points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The massiveness of the meme has become so unstable that it managed to branch off from the meme it originated from!",
            unlocked() { return player.massive.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Massive Low Taper Fade Boost",
            description: "Low taper fade points are boosted based on massive points (initial multiplier of 1.1x).",
            cost: new Decimal(1),
            effect() {
                let initMulti = new Decimal(1.1).pow(new Decimal(1).add(buyableEffect("enchant",13)));
                if (hasUpgrade("enchant", 13)) initMulti = initMulti.pow(5);
                let base = player.massive.points.div(2).add(1).pow(0.26).times(initMulti); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e15))) {
                    diminishingFactor = player.massive.points.div(1e15).pow(0.125); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte(1e15); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        12: {
            title: "Massive Point Boost",
            description: "Point gain is MASSIVELY boosted based on their amount and massive points.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("massive", 11); },
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant",13).div(4));
                let massiveEffect = player.massive.points.add(10).log10().pow(1.2).pow(expBoost); // Effect based on massive points
                let normalEffect = player.points.div(10).add(1).pow(0.112); // Effect based on normal points

                return normalEffect.times(massiveEffect);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Massive Ninja Boost",
            description: "Ninja points are boosted based on massive points (initial multiplier of 1.2x).",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade("massive", 12); },
            effect() {
                let initMulti = new Decimal(1.2).pow(new Decimal(1).add(buyableEffect("enchant",13)));
                if (hasUpgrade("enchant", 13)) initMulti = initMulti.pow(5);
                let base = player.massive.points.div(3).add(1).pow(0.22).times(initMulti); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e15))) {
                    diminishingFactor = player.massive.points.div(1e15).pow(0.1); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte(1e15); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "Self-Boost",
            description: "Massive points boost themselves! (Warning: Might lead to inflation)",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("massive", 13); },
            effect() {
                let base = player.massive.points.div(20).add(1).pow(0.175); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e20))) {
                    diminishingFactor = player.massive.points.div(1e20).pow(0.0875); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte(1e20); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        15: {
            title: "Point Powerizer",
            description: "Point gain is RAISED to an exponent based on massive points.",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade("massive", 14); },
            effect() {
                let base = player.massive.points.div(25000).add(10).log10().pow(0.06); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e10))) {
                    diminishingFactor = player.massive.points.div(1e9).log10().pow(0.014); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte(1e10); // Check if softcap applies
                let display = "^" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "Infinity Booster",
            description: "Boost Infinity point gain based on massive points (initial 1.1x multi).",
            cost: new Decimal(1e180),
            unlocked() { return hasUpgrade("massive", 15) && hasUpgrade("infi", 24); },
            effect() {
                let base = player.massive.points.div(1e178).add(1).pow(0.01).times(1.1); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e300))) {
                    diminishingFactor = player.massive.points.div(1e300).pow(0.005); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte(1e300); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "Codified Aubrination",
            description: "Aubrinator and CT sub gain are boosted based on massive points.",
            cost: new Decimal(1e225),
            unlocked() { return hasUpgrade("massive", 21); },
            effect() {
                let base = player.massive.points.div(1e223).add(1).pow(0.045); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal("1e360"))) {
                    diminishingFactor = player.massive.points.div("1e360").pow(0.02); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.massive.points.gte("1e360"); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
    },

    milestones: {
        0: {
            requirementDescription: "1000000 Massive Points",
            effectDescription: "Meme Dragging Expert",
            done() { return player.massive.points.gte(1000000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.massive.points.gte(new Decimal("1e720"))) {
                    return '<span style="color: red;">Massive point gains will slow down beyond 1e800 massive points.</span>';
                }
                return "";
            }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("mady", {
    name: "Madelizers", // Full name of the layer
    symbol: "MD", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#7b00ff", // purple
    requires: new Decimal(1e12), // Points required to unlock this layer
    resource: "Madelizers", // Prestige currency name
    baseResource: "Ninja points", // Resource used to gain prestige points
    baseAmount() { return player.ninja.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.27, // Scaling factor for prestige points
    autoUpgrade() { return hasUpgrade("infi", 32); },
    softcap: new Decimal("1e450"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("mady", "normal").gte("1e1125")) scpwr = scpwr.div(getResetGain("mady", "normal").log10().div(1125).pow(0.25));
        return scpwr;
    },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 4)) passive = passive.add("1e-12");
        return passive;
    },
    layerShown() {
        // Check if the player has at least 1e9 Ninja points
        return player.ninja.points.gte(new Decimal(1e9)) || player.mady.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ct", 33)) mult = mult.times(upgradeEffect("ct", 33).madyBoost);
        if (hasUpgrade("infi", 12)) mult = mult.times(upgradeEffect("infi", 12));
        if (hasUpgrade("ninja", 32)) mult = mult.times(upgradeEffect("ninja", 32));
        if (hasChallenge("infi", 21)) mult = mult.times(challengeEffect("infi", 21));
        if (hasUpgrade("vex", 13)) mult = mult.times(upgradeEffect("vex", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("revo", 21)) mult = mult.times(upgradeEffect("revo", 21));
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
        if (hasUpgrade("vex", 23)) mult = mult.times(upgradeEffect("vex", 23));
        if (hasUpgrade("enhance", 21)) mult = mult.times(upgradeEffect("enhance", 21));
        if (hasUpgrade("aub", 32)) mult = mult.times(upgradeEffect("aub", 32));
        if (hasUpgrade("liquid", 15)) mult = mult.times(upgradeEffect("liquid", 15));
        mult = mult.times(buyableEffect("vex", 11));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 2, // Row in the tree (2 = third row)
    branches: ["ninja"], // Branch from Ninja visually

    hotkeys: [
        { key: "1", description: "1: Reset for Madelizers", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "Ninja needs to drag the meme longer so it doesn't fade! The problem is, he just can't do it on his own. So he hired Madelyn to essentially increase the dragging effect so the meme lasts longer.",
            unlocked() { return player.mady.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "New Meme Dragger",
            description: "Madelyn begins dragging the meme too? Gain a 3x boost to Ninja points.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(3); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "In Public, Too?",
            description: "Madelyn goes out of her way to drag the meme in public. Points are boosted based on Madelizers. (initial 1.25x multi)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("mady", 11); },
            effect() {
                return player.mady.points.times(1.5).add(10).log10().pow(2).times(1.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Video Collab",
            description: "Ninja and Madelyn make a video together to drag the meme some more. Madelizers boost LTF points (initial 1.3x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("mady", 12); },
            effect() {
                let base = player.mady.points.add(1).pow(0.32).times(1.3); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.mady.points.gte(new Decimal(1e55))) {
                    firstDiminishingFactor = player.mady.points.div(1e55).pow(0.128);
                }

                if (player.mady.points.gte(new Decimal(1e165))) {
                    secondDiminishingFactor = player.mady.points.div(1e165).pow(0.096);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte(1e55); // Check if softcap applies
                let isSuperSoftcapped = player.mady.points.gte(1e165); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "New Dragging Methods",
            description: "Madelyn finds new ways to drag the meme. Unlock 4 new LTF upgrades and slightly boost their gain (1.25x).",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("mady", 13); },
            effect() {
                return new Decimal(1.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "More Video Appearances",
            description: "Ninja and Madelyn make nearly video together, sometimes to drag the meme more. Raise Ninja point gain based on Madelizers (initial ^1.01 exponent).",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("mady", 21); },
            effect() {
                let base = player.mady.points.div(40).add(10).log10().pow(0.092).times(1.01); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.mady.points.gte(new Decimal(1e5))) {
                    diminishingFactor = player.mady.points.div(1e4).log10().pow(0.02); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte(1e5); // Check if softcap applies
                let display = "^" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Song Development",
            description: "Madelyn instructs someone to make a Low Taper Fade song... Boost massive point gain based on Madelizers (initial 1.4x multi).",
            cost: new Decimal(4000),
            unlocked() { return hasUpgrade("mady", 22); },
            effect() {
                let base = player.mady.points.div(4).add(1).pow(0.225).times(1.4); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.mady.points.gte(new Decimal(1e55))) {
                    firstDiminishingFactor = player.mady.points.div(1e55).pow(0.09);
                }

                if (player.mady.points.gte(new Decimal(1e165))) {
                    secondDiminishingFactor = player.mady.points.div(1e165).pow(0.0675);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte(1e55); // Check if softcap applies
                let isSuperSoftcapped = player.mady.points.gte(1e165); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        31: {
            title: "Song Releases",
            description: "The song releases and now people just have to watch it. Boost point gain MASSIVELY based on Madelizers.",
            cost: new Decimal(25600),
            unlocked() { return hasUpgrade("mady", 23); },
            effect() {
                let base = player.mady.points.div(4).add(1).pow(0.525); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.mady.points.gte(new Decimal(1e55))) {
                    firstDiminishingFactor = player.mady.points.div(1e55).pow(0.21);
                }

                if (player.mady.points.gte(new Decimal(1e165))) {
                    secondDiminishingFactor = player.mady.points.div(1e165).pow(0.1575);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte(1e55); // Check if softcap applies
                let isSuperSoftcapped = player.mady.points.gte(1e165); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        32: {
            title: "The Algorithm Drags It Too",
            description: "The dragging compilations cause the algorithm to promote the meme. Boost Infinity point gain based on Madelizers.",
            cost: new Decimal("1e500"),
            unlocked() { return hasUpgrade("mady", 31) && hasUpgrade("vex", 23); },
            effect() {
                let base = player.mady.points.div("1e490").add(1).pow(0.02); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.mady.points.gte(new Decimal("1e620"))) {
                    firstDiminishingFactor = player.mady.points.div("1e620").pow(0.01);
                }

                if (player.mady.points.gte(new Decimal("1e900"))) {
                    secondDiminishingFactor = player.mady.points.div("1e900").pow(0.005);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte("1e620"); // Check if softcap applies
                let isSuperSoftcapped = player.mady.points.gte("1e900"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        33: {
            title: "Madelyn vs MrBeast?",
            description: "The dragging causes Madelyn to near MrBeast's subcount at a rapid pace of 1M/day! Boost point gain even more based on Madelizers.",
            cost: new Decimal("1e540"),
            unlocked() { return hasUpgrade("mady", 32); },
            effect() {
                let base = player.mady.points.div("1e530").add(1).pow(0.4); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.mady.points.gte(new Decimal("1e660"))) {
                    firstDiminishingFactor = player.mady.points.div("1e660").pow(0.2);
                }

                if (player.mady.points.gte(new Decimal("1e940"))) {
                    secondDiminishingFactor = player.mady.points.div("1e940").pow(0.1);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.mady.points.gte("1e660"); // Check if softcap applies
                let isSuperSoftcapped = player.mady.points.gte("1e940"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
    },

    milestones: {
        0: {
            requirementDescription: "100000 Madelizers",
            effectDescription: "Meme Dragging Beast",
            done() { return player.mady.points.gte(100000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.mady.points.gte(new Decimal("1e405"))) {
                    return '<span style="color: red;">Madelizer gains will slow down beyond 1e450 Madelizers.</span>';
                }
                return "";
            }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("ct", {
    name: "Codename Trademark", // Full name of the layer
    symbol: "CT", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
            engagement: new Decimal(0), // Generates LTF points based on CT sub gain
            bestResetGain: new Decimal(0), // Best reset gain in the reset
        };
    },
    color: "#000078", // Navy color
    requires: new Decimal(1e30), // Points required to unlock this layer
    resource: "Codename Trademark subscribers", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.1625, // Scaling factor for prestige points
    autoUpgrade() { return hasUpgrade("infi", 32); },
    softcap: new Decimal("1e400"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("ct", "normal").gte("1e1000")) scpwr = scpwr.div(getResetGain("ct", "normal").log10().div(1000).pow(0.25));
        return scpwr;
    },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 4)) passive = passive.add("1e-12");
        return passive;
    },
    layerShown() {
        // Check if the player has at least 1e21 points
        return player.points.gte(new Decimal(1e21)) || player.ct.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ct", 22)) mult = mult.times(upgradeEffect("ct", 22));
        if (hasUpgrade("ltf", 24)) mult = mult.times(upgradeEffect("ltf", 24));
        if (hasUpgrade("aub", 22)) mult = mult.times(upgradeEffect("aub", 22));
        if (hasUpgrade("ct", 32)) mult = mult.times(upgradeEffect("ct", 32));
        if (hasUpgrade("infi", 12)) mult = mult.times(upgradeEffect("infi", 12));
        if (hasUpgrade("infi", 22)) mult = mult.times(upgradeEffect("infi", 22));
        if (hasUpgrade("ninja", 32)) mult = mult.times(upgradeEffect("ninja", 32));
        if (hasUpgrade("revo", 21)) mult = mult.times(upgradeEffect("revo", 21));
        if (hasUpgrade("massive", 22)) mult = mult.times(upgradeEffect("massive", 22));
        if (hasChallenge("infi", 21)) mult = mult.times(challengeEffect("infi", 21));
        if (hasUpgrade("vex", 13)) mult = mult.times(upgradeEffect("vex", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
        if (hasUpgrade("sunny", 14)) mult = mult.times(upgradeEffect("sunny", 14));
        if (hasUpgrade("enhance", 21)) mult = mult.times(upgradeEffect("enhance", 21));
        if (hasUpgrade("liquid", 15)) mult = mult.times(upgradeEffect("liquid", 15));
        if (inChallenge("infi", 31)) mult = mult.times(0);
        return mult;
    },
    update() {
        let decayValue = new Decimal(0.05);
        if (player.ct.engagement.gt(1000)) decayValue = decayValue.times(player.ct.engagement.log10().div(3).pow(2));
        if (getResetGain("ct", "normal").gt(player.ct.bestResetGain)) player.ct.bestResetGain = getResetGain("ct", "normal"); 
             player.ct.engagement = player.ct.engagement.times((new Decimal(0.99).pow(decayValue)))},
    onPrestige() {
        if (inChallenge("infi", 31)) player.ct.engagement = new Decimal("0");
        else player.ct.engagement = player.ct.engagement.add(player.ct.bestResetGain.log(10).add(1).pow(1.25));
        player.ct.bestResetGain = new Decimal(0)},

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 2, // Row in the tree (2 = third row)
    branches: ["ninja", "massive"], // Branch from the 2 row 2 layers visually

    hotkeys: [
        { key: "c", description: "c: Reset for CT subs", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The meme is so massive, it somehow managed to translate into CT subscriber gain! You gain engagement which produces LTF points passively (weak at first) based on CT subs gained so you don't have to click the LTF reset button.",
            unlocked() { return player.ct.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Develop CT",
            description: "Codename Trademark development begins! Multiply point gain by 5.",
            cost: new Decimal(1),
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant", 21));
                if (hasUpgrade("enchant", 14)) expBoost = expBoost.times(5);
                return new Decimal(5).pow(expBoost); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Update CT",
            description: "CT is receiving updates! Receive a 3x boost to low taper fade point gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ct", 11); },
            effect() {
                let expBoost = new Decimal(1).add(buyableEffect("enchant", 21));
                if (hasUpgrade("enchant", 14)) expBoost = expBoost.times(5);
                return new Decimal(3).pow(expBoost); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Stream CT",
            description: "CT is being streamed! Gain more points based on your CT subscribers! (initial 1.25x multi)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("ct", 12); },
            effect() {
                let initMulti = new Decimal(1.25).pow(new Decimal(1).add(buyableEffect("enchant",21)));
                if (hasUpgrade("enchant", 14)) initMulti = initMulti.pow(5);
                return player.ct.points.times(2).add(10).log10().pow(2.4).times(initMulti);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Release CT",
            description: "CT Ultra 1.00 has been released! LTF gain is boosted based on your CT subscribers! (initial 1.3x multi)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("ct", 13); },
            effect() {
                let initMulti = new Decimal(1.3).pow(new Decimal(1).add(buyableEffect("enchant",21)));
                if (hasUpgrade("enchant", 14)) initMulti = initMulti.pow(5);
                return player.ct.points.times(2).add(10).log10().pow(2).times(initMulti);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "Upload to CT",
            description: "You uploaded to CT! CT subscriber gain is slightly boosted by point amount.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("ct", 21); },
            effect() {
                let base =  player.points.div(100000000).add(1).pow(0.01); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.points.gte(new Decimal("1e5000"))) {
                    diminishingFactor = player.points.div("1e5000").pow(0.005); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.points.gte("1e5000"); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Grind CT",
            description: "You are grinding in CT! CT subs boost both Ninja and massive points! (initial 1.1x multi)",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("ct", 22); },
            effect() {
                let initMulti = new Decimal(1.1).pow(new Decimal(1).add(buyableEffect("enchant",21)));
                if (hasUpgrade("enchant", 14)) initMulti = initMulti.pow(5);
                let base = player.ct.points.div(2).add(1).pow(0.125).times(initMulti); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.ct.points.gte(new Decimal(1e45))) {
                    firstDiminishingFactor = player.ct.points.div(1e45).pow(0.05);
                }

                if (player.ct.points.gte(new Decimal(1e135))) {
                    secondDiminishingFactor = player.ct.points.div(1e135).pow(0.0375);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.ct.points.gte(1e45); // Check if softcap applies
                let isSuperSoftcapped = player.ct.points.gte(1e135); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        31: {
            title: "Elite CT Player",
            description: "You manage to reach the top ranks in CT! Boost point and LTF point gain based on CT subs.",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("ct", 23) && hasUpgrade("aub", 22); },
            effect() {
                let base = player.ct.points.div(1.5).add(1).pow(0.15); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.ct.points.gte(new Decimal(1e45))) {
                    firstDiminishingFactor = player.ct.points.div(1e45).pow(0.06);
                }

                if (player.ct.points.gte(new Decimal(1e135))) {
                    secondDiminishingFactor = player.ct.points.div(1e135).pow(0.045);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.ct.points.gte(1e45); // Check if softcap applies
                let isSuperSoftcapped = player.ct.points.gte(1e135); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        32: {
            title: "CT = Sigma",
            description: "You call CT sigma, so you gain another CT sub boost, this time based on LTF points.",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("ct", 31); },
            effect() {
                let base = player.ltf.points.div(100000).add(1).pow(0.01225); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ltf.points.gte(new Decimal("1e3200"))) {
                    diminishingFactor = player.ltf.points.div("1e3200").pow(0.006125); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.ltf.points.gte("1e3200"); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        33: {
            title: "Codename Synergy",
            description: "A bond forms between Aubrie and Madelyn, causing their respective points to be boosted by each other's amount.",
            cost: new Decimal(5e16),
            unlocked() { return hasUpgrade("ct", 32); },
            effect() {
                let aubBoost = player.mady.points.div(100).add(1).pow(0.125); // Aubrinator boost
                let madyBoost = player.aub.points.div(100).add(1).pow(0.125);  // Madelizer boost
                return { aubBoost, madyBoost };
            },
            effectDisplay() {
                let eff = this.effect();
                return ` To Aubrinators: x${format(eff.aubBoost)}, To Madelizers: x${format(eff.madyBoost)}`;
            },
        },
    },

    milestones: {
        0: {
            requirementDescription: "100000 CT Subscribers",
            effectDescription: "Verified CT Player",
            done() { return player.ct.points.gte(100000); },
        },
        1: {
            requirementDescription: "2000 Engagement",
            effectDescription: "If you have over 1000 engagement, autobuy LTF upgrades is enabled.",
            unlocked() {return player.ct.engagement.gte(100); },
            done() { return player.ct.engagement.gte(2000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    if (player.ct.engagement.gte(new Decimal("0.001"))) {
                        return "You have " + format(player.ct.engagement) + " engagement, which generates " + format(player.ct.engagement.pow(0.5)) + "% of LTF points per second.";
                    }
                    return "";
                }],
                ["display-text", function() {
                    if (player.ct.points.gte(new Decimal("1e360"))) {
                        return '<span style="color: red;">CT subscriber gains will slow down beyond 1e400 CT subscribers.</span>';
                    }
                    return "";
                }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("aub", {
    name: "Aubrinators", // Full name of the layer
    symbol: "AU", // Symbol displayed on the tree
    position: 3, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#ff5ee2", // pink
    requires: new Decimal(100000000), // Points required to unlock this layer
    resource: "Aubrinators", // Prestige currency name
    baseResource: "massive points", // Resource used to gain prestige points
    baseAmount() { return player.massive.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.34, // Scaling factor for prestige points
    autoUpgrade() { return hasUpgrade("infi", 32); },
    softcap: new Decimal("1e360"),
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("aub", "normal").gte("1e900")) scpwr = scpwr.div(getResetGain("aub", "normal").log10().div(900).pow(0.25));
        return scpwr;
    },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (hasMilestone("liquid", 4)) passive = passive.add("1e-12");
        return passive;
    },
    layerShown() {
        // Check if the player has at least 1e6 massive points
        return player.massive.points.gte(new Decimal(1e6)) || player.aub.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("aub", 31)) mult = mult.times(upgradeEffect("aub", 31));
        if (hasUpgrade("ct", 33)) mult = mult.times(upgradeEffect("ct", 33).aubBoost);
        if (hasUpgrade("infi", 12)) mult = mult.times(upgradeEffect("infi", 12));
        if (hasUpgrade("massive", 22)) mult = mult.times(upgradeEffect("massive", 22));
        if (hasChallenge("infi", 21)) mult = mult.times(challengeEffect("infi", 21));
        if (hasUpgrade("vex", 13)) mult = mult.times(upgradeEffect("vex", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("revo", 21)) mult = mult.times(upgradeEffect("revo", 21));
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
        if (hasUpgrade("sunny", 12)) mult = mult.times(upgradeEffect("sunny", 12));
        if (hasUpgrade("sunny", 23)) mult = mult.times(upgradeEffect("sunny", 23));
        if (hasUpgrade("enhance", 21)) mult = mult.times(upgradeEffect("enhance", 21));
        if (hasUpgrade("aub", 32)) mult = mult.times(upgradeEffect("aub", 32));
        if (hasUpgrade("liquid", 15)) mult = mult.times(upgradeEffect("liquid", 15));
        mult = mult.times(buyableEffect("sunny", 11));
        if (inChallenge("vex", 11)) mult = mult.times(0);
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 2, // Row in the tree (2 = third row)
    branches: ["massive"], // Branch from massive visually

    hotkeys: [
        { key: "r", description: "r: Reset for Aubrinators", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "It turns out that Aubrie made a lot of content around the MASSIVE low taper fade haircut. This has caused her to end up being a household name!",
            unlocked() { return player.aub.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Low Taper Fade Video",
            description: "Aubrie posts a video on the low taper fade, boosting massive point gain by 2.5x.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(2.5); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Lasting Effect",
            description: "The video gains a lot of traction, extending the longevity of the meme. Boost LTF point gain based on Aubrinators (initial 1.25x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("aub", 11); },
            effect() {
                return player.aub.points.times(1.4).add(10).log10().pow(1.96).times(1.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Low Taper Playlist",
            description: "Aubrie just made a playlist on the low taper fade! Boost point gain based on Aubrinators (initial 1.3x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("aub", 12); },
            effect() {
                let base = player.aub.points.add(1).pow(0.34).times(1.3); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal(1e45))) {
                    firstDiminishingFactor = player.aub.points.div(1e45).pow(0.136);
                }

                if (player.aub.points.gte(new Decimal(1e135))) {
                    secondDiminishingFactor = player.aub.points.div(1e135).pow(0.102);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte(1e45); // Check if softcap applies
                let isSuperSoftcapped = player.aub.points.gte(1e135); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "Documentary",
            description: "Aubrie makes a 2-hour documentary on the low taper fade, boosting Ninja's popularity! Boost Ninja point gain based on their amount and Aubrinators (initial 1.2x multi).",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("aub", 13); },
            effect() {
                let aubEffect = player.aub.points.add(1).pow(0.25).times(1.2); // Effect based on aub points
                let njaEffect = player.ninja.points.div(10000).add(1).pow(0.048); // Effect based on nja points
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal(1e40))) {
                    firstDiminishingFactor = player.aub.points.div(1e40).pow(0.1);
                }

                if (player.ninja.points.gte(new Decimal("1e500"))) {
                    secondDiminishingFactor = player.ninja.points.div("1e500").pow(0.03);
                }

                return aubEffect.times(njaEffect).div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte(1e40); // Check if softcap applies
                let isSuperSoftcapped = player.ninja.points.gte("1e500"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "Trying CT Out!",
            description: "Aubrie decides to try out Codename Trademark. Unlock 3 new CT upgrades and slightly boost their gain (1.4x).",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("aub", 21); },
            effect() {
                return new Decimal(1.4);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        23: {
            title: "Massive Celebrity",
            description: "Aubrie's popularity's beginning to rival that of major celebrities. Boost massive point gain based on Aubrinators (initial 1.2x).",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("aub", 22); },
            effect() {
                let base = player.aub.points.div(5).add(1).pow(0.2).times(1.2); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal(1e45))) {
                    firstDiminishingFactor = player.aub.points.div(1e45).pow(0.08);
                }

                if (player.aub.points.gte(new Decimal(1e135))) {
                    secondDiminishingFactor = player.aub.points.div(1e135).pow(0.06);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte(1e45); // Check if softcap applies
                let isSuperSoftcapped = player.aub.points.gte(1e135); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        31: {
            title: "Widespread Recognition",
            description: "Aubrie gained tons of recognition from her countless videos on the low taper fade. Boost Aubrinator gain based on points.",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("aub", 23); },
            effect() {
                let base = player.points.div(1e10).add(1).pow(0.0125); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.points.gte(new Decimal("1e2500"))) {
                    firstDiminishingFactor = player.points.div("1e2500").pow(0.00625);
                }

                if (player.points.gte(new Decimal("1e10000"))) {
                    secondDiminishingFactor = player.points.div("1e10000").pow(0.003125);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.points.gte("1e2500"); // Check if softcap applies
                let isSuperSoftcapped = player.points.gte("1e10000"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        32: {
            title: "Interviews",
            description: "Aubrie decides to interview Ninja and Madelyn, causing a boost to all their point types based on Aubrinator amount!",
            cost: new Decimal("1e400"),
            unlocked() { return hasUpgrade("aub", 31) && hasUpgrade("sunny", 23); },
            effect() {
                let base = player.aub.points.div("1e390").add(1).pow(0.042); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal("1e520"))) {
                    firstDiminishingFactor = player.aub.points.div("1e520").pow(0.021);
                }

                if (player.aub.points.gte(new Decimal("1e800"))) {
                    secondDiminishingFactor = player.aub.points.div("1e800").pow(0.00105);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte("1e520"); // Check if softcap applies
                let isSuperSoftcapped = player.aub.points.gte("1e800"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        33: {
            title: "Short-form Summaries",
            description: "Aubrie takes inspiration from shorts creators to abbreviate her long-forms into shorts! Boost all layer 5 currency gains based on Aubrinators.",
            cost: new Decimal("1e435"),
            unlocked() { return hasUpgrade("aub", 32); },
            effect() {
                let base = player.aub.points.div("1e425").add(1).pow(0.008); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal("1e555"))) {
                    firstDiminishingFactor = player.aub.points.div("1e555").pow(0.004);
                }

                if (player.aub.points.gte(new Decimal("1e835"))) {
                    secondDiminishingFactor = player.aub.points.div("1e835").pow(0.002);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte("1e555"); // Check if softcap applies
                let isSuperSoftcapped = player.aub.points.gte("1e835"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
    },

    milestones: {
        0: {
            requirementDescription: "1000000 Aubrinators",
            effectDescription: "Approaching Infinity!",
            done() { return player.aub.points.gte(1000000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.aub.points.gte(new Decimal("1e324"))) {
                    return '<span style="color: red;">Aubrinator gains will slow down beyond 1e360 Aubrinators.</span>';
                }
                return "";
            }],
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("infi", {
    name: "Infinity", // Full name of the layer
    symbol: "I", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0),
            IC1Completions: new Decimal(0),
            IC2Completions: new Decimal(0),
            IC3Completions: new Decimal(0),
        };
    },
    update() {
        player.infi.IC1Completions = new Decimal(challengeCompletions("infi", 11));
        player.infi.IC2Completions = new Decimal(challengeCompletions("infi", 21));
        player.infi.IC3Completions = new Decimal(challengeCompletions("infi", 31));
    },
    color: "#27d986", // turquoise
    requires: new Decimal(1.7976e308), // Points required to unlock this layer
    resource: "Infinity points", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.025, // Scaling factor for prestige points
    softcap: new Decimal(1e30), // IP gain slows past 1e30
    softcapPower() { 
        let scpwr = new Decimal(0.5).add(player.enhance.shards.div(500)); 
        if (getResetGain("infi", "normal").gte("1e75")) scpwr = scpwr.div(getResetGain("infi", "normal").log10().div(75).pow(0.25));
        return scpwr;
    },

    layerShown() {
        // Check if the player has at least 1e200 points
        return player.points.gte(new Decimal(1e200)) || player.infi.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("massive", 21)) mult = mult.times(upgradeEffect("massive", 21));
        if (hasUpgrade("vex", 21)) mult = mult.times(upgradeEffect("vex", 21));
        if (hasChallenge("infi", 31)) mult = mult.times(challengeEffect("infi", 31));
        if (hasUpgrade("enhance", 13)) mult = mult.times(upgradeEffect("enhance", 13));
        if (hasUpgrade("mady", 32)) mult = mult.times(upgradeEffect("mady", 32));
        if (hasUpgrade("sunny", 24)) mult = mult.times(upgradeEffect("sunny", 24));
        if (hasUpgrade("gal", 13)) mult = mult.times(upgradeEffect("gal", 13));
        if (hasUpgrade("liquid", 22)) mult = mult.times(upgradeEffect("liquid", 22));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 3, // Row in the tree (3 = fourth row)
    branches: ["mady", "ct", "aub"], // Branch from all 3 third-row points visually

    hotkeys: [
        { key: "n", description: "n: Reset for Infinity Points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "You have earned so many points that you can now infinity. Reset everything prior to infinity in exchange for monumental boosts.",
            unlocked() { return player.infi.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "New Beginning",
            description: "This is the first of many Infinity upgrades. Receive a 16x boost to point gain, and 4x boost to LTF, Ninja, and massive point gain.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(16); // Simple multiplier
            },
        },
        12: {
            title: "More Buffs",
            description: "Gain a 3x boost to CT subscriber, Madelizer, and Aubrinator gain.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("infi", 11); },
            effect() {
                return new Decimal(3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Quality of Life",
            description: "Point gain is MASSIVELY boosted based on infinity points (initial 2x multi). Also unlock auto-upgrade for LTF, Ninja and massive layers.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("infi", 12); },
            effect() {
                let base = player.infi.points.add(1).pow(0.64).times(2); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e6
                if (player.infi.points.gte(new Decimal(1e6))) {
                    firstDiminishingFactor = player.infi.points.div(1e6).pow(0.32);
                }

                // Apply second diminishing factor for Infi points >= 1e24
                if (player.infi.points.gte(new Decimal(1e24))) {
                    secondDiminishingFactor = player.infi.points.div(1e24).pow(0.16);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e6); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e24); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "The Meme of all Memes",
            description: "Boost low taper fade point gain based on infinity points (initial 2x multi).",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("infi", 13); },
            effect() {
                let base = player.infi.points.div(1.5).add(1).pow(0.56).times(2); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e6
                if (player.infi.points.gte(new Decimal(1e6))) {
                    firstDiminishingFactor = player.infi.points.div(1e6).pow(0.28);
                }

                // Apply second diminishing factor for Infi points >= 1e24
                if (player.infi.points.gte(new Decimal(1e24))) {
                    secondDiminishingFactor = player.infi.points.div(1e24).pow(0.14);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e6); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e24); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "Ninja, The Transcendent",
            description: "Ninja drags the meme to the point where he becomes the most popular man on the planet. Boost Ninja and massive point gain based on infinity points. (initial 2x multi)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("infi", 14); },
            effect() {
                let base = player.infi.points.div(2).add(1).pow(0.5).times(2); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e6
                if (player.infi.points.gte(new Decimal(1e6))) {
                    firstDiminishingFactor = player.infi.points.div(1e6).pow(0.25);
                }

                // Apply second diminishing factor for Infi points >= 1e24
                if (player.infi.points.gte(new Decimal(1e24))) {
                    secondDiminishingFactor = player.infi.points.div(1e24).pow(0.125);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e6); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e24); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "Infinitrademark",
            description: "CT has become a powerful force to not be messed with. Boost CT subscriber gain based on infinity points. (initial multi 2.5x)",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("infi", 21); },
            effect() {
                let base = player.infi.points.div(2.5).add(1).pow(0.6).times(2.5); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e6
                if (player.infi.points.gte(new Decimal(1e6))) {
                    firstDiminishingFactor = player.infi.points.div(1e6).pow(0.3);
                }

                // Apply second diminishing factor for Infi points >= 1e24
                if (player.infi.points.gte(new Decimal(1e24))) {
                    secondDiminishingFactor = player.infi.points.div(1e24).pow(0.15);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e6); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e24); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Astronomical Fame",
            description: "Aubrie's documentary from a while back now begin to boost massive point gain at 75% effectiveness (initial 1.2x multi).",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("infi", 22); },
            effect() {
                let aubEffect = player.aub.points.add(1).pow(0.1875).times(1.2); // Effect based on aub points
                let njaEffect = player.ninja.points.div(10000).add(1).pow(0.036); // Effect based on nja points
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                if (player.aub.points.gte(new Decimal(1e40))) {
                    firstDiminishingFactor = player.aub.points.div(1e40).pow(0.075);
                }

                if (player.ninja.points.gte(new Decimal("1e500"))) {
                    secondDiminishingFactor = player.ninja.points.div("1e500").pow(0.0216);
                }

                return aubEffect.times(njaEffect).div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.aub.points.gte(1e40); // Check if softcap applies
                let isSuperSoftcapped = player.ninja.points.gte("1e500"); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        24: {
            title: "Dragging Endeavors",
            description: "Gain a 2x multiplier to Ninja and massive point gain and unlock 2 new upgrades for each.",
            cost: new Decimal(400),
            unlocked() { return hasUpgrade("infi", 23); },
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        31: {
            title: "Linear LTF Boost",
            description: "Gain a linear boost to LTF point gain based on Infinity points (softcaps at 1e20).",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("infi", 24) && hasChallenge("infi", 31); },
            effect() {
                let base = player.infi.points.div(1e10).add(1); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e20
                if (player.infi.points.gte(new Decimal(1e20))) {
                    firstDiminishingFactor = player.infi.points.div(1e20).pow(0.6);
                }

                // Apply second diminishing factor for Infi points >= 1e54
                if (player.infi.points.gte(new Decimal(1e54))) {
                    secondDiminishingFactor = player.infi.points.div(1e54).pow(0.2);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e20); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e54); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
        32: {
            title: "Quality of Life 2",
            description: "Boost LTF, Ninja, and massive point gain based on Infinity points and unlock auto-purchase for CT subs, Madelizers, and Aubrinators.",
            cost: new Decimal(1e16),
            unlocked() { return hasUpgrade("infi", 31); },
            effect() {
                let base = player.infi.points.div(1e14).add(1).pow(0.12); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.infi.points.gte(new Decimal(1e32))) {
                    diminishingFactor = player.infi.points.div(1e32).pow(0.06); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e32); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        33: {
            title: "Massive Point Exponent",
            description: "Gain an exponent to massive point gain based on infinity points (initial ^1.01 exponent).",
            cost: new Decimal(1e20),
            unlocked() { return hasUpgrade("infi", 32); },
            effect() {
                let base = player.infi.points.div(2.5e18).add(10).log10().pow(0.036).times(1.01); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.infi.points.gte(new Decimal(1e28))) {
                    diminishingFactor = player.infi.points.div(1e27).log10().pow(0.006); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e28); // Check if softcap applies
                let display = "^" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        34: {
            title: "Meme Discovery",
            description: "Unlock 3 new layers! Also, boost point gain quadratically based on IP (softcaps at 1e33 IP)",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade("infi", 33); },
            effect() {
                let base = player.infi.points.div(1e24).add(1).pow(2); // Original effect formula
                let firstDiminishingFactor = new Decimal(1); // Default factor for first softcap
                let secondDiminishingFactor = new Decimal(1); // Default factor for second softcap

                // Apply first diminishing factor for Infi points >= 1e33
                if (player.infi.points.gte(new Decimal(1e33))) {
                    firstDiminishingFactor = player.infi.points.div(1e33).pow(1.2);
                }

                // Apply second diminishing factor for Infi points >= 1e60
                if (player.infi.points.gte(new Decimal(1e60))) {
                    secondDiminishingFactor = player.infi.points.div(1e60).pow(0.4);
                }

                return base.div(firstDiminishingFactor).div(secondDiminishingFactor); // Apply both factors separately
            },
            effectDisplay() {
                let isSoftcapped = player.infi.points.gte(1e33); // Check if softcap applies
                let isSuperSoftcapped = player.infi.points.gte(1e60); // Check if super softcap applies
                let display = "x" + format(this.effect()); // Base effect display
                if (isSuperSoftcapped) {
                    display += " (Super SC)"; // Append super softcap indicator
                } else if (isSoftcapped) {
                    display += " (SC)"; // Append regular softcap indicator
                }
                return display; // Return the final string
            },
        },
    },
    buyables: {
        11: {
            title: "Point Boost",
            description() {
                let desc = "Boosts point generation based on your infinity points and level.";
                if (player.infi.points.gte(1e6)) desc = "Boosts point generation based on your infinity points and level. (Begins to softcap past 1e6 IP)";
                if (player.infi.points.gte(1e96)) desc = "Boosts point generation based on your infinity points and level. (Begins to softcap strongly past 1e96 IP)";
                return desc;
            },
            cost(x) { 
                let totalcost = new Decimal(10).times(new Decimal(11).add(x).div(6).pow(x));
                if (x.gte(70)) totalcost = totalcost.pow(new Decimal(1.05).pow(x.sub(70)));
                return totalcost;
            },  // The cost formula

            // Unlock condition
            unlocked() {
                return player.infi.points.gte(new Decimal(5));  // Buyable unlocks when player has 5 infinity points
            },

            // Effect of the buyable
            effect(x) {
                let base = player.infi.points.times(2).add(1).pow(0.125).pow(x); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor
                let powerFactor = new Decimal(1);
                if (player.infi.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.infi.points.div(1e6).pow(0.0625).pow(x); // Slight division factor
                }
                if (player.infi.points.gte(1e96)) powerFactor = new Decimal(1).div(player.infi.points.log10().div(96).pow(new Decimal(0.875).sub(new Decimal("0.881819").pow(player.infi.points.log10().pow(0.45)))));
                return base.div(diminishingFactor).pow(powerFactor); // Apply the diminishing factor
            },
            canAfford() { return player.infi.points.gte(this.cost()) },
            buy() {
                player.infi.points = player.infi.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("infi", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description()}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} Infinity Points`;
            },
        },
        12: {
            title: "LTF Boost",
            description() {
                let desc = "Boosts LTF gain based on your infinity points and level.";
                if (player.infi.points.gte(1e6)) desc = "Boosts LTF gain based on your infinity points and level. (Begins to softcap past 1e6 IP)";
                if (player.infi.points.gte(1e96)) desc = "Boosts LTF gain based on your infinity points and level. (Begins to softcap strongly past 1e96 IP)";
                return desc;
            },
            cost(x) { 
                let totalcost = new Decimal(100).times(new Decimal(11).add(x).div(6).pow(x));
                if (x.gte(70)) totalcost = totalcost.pow(new Decimal(1.05).pow(x.sub(70)));
                return totalcost;
            },  // The cost formula

            // Unlock condition
            unlocked() {
                return player.infi.points.gte(new Decimal(50));  // Buyable unlocks when player has 50 infinity points
            },

            // Effect of the buyable
            effect(x) {
                let base = player.infi.points.add(1).pow(0.1).pow(x); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor
                let powerFactor = new Decimal(1);
                if (player.infi.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.infi.points.div(1e6).pow(0.05).pow(x); // Slight division factor
                    if (player.infi.points.gte(1e96)) powerFactor = new Decimal(1).div(player.infi.points.log10().div(96).pow(new Decimal(0.875).sub(new Decimal("0.881819").pow(player.infi.points.log10().pow(0.45)))));
                }
                return base.div(diminishingFactor).pow(powerFactor); // Apply the diminishing factor
            },
            canAfford() { return player.infi.points.gte(this.cost()) },
            buy() {
                player.infi.points = player.infi.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("infi", 12); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description()}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} Infinity Points`;
            },
        },
    },
    challenges: {
        11: {
            name: "Restricted Growth",
            challengeDescription: "All point gain is raised to the power of 0.9 and then divided by 100.",
            goalDescription()  {
                let pointGoal = new Decimal(1.7976e308);
                if (player.infi.IC1Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e5400").pow(player.infi.IC1Completions.times(0.0625).add(0.9375).pow(1.25));
                return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "Point gain is boosted based on Infinity points.",
            unlocked() { return hasUpgrade("infi", 24); },
            style() {
                if (inChallenge("infi", 11) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.infi.IC1Completions.gte(10))  {
                        return {
                            "background-color": "#7053cf", // epic
                        };
                } else if (player.infi.IC1Completions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.infi.IC1Completions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.infi.IC1Completions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else  {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 14)) lim = 5;
                if (hasUpgrade("gal", 15)) lim = 10;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal(1.7976e308);
                if (player.infi.IC1Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e5400").pow(player.infi.IC1Completions.times(0.0625).add(0.9375).pow(1.25));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                return player.infi.points.add(1).pow(0.75).pow(player.infi.IC1Completions.div(5).add(0.8));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to point gain";
                if (player.infi.IC1Completions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 14)) formatObject = format(this.rewardEffect()) + "x to point gain (" +  player.infi.IC1Completions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
        21: {
            name: "Anti-Dragging Measures Taken",
            challengeDescription: "You cannot gain Ninja points or Madelizers.",
            goalDescription()  {
            let pointGoal = new Decimal(1e85);
            if (player.infi.IC2Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e2700").pow(player.infi.IC2Completions.times(0.075).add(0.925).pow(1.25));
            return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "LTF points and Infinity points boost CT subscriber, Madelizer, and Aubrinator gain.",
            unlocked() { return hasChallenge("infi", 11); },
            style() {
                if (inChallenge("infi", 21) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.infi.IC2Completions.gte(10))  {
                    return {
                        "background-color": "#7053cf", // epic
                    };
                } else if (player.infi.IC2Completions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.infi.IC2Completions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.infi.IC2Completions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else  {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 14)) lim = 5;
                if (hasUpgrade("gal", 15)) lim = 10;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal(1e85);
                if (player.infi.IC2Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e2700").pow(player.infi.IC2Completions.times(0.075).add(0.925).pow(1.25));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                return player.ltf.points.div(1e100).add(1).pow(0.002).pow(player.infi.points.add(10).log10().pow(0.5)).pow(player.infi.IC2Completions.div(10).add(0.9));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to layer 3 currency gain";
                if (player.infi.IC2Completions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 14)) formatObject = format(this.rewardEffect()) + "x to layer 3 currency gain (" +  player.infi.IC2Completions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
        31: {
            name: "FYSC's Worst Nightmare",
            challengeDescription: "CT shuts down, so you can no longer gain CT subs.",
            goalDescription()  {
            let pointGoal = new Decimal("1e450");
            if (player.infi.IC3Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e6500").pow(player.infi.IC3Completions.times(0.075).add(0.925).pow(1.25));
            return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "Unlock 4 new infinity upgrades and boost their own gain.",
            unlocked() { return hasChallenge("infi", 21); },
            style() {
                if (inChallenge("infi", 31) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.infi.IC3Completions.gte(10))  {
                    return {
                        "background-color": "#7053cf", // epic
                    };
                } else if (player.infi.IC3Completions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.infi.IC3Completions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.infi.IC3Completions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 14)) lim = 5;
                if (hasUpgrade("gal", 15)) lim = 10;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal("1e450");
                if (player.infi.IC3Completions.gte(1) && hasUpgrade("gal", 14)) pointGoal = new Decimal("1e6500").pow(player.infi.IC3Completions.times(0.075).add(0.925).pow(1.25));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                return player.infi.points.div(1e11).add(10).log10().pow(1.5).pow(player.infi.IC3Completions.div(2).add(0.5));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to Infinity point gain";
                if (player.infi.IC3Completions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 14)) formatObject = format(this.rewardEffect()) + "x to Infinity point gain (" +  player.infi.IC3Completions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "10000 Infinity Points",
            effectDescription: "Transcendent Taper Fade!",
            done() { return player.infi.points.gte(10000); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                if (player.infi.points.gte(new Decimal(1e15))) {
                    return '<span style="color: red;">Infinity point gains will slow down beyond 1e30 Infinity points.</span>';
                }
                return "";
            }],
                "upgrades",
                "buyables",
                ["display-text", function() {
                if (getBuyableAmount("infi", 11).gte(70) || getBuyableAmount("infi", 12).gte(70)) {
                    return '<span style="color: white;">Infinity buyable cost will rapidly increase past the 70th.</span>';
                }
                return "";
            }],
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked() { return hasUpgrade("infi", 24); },
        },
    },
});
addLayer("vex", {
    name: "Vexbolts", // Full name of the layer
    symbol: "V", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0),
            vexCompletions: new Decimal(0),
        };
    },
    update() {
        player.vex.vexCompletions = new Decimal(challengeCompletions("vex", 11));
    },
    color: "#f2f2f2", // light gray
    requires: new Decimal("1e400"), // Points required to unlock this layer
    resource: "Vexbolts points", // Prestige currency name
    baseResource: "Madelizers", // Resource used to gain prestige points
    baseAmount() { return player.mady.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.0116, // Scaling factor for prestige points
    softcap: new Decimal("100000000"),

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.vex.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("aub", 33)) mult = mult.times(upgradeEffect("aub", 33));
        if (hasMilestone("enhance", 1)) mult = mult.times(2);
        if (hasUpgrade("enhance", 24)) mult = mult.times(upgradeEffect("enhance", 24));
        if (hasUpgrade("liquid", 23)) mult = mult.times(upgradeEffect("liquid", 23));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 4, // Row in the tree (4 = fifth row)
    branches: ["infi"], // Branch from Infinity visually

    hotkeys: [
        { key: "2", description: "2: Reset for Vexbolts points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "Little did we know, Vexbolts has been thinking of ways to drag the meme at its early stages.",
            unlocked() { return player.vex.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "LET HIM COOK!",
            description: "Vexbolts' meme Let Him Cook becomes viral! Boost point gain quadratically based on Vexbolts points (initial 250x multi).",
            cost: new Decimal(1),
            effect() {
                let base = player.vex.points.add(1).pow(2).times(250); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.vex.points.div(10000); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        12: {
            title: "Unemployed Brainrot Banger",
            description: "Vexbolts releases a popular brain rot meme song. Vexbolts points linearly boost LTF, Ninja, and massive point gain. (initial 20x multi)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("vex", 11); },
            effect() {
                let base = player.vex.points.times(20).add(20); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.vex.points.div(10000).pow(0.5); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "Mass Unfollowing",
            description: "People are mass unfollowing Vexbolts... The trend causes Vexbolts points to linearly boost CT sub, Madelizer, and Aubrinator gain (initial 5x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("vex", 12); },
            effect() {
                let base = player.vex.points.times(5).add(5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.vex.points.div(10000).pow(0.5); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "Mass Refollowing",
            description: "...only for them to revive him. The second trend causes Vexbolts points to cubically boost point gain (initial 10x multi). Also unlock a Vexbolts buyable.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("vex", 13); },
            effect() {
                let base = player.vex.points.add(1).pow(3).times(10); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.vex.points.div(10000).pow(1.5); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "Should Have Left Bro In 2024",
            description: "He has went too far... Boost Infinity point gain based on Vexbolts points (initial 3x multi). Also, unlock the Vexbolts Challenge!",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("vex", 14); },
            effect() {
                let base = player.vex.points.add(1).pow(0.6).times(3); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(100000))) {
                    diminishingFactor = player.vex.points.div(100000).pow(0.3); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(100000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "Another Haircut to Meme On?",
            description: "Not just Low Taper Fades, it's also High Taper Fades! Boost LTF point gain based on Vexbolts points (initial 2x multi).",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("vex", 21); },
            effect() {
                let base = player.vex.points.add(1).pow(1.65).times(2); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.vex.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.vex.points.div(1e6).pow(0.825); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.vex.points.gte(1e6); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Prolonged Dragging Expert",
            description: "Unlock 2 more Madelizer upgrades and boost their gain by 2x.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("vex", 22); },
            effect() {
                return new Decimal(2); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        24: {
            title: "Vexbolts just became MORE MASSIVE.",
            description: "Boost Ninja and massive points over time based on Vexbolts points.",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("vex", 23); },
            effect() {
                let vexTime = new Decimal(player.vex.resetTime); // Complex multiplier
                return vexTime.add(1).pow(player.vex.points.div(10).add(1).log10().pow(1.4));
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    buyables: {
        11: {
            title: "Madelizer Booster",
            description: "Boosts Madelizer gain based on the level of this buyable.",
            cost(x) { return new Decimal(10).times(new Decimal(9).add(x).div(5).pow(x)); },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("vex", 14);  // Buyable unlocks when player has Vexbolts upg 14
            },

            // Effect of the buyable
            effect(x) {
                return new Decimal(40).pow(x); // Apply the diminishing factor
            },
            canAfford() { return player.vex.points.gte(this.cost()) },
            buy() {
                player.vex.points = player.vex.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("vex", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} Vexbolts Points`;
            },
        },
    },
    challenges: {
        11: {
            name: "Meme Drag Ban",
            challengeDescription: "All people layers before Infinity (Ninja, Madelizers, and Aubrinators) do not work.",
            goalDescription()  {
            let pointGoal = new Decimal("1e90");
            if (player.vex.vexCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e480").pow(player.vex.vexCompletions.times(0.0625).add(0.9375).pow(1.3));
            return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "Vexbolts points boost Ninja and massive point gain.",
            unlocked() { return hasUpgrade("vex", 21); },
            style() {
                if (inChallenge("vex", 11) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.vex.vexCompletions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.vex.vexCompletions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.vex.vexCompletions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 15)) lim = 5;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal("1e90");
                if (player.vex.vexCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e480").pow(player.vex.vexCompletions.times(0.0625).add(0.9375).pow(1.3));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                return player.vex.points.add(1).pow(1.8).pow(player.vex.vexCompletions.div(4).add(0.75));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to layer 2 currency gain";
                if (player.vex.vexCompletions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 15)) formatObject = format(this.rewardEffect()) + "x to layer 2 currency gain (" +  player.vex.vexCompletions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Vexbolts Points",
            effectDescription: "Brainrot Artist!",
            done() { return player.vex.points.gte(100); },
        },
        1: {
            requirementDescription: "50000000 Vexbolts Points",
            effectDescription: "Raise LTF point gain to the 1.015",
            unlocked() {return hasMilestone("vex", 0); },
            done() { return player.vex.points.gte(5e7); },
        },
    },
    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    if (player.vex.points.gte(new Decimal(1e7))) {
                        return '<span style="color: red;">Vexbolts point gains will slow down beyond 100,000,000 Vexbolts points.</span>';
                    }
                    return "";
                }],
                "upgrades",
                "buyables",
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked() { return hasUpgrade("vex", 21); },
        },
    },
});
addLayer("enhance", {
    name: "Enhancers", // Full name of the layer
    symbol: "EN", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
            shards: new Decimal(0),
            enhanceCompletions: new Decimal(0),
        };
    },
    update() {
        player.enhance.enhanceCompletions = new Decimal(challengeCompletions("enhance", 11));
    },
    color: "#ff8c00", // orange
    requires: new Decimal("1e350"), // Points required to unlock this layer
    resource: "Enhancers", // Prestige currency name
    baseResource: "Codename Trademark subscribers", // Resource used to gain prestige points
    baseAmount() { return player.ct.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.0124, // Scaling factor for prestige points
    softcap: new Decimal("20000000"),

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.enhance.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("aub", 33)) mult = mult.times(upgradeEffect("aub", 33));
        if (hasMilestone("enhance", 1)) mult = mult.times(1.5);
        if (hasUpgrade("enhance", 24)) mult = mult.times(upgradeEffect("enhance", 24));
        if (hasUpgrade("liquid", 23)) mult = mult.times(upgradeEffect("liquid", 23));
        return mult;
    },
    shardCalculator: function() {
        let shardCount = new Decimal(0);
        if (hasUpgrade("enhance", 21)) shardCount = shardCount.add(1);
        if (hasUpgrade("enhance", 22)) shardCount = shardCount.add(2);
        if (hasUpgrade("enhance", 23)) shardCount = shardCount.add(3);
        if (hasUpgrade("enhance", 24)) shardCount = shardCount.add(4);
        if (hasUpgrade("vex", 21)) shardCount = shardCount.add(1);
        if (hasUpgrade("vex", 22)) shardCount = shardCount.add(2);
        if (hasUpgrade("vex", 23)) shardCount = shardCount.add(3);
        if (hasUpgrade("vex", 24)) shardCount = shardCount.add(4);
        if (hasUpgrade("sunny", 21)) shardCount = shardCount.add(1);
        if (hasUpgrade("sunny", 22)) shardCount = shardCount.add(2);
        if (hasUpgrade("sunny", 23)) shardCount = shardCount.add(3);
        if (hasUpgrade("sunny", 24)) shardCount = shardCount.add(4);
        return player.enhance.shards = shardCount;
    },
    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 4, // Row in the tree (4 = fifth row)
    branches: ["infi"], // Branch from Infinity visually

    hotkeys: [
        { key: "3", description: "3: Reset for Enhancers", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "Now you can get enhancers to drastically boost many aspects of progression!",
            unlocked() { return player.enhance.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Resource Multiplier",
            description: "Boost all pre-infinity resource gain based on enhancers, except for regular points. (initial 5x multi)",
            cost: new Decimal(1),
            effect() {
                let base = player.enhance.points.times(2.5).add(5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.enhance.points.div(10000).pow(0.5); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        12: {
            title: "Point Enhancer",
            description: "Boost point gain drastically based on enhancers and Infinity points (initial 40x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("enhance", 11); },
            effect() {
                let base = player.enhance.points.add(1).pow(1.75).times(player.infi.points.div(1e6).add(1).pow(0.5)).times(40); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.enhance.points.div(10000).pow(0.875); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "Infinity Enhancer",
            description: "Boost Infinity point gain based on enhancers (initial 4x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("enhance", 12); },
            effect() {
                let base = player.enhance.points.add(1).pow(0.45).times(4); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.enhance.points.div(10000).pow(0.225); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "Galaxies",
            description: "Unlock Galaxies and an Enhancer buyable. Galaxies boost Ninja and massive point gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("enhance", 13); },
            effect() {
                let basegaleffect = new Decimal(16);
                if (hasMilestone("liquid", 1)) basegaleffect = new Decimal(18);
                if (hasMilestone("liquid", 3)) basegaleffect = new Decimal(20);
                let galeffect = new Decimal(basegaleffect).pow(player.gal.points);
                if (hasUpgrade("enhance", 23)) galeffect = galeffect.pow(upgradeEffect("enhance", 23));
                return galeffect;
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Milestones now do stuff!",
            description: "Unlock an Enhancer challenge and each milestone now awards a boost to point gain that increases based on enhancers (initial 4x multi)!",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("enhance", 14); },
            effect() {
                return player.enhance.points.add(10).log10().pow(1.05).times(4); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()) + " per milestone."; },
        },
        22: {
            title: "Layer 3 Enhancer",
            description: "All layer 3 currencies gain a boost based on enhancers! (initial 1.5x multi)",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("enhance", 21); },
            effect() {
                let base = player.enhance.points.add(1).pow(0.65).times(1.5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.enhance.points.div(1e6).pow(0.325); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(1e6); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Galaxy Enhancer!",
            description: "The galaxy boosts (except for Time Hack and Reality Warp) become stronger based on enhancers and unlock a second Enhancer buyable!",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("enhance", 22); },
            effect() {
                return player.enhance.points.times(2).add(10).log10().pow(0.4); // Galaxy booster
            },
            effectDisplay() { return "^" + format(this.effect()); },
        },
        24: {
            title: "Layer In Sync!",
            description: "Every layer 5 currency (including enhancers themselves) gain a boost based on enhancers.",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("enhance", 23); },
            effect() {
                let base = player.enhance.points.div(1000).add(10).log10().pow(3.2); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.enhance.points.div(100000).log10().pow(0.64); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(1e6); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
    },
    buyables: {
        11: {
            title: "Point Exponent",
            description: "Raises point generation to an exponent based on the level of this buyable.",
            cost(x) { 
                let totalcost = new Decimal(10).times(new Decimal(7).add(x).div(4).pow(x));
                if (getBuyableAmount("enhance", 11).gte(15)) totalcost = totalcost.pow(new Decimal(1.02).pow(x.sub(15)));
                return totalcost;
            },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("enhance", 14);  // Buyable unlocks when player has Enhancer upg 14
            },

            // Effect of the buyable
            effect(x) {
                return new Decimal(100).add(x).div(100);
            },
            canAfford() { return player.enhance.points.gte(this.cost()) },
            buy() {
                player.enhance.points = player.enhance.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("enhance", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^${format(effect)}<br>
                    Cost: ${format(cost)} Enhancers`;
            },
        },
        12: {
            title: "Galaxy Cheapener",
            description: "Reduces the cost scaling growth of galaxies based on the level of this upgrade (caps at level 50).",
            purchaseLimit: new Decimal(50),
            cost(x) { return new Decimal(100).times(new Decimal(14).add(x).div(6).pow(x)); },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("enhance", 23);  // Buyable unlocks when player has Vexbolts upg 14
            },

            // Effect of the buyable
            effect(x) {
                return new Decimal(1000).pow(new Decimal(0.984).pow(x)); // Apply the diminishing factor
            },
            canAfford() { return player.enhance.points.gte(this.cost()) },
            buy() {
                player.enhance.points = player.enhance.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("enhance", 12); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Growth Base: ${format(effect)}<br>
                    Cost: ${format(cost)} Enhancers`;
            },
        },
    },
    challenges: {
        11: {
            name: "Point Deterioration",
            challengeDescription: "Point gain starts divided by 1e12, and further divides by 10 every 10 seconds.",
            goalDescription()  {
            let pointGoal = new Decimal("1e720");
            if (player.enhance.enhanceCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e6000").pow(player.enhance.enhanceCompletions.times(0.0625).add(0.9375).pow(1.3));
            return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "Point gain gets better over time in this Enhancer reset. The rate of increase is based on Enhancers.",
            unlocked() { return hasUpgrade("enhance", 21); },
            style() {
                if (inChallenge("enhance", 11) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.enhance.enhanceCompletions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.enhance.enhanceCompletions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.enhance.enhanceCompletions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 15)) lim = 5;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal("1e720");
                if (player.enhance.enhanceCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e6000").pow(player.enhance.enhanceCompletions.times(0.0625).add(0.9375).pow(1.3));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                let enhanceTime = new Decimal(player.enhance.resetTime)
                return enhanceTime.add(1).pow(0.6).pow(player.enhance.points.add(10).log10().pow(1.2)).pow(player.enhance.enhanceCompletions.div(4).add(0.75));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to point gain";
                if (player.enhance.enhanceCompletions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 15)) formatObject = format(this.rewardEffect()) + "x to point gain (" +  player.enhance.enhanceCompletions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Enhancers",
            effectDescription: "Premium Enhancer!",
            done() { return player.enhance.points.gte(100); },
        },
        1: {
            requirementDescription: "All L5 Challenges Completed",
            effectDescription: "Enhancer gain is boosted by 1.5x, other L5 currencies 2x, and also gain automation for Layer 2 currencies (1e-16%).",
            unlocked() { return hasChallenge("vex", 11) || hasChallenge("enhance", 11) || hasChallenge("sunny", 11); },
            done() { return hasChallenge("vex", 11) && hasChallenge("enhance", 11) && hasChallenge("sunny", 11); },
        },
        2: {
            requirementDescription: "500000000 Enhancers",
            effectDescription: "Raise LTF point gain to the 1.015",
            unlocked() {return hasMilestone("enhance", 1); },
            done() { return player.enhance.points.gte(5e8); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                ["display-text", function() {
                if (hasUpgrade("enhance", 14)) {
                    return "You will begin to obtain shards after purchasing layer 5 currency upgrades on the second row (1st: +1, 2nd: +2, 3rd: +3, and 4th: +4)";
                }
                return "";
            }],
                "resource-display",
                ["display-text", function() {
                    if (hasUpgrade("enhance", 21) || hasUpgrade("vex", 21) || hasUpgrade("sunny", 21)) {
                        return "You have " + player.enhance.shards + " shards, making the pre-layer-5 resource softcaps become " + new Decimal(50).add(player.enhance.shards.div(5)) + "% instead of 50%";
                    }
                    return "";
                }],
                ["display-text", function() {
                    if (player.enhance.points.gte(new Decimal(2e6))) {
                        return '<span style="color: red;">Enhancer gains will slow down beyond 20,000,000 Enhancers.</span>';
                    }
                    return "";
                }],
                "upgrades",
                "buyables",
                ["display-text", function() {
                    if (getBuyableAmount("enhance", 11).gte(15)) {
                        return '<span style="color: white;">The Point Enhancement buyable cost will increase faster past the 15th.</span>';
                    }
                    return "";
                }],
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked() { return hasUpgrade("enhance", 21); },
        },
    },
});
addLayer("sunny", {
    name: "SunnyV2", // Full name of the layer
    symbol: "S", // Symbol displayed on the tree
    position: 3, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
            sunnyCompletions: new Decimal(0),
        };
    },
    update() {
        player.sunny.sunnyCompletions = new Decimal(challengeCompletions("sunny", 11));
    },
    color: "#9db1e0", // ultralight blue
    requires: new Decimal("1e310"), // Points required to unlock this layer
    resource: "SunnyV2 points", // Prestige currency name
    baseResource: "Aubrinators", // Resource used to gain prestige points
    baseAmount() { return player.aub.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.0132, // Scaling factor for prestige points
    softcap: new Decimal("100000000"),

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.sunny.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("aub", 33)) mult = mult.times(upgradeEffect("aub", 33));
        if (hasMilestone("enhance", 1)) mult = mult.times(2);
        if (hasUpgrade("enhance", 24)) mult = mult.times(upgradeEffect("enhance", 24));
        if (hasUpgrade("liquid", 23)) mult = mult.times(upgradeEffect("liquid", 23));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 4, // Row in the tree (4 = fifth row)
    branches: ["infi"], // Branch from Infinity visually

    hotkeys: [
        { key: "4", description: "4: Reset for SunnyV2 points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "SunnyV2 has been making documentaries of this meme and other things for a while now.",
            unlocked() { return player.sunny.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Rise and Shine",
            description: "SunnyV2's documentaries gain some popularity. Boost point and layer 3 currency gain linearly based on SunnyV2 points (initial 20x multi).",
            cost: new Decimal(1),
            effect() {
                let base = player.sunny.points.times(20).add(20); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.sunny.points.div(10000).pow(0.5); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.sunny.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        12: {
            title: "Collab Documentary",
            description: "SunnyV2 decides to collab with Aubrie for a massive documentary! Boost Aubrinator gain drastically based on SunnyV2 points (initial 30x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("sunny", 11); },
            effect() {
                let base = player.sunny.points.add(1).pow(1.25).times(30); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.sunny.points.div(10000).pow(0.625); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.sunny.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "Behind The Scenes",
            description: "SunnyV2 makes a few BTS videos to show how he does his documentaries. Boost LTF, Ninja, and massive point gain drastically based on SunnyV2 points (initial 20x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("sunny", 12); },
            effect() {
                let base = player.sunny.points.add(1).pow(1.3).times(20); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.sunny.points.div(10000).pow(0.65); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.sunny.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        14: {
            title: "Codename Documentary",
            description: "SunnyV2 makes a CT documentary. Boost CT point gain quadratically based on SunnyV2 points. (initial 10x multi).",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("sunny", 13); },
            effect() {
                let base = player.sunny.points.add(1).pow(2).times(10); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.sunny.points.div(10000); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.sunny.points.gte(10000); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "The Low Taper Fade Documentary...",
            description: "SunnyV2 points boost LTF points! Also, unlock the SunnyV2 challenge!",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("sunny", 14); },
            effect() {
                let base = player.sunny.points.add(1).pow(2.2); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(1e5))) {
                    diminishingFactor = player.sunny.points.div(1e5).pow(1.1); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.sunny.points.gte(1e5); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        22: {
            title: "It Goes Super Viral",
            description: "The documentary goes viral, boosting point gain drastically based on SunnyV2 points! (initial 2.5x multi)",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("sunny", 21); },
            effect() {
                let base = player.sunny.points.add(1).pow(3.2).times(2.5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.sunny.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.sunny.points.div(1e6).pow(1.6); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.enhance.points.gte(1e6); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "MassiveV2",
            description: "SunnyV2's influence causes 2 new Aubrinator upgrades to be introduced and their gain to be doubled.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("sunny", 22); },
            effect() {
                return new Decimal(2); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        24: {
            title: "Extensive Documentary Series",
            description: "Boost Infinity point gain based on SunnyV2 points.",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("sunny", 23); },
            effect() {
                return player.sunny.points.div(100).add(10).log10().pow(3.6); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    buyables: {
        11: {
            title: "Aubrinator Booster",
            description: "Boosts Aubrinator gain based on the level of this buyable.",
            cost(x) { return new Decimal(10).times(new Decimal(9).add(x).div(5).pow(x)); },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("sunny", 14);  // Buyable unlocks when player has Vexbolts upg 14
            },

            // Effect of the buyable
            effect(x) {
                return new Decimal(20).pow(x); // Apply the diminishing factor
            },
            canAfford() { return player.sunny.points.gte(this.cost()) },
            buy() {
                player.sunny.points = player.sunny.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("sunny", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} SunnyV2 Points`;
            },
        },
    },
    challenges: {
        11: {
            name: "Meme Growth Prevention",
            challengeDescription: "Massive points and Aubrinators cannot be obtained.",
            goalDescription()  {
            let pointGoal = new Decimal("1e180");
            if (player.sunny.sunnyCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e625").pow(player.sunny.sunnyCompletions.times(0.0625).add(0.9375).pow(1.3));
            return "Reach " + format(pointGoal) + " points."},
            rewardDescription: "SunnyV2 points drastically boost LTF point gain.",
            unlocked() { return hasUpgrade("sunny", 21); },
            style() {
                if (inChallenge("sunny", 11) && this.canComplete())  {
                    return {
                        "background-color": "#ffbf00", // can complete
                    };
                } else if (player.sunny.sunnyCompletions.gte(5)) {
                    return {
                        "background-color": "#58a3cc",
                    };
                } else if (player.sunny.sunnyCompletions.gte(2)) {
                    return {
                        "background-color": "#5bc77a", 
                    };
                } else if (player.sunny.sunnyCompletions.gte(1)) {
                    return {
                        "background-color": "#77bf5f",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", 
                    };
                }
            },
            completionLimit() {
                let lim = 1;
                if (hasUpgrade("gal", 15)) lim = 5;
                return lim;
            },
            canComplete: function() { 
                let pointGoal = new Decimal("1e180");
                if (player.sunny.sunnyCompletions.gte(1) && hasUpgrade("gal", 15)) pointGoal = new Decimal("1e625").pow(player.sunny.sunnyCompletions.times(0.0625).add(0.9375).pow(1.3));
                return player.points.gte(pointGoal); 
            },
            rewardEffect() {
                return player.sunny.points.add(1).pow(3.25).pow(player.sunny.sunnyCompletions.div(5).add(0.8));
            },
            rewardDisplay() {
                let formatObject = format(this.rewardEffect()) + "x to LTF point gain";
                if (player.sunny.sunnyCompletions.eq(0)) formatObject = "Not Completed";
                else if (hasUpgrade("gal", 15)) formatObject = format(this.rewardEffect()) + "x to LTF point gain (" +  player.sunny.sunnyCompletions + "/" + this.completionLimit() + " Completions)";
                return formatObject;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 SunnyV2 Points",
            effectDescription: "Documentary Hotspot!",
            done() { return player.sunny.points.gte(100); },
        },
        1: {
            requirementDescription: "100000000 SunnyV2 Points",
            effectDescription: "Raise LTF point gain to the 1.015",
            unlocked() {return hasMilestone("sunny", 0); },
            done() { return player.sunny.points.gte(1e8); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    if (player.sunny.points.gte(new Decimal(1e7))) {
                        return '<span style="color: red;">SunnyV2 point gains will slow down beyond 100,000,000 SunnyV2 points.</span>';
                    }
                    return "";
                }],
                "upgrades",
                "buyables",
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked() { return hasUpgrade("sunny", 21); },
        },
    },
});
addLayer("gal", {
    name: "Galaxies", // Full name of the layer
    symbol: "G", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#3c0a4f", // purple
    requires: new Decimal(1e36), // Points required to unlock this layer
    resource: "Galaxies", // Prestige currency name
    base(){ return buyableEffect("enhance", 12); },
    canBuyMax: false,
    baseResource: "Infinity points", // Resource used to gain prestige points
    baseAmount() { return player.infi.points; }, // Current amount of baseResource
    type: "static", // Standard prestige layer type
    exponent: new Decimal(1.2), // Scaling factor for prestige points

    layerShown() {
        // Check if the player has Enhancer Upgrade 1:4
        return hasUpgrade("enhance", 14);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 3, // Row in the tree (3 = fourth row)
    hotkeys: [
        { key: "5", description: "5: Galaxy Reset", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The meme has entered galactic levels of fame!",
            unlocked() { return player.gal.points.lte(9); }
        },
    },
    upgrades: {
        11: {
            title: "Illuminant Galaxies!",
            description: "Make Galaxies boost points!",
            cost: new Decimal(5),
            effect() {
                let basegaleffect = new Decimal(256);
                if (hasMilestone("liquid", 1)) basegaleffect = new Decimal(324);
                if (hasMilestone("liquid", 3)) basegaleffect = new Decimal(400);
                let galeffect = new Decimal(basegaleffect).pow(player.gal.points);
                if (hasUpgrade("enhance", 23)) galeffect = galeffect.pow(upgradeEffect("enhance", 23));
                return galeffect;
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Patience Boost!",
            description: "Make Galaxies boost LTF points over time (based on Infinity reset time)! The rate of increase is based on unspent Galaxies.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("gal", 11); },
            effect() {
                let galaxyTime = new Decimal(player.infi.resetTime);
                let enhanceEffect = new Decimal("1");
                if (hasUpgrade("enhance", 23)) enhanceEffect = enhanceEffect.times(upgradeEffect("enhance", 23));
                return galaxyTime.add(1).pow(player.gal.points.add(1).pow(0.96)).pow(enhanceEffect);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Infinitely Galactic!",
            description: "Make Galaxies boost Infinity points!",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade("gal", 12) && hasUpgrade("liquid", 13); },
            effect() {
                let galeffect = new Decimal(1.8).pow(player.gal.points);
                if (hasUpgrade("enhance", 23)) galeffect = galeffect.pow(upgradeEffect("enhance", 23));
                return galeffect;
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "Extra Completions I",
            description: "You can now complete IC Challenges up to 5 times. This upgrade + first 3 now persist through higher layer resets.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("gal", 13) || player.liquid.galUpgrades.gte(1); },
        },
        15: {
            title: "Extra Completions II",
            description: "You can now complete Layer 5 challenges up to 5 times and IC challenges up to 10 times. This upgrade persists through higher layer resets.",
            cost: new Decimal(30),
            unlocked() { return hasUpgrade("gal", 14); },
        },
    },
    milestones: {
        0: {
            requirementDescription: "20 Galaxies",
            effectDescription: "Intergalactic!",
            done() { return player.gal.points.gte(20); },
        },
    },
    doReset(resettingLayer) {
        let keep = [];
        if(hasUpgrade("gal", 11)) player.liquid.galUpgrades = new Decimal(1);
        if(hasUpgrade("gal", 12)) player.liquid.galUpgrades = new Decimal(2);
        if(hasUpgrade("gal", 13)) player.liquid.galUpgrades = new Decimal(3);
        if(hasUpgrade("gal", 14)) player.liquid.galUpgrades = new Decimal(4);
        if(hasUpgrade("gal", 15)) player.liquid.galUpgrades = new Decimal(5);
        if(resettingLayer=="vex" || resettingLayer=="enhance" || resettingLayer=="sunny" || resettingLayer=="liquid" || resettingLayer=="enchant") layerDataReset("gal", keep);
        if((resettingLayer=="gal" || resettingLayer=="infi") && player.liquid.galUpgrades.eq(5)) player.gal.upgrades = ["11", "12", "13", "14", "15"];
        else if((resettingLayer=="gal" || resettingLayer=="infi") && player.liquid.galUpgrades.eq(4)) player.gal.upgrades = ["11", "12", "13", "14"];
        else if((resettingLayer=="gal" || resettingLayer=="infi") && player.liquid.galUpgrades.eq(3)) player.gal.upgrades = ["11", "12", "13"];
        else if((resettingLayer=="gal" || resettingLayer=="infi") && player.liquid.galUpgrades.eq(2)) player.gal.upgrades = ["11", "12"];
        else if((resettingLayer=="gal" || resettingLayer=="infi") && player.liquid.galUpgrades.eq(1)) player.gal.upgrades = ["11"];
        else if(player.liquid.galUpgrades.eq(5)) player.gal.upgrades = ["14", "15"];
        else if(player.liquid.galUpgrades.eq(4)) player.gal.upgrades = ["14"];
        else player.gal.upgrades = [];
        player.liquid.galUpgrades = new Decimal(0);
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
    },
});
addLayer("liquid", {
    name: "liquidcashews inflators", // Full name of the layer
    image: "https://i.ibb.co/GvWTRS0k/mdm.webp", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
            galUpgrades: new Decimal(0),
        };
    },
    color: "#d7520f", // distinct orange
    requires: new Decimal("1e3800"), // Points required to unlock this layer
    resource: "liquidcashews inflators", // Prestige currency name
    baseResource: "low taper fade points", // Resource used to gain prestige points
    baseAmount() { return player.ltf.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: new Decimal("0.003010299957"), // Scaling factor for prestige points

    layerShown() {
        // Check if the player has 1e3400 LTF points or more
        return player.ltf.points.gte("1e3400") || player.liquid.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("liquid", 24)) mult = mult.times(upgradeEffect("liquid", 24));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 5, // Row in the tree (5 = sixth row)
    branches: ["vex", "enhance", "sunny"],
    hotkeys: [
        { key: "7", description: "7: LC inflator Reset", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The game is beginning to inflate! How far can you go?",
            unlocked() { return player.liquid.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Inflation Begins!",
            description: "Gain a drastic point multiplier that increases over time, and gets faster based on LC inflators!",
            cost: new Decimal(1),
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.times(4).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(8)) liquidExp = liquidExp.div(player.liquid.points.log10().div(8).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(5.4).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(2.5e7); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        12: {
            title: "Low Taper Inflation!",
            description: "LC inflators and time in this reset boost LTF point gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("liquid", 11); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.times(2).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(8)) liquidExp = liquidExp.div(player.liquid.points.log10().div(8).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(3.6).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(5e7); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "Extra Galactic Effects",
            description: "Unlock 3 more galaxy upgrades.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("liquid", 12); },
        },
        14: {
            title: "Massive + Ninja Boost",
            description: "LC inflators and time in this reset boost Ninja and massive point gain.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("liquid", 13); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(8)) liquidExp = liquidExp.div(player.liquid.points.log10().div(8).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(2.4).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(1e8); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        15: {
            title: "Layer 3 Inflation",
            description: "LC inflators and time in this reset boost layer 3 currency gain. Also unlock a buyable.",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("liquid", 14); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.div(2).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(8)) liquidExp = liquidExp.div(player.liquid.points.log10().sub(1).div(8).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(1.6).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(2e8); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        21: {
            title: "Deflation?",
            description: "Unlock the Deflation challenge.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("liquid", 15); },
        },
        22: {
            title: "Inf-inflation",
            description: "Infinity points are boosted over time based on LC inflators.",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("liquid", 21); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.div(100).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(9)) liquidExp = liquidExp.div(player.liquid.points.log10().sub(2).div(9).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(0.4).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(1e11); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        23: {
            title: "Layer 5 TO THE MOON!",
            description: "Boost layer 5 currency over time based on LC inflators.",
            cost: new Decimal(1e6),
            unlocked() { return hasUpgrade("liquid", 22); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.div(1e4).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(9)) liquidExp = liquidExp.div(player.liquid.points.log10().sub(4).div(9).pow(0.5));
                return inflateTime.add(inflateTimeBonus).add(1).pow(0.14).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(1e13); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        24: {
            title: "Self-Inflation!!",
            description: "Boost LC Inflator gain over time based on their amount!!",
            cost: new Decimal(1e8),
            unlocked() { return hasUpgrade("liquid", 23); },
            effect() {
                let inflateTime = new Decimal(player.liquid.resetTime);
                let inflateTimeBonus = new Decimal(0);
                let liquidExp = player.liquid.points.div(1e6).add(10).log10();
                if (hasMilestone("liquid", 2)) inflateTimeBonus = inflateTimeBonus.add(player.liquid.points.add(1).log10().pow(4).times(150));
                if (player.liquid.points.gte(1e6)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) inflateTimeBonus = inflateTimeBonus.div(player.liquid.points.log10().div(32).pow(0.8));
                if (liquidExp.gte(9)) liquidExp = liquidExp.div(player.liquid.points.log10().sub(6).div(9).pow(0.75));
                return inflateTime.add(inflateTimeBonus).add(1).pow(0.05).pow(liquidExp.pow(1.2));
            },
            effectDisplay() {
                let isSoftcapped = player.liquid.points.gte(1e15); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        25: {
            title: "Ultimate Inflation.",
            description: "Buyable formula is improved by ^2.",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("liquid", 24); },
        },
    },
    buyables: {
        11: {
            title: "Massive Point Boost",
            description: "Boosts point gain drastically based on level of this buyable.",
            cost(x) { return new Decimal(100).times(new Decimal(7).add(x).div(2).pow(x)); },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("liquid", 15);  // Buyable unlocks when player has LC upgrade 15
            },

            // Effect of the buyable
            effect(x) {
                let scaler=new Decimal(1);
                if (hasUpgrade("liquid", 25)) scaler = scaler.add(1);
                return new Decimal(10).pow(x.pow(2)).pow(scaler);
            },
            canAfford() { return player.liquid.points.gte(this.cost()) },
            buy() {
                player.liquid.points = player.liquid.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("liquid", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} LC Inflators`;
            },
        },
    },
    challenges: {
        11: {
            name: "Deflation",
            challengeDescription: "Point gain is raised to the ^0.5 and then divided by /1e20.",
            goalDescription: "Reach 1e360 points.",
            rewardDescription: "LC inflators now explosively boost point gain.",
            unlocked() { return hasUpgrade("liquid", 21); },
            canComplete: function() { return player.points.gte("1e360") },
            rewardEffect() {
                return player.liquid.points.add(1).pow(10);
            },
            rewardDisplay() {
                return format(this.rewardEffect()) + "x to point gain";
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 LC Inflator",
            effectDescription: "Generate 100% of LTF points and 1e-10% layer 2 currencies on reset/second! You also retain LTF upgrade autobuy and gain a 1000x boost to LTF point gain.",
            done() { return player.liquid.points.gte(1); },
        },
        1: {
            requirementDescription: "5 LC Inflators",
            effectDescription: "Slightly improve first 2 Galaxy effect base boosts. (16 --> 18 layer 2 and 256 --> 324 point multi)",
            unlocked() {return hasMilestone("liquid", 0); },
            done() { return player.liquid.total.gte(5); },
        },
        2: {
            requirementDescription: "10 LC Inflators",
            effectDescription() {
                let bankedTime = player.liquid.points.add(1).log10().pow(4).times(150);
                if (player.liquid.points.gte(1e6)) bankedTime = bankedTime.div(player.liquid.points.log10().div(6).pow(3));
                if (player.liquid.points.gte(1e32)) bankedTime = bankedTime.div(player.liquid.points.log10().div(32).pow(0.8));
                let formatItem = formatTime(bankedTime);
                if (bankedTime.gte(3.1536e307)) formatItem = format(bankedTime) + " seconds of";
                return "You now receive banked time towards LC inflator upgrade effects based on LC inflators. Currently: " + formatItem + " banked time"; },
            unlocked() {return hasMilestone("liquid", 1); },
            done() { return player.liquid.total.gte(10); },
        },
        3: {
            requirementDescription: "50 LC Inflators",
            effectDescription: "Slightly improve first 2 Galaxy effect base boosts again. (18 --> 20 layer 2 and 324 --> 400 point multi)",
            unlocked() {return hasMilestone("liquid", 2); },
            done() { return player.liquid.total.gte(50); },
        },
        4: {
            requirementDescription: "100 LC Inflators",
            effectDescription: "Generate additional 100% of all Layer 2 currencies and 1e-10% layer 3 currencies/second, and you also retain layer 2 upgrade autobuy features and gain a 100x boost to L2 currencies.",
            unlocked() {return hasMilestone("liquid", 3); },
            done() { return player.liquid.total.gte(100); },
        },
        5: {
            requirementDescription: "1000000 LC Inflators",
            effectDescription: "Artifacts are 1% stronger.",
            unlocked() {return hasMilestone("liquid", 4); },
            done() { return player.liquid.total.gte(1000000); },
        },
        6: {
            requirementDescription: "1e30 LC Inflators",
            effectDescription: "You did it!!",
            unlocked() {return hasMilestone("liquid", 5); },
            done() { return player.liquid.total.gte(1e30); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "buyables",
                ["display-text", function() {
                        return "You have made a total of " + player.liquid.total + " LC inflators.";
                }],
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked() { return hasUpgrade("liquid", 21); },
        },
    },
});
addLayer("revo", {
    name: "circles", // Full name of the layer
    symbol: "◎", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#b33e73", // random
    requires: new Decimal(10000), // Points required to unlock this layer
    resource: "◎", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: new Decimal(0.25), // Scaling factor for prestige points
    softcap: new Decimal(10000),
    softcapPower: new Decimal(0.5),
    canReset() {
    return getResetGain(this.layer).lt(2) && player.revo.points.lte(1);
    },
    passiveGeneration() {
        let passive = new Decimal(0);
        if (player.points.gte(10000)) passive = passive.add(new Decimal(0.001).div(player.points.log10().div(4).pow(2)));
        return passive;
    },
    layerShown() {
        // Check if the player has 10000 points
        return player.points.gte(5000) || player.revo.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("revo", 11)) mult = mult.times(upgradeEffect("revo", 11));
        if (hasUpgrade("revo", 13)) mult = mult.times(upgradeEffect("revo", 13));
        mult = mult.times(buyableEffect("revo", 11));
        return mult;
    },

    gainExp() {
        let exp = new Decimal(1);// Exponential bonus to prestige point gain
        if (getResetGain("revo", "normal").gte(10000)) exp = exp.div(getResetGain("revo", "normal").log10().pow(0.25));
        return exp;
    },

    row: "side", // Row in the tree
    hotkeys: [
        { key: "q", description: "CIRCLE PRESTIGE WHILE BELOW 1 POINT", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "Revolution Idle? Just kidding, this is a side layer meant to speed up the early progression of the game.",
            unlocked() { return player.revo.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Circles go vroom!",
            description: "Gain a boost to circle gain based on LTF points!",
            cost: new Decimal(1),
            effect() {
                return player.ltf.points.div(10).add(10).log10().pow(1.1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Revolutionary Upgrade",
            description: "Circles now boost point gain based on log(◎+5000/500)^2, softcapping at 1e12 ◎ (+unlock buyables!)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("revo", 11); },
            effect() {
                let base = player.revo.points.div(500).add(10).log10().pow(2); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.revo.points.gte(new Decimal(1e12))) {
                    diminishingFactor = player.revo.points.div(1e11).log10().pow(0.2); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.revo.points.gte(1e12); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        13: {
            title: "CT Goes Round and Round",
            description: "Your CT subs are so intrigued by your Revolution Idle gameplay that they boost your circle gain!",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade("revo", 12); },
            effect() {
                return player.ct.points.div(2).add(10).log10().pow(2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "Ninja's Revolutionary Size",
            description: "Ninja and Massive point gain receive a small boost based on circles, its softcap is at 1e21 ◎.",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade("revo", 13); },
            effect() {
                let base = player.revo.points.div(100000).add(10).log10().pow(0.2); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.revo.points.gte(new Decimal(1e21))) {
                    diminishingFactor = player.revo.points.div(1e20).log10().pow(0.015); // Slight division factor
                }
                return base.div(diminishingFactor); // Apply the diminishing factor
            },
            effectDisplay() {
                let isSoftcapped = player.revo.points.gte(1e21); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
                }
                return display; // Return the final string
            },
        },
        15: {
            title: "Spin FASTER!",
            description: "Revolution Upgrade 2's effect is raised to a power based on LTF points.",
            cost: new Decimal(2e7),
            unlocked() { return hasUpgrade("revo", 14); },
            effect() {
                return player.ltf.points.div(10000).add(1e10).log10().log10().pow(1.2);
            },
            effectDisplay() { return "^" + format(this.effect()); },
        },
        21: {
            title: "Strong Circles",
            description: "Now circles boost Layer 3 currencies slightly.",
            cost: new Decimal(1e8),
            unlocked() { return hasUpgrade("revo", 15); },
            style() {
                if (hasUpgrade("revo", 21))  {
                    return {
                        "background-color": "#562cc9", // indigo
                        "color": "#000000",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", // default not bought color
                        "color": "#000000",
                    };
                }
            },
            effect() {
                return player.revo.points.times(100).add(1e10).log10().log10().pow(3.6);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "Low Taper Circles",
            description: "Circles grant a boost to LTF points.",
            cost: new Decimal(1e10),
            unlocked() { return hasUpgrade("revo", 21); },
            style() {
                if (hasUpgrade("revo", 22))  {
                    return {
                        "background-color": "#562cc9", // indigo
                        "color": "#000000",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", // default not bought color
                        "color": "#000000",
                    };
                }
            },
            effect() {
                return player.revo.points.times(500).add(1e10).log10().log10().pow(5);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        23: {
            title: "Better Scaling",
            description: "Buyable Scaling drops from 4 to 3.5.",
            cost: new Decimal(5e11),
            unlocked() { return hasUpgrade("revo", 22); },
            style() {
                if (hasUpgrade("revo", 23))  {
                    return {
                        "background-color": "#562cc9", // indigo
                        "color": "#000000",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", // default not bought color
                        "color": "#000000",
                    };
                }
            },
            effect() {
                return new Decimal(0.5);
            },
            effectDisplay() { return "Scaling Reduction: " + format(this.effect()); },
        },
        24: {
            title: "Another Point Boost?",
            description: "Circles grant a slight boost to points.",
            cost: new Decimal(1e15),
            unlocked() { return hasUpgrade("revo", 23); },
            style() {
                if (hasUpgrade("revo", 24))  {
                    return {
                        "background-color": "#562cc9", // indigo
                        "color": "#000000",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", // default not bought color
                        "color": "#000000",
                    };
                }
            },
            effect() {
                return player.revo.points.times(10).add(1e10).log10().log10().pow(3.6);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        25: {
            title: "Definitely Not Foreshadowing",
            description: "Circles upgrade 2 gets powered, again, now based on circle amount!",
            cost: new Decimal(1e19),
            unlocked() { return hasUpgrade("revo", 24); },
            style() {
                if (hasUpgrade("revo", 25))  {
                    return {
                        "background-color": "#562cc9", // indigo
                        "color": "#000000",
                    };
                } else {
                    return {
                        "background-color": "#bf8f8f", // default not bought color
                        "color": "#000000",
                    };
                }
            },
            effect() {
                return player.revo.points.add(1e10).log10().log10().pow(0.8);
            },
            effectDisplay() { return "^" + format(this.effect()); },
        },
    },
    buyables: {
        11: {
            title: "Circle Boost",
            description: "Boosts circle gain by 1.4x (Softcaps strongly after 10 purchases).",
            purchaseLimit: new Decimal(50),
            cost(x) { let costbase = new Decimal(4);
                    if (hasUpgrade("revo", 23)) costbase = costbase.sub(0.5);
                    return costbase.pow(x).times(100); },  // The cost formula

            // Unlock condition
            unlocked() {
                return hasUpgrade("revo", 12);  // Buyable unlocks when player has upgrade 12
            },

            // Effect of the buyable
            effect(x) {
                let effectweaken = new Decimal(1);
                if (getBuyableAmount("revo", 11).gte(10)) effectweaken=new Decimal(1.1).pow(getBuyableAmount("revo", 11).sub(10)).pow(getBuyableAmount("revo", 11).log10());
                return new Decimal(1.4).pow(x).div(effectweaken);
            },
            canAfford() { return player.revo.points.gte(this.cost()) },
            buy() {
                player.revo.points = player.revo.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("revo", 11); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} circles`;
            },
        },
        12: {
            title: "Score Boost",
            description: "Boosts point gain by 1.2x (Softcaps after 10 purchases).",
            purchaseLimit: new Decimal(50),
            cost(x) { let costbase = new Decimal(4);
                    if (hasUpgrade("revo", 23)) costbase = costbase.sub(0.5);
                    return costbase.pow(x).times(250); },  // The cost formula

            // Unlock condition
            unlocked() {
                return getBuyableAmount("revo", 11).gte(2);  // Buyable unlocks when player has circles buyable 1 twice
            },

            // Effect of the buyable
            effect(x) {
                let effectweaken = new Decimal(1);
                if (getBuyableAmount("revo", 12).gte(10)) effectweaken=new Decimal(1.04).pow(getBuyableAmount("revo", 12).sub(10)).pow(getBuyableAmount("revo", 12).log10());
                return new Decimal(1.2).pow(x).div(effectweaken);
            },
            canAfford() { return player.revo.points.gte(this.cost()) },
            buy() {
                player.revo.points = player.revo.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("revo", 12); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} circles`;
            },
        },
        13: {
            title: "Low Taper Fade Boost",
            description: "Boosts LTF point gain by 1.1x (Softcaps after 10 purchases).",
            purchaseLimit: new Decimal(50),
            cost(x) { let costbase = new Decimal(4);
                    if (hasUpgrade("revo", 23)) costbase = costbase.sub(0.5);
                    return costbase.pow(x).times(1000); },  // The cost formula

            // Unlock condition
            unlocked() {
                return getBuyableAmount("revo", 12).gte(2);  // Buyable unlocks when player has circles buyable 2 twice
            },

            // Effect of the buyable
            effect(x) {
                let effectweaken = new Decimal(1);
                if (getBuyableAmount("revo", 13).gte(10)) effectweaken=new Decimal(1.02).pow(getBuyableAmount("revo", 13).sub(10)).pow(getBuyableAmount("revo", 13).log10());
                return new Decimal(1.1).pow(x).div(effectweaken);
            },
            canAfford() { return player.revo.points.gte(this.cost()) },
            buy() {
                player.revo.points = player.revo.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("revo", 13); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} circles`;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1.00e40 ◎",
            effectDescription: "Circle Master as of 4.2.1! LTF point gain is increased by 40%.",
            done() { return player.revo.points.gte(1e40); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "resource-display",
                "prestige-button",
                ["display-text", function() {
                if (player.revo.points.lte(new Decimal(10))) {
                    return '<span style="color: purple;">Make sure to press prestige for circles at least 1 time so upgrades work, ignore prestige if you already completed this step.</span>';
                }
                return "";
            }],
                "upgrades",
                "buyables",
                "milestones",
            ],
        },
    },
});
addLayer("enchant", {
    name: "enchantment", // Full name of the layer
    symbol: "EH", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
            peak: new Decimal(0),
            adventureHP: new Decimal(100),
            maxAdventureHP: new Decimal(100),
            adventureLevel: new Decimal(0),
        };
    },
    color: "#bd80e8", // light purple
    requires: new Decimal("1e100000"), // Points required to unlock this layer
    resource: "enchantment points", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.000005, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has e80k score or 1 Enchantment Point
        return player.points.gte("1e80000") || player.enchant.unlocked==true;
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },
    update() {
        if (player.points.gt(player.enchant.peak)) player.enchant.peak = player.points;
        if (player.points.gte("1e1300000")) player.enchant.adventureHP = player.enchant.adventureHP.sub(new Decimal("0.00000001").times(player.points.add(1).log10().sub(1200000)));
        if (player.enchant.adventureHP.lte("0.00001")) {player.enchant.adventureLevel = player.enchant.adventureLevel.add(1);
player.enchant.maxAdventureHP = player.enchant.maxAdventureHP.times(1.5);
player.enchant.adventureHP = player.enchant.maxAdventureHP;}
    },
    row: 5, // Row in the tree (5 = sixth row)
    branches: ["liquid"],
    hotkeys: [
        { key: "8", description: "8: Enchantment Reset", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    infoboxes:{
        1: {
            title: "About This Layer",
            titleStyle: {'color': '#000000'},
            body: "The lategame progression mechanic meant to be a grind quest, how far can you venture?",
            unlocked() { return player.enchant.points.lte(99); }
        },
    },
    upgrades: {
        11: {
            title: "Enchant Low Taper Fade!",
            description: "Polish your low taper fade skills, boosting point gain based on LTF points, and boost LTF statics by ^5!",
            cost: new Decimal(1),
            effect() {
                return player.ltf.points.div(10).add(10).log10().pow(3.65);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Enchant Ninja!",
            description: "Ninja keeps dragging his meme, and this causes points to receive another boost, and boost Ninja statics/inits by ^5!",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("enchant", 11); },
            effect() {
                return player.ninja.points.div(5).add(10).log10().pow(4.5);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Enchant Massive!",
            description: "Another point boost, this time by massive points since the massiveness grew out of control, and boost Massive statics/inits by ^5!",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("enchant", 12); },
            effect() {
                return player.massive.points.div(3).add(10).log10().pow(5.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "Enchant CT!",
            description: "CT subscribers are infused with legendary Stat Wars essence, making them boost LTF points, and boost CT statics/inits by ^5!",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("enchant", 13); },
            effect() {
                return player.ct.points.div(2).add(10).log10().pow(4.75);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        15: {
            title: "Madelyn's Adorable!",
            description: "Madelyn transforms to become more beautiful and gleaming, making her points boost LTF points, and boost Madelizer statics/inits by ^5!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("enchant", 14); },
            effect() {
                return player.mady.points.add(10).log10().pow(4.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Aubrie's Legend Status",
            description: "Aubrie turns her fame growth to more LTF point gain, and boost Aubrinator statics/inits by ^5!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("enchant", 15); },
            effect() {
                return player.aub.points.add(10).log10().pow(5.1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    buyables: {
        11: {
            title: "Trimmers",
            description: "Every level boosts efficiency of the static LTF upgrades by (^+1.00)",
            cost(x) { 
                let scaling = new Decimal(2);
                let baseCost = new Decimal(10);
                let subtractionFactor = new Decimal(0);
                if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = scaling.times(5);
                if (getBuyableAmount(this.layer, this.id).gte(100)) baseCost = new Decimal("1.2676506e31");
                if (getBuyableAmount(this.layer, this.id).gte(100)) subtractionFactor = new Decimal("100");
                return scaling.pow(x.sub(subtractionFactor)).times(baseCost); },
            unlocked() {
                return player.enchant.peak.gte("1e500000") || getBuyableAmount(this.layer, this.id).gte(1);  
            },
            effect(x) {
                return new Decimal(1).times(x);
            },
            canAfford() { return player.enchant.points.gte(this.cost()) },
            buy() {
                player.enchant.points = player.enchant.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            // Display the effect and buyable
            style() {
            if (player.enchant.points.gte(this.cost(getBuyableAmount(this.layer, this.id))))
                return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://png.pngtree.com/png-vector/20240611/ourmid/pngtree-a-hair-clipper-trimmer-isolated-on-white-background-png-image_12654207.png')", "background-size": "100%", "background-position": "0px -3px", "opacity": "0.75", "background-color": "#bd80e8"};
            else return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://png.pngtree.com/png-vector/20240611/ourmid/pngtree-a-hair-clipper-trimmer-isolated-on-white-background-png-image_12654207.png')", "background-size": "100%", "background-position": "0px -3px", "opacity": "0.5", "background-color": "#bf8f8f"};},
            display() {
                let amt = getBuyableAmount(this.layer, this.id); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^+${format(effect)}<br>
                    Cost: ${format(cost)} Enchantment Points`;
            },
        },
        12: {
            title: "Shears",
            description: "Every level boosts the initial values of the Ninja upgrades by (^+1.50)",
            cost(x) { 
                let scaling = new Decimal(2);
                let baseCost = new Decimal(200);
                let subtractionFactor = new Decimal(0);
                if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = scaling.times(5);
                if (getBuyableAmount(this.layer, this.id).gte(100)) baseCost = new Decimal("2.5353012e32");
                if (getBuyableAmount(this.layer, this.id).gte(100)) subtractionFactor = new Decimal("100");
                return scaling.pow(x.sub(subtractionFactor)).times(baseCost); },
            unlocked() {
                return player.enchant.peak.gte("1e720000") || getBuyableAmount(this.layer, this.id).gte(1);  
            },
            effect(x) {
                return new Decimal(1.5).times(x);
            },
            canAfford() { return player.enchant.points.gte(this.cost()) },
            buy() {
                player.enchant.points = player.enchant.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            // Display the effect and buyable
            style() {
            if (player.enchant.points.gte(this.cost(getBuyableAmount(this.layer, this.id))))
                return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://materialkitchen.com/cdn/shop/products/GoodShearsPDP_grande.png?v=1759441665')", "background-size": "110%", "background-position": "-8px -40px", "opacity": "0.75", "background-color": "#bd80e8", "background-repeat": "no-repeat"};
            else return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://materialkitchen.com/cdn/shop/products/GoodShearsPDP_grande.png?v=1759441665')", "background-size": "110%", "background-position": "-8px -40px", "opacity": "0.5", "background-color": "#bf8f8f", "background-repeat": "no-repeat"};},
            display() {
                let amt = getBuyableAmount(this.layer, this.id); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^+${format(effect)}<br>
                    Cost: ${format(cost)} Enchantment Points`;
            },
        },
        13: {
            title: "Meme Expander",
            description: "Every level boosts the initial values of the massive upgrades by (^+2.00) and raises the Massive-point-based boost of 'Massive Point Boost' by (+^0.50)",
            cost(x) { 
                let scaling = new Decimal(2);
                let baseCost = new Decimal(10000);
                let subtractionFactor = new Decimal(0);
                if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = scaling.times(5);
                if (getBuyableAmount(this.layer, this.id).gte(100)) baseCost = new Decimal("1.2676506e34");
                if (getBuyableAmount(this.layer, this.id).gte(100)) subtractionFactor = new Decimal("100");
                return scaling.pow(x.sub(subtractionFactor)).times(baseCost); },
            unlocked() {
                return player.enchant.peak.gte("1e1000000") || getBuyableAmount(this.layer, this.id).gte(1);  
            },
            effect(x) {
                return new Decimal(2).times(x);
            },
            canAfford() { return player.enchant.points.gte(this.cost()) },
            buy() {
                player.enchant.points = player.enchant.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            // Display the effect and buyable
            style() {
            if (player.enchant.points.gte(this.cost(getBuyableAmount(this.layer, this.id))))
                return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://cdn-icons-png.flaticon.com/512/4599/4599691.png')", "background-size": "90%", "background-position": "8px 10px", "opacity": "0.75", "background-color": "#bd80e8", "background-repeat": "no-repeat"};
            else return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://cdn-icons-png.flaticon.com/512/4599/4599691.png')", "background-size": "90%", "background-position": "8px 10px", "opacity": "0.5", "background-color": "#bf8f8f", "background-repeat": "no-repeat"};},
            display() {
                let amt = getBuyableAmount(this.layer, this.id); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^+${format(effect)} MPU init, ^+${format(effect.div(4))} MPB boost<br>
                    Cost: ${format(cost)} Enchantment Points`;
            },
        },
        21: {
            title: "FYSC Coding Laptop",
            description: "Every level boosts the initial values of the CT upgrades by (^+1.50)",
            cost(x) { 
                let scaling = new Decimal(2);
                let baseCost = new Decimal(1000000);
                let subtractionFactor = new Decimal(0);
                if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = scaling.times(5);
                if (getBuyableAmount(this.layer, this.id).gte(100)) baseCost = new Decimal("1.2676506e36");
                if (getBuyableAmount(this.layer, this.id).gte(100)) subtractionFactor = new Decimal("100");
                return scaling.pow(x.sub(subtractionFactor)).times(baseCost); },
            unlocked() {
                return player.enchant.peak.gte("1e1350000") || getBuyableAmount(this.layer, this.id).gte(1);  
            },
            effect(x) {
                return new Decimal(1.5).times(x);
            },
            canAfford() { return player.enchant.points.gte(this.cost()) },
            buy() {
                player.enchant.points = player.enchant.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            // Display the effect and buyable
            style() {
            if (player.enchant.points.gte(this.cost(getBuyableAmount(this.layer, this.id))))
                return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://png.pngtree.com/png-vector/20250322/ourmid/pngtree-laptop-icon-with-a-coding-screen-png-image_15853412.png')", "background-size": "100%", "background-position": "0px 0px", "opacity": "0.75", "background-color": "#bd80e8", "background-repeat": "no-repeat"};
            else return {"border-radius": "25px", "height": "175px", "width": "175px", "background-image": "url('https://png.pngtree.com/png-vector/20250322/ourmid/pngtree-laptop-icon-with-a-coding-screen-png-image_15853412.png')", "background-size": "100%", "background-position": "0px 0px", "opacity": "0.5", "background-color": "#bf8f8f", "background-repeat": "no-repeat"};},
            display() {
                let amt = getBuyableAmount(this.layer, this.id); // Current level of the buyable
                let cost = this.cost(amt); // Cost for the next level
                let effect = this.effect(amt); // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^+${format(effect)}<br>
                    Cost: ${format(cost)} Enchantment Points`;
            },
        },
    },
    bars: {
        artifactBar: {
            direction: RIGHT,
            fillStyle: {'background-color' : "#bd80e8"},
            width: 280,
            height: 40,
            unlocked() { return player.points.gte("1e200000") && player.points.lte("1e505000"); },
            progress() { return player.points.log10().div(500000); },
            display() { return format(player.points.log10().div(5000)) + "% to unlocking Artifacts"; },
        },
        elementalBar: {
            direction: RIGHT,
            fillStyle: {'background-color' : "#b24de8"},
            width: 280,
            height: 40,
            unlocked() { return player.points.gte("1e5000000") && player.points.lte("1e20200000"); },
            progress() { return player.points.log10().div(20000000); },
            display() { return format(player.points.log10().div(200000)) + "% to unlocking Elements"; },
        },
        adventureBar: {
            direction: RIGHT,
            fillStyle: {'background-color' : "#f01e1a"},
            width: 280,
            height: 40,
            unlocked() { return player.points.gte("1e1300000"); },
            progress() { return player.enchant.adventureHP.div(player.enchant.maxAdventureHP); },
            display() { return "Level " + player.enchant.adventureLevel + " (" + format(player.enchant.adventureHP) + "/" + format(player.enchant.maxAdventureHP) + ")"; },
        },
        nextArtifact: {
            direction: RIGHT,
            fillStyle: {'background-color' : "#bd80e8"},
            width: 280,
            height: 40,
            unlocked() { return player.points.gte("1e500000") && player.points.lte("1e1005000000"); },
            progress() { 
                let subValue = new Decimal(500000);
                let divValue = new Decimal(220000);
                if (player.enchant.peak.gte("1e720000")) subValue = new Decimal(720000);
                if (player.enchant.peak.gte("1e720000")) divValue = new Decimal(280000);
                if (player.enchant.peak.gte("1e1000000")) subValue = new Decimal(1000000);
                if (player.enchant.peak.gte("1e1000000")) divValue = new Decimal(350000);
                return player.points.log10().sub(subValue).div(divValue); },
            display() { 
                let subValue = new Decimal(500000);
                let divValue = new Decimal(2200);
                if (player.enchant.peak.gte("1e720000")) subValue = new Decimal(720000);
                if (player.enchant.peak.gte("1e720000")) divValue = new Decimal(2800);
                if (player.enchant.peak.gte("1e1000000")) subValue = new Decimal(1000000);
                if (player.enchant.peak.gte("1e1000000")) divValue = new Decimal(3500);
                return format(player.points.log10().sub(subValue).div(divValue)) + "% to unlocking Next Artifact"; },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Enchantment Points",
            effectDescription: "You made it to endgame for this version, future development coming soon.",
            done() { return player.enchant.points.gte(100); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                ["infobox", "1"],
                "main-display",
                "prestige-button",
                "resource-display",
                ["bar", "artifactBar"],
                ["bar", "elementalBar"],
                "upgrades",
                "milestones",
            ],
        },
        "Artifacts": {
            content: [
                "main-display",
                ["bar", "nextArtifact"],
                "buyables",
            ],
            unlocked() { return player.points.gte("1e500000") || getBuyableAmount("enchant", 11).gte(1); },
        },
        "Adventure": {
            content: [
                "main-display",
                ["bar", "adventureBar"],
            ],
            unlocked() { return player.points.gte("1e1300000") || getBuyableAmount("enchant", 11).gte(1); },
        },
    },
});
// ["row",[ ["upgrade",51], ["upgrade",52], ["upgrade",53], ["upgrade",54], ["upgrade",55]]], etc works.
