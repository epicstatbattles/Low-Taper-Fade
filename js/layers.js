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
        16: {
            title: "Imagine If Ninja got a LOW TAPER FADE",
            description: "Boost point gain MASSIVELY based on low taper fade points.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("ltf", 15); },
            effect() {
                let base = player.ltf.points.times(4).add(1).pow(0.375); // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ltf.points.gte(new Decimal(1e20))) {
                    diminishingFactor = player.ltf.points.div(1e20).pow(0.175); // Slight division factor
                }
            return base.div(diminishingFactor); // Apply the diminishing factor
        },
            effectDisplay() { 
                let isSoftcapped = player.ltf.points.gte(1e20); // Check if softcap applies
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

    gainMult() { // Multiplicative bonus to prestige point gain
        let mult = new Decimal(1);
        if (hasUpgrade("ninja", 23)) mult = mult.times(upgradeEffect("ninja", 23));
        if (hasUpgrade("massive", 13)) mult = mult.times(upgradeEffect("massive", 13));
        if (hasUpgrade("ct", 23)) mult = mult.times(upgradeEffect("ct", 23));
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
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
                return player.ninja.points.add(1).pow(0.175).times(1.2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Operation Meme Drag",
            description: "Low taper fade points are boosted based on your Ninja points (initial multiplier of 1.2x).",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ninja", 12); },
            effect() {
                let base = player.ninja.points.div(3).add(1).pow(0.35).times(1.2) // Original effect formula
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ninja.points.gte(new Decimal(1e10))) {
                    diminishingFactor = player.ninja.points.div(1e10).pow(0.15); // Slight division factor
                }

                return base.div(diminishingFactor); // Final effect
            },
            effectDisplay() { 
                let isSoftcapped = player.ninja.points.gte(1e10); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
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
                let diminishingFactor = new Decimal(1); // Default factor

                // Apply diminishing factor only if points exceed the threshold
                if (player.ninja.points.gte(new Decimal(1e10))) {
                    diminishingFactor = player.ninja.points.div(1e10).pow(0.25); // Slight division factor
                }

                return base.div(diminishingFactor); // Final effect
            },
            effectDisplay() { 
                let isSoftcapped = player.ninja.points.gte(1e10); // Check if softcap applies
                let display = "x" + format(this.effect()); // Base effect display

                if (isSoftcapped) {
                    display += " (SC)"; // Append softcap indicator
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
        return mult;
    },

    gainExp() { // Exponential bonus to prestige point gain
        return new Decimal(1); // Default is no additional exponential scaling
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
                return player.massive.points.div(2).add(1).pow(0.26).times(1.1);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Massive Point Boost",
            description: "Point gain is MASSIVELY boosted based on their amount and massive points.",
            cost: new Decimal(10),
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
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("massive", 12); },
            effect() {
                return player.massive.points.div(3).add(1).pow(0.22).times(1.2);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        14: {
            title: "Self-Boost",
            description: "Massive points boost themselves! (Warning: Might lead to inflation)",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("massive", 13); },
            effect() {
                return player.massive.points.div(20).add(1).pow(0.17);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        15: {
            title: "Point Powerizer",
            description: "Point gain is RAISED to an exponent based on massive points.",
            cost: new Decimal(500000),
            unlocked() { return hasUpgrade("massive", 13); },
            effect() {
                return player.massive.points.div(200).add(10).log10().pow(0.15);
            },
            effectDisplay() { return "^" + format(this.effect()); },
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
addLayer("ct", {
    name: "Codename Trademark", // Full name of the layer
    symbol: "CT", // Symbol displayed on the tree
    position: 1, // Position in the tree
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
            description: "Codename Trademark development begins! Multiply point gain by 10.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(10); // Simple multiplier
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        12: {
            title: "Update CT",
            description: "CT is receiving updates! Receive a 5x boost to low taper fade point gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ct", 11); },
            effect() {
                return new Decimal(5);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        13: {
            title: "Stream CT",
            description: "CT is being streamed! Gain more points based on your CT subscribers!",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("ct", 12); },
            effect() {
                return player.ct.points.times(2).add(10).log10().pow(3);
            },
            effectDisplay() { return "x" + format(this.effect()); },
        },
        21: {
            title: "Release CT",
            description: "CT Ultra 1.00 has been released! LTF gain is boosted based on your CT subscribers!",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("ct", 13); },
            effect() {
                return player.ct.points.times(1.5).add(10).log10().pow(2.25);
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
            description: "You are grinding in CT! CT subs boost both Ninja and massive points!",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("ct", 22); },
            effect() {
                return player.ct.points.div(2).add(1).pow(0.125);
            },
            effectDisplay() { return "x" + format(this.effect()); },
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
