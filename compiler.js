import { PARTICLES } from "./particles.js";

function buildTagIndex(particles) {
    /*
    Build a dictionary from particles
    Keys: Every tag existing in particles
    Values: list of id's with the tag
    */
    const tagIndex = {};

    for (const key in particles) {
        const particle = particles[key];
        const id = particle.id;


        // Add matching particles to tag list
        const tags = particle.properties || [];

        // include name as tag
        const allTags = [...tags, key];

        for (const tag of allTags) {
            if (!tagIndex[tag]) {
                tagIndex[tag] = [];
            }

            tagIndex[tag].push(id);
        }
    }

    return tagIndex;
}

function replaceTagMacros(particles, tagIndex) {
    // E.g. ["SAND", "WATER"] -> [1, 2] 
    
    function expandTagArray(arr) {
        const out = [];

        for (const tag of arr) {
            const ids = tagIndex[tag];

            if (Array.isArray(ids)) {
                out.push(...ids);
            }
        }

        // remove duplicates
        return [...new Set(out)];
    }

    function transform(obj) {
        if (Array.isArray(obj)) {
            return obj.map(transform);
        }

        if (obj && typeof obj === "object") {
            const copy = {};

            for (const key in obj) {
                const value = obj[key];

                // RULE FILTER MACROS
                if (key === "filter" && value && typeof value === "object") {
                    copy[key] = {
                        ...value
                    };

                    for (const fKey of ["any", "none", "all"]) {
                        if (Array.isArray(value[fKey])) {
                            copy[key][fKey] = expandTagArray(value[fKey]);
                        }
                    }
                }
                else {
                    copy[key] = transform(value);
                }
            }

            return copy;
        }

        return obj;
    }

    const result = {};

    for (const name in particles) {
        result[name] = transform(particles[name]);
    }

    for (const key in result) {
        delete result[key].properties;
    }

    return result;
}

function extractColourArray(particles) {
    let result = [];
    for (const key in particles) {
        const id = particles[key].id;
        const colour = particles[key].colour;
        result[id] = colour;
    }
    return result;
}

function extractRulesArray(particles) {
    let result = [];
    for (const key in particles) {
        const id = particles[key].id;
        let rules = particles[key].rules;
        if (rules == undefined) {
            rules = [];
        }
        result[id] = rules;
    }
    return result;

}


export function compile(particles, width, height) {
    let compiledParticles = particles;

    // Create tag->IDs map
    const tagIndex = buildTagIndex(compiledParticles);
    // Replace all tags with IDs
    compiledParticles = replaceTagMacros(compiledParticles, tagIndex);
    // Create colour array
    const colours = extractColourArray(compiledParticles);
    // Cleanup - Remove unecessary data
    let particleRules = extractRulesArray(compiledParticles);

    for (const i in particleRules) {
        const rules = particleRules[i];  // Rules array for a single particle
        console.log(i);
        for (const j in rules) {
            const rule = rules[j];  // A single rule of a particle

            const conditions = rule.conditions;
            const result = rule.result;

            for (const k in conditions) {
                const condition = conditions[k];
                let conditionsString = "";


                const pattern = condition.pattern;
                const include = pattern.include;
                const exclude = pattern.exclude;


                function expandPattern(grid, cells) {
                    let expandedArray = [];

                    // Grid expansion            
                    if (grid != undefined) {        
                        const xValues = grid.dx;
                        const yValues = grid.dy;
                        for (const i in xValues) {
                            for (const j in yValues) {
                                const dx = xValues[i];
                                const dy = yValues[j];

                                const offset = dx + (dy * width);

                                expandedArray.push(offset);
                            }
                        }
                    }
                    
                    if (cells != undefined) {
                        // Cells expansion
                        for (const i in cells) {
                            const cell = cells[i];
                            const offset = cell.dx + (cell.dy * width);
                            expandedArray.push(offset);
                        }
                    }
                    return expandedArray;
                }


                const includeArray = expandPattern(include.grid, include.cells);
                const excludeArray = expandPattern(exclude.grid, exclude.cells);

                // Remove anything in excludeArray from includeArray
                const offsetsArray = []
                for (const i in includeArray) {
                    const offset = includeArray[i];
                    let flag = true;
                    for (const j in excludeArray) {
                        if (offset == excludeArray[j]) flag = false; 
                    }
                    if (flag == true) offsetsArray.push(offset);
                }

                console.log("pattern");
                console.log(offsetsArray);

                // offsets = includeArray - excludeArray

                const filter = condition.filter;
                const any = filter.any;
                const all = filter.all;
                const none = filter.none;
                console.log("filter");
                console.log(filter);
            }

            console.log("result");
            console.log(result);
            const move = result.move;
            const transform = result.transform;
            const set = result.set;


        }
    }



   return {particleRules, colours};
}
    

