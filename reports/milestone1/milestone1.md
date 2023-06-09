## Milestone 1 (7th April, 5pm)

### Datasets

1. **[MyAnimeList Dataset](https://www.kaggle.com/azathoth42/myanimelist)**: contains data that was scrapped from [MyAnimeList](https://myanimelist.net) website, a social network and catalogue centered around animes and mangas. The dataset contains information on 302,673 users and 14,478 animes, and is composed of three main files:
    - [UserList.csv](../../data/UserList.csv) contains information about the users, such as the username, location, birthdate. The dataset also comprises a filtered version which retains only the users who have all of birth date, location, and gender defined, and a cleaned version which additionally removes users who have "suspicious" values (too many watched episodes, too young or too old, etc.): [users_filtered.csv](../../data/users_filtered.csv) and [users_cleaned.csv](../../data/users_cleaned.csv).
    - [AnimeList.csv](../../data/AnimeList.csv) contains information about the anime, such as the title, genres, studio, or the URL of the poster image. The dataset includes as well a filtered and cleaned version which remove the ratings from the users of the corresponding filtered and cleaned user datasets: [anime_filtered.csv](../../data/anime_filtered.csv) and [anime_cleaned.csv](../../data/anime_cleaned.csv).
    - [UserAnimeList.csv](../../data/UserAnimeList.csv) contains the anime lists of all users. As the file exceeds the maximum size of 100MB allowed by GitHub, it needs to downloaded separately [here](https://www.kaggle.com/datasets/azathoth42/myanimelist?select=UserAnimeList.csv).
2. **[Anime Recommendations Database vol.2](https://www.kaggle.com/datasets/noiruuuu/anime-recommendations-database-vol2)**: gathers 11,039,694 ratings from 108,024 MyAnimeList users on 15,221 animes.
    - [animes.csv](../../data/animes.csv) contains information about the anime, similarly as AnimeList.csv.
    - [ratings.csv](../../data/ratings.csv) contains the ratings, ranging from 0 to 10. Must be downloaded separataly [here](https://www.kaggle.com/datasets/noiruuuu/anime-recommendations-database-vol2?select=ratings.csv).
3. **[Anime Character Traits Dataset](https://www.kaggle.com/datasets/mjrone/anime-character-traits-dataset?select=Anime_Triats.csv)**: contains information on 119,824 anime characters such as their name, gender, hair color, their physical and temperamental traits, or the anime they appear in. The data was scrapped from [Anime Characters Database](https://www.animecharactersdatabase.com). 
    - [Anime_Traits.csv ](../../data/Anime_Traits.csv) contains the data about the characters.



### Problematic
*In what ways do animes showcase Japan's cultural impact on a global scale?*

The main topic of this project is to explore the spread of Japan's culture worldwide, by visualizing the global popularity and reach of anime as a form of entertainment. We will mainly focus on showcasing the widespread viewership of these art industry across different countries, cultures, and age groups.

> - What am I trying to show with my visualization?

The purpose of our visualization project is to highlight the global popularity of anime industry, an art form with a wide variety of genres that appeal to diverse audiences worldwide, to the point of becoming a major contributor to Japan's soft power strategy. Animes feature characters that are relatable and resonate with people across different cultures, regions and age groups, contributing to its worldwide appreciation. We will try to show through different interactions and visualizations the repetition of some patterns in different countries with respect to the popularity of genres, character traits or studios.


> - Think of an overview for the project, your motivation, and the target audience.

Our project will present the preferred anime genres, characters, studios and their popularity in various countries, age groups, or genders while analyzing patterns that may emerge across these fields.
Furthermore, we intend to stress and compare the exportability of the various animation studios' artworks. 
By doing so, we hope to demonstrate to the viewers how anime has become a unifying force in today's globalized world.
The target audience for this project includes anime enthusiasts but also researchers and academics who are interested in distinguishing trends in entertainment on a global scale, or in analyzing the cultural policies of Japan.

### Exploratory Data Analysis
We divided our data analysis into three main axes:

#### **Mapping location data to countries ([eda_country.ipynb](../../preprocessing/eda_country.ipynb))**

As we are interested in the worldwide influence of animes, we began by cleaning the location data that was scrapped from MyAnimeList in [UserList.csv](/data/UserList.csv) by mapping it to the corresponding countries, if possible. We applied a function to the unique 55,280 location strings retrieved from the 302,673 users of the dataset, that leverages [GeoPy's API](https://geopy.readthedocs.io/en/stable/#) geolocation services to resolve the full location from the string, and keep only the country name. Many location strings failed however to be mapped, for one of the following reasons:
- The string contains typos (e.g. "Las Veags,Nevada") which are not recognized by the geocoding service. Translating the string to English (using []()) corrects some of them.
- The string is fictional (e.g. "Mordor, Middle-Earth") or not a location at all (e.g. "1871", "I don't think soo").
- The string contains additional words that make the geocoder fail, e,g., "Portland Oregon AKA The city of roses".

In total, 15,595 users (9.95%) have a undefined country.

The following graph displays the countries with the highest number of users:
It's no surprise that the United States is prominently featured, considering that MyAnimeList was established and operates in this country.

![Number of users per country](../../data/plots/country_num_users.png)

We are also interested in the studios whose animes are watched in the highest number of countries:

![Number of countries per studio](../../data/plots/studio_num_countries.png)

We observe that the most popular studios worldwide do not necessarily produce the most popular animes in terms of ratings:

![Number of ratings per studio](../../data/plots/studio_num_ratings.png)


#### **Genres ([eda_genre.ipynb](../../preprocessing/eda_genre.ipynb))**
We are also interested in the most popular genres in terms of number of animes:

![Number of animes per genre](../../data/plots/genre_num_animes.png)


#### **Characters ([eda_character.ipynb](../../preprocessing/eda_character.ipynb))**
Finally, we derived the most common traits of anime characters. 

![Most common traits for animes characteristics](../../data/plots/anime_characters_traits.png)


### Related work

> What others have already done with the data?

- The [worldwideweebz](https://github.com/com-480-data-visualization/com-480-project-worldwideweebz) group already used the MyAnimeList dataset in 2020 for this class and has focused its analysis on the diversity of anime, their growing popularity and the voice actor network.

> Why is your approach original?

We place a strong emphasis on animes as an artform that overcomes lingual and cultural barriers. We believe this aspect has not been analyzed before on the basis of information gathered from social network datasets, especially since we will try to make it as interactive as possible.