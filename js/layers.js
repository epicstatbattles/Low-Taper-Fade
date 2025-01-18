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
    }
        return mult;
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
            return player.ltf.points.add(1).pow(0.425); // Power scaling
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
    },

    buyables: {
        11: {
            title: "Massive Meme Stimulant",
            cost(x) { return new Decimal(20).times(Decimal.pow(2, x)); }, // Scaling cost
            effect(x) { return Decimal.pow(1.4, x); }, // Multiplier effect
            display() { return `Increase point gain by x${format(this.effect())}<br>Cost: ${format(this.cost())} low taper fade points`; },
            canAfford() { return player.ltf.points.gte(this.cost()); },
            buy() {
                player.ltf.points = player.ltf.points.sub(this.cost());
                addBuyables(this.layer, 11, 1);
            },
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
                "buyables",
            ],
        },
        "About": {
            content: [
                ["raw-html", () => "The Low Taper Fade Haircut is all about precision and style. Prestige in this layer to show off your grooming skills!"],
            ],
        },
    },
});
