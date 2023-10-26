<script setup lang="ts">
    const columns = useState("columns", () => 5);
    const rows = useState("rows", () => 5);

    const createTableCell = (): TableCellData => {
        return {
            content: "",
            bold: false,
            italic: false,
        };
    };

    const table: Ref<TableCellData[][]> = useState("table", () => [
        Array.from({ length: 5 }, () => createTableCell()),
        Array.from({ length: 5 }, () => createTableCell()),
        Array.from({ length: 5 }, () => createTableCell()),
        Array.from({ length: 5 }, () => createTableCell()),
        Array.from({ length: 5 }, () => createTableCell()),
    ]);

    const tableLetters = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
        let letters = new Array();
        for (let i = 0; i < columns.value; i++) {
            if (i < alphabet.length) {
                letters.push(alphabet[i]);
            } else {
                const fullAlphabetsUsed = Math.floor(i / alphabet.length);
                const diff = fullAlphabetsUsed * alphabet.length;

                letters.push(alphabet[fullAlphabetsUsed - 1] + alphabet[i - diff]);
            }
        }

        return letters;
    };

    // Limit columns and rows to the 1-50 range
    watch(columns, (newColumns, oldColumns) => {
        columns.value = newColumns < 50 ? (newColumns < 1 ? 1 : newColumns) : 50;

        if (oldColumns < newColumns) {
            for (let row of table.value) {
                row.push(createTableCell());
            }
        } else if (newColumns < oldColumns) {
            for (let row of table.value) {
                row.pop();
            }
        }
    });

    watch(rows, (newRows, oldRows) => {
        rows.value = newRows < 50 ? (newRows < 1 ? 1 : newRows) : 50;

        if (oldRows < newRows) {
            table.value.push(new Array(columns.value).fill(createTableCell()));
        } else if (newRows < oldRows) {
            table.value.pop();
        }
    });
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex justify-between gap-5">
            <div>
                <label for="columns" class="label label-text">Columns</label>
                <input
                    id="columns"
                    v-model="columns"
                    class="input input-bordered"
                    name="rows"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="5"
                    required
                />
            </div>
            <div>
                <label for="rows" class="label label-text">Rows</label>
                <input
                    id="rows"
                    v-model="rows"
                    class="input input-bordered"
                    name="rows"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="5"
                    required
                />
            </div>
        </div>

        <div class="p-4 mx-auto bg-base-200 rounded-md shadow-md">
            <table class="">
                <tbody
                    class="[&_td]:border [&_td]:border-neutral"
                    v-for="(row, index) in table"
                >
                    <tr v-if="index == 0">
                        <td class="border-none"></td>
                        <td
                            v-for="letter in tableLetters()"
                            class="border-none hover:bg-base-100 p-1.5 text-center"
                        >
                            {{ letter }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border-none hover:bg-base-100 p-1.5">
                            {{ index + 1 }}
                        </td>
                        <td
                            class="hover:bg-base-100"
                            v-for="(data, colIndex) in row"
                        >
                            <TableCell
                                v-model="table[index][colIndex]"
                                :cellId="`${index}_${colIndex}`"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <TableOutput :data="table" />
    </div>
</template>
