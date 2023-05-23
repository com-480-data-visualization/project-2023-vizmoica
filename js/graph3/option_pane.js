/**
 * 
 * @param {*} geojsonData 
 * @returns 
 */
function createCountrySelector(geojsonData) {
    let countrySelector = d3.select("#country-selector");

    // Keep only the admin, sovereignt, iso_a2 properties
    data = geojsonData.features
        .map(d => {
            return {
                admin: d.properties.admin,
                sovereignt: d.properties.sovereignt,
                iso_a2: d.properties.iso_a2
            }
        })
        .sort((a, b) => a.sovereignt.localeCompare(b.sovereignt));
    
    console.log(data)

    // For each sovereignt, put the entry whose admin==sovereignt first
    let sovereignt = "";
    let sovereigntIndex = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].sovereignt != sovereignt) {
            sovereignt = data[i].sovereignt;
            sovereigntIndex = i;
        }
        if (data[i].admin == sovereignt) {
            let temp = data[i];
            data[i] = data[sovereigntIndex];
            data[sovereigntIndex] = temp;
            sovereigntIndex++;
        }
    }

    // Set of the countries which are the sovereignt of another country (remove duplicates)
    let sovereigntSet = new Set(data.filter(d => d.admin != d.sovereignt).map(d => d.sovereignt));

    countrySelector.selectAll("option")
        .data(data.filter(d => !sovereigntSet.has(d.sovereignt)))
        .enter()
        .append("option")
        .attr("value", d => d.admin)
        .text(d => getFlagEmoji(d.iso_a2) + " " + d.admin)
        .attr("label", d => getFlagEmoji(d.iso_a2) + " " + d.admin)

    let optgroups = countrySelector.selectAll("optgroup")
        .data(data.filter(d => sovereigntSet.has(d.admin)))
        .enter()
        .append("optgroup")
        .attr("label", d => getFlagEmoji(d.iso_a2) + " " + d.admin);
    // The sovereignt itself
    optgroups.append("option")
        .attr("value", d => d.admin)
        .text(d => d.admin);
    // The territories
    optgroups.each(function (d) {
        let optgroup = d3.select(this);
        let territories = data.filter(item => item.sovereignt === d.admin);
        // Before each name, add a "bullet" so as to make a bullet list
        optgroup.selectAll("option")
            .data(territories)
            .enter()
            .append("option")
            .attr("value", d => d.admin)
            .text(d => "• " + d.admin);
    });

    return countrySelector;
}


function createStudioSelector() {

}
