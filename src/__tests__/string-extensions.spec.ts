import "../core/string-extensions";
test("autoRename", () => {

    expect("bar".autoRename([])).toBe("bar");
    expect("baz".autoRename(["foo", "bar"])).toBe("baz");
    expect("bar".autoRename(["foo", "bar"])).toBe("bar1");
    expect("bar".autoRename(["foo", "bar1", "bar2"])).toBe("bar3");
    expect("bar".autoRename(["foo", "bar560", "bar222"])).toBe("bar561");

});