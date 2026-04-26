import React, { useState } from "react";
import Category from "./SearchCategory";

import { searchPerson } from "./services/wikidataService";
import type { WikidataPerson } from "./services/wikidataService";


// Checking if user has already queried the same person.
function hasDuplicate(results: WikidataPerson[], result: WikidataPerson): boolean {
  if (results.length === 0) return false;
  
  let hasDupe = false
  results.forEach((item) => {
    if (item.name === result.name && item.occupation === result.occupation) {
      hasDupe = true;
    };
  })

  return hasDupe;
}


function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.None);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WikidataPerson[]>([]);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();  // Prevent page reload.
    if (!query.trim()) return;  // Nothing is typed in.

    // Only search if a category is selected.
    if (activeCategory !== Category.None) {
      console.log("Query: " + query);
      const result = await searchPerson(query, activeCategory);
      
      if (!result) return

      console.log("Result: " + result.name + ", " + result.occupation)

      // Prevent duplicate people.
      if (!hasDuplicate(results, result)) {
        setResults(prevResults => [...prevResults, { name: result.name, occupation: result.occupation }])
      }

      console.log(results)
    }
  }

  return (
    <div>
      {/* Header */}
      <h1>Can You Name?</h1>
      
      {/* Categories */}
      <div>
            <p>Selected: { activeCategory }</p>
            <div>
                Can you name 10
                <button onClick={() => setActiveCategory(Category.Women)} className="btn">{ Category.Women }</button>
                <button onClick={() => setActiveCategory(Category.Men)} className="btn">{ Category.Men }</button>
                ?
            </div>
        </div>
      
      {/* Search Bar */}
      <form onSubmit={handleSubmit}>
          <input type="text" value={query} placeholder="Search for a name" onChange={(event) => setQuery(event.target.value)} className="input"/>
          <button type="submit" className="btn">Search</button>
      </form>

      {/* Results list */}
      <ul>
        {results.map((person, index) => (
          <li key={index}>
            {person.name} - {person.occupation}
          </li>
        ) )}
      </ul>
    </div>
  )
}

export default App;
