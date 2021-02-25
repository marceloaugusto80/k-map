import "../core/string-extensions";

test("autoRename", () => {

    expect("bar".autoRename([])).toBe("bar");
    expect("bar".autoRename(["foo", "bar"])).toBe("bar_1");
    expect("bar_1".autoRename(["foo", "bar_1"])).toBe("bar_2");
    

});