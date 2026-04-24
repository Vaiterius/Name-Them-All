import { describe, expect, test} from "vitest";
import { searchWoman } from "./wikidataService";

describe("test searchWoman", () => {

    test("taylor swift should not return null", async () => {
        const result = await searchWoman("taylor swift");
        expect(result).not.toBe(null);
    })

    test("taylor swift should return name in string", async () => {
        const result = await searchWoman("taylor swift");

        if (result !== null) {
            expect(result.name).toBe("Taylor Swift");
        }
    })
})
