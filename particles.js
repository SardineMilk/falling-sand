export const PARTICLES = {

    AIR: { 
        id: 0,
        colour: {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
        },
        properties: [
            "GAS",
            "STATIC",
        ]
    },

    SAND: { 
        id: 1,
        colour: {
            r: 205,
            g: 170,
            b: 109,
            a: 255,
        },
        properties: [
            "SOLID",
            "DYNAMIC",
        ],
        rules: [
            {
            conditions: [
                {
                pattern: {
                    include: {
                        grid: {
                            dx: [-1, 0, 1],
                            dy: [-1],
                        }
                    },
                    exclude: { 
                        cells: [{ dx: 0, dy: 0 }],
                    },
                },
                filter: {
                    any: ["GAS", "LIQUID"],
                    none: ["SOLID"],
                },
               },
            ],
            result: {
                select: "random",
                move: {
                dx: "$dx",
                dy: "$dy",
                }
            }
            }
        ],
    },

    WATER: { 
        id: 2,
        colour: {
            r: 15,
            g: 94,
            b: 156,
            a: 150,
        },
        properties: [
            "LIQUID",
            "DYNAMIC",
        ],
        rules: [
            {
            conditions: [
                {
                pattern: {
                    include: {
                        grid: {
                            dx: [-1, 0, 1],
                            dy: [-1, 0],
                        }
                    },
                    exclude: { 
                        cells: [{ dx: 0, dy: 0 }],
                    },
                },
                filter: {
                    any: ["GAS"],
                    none: ["SOLID", "LIQUID"],
                },
                },
            ],
            result: {
                select: "random",
                move: {
                dx: "$dx",
                dy: "$dy",
                }
            }
            }
        ],
    },

}
