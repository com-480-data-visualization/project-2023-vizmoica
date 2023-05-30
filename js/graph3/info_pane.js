// ============================================= Studio =============================================



function showStudioInfo(studio, studioData, studioNumAnimesData, animeData, studioTopAnimeData, studioCountriesData) {
    // Switch to the studio tab
    studioTab.show()

    country_names = studioCountriesData.filter(d => d.studio == studio).map(d => d.country)
    let num_countries = country_names.length

    studioData = studioData.find(d => d.name_en == studio)
    console.log(studioData)

    // Studio name (english and japanese)
    let name = d3.select("#studio-name")
    name.selectAll("*").remove();
    name = name.append("h2")
    name.append("a")
        .attr("href", "https://myanimelist.net/anime/producer/" + studioData.id)
        .attr("target", "_blank")
        .text(studioData.name_en)
        .attr("style", "color: black; text-decoration: none;")
        .attr("onmouseover", "this.style.color='orange'")
        .attr("onmouseout", "this.style.color='black'")
    if (studioData.name_ja != "") {
        name.append("span")
            .text(" (" + studioData.name_ja + ")")
            .style("font-size", "0.75em");
    }

    // Studio logo
    let logo = d3.select("#studio-logo")
    logo.selectAll("*").remove();
    logo.append("img")
        .attr("src", studioData.logo_url)
        .attr("class", "rounded mx-auto d-block")
        .attr("alt", studioData.name_en)
        .attr("title", studioData.name_en)
        // If no picture, display the default picture of MAL instead (e.g., https://myanimelist.net/anime/producer/253)
        .attr("onerror", "this.onerror=null;this.src='../../data/graph3_map/no_picture_mal.png';")

    let num_animes = studioNumAnimesData.find(d => d.studio == studio).num_animes

    let num_info = d3.select("#studio-num-animes-num-countries")
    num_info.selectAll("*").remove();
    num_info.append("h5")
        .text(num_animes + " anime" + (num_animes > 1 ? "s" : "") + ", watched in " + num_countries + " countries")
        .attr("class", "d-block text-center")


    // Disable the color fill during mouseover
    // studioMap.selectAll("path").style("fill", null)

    
}

// ============================================= Country =============================================

function showCountryInfo(d, topAnimesData, animeData, topStudios, genderData, ageData, daysData) {
    // Switch to the country tab
    countryTab.show()

    let engName = d.properties.admin;
    let japName = d.properties.name_ja

    /* Country general information */
    // Country name (english and japanese)
    d3.select("#countryName")
        .text(engName)
        .append("span")
        .text(" (" + japName + ")")
        .style("font-size", "0.75em");

    // Country's number of users
    let numUsers = d.properties.value;
    d3.select("#numUsers").text(numUsers ? formatAsThousands(numUsers) + " otakus (ranked #" + d.properties.countRank + ")" : "No otakus here :(");

    // Country flag
    updateFlag(d);

    /* Country stats */
    // Top 3 animes
    countryTopAnimes = topAnimesData.filter(d => d.country === engName).slice(0, 3);
    updatePodium(countryTopAnimes, animeData, "country-top-animes")

    // Top studios
    topStudios = topStudios.filter(d => d.country === engName)
    updateRankings(topStudios, "country-top-studios", "Studio", "Number of ratings", "studio", "num_ratings")

    // Gender balance
    genderBalance = updateGenderChart(genderData, engName);

    // Age distribution
    ageDistrib = createAgeChart(ageData, engName);
    // Resize the width and height of the chart
    // ageDistrib.attr("width", "100%")

    // Mean number of days spent watching anime
    // Find the corresponding country in the daysData
    let countryDays = daysData.find(d => d.country == engName);
    if (!countryDays) {
        d3.select("#country-num-days").text("No data available");
        return;
    }
    let numDays = countryDays.num_days_spent_watching_mean
    let numDaysFormat = formatAsDays(numDays)
    let numDaysRank = countryDays.rank
    d3.select("#country-num-days").text("On average, an otaku has spent " + numDaysFormat + " watching animes (ranked #" + numDaysRank + ")");
}

/**
 * 
 * @param {*} d 
 */
function updateFlag(d) {
    let flag = d3.select("#country-flag")
    flag.selectAll("*").remove();
    flag = flag.append("img")
        .attr("src", d.properties.flag_path)
        .attr("class", "rounded mx-auto d-block")
        .attr("alt", d.properties.admin)
        .attr("title", d.properties.admin)
        // If no picture, display the default picture of MAL instead (e.g., https://myanimelist.net/anime/producer/253)
        .attr("onerror", "this.onerror=null;this.src='../../data/graph3_map/no_picture_mal.png';")
}