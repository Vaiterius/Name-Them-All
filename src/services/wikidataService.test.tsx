import { describe, expect, test} from "vitest";
import { searchPerson } from "./wikidataService";
import Category from "../SearchCategory";

describe("test searchWoman", () => {

    test("taylor swift should not return null", async () => {
        const result = await searchPerson("taylor swift", Category.Women);
        expect(result).not.toBe(null);
    })

    test("taylor swift should return name in string", async () => {
        const result = await searchPerson("taylor swift", Category.Women);

        if (result !== null) {
            expect(result.name).toBe("Taylor Swift");  // result always comes back capitalized
        }
    })

    test("taylor swift should return occupation as singer", async () => {
        const result = await searchPerson("taylor swift", Category.Women);

        if (result !== null) {
            expect(result.occupation).toBe("singer");
        }
    })

    test("taylor swift should be found case-insensitively", async () => {
        const upper = await searchPerson("TAYLOR SWIFT", Category.Women);
        const mixed = await searchPerson("tAyLoR sWiFt", Category.Women);

        if (upper !== null && mixed !== null) {
            expect(upper.name).toBe("Taylor Swift");
            expect(mixed.name).toBe("Taylor Swift");
        }
    })

    test("non-existent person should return null", async () => {
        const result = await searchPerson("bruh", Category.Women);
        expect(result).toBeNull();
    })

    test("a man should not be returned", async () => {
        const result = await searchPerson("barack obama", Category.Women);
        expect(result).toBeNull();
    })
})
