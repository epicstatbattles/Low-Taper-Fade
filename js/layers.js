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
        return mult; // Ensure the function closes correctly
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
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
                let ltfBoost = player.points.div(1e45).add(1).pow(0.05); // LTF point boost
                let pointsBoost = player.ltf.points.div(1e27).add(1).pow(0.0675);  // Regular point boost
                return { ltfBoost, pointsBoost };
            },
            effectDisplay() { 
                let eff = this.effect();
                return `LTF Boost: x${format(eff.ltfBoost)}, Point Boost: x${format(eff.pointsBoost)}`; 
            },
        },
        23: {
            title: "The 2 Draggers",
            description: "Ninja and Madelyn drag the meme A LOT! Massive point gain is boosted by LTF points.",
            cost: new Decimal(1e39),
            unlocked() { return hasUpgrade("ltf", 22); },
            effect() {
                return player.ltf.points.add(10).log10().pow(0.3125); // Logarithmic growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        24: {
            title: "Codename Low Taper Fade",
            description: "CT sub gain is boosted by LTF points.",
            cost: new Decimal(1e45),
            unlocked() { return hasUpgrade("ltf", 23); },
            effect() {
                return player.ltf.points.add(10).log10().pow(0.2625); // Logarithmic growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        25: {
            title: "Widespread Meme",
            description: "Boost LTF, Ninja, and massive points based on points.",
            cost: new Decimal(1e60),
            unlocked() { return hasUpgrade("ltf", 24); },
            effect() {
                return player.points.add(10).log10().pow(0.3125); // Logarithmic growth
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1);
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
            cost: new Decimal(200000),
            unlocked() { return hasUpgrade("massive", 14); },
            effect() {
                let base = player.massive.points.div(40000).add(10).log10().pow(0.06); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.massive.points.gte(new Decimal(1e10))) {
                    diminishingFactor = player.massive.points.div(1e9).log10().pow(0.0125); // Slight division factor
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
                return player.mady.points.add(1).pow(0.32).times(1.3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
                let base = player.mady.points.div(20).add(10).log10().pow(0.1).times(1.01); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.mady.points.gte(new Decimal(1e5))) {
                    diminishingFactor = player.mady.points.div(1e4).log10().pow(0.0225); // Slight division factor
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
                return player.mady.points.div(4).add(1).pow(0.25).times(1.4);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        31: {
            title: "Song Releases",
            description: "The song releases and now people just have to watch it. Boost point gain MASSIVELY based on Madelizers.",
            cost: new Decimal(25600),
            unlocked() { return hasUpgrade("mady", 23); },
            effect() {
                return player.mady.points.div(4).add(1).pow(0.525);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
                return player.ct.points.times(1.5).add(10).log10().pow(1.8).times(1.3);
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
                return player.ct.points.div(2).add(1).pow(0.1125).times(1.1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        31: {
            title: "Elite CT Player",
            description: "You manage to reach the top ranks in CT! Boost point and LTF point gain based on CT subs.",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("ct", 23) && hasUpgrade("aub", 22); },
            effect() {
                return player.ct.points.div(1.5).add(1).pow(0.1325);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
                let aubBoost = player.mady.points.div(1e4).add(1).pow(0.08); // Aubrinator boost
                let madyBoost = player.aub.points.div(1e3).add(1).pow(0.1);  // Madelizer boost
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
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 2, // Row in the tree (2 = third row)
    branches: ["massive"], // Branch from massive visually

    hotkeys: [
        { key: "u", description: "u: Reset for Aubrinators", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
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
                return player.aub.points.add(1).pow(0.32).times(1.3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Documentary",
            description: "Aubrie makes a 2-hour documentary on the low taper fade, boosting Ninja's popularity! Boost Ninja point gain based on their amount and Aubrinators (initial 1.2x multi).",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("aub", 13); },
            effect() {
                let aubEffect = player.aub.points.add(1).pow(0.3).times(1.2); // Effect based on aub points
                let njaEffect = player.ninja.points.div(10000).add(1).pow(0.06); // Effect based on nja points

                return aubEffect.times(njaEffect);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
            description: "Aubrie's popularity is so high that it's beginning to rival that of major celebrities. Boost massive point gain based on Aubrinators.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("aub", 22); },
            effect() {
                return player.points.div(5).add(1).pow(0.15);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        31: {
            title: "Widespread Recognition",
            description: "Aubrie gained tons of recognition from her countless videos on the low taper fade. Boost Aubrinator gain based on points.",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("aub", 23); },
            effect() {
                return player.points.div(1e10).add(1).pow(0.0075);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    
    milestones: {
        0: {
            requirementDescription: "1000000 Aubrinators",
            effectDescription: "I guess u just won since idk what to put here.",
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
        return player.massive.points.gte(new Decimal(1e200)) || player.infi.points.gte(1);
    },

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("aub", 31)) mult = mult.times(upgradeEffect("aub", 31));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
    },

    row: 3, // Row in the tree (3 = fourth row)
    branches: ["mady", "ct", "aub"], // Branch from all 3 third-row points visually

    hotkeys: [
        { key: "u", description: "u: Reset for Aubrinators", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],

    upgrades: {
        11: {
            title: "New Beginning",
            description: "This is a really big reset. Here are some buffs to help you out. 16x boost to point gain, and 4x boost to LTF, Ninja, and massive point gain.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(16); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()) + "(^0.5 to LTF, Ninja, and massive points)"; },
        },
        12: {
            title: "More Buffs",
            description: "Gain a 2.5x boost to CT subscriber, Madelizer, and Aubrinator gain.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("infi", 11); },
            effect() {
                return new Decimal(2.5);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Here's a scaling upgrade",
            description: "Point gain is MASSIVELY boosted based on infinity points (initial 2x multi).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("infi", 12); },
            effect() {
                return player.infi.points.add(1).pow(0.64).times(2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "The Meme of all Memes",
            description: "Boost low taper fade point gain based on infinity points (initial 2x multi).",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("infi", 13); },
            effect() {
                return player.infi.points.div(1.5).add(1).pow(0.56).times(2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Ninja, The Transcendent",
            description: "Ninja drags the meme to the point where he becomes the most popular man on the planet. Boost Ninja and massive point gain based on infinity points. (initial 2x multi)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("infi", 14); },
            effect() {
                return player.infi.points.div(2).add(1).pow(0.5).times(2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        22: {
            title: "Infinitrademark",
            description: "CT has become a powerful force to not be messed with. Boost CT subscriber gain based on infinity points. (initial multi 2.5x)",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("infi", 21); },
            effect() {
                return player.infi.points.div(2.5).add(1).pow(0.45).times(2.5);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
    },
    
    milestones: {
        0: {
            requirementDescription: "100 Infinity Points",
            effectDescription: "Reached Endgame!",
            done() { return player.infi.points.gte(100); },
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
                ["raw-html", () => "You have earned so many points that you can now infinity. Reset everything prior to infinity in exchange for monumental boosts."],
            ],
        },
    },
});
