addLayer("ltf", {
    name: "Low Taper Fade", // Full name of the layer
    symbol: "LTF", // Symbol displayed on the tree
    position: 0, // Position in the tree
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
    autoUpgrade() { return hasUpgrade("infi", 32); },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ltf", 12)) mult = mult.times(2); // Double gains with Upgrade 12
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
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("sunny", 13)) mult = mult.times(upgradeEffect("sunny", 13));
        mult = mult.times(buyableEffect("infi", 12));
        return mult; // Ensure the function closes correctly
    },

    gainExp() {
        let exp = new Decimal(1); // Default exponent
        return exp;
    },

    row: 0, // Row in the tree (0 = top row)
    hotkeys: [
        { key: "l", description: "L: Reset for low taper fade points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "Fresh Comb",
            description: "Multiply point gain by 2, simple little upgrade.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(2); // Multiplier for point gain
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Sharp Clippers",
            description: "Double low taper fade point gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("ltf", 11); },
            effect() {
                return new Decimal(2);
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
                return new Decimal(2.5); // 2.5x multiplier for point gain
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "The Low Taper Fade Haircut is all about precision and style. Prestige in this layer to show off your grooming skills!"],
            ],
        },
    },
});
addLayer("ninja", {
    name: "Ninja", // Full name of the layer
    symbol: "NJA", // Symbol displayed on the tree
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
    autoUpgrade() { return hasUpgrade("infi", 32); },

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
        if (inChallenge("infi", 21)) mult = mult.times(0);
        return mult;
    },

    gainExp() {
        let exp = new Decimal(1); // Default exponent
        if (hasUpgrade("mady", 22)) exp = exp.times(upgradeEffect("mady",22)); // Example upgrade adding 0.2 to the exponent
        return exp;
    },

    row: 1, // Row in the tree (1 = second row)
    branches: ["ltf"], // Branch from the LTF layer visually

    hotkeys: [
        { key: "e", description: "E: Reset for Ninja points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "Ninja, Certified Meme Dragger",
            description: "Multiply point gain by 3. This should get you back on your feet.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(3); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Hair Dye Incident",
            description: "Points are now boosted based on your Ninja points (initial multiplier of 1.2x).",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("ninja", 11); },
            effect() {
                let base = player.ninja.points.add(1).pow(0.175); // Original effect formula
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
                let base = player.ninja.points.div(3).add(1).pow(0.35).times(1.2); // Original effect formula
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
                let base = player.ninja.points.div(4).add(1).pow(0.55).times(1.44); // Original effect formula
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "Ninja has dragged the meme too far and now the Low Taper Fade is a MASSIVE haircut!"],
            ],
        },
    },
});
addLayer("massive", {
    name: "Massive", // Full name of the layer
    symbol: "MSV", // Symbol displayed on the tree
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
    autoUpgrade() { return hasUpgrade("infi", 32); },

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
        { key: "f", description: "F: Reset for Massive points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "Massive Low Taper Fade Boost",
            description: "Low taper fade points are boosted based on massive points (initial multiplier of 1.1x).",
            cost: new Decimal(1),
            effect() {
                let base = player.massive.points.div(2).add(1).pow(0.26).times(1.1); // Original effect formula
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
                let massiveEffect = player.massive.points.add(10).log10().pow(1.2); // Effect based on massive points
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
                let base = player.massive.points.div(3).add(1).pow(0.22).times(1.2); // Original effect formula
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "The massiveness of the meme has become so unstable that it managed to branch off from the meme it originated from!"],
            ],
        },
    },
});
addLayer("mady", {
    name: "Madelizers", // Full name of the layer
    symbol: "MDL", // Symbol displayed on the tree
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

    layerShown() {
        // Check if the player has at least 1e9 Ninja points
        return player.ninja.points.gte(new Decimal(1e9)) || player.mady.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ct", 33)) mult = mult.times(upgradeEffect("ct", 33).madyBoost);
        if (hasUpgrade("infi", 12)) mult = mult.times(upgradeEffect("infi", 12));
        if (hasUpgrade("ninja", 32)) mult = mult.times(upgradeEffect("ninja", 32));
        if (hasChallenge("infi", 21)) mult = mult.times(challengeEffect("infi", 21));
        if (hasUpgrade("vex", 13)) mult = mult.times(upgradeEffect("vex", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "Ninja needs to drag the meme longer so it doesn't fade! The problem is, he just can't do it on his own. So he hired Madelyn to essentially increase the dragging effect so the meme lasts longer."],
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
        };
    },
    color: "#000078", // Navy color
    requires: new Decimal(1e30), // Points required to unlock this layer
    resource: "Codename Trademark subscribers", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.1625, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has at least 1e21 points
        return player.points.gte(new Decimal(1e21)) || player.ct.points.gte(1);
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
        if (hasUpgrade("massive", 22)) mult = mult.times(upgradeEffect("massive", 22));
        if (hasChallenge("infi", 21)) mult = mult.times(challengeEffect("infi", 21));
        if (hasUpgrade("vex", 13)) mult = mult.times(upgradeEffect("vex", 13));
        if (hasUpgrade("enhance", 11)) mult = mult.times(upgradeEffect("enhance", 11));
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
        if (hasUpgrade("sunny", 14)) mult = mult.times(upgradeEffect("sunny", 14));
        if (inChallenge("infi", 31)) mult = mult.times(0);
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 2, // Row in the tree (2 = third row)
    branches: ["ninja","massive"], // Branch from the 2 row 2 layers visually

    hotkeys: [
        { key: "c", description: "c: Reset for CT subs", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "Develop CT",
            description: "Codename Trademark development begins! Multiply point gain by 5.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(5); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Update CT",
            description: "CT is receiving updates! Receive a 3x boost to low taper fade point gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ct", 11); },
            effect() {
                return new Decimal(3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Stream CT",
            description: "CT is being streamed! Gain more points based on your CT subscribers! (initial 1.25x multi)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("ct", 12); },
            effect() {
                return player.ct.points.times(2).add(10).log10().pow(2.4).times(1.25);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Release CT",
            description: "CT Ultra 1.00 has been released! LTF gain is boosted based on your CT subscribers! (initial 1.3x multi)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("ct", 13); },
            effect() {
                return player.ct.points.times(2).add(10).log10().pow(2).times(1.3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "Upload to CT",
            description: "You uploaded to CT! CT subscriber gain is slightly boosted by point amount.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("ct", 21); },
            effect() {
                return player.points.div(100000000).add(1).pow(0.01);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        23: {
            title: "Grind CT",
            description: "You are grinding in CT! CT subs boost both Ninja and massive points! (initial 1.1x multi)",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("ct", 22); },
            effect() {
                let base = player.ct.points.div(2).add(1).pow(0.125).times(1.1); // Original effect formula
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
                return player.ltf.points.div(100000).add(1).pow(0.01225);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "The meme is so massive, it somehow managed to translate into CT subscriber gain!"],
            ],
        },
    },
});
addLayer("aub", {
    name: "Aubrinators", // Full name of the layer
    symbol: "AUB", // Symbol displayed on the tree
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

    layerShown() {
        // Check if the player has at least 1e6 massive points
        return player.massive.points.gte(new Decimal(1e6)) || player.aub.points.gte(1);
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
        if (hasUpgrade("sunny", 11)) mult = mult.times(upgradeEffect("sunny", 11));
        if (hasUpgrade("sunny", 12)) mult = mult.times(upgradeEffect("sunny", 12));
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
                return player.points.div(1e10).add(1).pow(0.0125);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "It turns out that Aubrie made a lot of content around the MASSIVE low taper fade haircut. This has caused her to end up being a household name."],
            ],
        },
    },
});
addLayer("infi", {
    name: "Infinity", // Full name of the layer
    symbol: "INF", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#27d986", // turquoise
    requires: new Decimal(1.7976e308), // Points required to unlock this layer
    resource: "Infinity points", // Prestige currency name
    baseResource: "points", // Resource used to gain prestige points
    baseAmount() { return player.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.025, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has at least 1e200 points
        return player.points.gte(new Decimal(1e200)) || player.infi.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("massive", 21)) mult = mult.times(upgradeEffect("massive", 21));
        if (hasChallenge("infi", 31)) mult = mult.times(challengeEffect("infi", 31));
        if (hasUpgrade("enhance", 13)) mult = mult.times(upgradeEffect("enhance", 13));
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

    upgrades: {
        11: {
            title: "New Beginning",
            description: "This is a really big reset. Here are some buffs to help you out. 16x boost to point gain, and 4x boost to LTF, Ninja, and massive point gain.",
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
            title: "Here's a scaling upgrade",
            description: "Point gain is MASSIVELY boosted based on infinity points (initial 2x multi).",
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
            unlocked() { return hasUpgrade("infi", 24) && hasChallenge("infi", 31);},
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
            title: "Quality of Life",
            description: "Boost LTF, Ninja, and massive point gain based on Infinity points and unlock auto-purchase for all 3.",
            cost: new Decimal(1e16),
            unlocked() { return hasUpgrade("infi", 31);},
            effect() {
                let base = player.infi.points.div(1e14).add(1).pow(0.08); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.infi.points.gte(new Decimal(1e32))) {
                    diminishingFactor = player.infi.points.div(1e32).pow(0.04); // Slight division factor
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
                    diminishingFactor = player.infi.points.div(1e27).log10().pow(0.009); // Slight division factor
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
            description: "Boosts point generation based on your infinity points and level. (Begins to softcap past 1e6 IP)",
            cost(x) { return new Decimal(10).times(new Decimal(11).add(x).div(6).pow(x)); },  // The cost formula
    
            // Unlock condition
            unlocked() {
                return player.infi.points.gte(new Decimal(5));  // Buyable unlocks when player has 5 infinity points
            },
    
            // Effect of the buyable
            effect(x) {
                let base = player.infi.points.times(2).add(1).pow(0.125).pow(x); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.infi.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.infi.points.div(1e6).pow(0.0625).pow(x); // Slight division factor
                }
            return base.div(diminishingFactor); // Apply the diminishing factor
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
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: x${format(effect)}<br>
                    Cost: ${format(cost)} Infinity Points`;
            },
        },
        12: {
            title: "LTF Boost",
            description: "Boosts LTF gain based on your infinity points and level. (Begins to softcap past 1e6 IP)",
            cost(x) { return new Decimal(100).times(new Decimal(11).add(x).div(6).pow(x)); },  // The cost formula
    
            // Unlock condition
            unlocked() {
                return player.infi.points.gte(new Decimal(50));  // Buyable unlocks when player has 50 infinity points
            },
    
            // Effect of the buyable
            effect(x) {
                let base = player.infi.points.add(1).pow(0.1).pow(x); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.infi.points.gte(new Decimal(1e6))) {
                    diminishingFactor = player.infi.points.div(1e6).pow(0.05).pow(x); // Slight division factor
                }
            return base.div(diminishingFactor); // Apply the diminishing factor
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
                    ${this.description}<br>
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
            goalDescription: "Reach 1.7976e308 points.",
            rewardDescription: "Point gain is boosted based on Infinity points.",
            unlocked() { return hasUpgrade("infi", 24); },
            canComplete: function() {return player.points.gte(1.7976e308)},
            rewardEffect() {
                return player.infi.points.add(1).pow(0.75);
            },
            rewardDisplay() {
                return format(this.rewardEffect()) + "x to point gain";
            },
        },
        21: {
            name: "Anti-Dragging Measures Taken",
            challengeDescription: "You cannot gain Ninja points or Madelizers.",
            goalDescription: "Reach 1e84 points.",
            rewardDescription: "LTF points and Infinity points boost CT subscriber, Madelizer, and Aubrinator gain.",
            unlocked() { return hasChallenge("infi", 11); },
            canComplete: function() {return player.points.gte(1e84)},
            rewardEffect() {
                return player.ltf.points.div(1e100).add(1).pow(0.002).pow(player.infi.points.add(10).log10().pow(0.5));
            },
            rewardDisplay() {
                return format(this.rewardEffect()) + "x to all layer 3 currency gain";
            },
        },
        31: {
            name: "FYSC's Worst Nightmare",
            challengeDescription: "CT shuts down, so you can no longer gain CT subs.",
            goalDescription: "Reach 1e450 points.",
            rewardDescription: "Unlock 4 new infinity upgrades and boost their own gain.",
            unlocked() { return hasChallenge("infi", 21); },
            canComplete: function() {return player.points.gte("1e450")},
            rewardEffect() {
                return player.infi.points.div(1e11).add(10).log10().pow(1.5);
            },
            rewardDisplay() {
                return format(this.rewardEffect()) + "x to Infinity point gain";
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
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "buyables",
                "milestones",
                "challenges",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "You have earned so many points that you can now infinity. Reset everything prior to infinity in exchange for monumental boosts."],
            ],
        },
    },
});
addLayer("vex", {
    name: "Vexbolts", // Full name of the layer
    symbol: "VEX", // Symbol displayed on the tree
    position: 1, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#f2f2f2", // light gray
    requires: new Decimal("1e400"), // Points required to unlock this layer
    resource: "Vexbolts points", // Prestige currency name
    baseResource: "Madelizers", // Resource used to gain prestige points
    baseAmount() { return player.mady.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.0125, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.vex.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
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

    upgrades: {
        11: {
            title: "LET HIM COOK!",
            description: "Vexbolts' meme Let Him Cook becomes viral! Boost point gain drastically based on LTF, Ninja, massive, and Vexbolts points (initial 1,000x multi).",
            cost: new Decimal(1),
            effect() {
                return player.vex.points.add(1).pow(2).times(player.ltf.points.div(10).add(1).pow(0.02)).times(player.ninja.points.div(2.5).add(1).pow(0.025)).times(player.massive.points.add(1).pow(0.03)).times(1000); // Complex multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Unemployed Brainrot Banger",
            description: "Vexbolts releases a popular brain rot meme song. Vexbolts points linearly boost LTF, Ninja, and massive point gain. (initial 40x multi)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("vex", 11); },
            effect() {
                let base = player.vex.points.times(40).add(40); // Original effect formula
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
            description: "People are mass unfollowing Vexbolts... The trend causes Vexbolts points to linearly boost CT sub, Madelizer, and Aubrinator gain (initial 10x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("vex", 12); },
            effect() {
                let base = player.vex.points.times(10).add(10); // Original effect formula
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
            description: "...only for them to revive him. The second trend causes Vexbolts points to cubically boost point gain. (initial 10x multi)",
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
    },
    milestones: {
        0: {
            requirementDescription: "100 Vexbolts Points",
            effectDescription: "Brainrot Artist!",
            done() { return player.vex.points.gte(100); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "Little did we know, Vexbolts has been thinking of ways to drag the meme at its early stages."],
            ],
        },
    },
});
addLayer("enhance", {
    name: "Enhancers", // Full name of the layer
    symbol: "ENH", // Symbol displayed on the tree
    position: 2, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#ff8c00", // orange
    requires: new Decimal("1e350"), // Points required to unlock this layer
    resource: "Enhancers", // Prestige currency name
    baseResource: "Codename Trademark subscribers", // Resource used to gain prestige points
    baseAmount() { return player.ct.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.01625, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.enhance.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 4, // Row in the tree (4 = fifth row)
    branches: ["infi"], // Branch from Infinity visually

    hotkeys: [
        { key: "3", description: "3: Reset for Enhancers", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "Resource Multiplier",
            description: "Boost all pre-infinity resource gain based on enhancers, except for regular points. (initial 10x multi)",
            cost: new Decimal(1),
            effect() {
                let base = player.enhance.points.times(5).add(10); // Original effect formula
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
            description: "Boost point gain drastically based on enhancers and Infinity points (initial 50x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("enhance", 11); },
            effect() {
                let base = player.enhance.points.add(1).pow(1.75).times(player.infi.points.div(1e6).add(1).pow(0.5)).times(50); // Original effect formula
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
            description: "Boost Infinity point gain based on enhancers (initial 5x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("enhance", 12); },
            effect() {
                let base = player.enhance.points.add(1).pow(0.6).times(5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.enhance.points.div(10000).pow(0.3); // Slight division factor
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
            description: "Unlock Galaxies (not yet released), and they power Infinity point gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("enhance", 13); },
            effect() {
                let base = player.enhance.points.add(1).pow(0.6).times(5); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.enhance.points.gte(new Decimal(10000))) {
                    diminishingFactor = player.enhance.points.div(10000).pow(0.3); // Slight division factor
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
    },
    milestones: {
        0: {
            requirementDescription: "100 Enhance Points",
            effectDescription: "Premium Enhancer!",
            done() { return player.enhance.points.gte(100); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "Now you can get enhancers to drastically boost many aspects of progression!"],
            ],
        },
    },
});
addLayer("sunny", {
    name: "SunnyV2", // Full name of the layer
    symbol: "SV2", // Symbol displayed on the tree
    position: 3, // Position in the tree
    startData() {
        return {
            unlocked: false, // Starts locked until requirements are met
            points: new Decimal(0), // Prestige points for this layer
        };
    },
    color: "#9db1e0", // ultralight blue
    requires: new Decimal("1e310"), // Points required to unlock this layer
    resource: "SunnyV2 points", // Prestige currency name
    baseResource: "Aubrinators", // Resource used to gain prestige points
    baseAmount() { return player.aub.points; }, // Current amount of baseResource
    type: "normal", // Standard prestige layer type
    exponent: 0.02, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has Infinity Upgrade 3:4
        return hasUpgrade("infi", 34) || player.sunny.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
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

    upgrades: {
        11: {
            title: "Rise and Shine",
            description: "SunnyV2's documentaries gain some popularity. Boost point and layer 3 currency gain linearly based on SunnyV2 points (initial 100x multi).",
            cost: new Decimal(1),
            effect() {
                let base = player.sunny.points.times(100).add(100); // Original effect formula
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
            description: "SunnyV2 decides to collab with Aubrie for a massive documentary! Boost Aubrinator gain drastically based on SunnyV2 points (initial 40x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("sunny", 11); },
            effect() {
                let base = player.sunny.points.add(1).pow(1.25).times(40); // Original effect formula
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
            description: "SunnyV2 makes a few BTS videos to show how he does his documentaries. Boost LTF, Ninja, and massive point gain drastically based on SunnyV2 points (initial 25x multi).",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("sunny", 12); },
            effect() {
                let base = player.sunny.points.add(1).pow(1.3).times(25); // Original effect formula
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
    },
    milestones: {
        0: {
            requirementDescription: "100 SunnyV2 Points",
            effectDescription: "Documentary Hotspot!",
            done() { return player.sunny.points.gte(100); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "SunnyV2 has been making documentaries of this meme and other things for a while now."],
            ],
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
    base: new Decimal(1.75),
    canBuyMax: false,
    baseResource: "Infinity points", // Resource used to gain prestige points
    baseAmount() { return player.infi.points; }, // Current amount of baseResource
    type: "static", // Standard prestige layer type
    exponent: 1.8, // Scaling factor for prestige points

    layerShown() {
        // Check if the player has Enhancer Upgrade 1:4
        return hasUpgrade("enhance", 14) || player.gal.points.gte(1);
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

    upgrades: {
        11: {
            title: "LET HIM COOK!",
            description: "Vexbolts' meme Let Him Cook becomes viral! Boost point gain drastically based on LTF, Ninja, massive, and Vexbolts points (initial 1,000x multi).",
            cost: new Decimal(1),
            effect() {
                return player.vex.points.add(1).pow(2).times(player.ltf.points.div(10).add(1).pow(0.02)).times(player.ninja.points.div(2.5).add(1).pow(0.025)).times(player.massive.points.add(1).pow(0.03)).times(1000); // Complex multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100 Vexbolts Points",
            effectDescription: "Brainrot Artist!",
            done() { return player.vex.points.gte(100); },
        },
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "Little did we know, Vexbolts has been thinking of ways to drag the meme at its early stages."],
            ],
        },
    },
});
