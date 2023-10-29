# .mdTables

A simple website for markdown table generation. Check out [.mdTables](https://mdtables.pages.dev/) now!

# Generating markdown tables from files

The website also supports generating tables from files instead of filling out the data manually. You can do this [here](https://mdtables.pages.dev/from-file).

Currently, `.json` and `.csv` files are supported. Supported data structures are shown on the website, but you can find a copy of the examples below.

### JSON: 2D Array format

```json
[
    [
        "Product",
        "Price",
        "Next delivery"
    ],
    [
        "Bread",
        10,
        "Today"
    ],
    [
        "Butter",
        "25",
        "Tomorrow"
    ],
    [
        "Milk",
        "25",
        "Tomorrow"
    ],
    [
        "Ice cream",
        "40",
        "In 5 days"
    ]
]
```

### JSON: Array of objects format

```json
[
    {
        "Product": "Bread",
        "Price": 10,
        "Next delivery": "Today"
    },
    {
        "Product": "Butter",
        "Price": "25",
        "Next delivery": "Tomorrow"
    },
    {
        "Product": "Milk",
        "Price": "25",
        "Next delivery": "Tomorrow"
    },
    {
        "Product": "Ice cream",
        "Price": "40",
        "Next delivery": "In 5 days"
    }
]
```

### CSV

```csv
Product,Price,Next delivery
Bread,10,Today
Butter,25,Tomorrow
Milk,25,Tomorrow
Ice cream,40,In 5 days
```

# Contributing: Getting started

If you find any bugs when using .mdTables, please [open an issue](https://github.com/ZeroWave022/mdtables/issues/new).

Feel free to contribute to the project by forking and opening pull requests!

After forking the project, simply install the packages needed with [yarn](https://yarnpkg.com/): `yarn install`

# License

This project is licensed under the [Apache License 2.0](https://github.com/ZeroWave022/mdtables/blob/main/LICENSE).
