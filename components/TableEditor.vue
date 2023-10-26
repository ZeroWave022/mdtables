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

    watch(columns, (newColumns, oldColumns) => {
        columns.value = newColumns < 50 ? (newColumns < 1 ? 1 : newColumns) : 50; // Limit columns to 1-50 range
        const addedCols = columns.value - oldColumns;

        if (addedCols >= 1) {
            const newCols = Array.from({ length: addedCols }, () => createTableCell());
            for (let row of table.value) {
                row.push(...newCols);
            }
        } else if (addedCols < 0) {
            for (let row of table.value) {
                row.splice(row.length + addedCols, -addedCols);
            }
        }
    });

    watch(rows, (newRows, oldRows) => {
        rows.value = newRows < 50 ? (newRows < 1 ? 1 : newRows) : 50; // Limit rows to 1-50 range
        const addedRows = rows.value - oldRows;

        if (addedRows >= 1) {
            for (let i = 0; i < addedRows; i++) {
                table.value.push(Array.from({ length: columns.value }, () => createTableCell()));
            }
        } else if (addedRows < 0) {
            table.value = table.value.slice(0, table.value.length + addedRows)
        }
    });

    const settingsUpdate = (newColumns: number, newRows: number) => {
        columns.value = newColumns;
        rows.value = newRows;
    }
</script>

<template>
    <div class="flex flex-col gap-5 p-5">
        <div class="flex flex-col gap-3 justify-center items-center relative p-4 bg-base-200 rounded-md shadow-md">
            <table>
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
                        <td class="border-none hover:bg-base-100 p-1.5 text-center">
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
            <TableSettings :columns="columns" :rows="rows" @settings-update="settingsUpdate" />
        </div>

        <TableOutput :data="table" />
    </div>
</template>
