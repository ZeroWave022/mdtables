<script setup lang="ts">
import { parse } from "csv-parse/browser/esm";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const processedContent = ref<string[][] | null>(null);
const error = ref<string | null>(null);

const fileUploaded = (event: Event) => {
    processedContent.value = error.value = null;

    const reader = new FileReader();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        reader.addEventListener("load", () => {
            if (typeof reader.result !== "string") {
                return (error.value =
                    "Wrong file content (couldn't be read as text)");
            }

            if (file.type === "application/json") {
                processJSONContent(reader.result);
            } else if (file.type === "text/csv") {
                processCSVContent(reader.result);
            } else {
                error.value = "Unsupported file format";
            }
        });

        reader.readAsText(file);
    }
};

const processJSONContent = (text: string) => {
    let content: UserJSONContent;
    try {
        content = JSON.parse(text) as UserJSONContent;
    } catch {
        return (error.value = "Failed to parse JSON. Check the file input");
    }

    if (!Array.isArray(content)) {
        return (error.value =
            "The top-level object in the JSON file must be an array");
    }

    const hasArrays = content.some((e) => Array.isArray(e));
    const hasObjects = content.some(
        (e) => !Array.isArray(e) && typeof e === "object" && e !== null,
    );

    if (hasArrays && hasObjects) {
        return (error.value =
            "The JSON file must consist either of a 2D array (matrix of nested arrays) or an array of objects. See examples below");
    }

    if (hasArrays) {
        return (processedContent.value = content as string[][]);
    }

    const processedArray = new Array<string[]>();

    // Add keys of row 0 as table headers, then push all rows of data
    processedArray.push(Object.keys(content[0]));
    content.forEach((item) =>
        processedArray.push(Object.values(item) as string[]),
    );

    processedContent.value = processedArray;
};

const processCSVContent = (text: string) => {
    const parser = parse();
    const records = new Array<string[]>();

    parser.on("readable", () => {
        let record;
        while ((record = parser.read() as string[]) !== null) {
            records.push(record);
        }
    });

    parser.on("error", () => {
        error.value = "Failed to parse CSV. Check the file input";
    });

    parser.on("end", () => {
        processedContent.value = records;
    });

    parser.write(text);
    parser.end();
};
</script>

<template>
    <div class="flex flex-col gap-12 prose text-center">
        <section>
            <h1>Convert file to Markdown table</h1>
            <p>Upload your file below to convert it to a markdown table</p>
            <p>
                Supported file formats: <code>.json</code> and <code>.csv</code>
            </p>
        </section>

        <div class="form-control">
            <label class="label" for="file-input">
                <span class="label-text">Select file to convert</span>
            </label>
            <input
                id="file-input"
                class="file-input file-input-bordered"
                type="file"
                accept=".json, .csv"
                @change="fileUploaded($event)"
            />
        </div>

        <p v-if="error" class="text-error">
            <ExclamationTriangleIcon class="w-8 h-8 inline" />
            There was an error while reading the content of this file.<br />
            Details: {{ error }}.
        </p>

        <TableOutput
            v-if="processedContent && !error"
            :prepared-data="processedContent"
        />

        <section>
            <h2>File examples</h2>
            <h3>JSON-file: 2D Array format</h3>
            <pre class="text-left">
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
            </pre>

            <h3>JSON-file: Array of objects format</h3>
            <pre class="text-left">
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
            </pre>

            <h3>CSV</h3>
            <pre class="whitespace-pre-line text-left">
                Product,Price,Next delivery
                Bread,10,Today
                Butter,25,Tomorrow
                Milk,25,Tomorrow
                Ice cream,40,In 5 days
            </pre>
        </section>
    </div>
</template>
