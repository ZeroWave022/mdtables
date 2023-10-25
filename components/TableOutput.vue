<script setup lang="ts">
    import { markdownTable } from "markdown-table";

    const props = defineProps<{
        data: TableCellData[][];
    }>();

    const mdTable = computed(() => {
        const data = removeEmptyRows(props.data);

        return markdownTable(
            data.map((row) => row.map((cell) => applyFormatting(cell))),
        );
    });

    const removeEmptyRows = (table: TableCellData[][]) => {
        let newTable = [];
        for (let row of table) {
            if (row.filter((cell) => cell.content == "").length != row.length)
                newTable.push(row);
        }
        return newTable;
    };

    const applyFormatting = (cell: TableCellData): string => {
        let formatted = cell.content;
        if (cell.bold) formatted = `**${formatted}**`;
        if (cell.italic) formatted = `*${formatted}*`;
        return formatted;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mdTable.value);
    };
</script>

<template>
    <div class="prose" v-if="mdTable.length != 0">
        <pre class="whitespace-pre-line">{{ mdTable }}</pre>

        <button
            class="btn btn-outline btn-primary mx-auto block"
            @click="copyToClipboard"
        >
            Copy to clipboard
        </button>
    </div>
</template>
