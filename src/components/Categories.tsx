import CategoryButton from "./CategoryButton";

import Category from "../SearchCategory";

function Categories() {
    return (
        <div>
            Can you name 10
            <CategoryButton value={Category.Women}/>
            <CategoryButton value={Category.Men} />
            ?
        </div>
    )
}

export default Categories;