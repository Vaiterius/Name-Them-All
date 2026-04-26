import { useState } from "react";

import Category from "../SearchCategory";

function Categories() {
    const [activeCategory, setActiveCategory] = useState<Category>(Category.None);

    return (
        <div>
            <p>Selected: { activeCategory }</p>
            <div>
                Can you name 10
                <button onClick={() => setActiveCategory(Category.Women)} className="btn">{ Category.Women }</button>
                <button onClick={() => setActiveCategory(Category.Men)} className="btn">{ Category.Men }</button>
                ?
            </div>
        </div>
    )
}

export default Categories;