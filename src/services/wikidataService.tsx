import Category from "../SearchCategory";

const ENDPOINT: string = "https://query.wikidata.org/sparql";

export interface WikidataPerson {
    name: string;
    occupation: string;
}

function getWomanQuery(name: string): string {
  return `
    SELECT ?woman ?womanLabel ?occupationLabel
    WHERE {
      SERVICE wikibase:mwapi {
        bd:serviceParam wikibase:api "EntitySearch" ;
                        wikibase:endpoint "www.wikidata.org" ;
                        mwapi:search "${name}" ;
                        mwapi:language "en" .
        ?woman wikibase:apiOutputItem mwapi:item .
      }
      ?woman wdt:P21  wd:Q6581072 ;
             wdt:P106 ?occupation .
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en" .
      }
    }
    LIMIT 1
  `
}

function getManQuery(name: string): string {
  return `
    SELECT ?man ?manLabel ?occupationLabel
    WHERE {
      SERVICE wikibase:mwapi {
        bd:serviceParam wikibase:api "EntitySearch" ;
                        wikibase:endpoint "www.wikidata.org" ;
                        mwapi:search "${name}" ;
                        mwapi:language "en" .
        ?man wikibase:apiOutputItem mwapi:item .
      }
      ?man wdt:P21  wd:Q6581097 ;
           wdt:P106 ?occupation .
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en" .
      }
    }
    LIMIT 1
  `
}

export async function searchPerson(name: string, category: Category): Promise<WikidataPerson | null> {
    // Encode to include URL-safe characters.
    let url = ''
    if (category === Category.Women) {
      url = `${ENDPOINT}?query=${encodeURIComponent(getWomanQuery(name))}&format=json`;
    } else if (category === Category.Men) {
      url = `${ENDPOINT}?query=${encodeURIComponent(getManQuery(name))}&format=json`;
    }

    const response = await fetch(url, {
        // Make sure wikidata sends back in json.
        headers: {
          Accept: "application/sparql-results+json",
          // Identifies app to not get requests blocked.
          'User-Agent': 'my-app/1.0 (https://github.com/yourname/my-app)'
        },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Wikidata request failed — status: ${response.status}, body: ${errorBody}`)
    }

    const data = await response.json();

    // Array of result rows, each row being a match from the query.
    const results = data.results.bindings;

    if (results.length === 0) return null;

    const label = category === Category.Women ? "womanLabel": "manLabel";
    return {
        name: results[0][label].value,
        occupation: results[0].occupationLabel.value,
    }
}