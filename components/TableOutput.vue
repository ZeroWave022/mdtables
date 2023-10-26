<script setup lang="ts">
    import { markdownTable } from "markdown-table";
    import { InformationCircleIcon } from "@heroicons/vue/24/outline";

    const props = defineProps<{
        data: TableCellData[][];
    }>();

    const showingAlert = ref(false);

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
        showAlert();
    };

    const showAlert = () => {
        showingAlert.value = true;

        setTimeout(() => {
            showingAlert.value = false;
        }, 5000);
    };
</script>

<template>
    <div class="prose" v-if="mdTable.length != 0">
        <pre>{{ mdTable }}</pre>

        <button
            class="btn btn-outline btn-primary mx-auto block"
            @click="copyToClipboard"
        >
            Copy to clipboard
        </button>

        <div
            :class="!showingAlert ? 'opacity-0 invisible' : 'opacity-100 visible'"
            class="alert alert-info fixed bottom-[10vh] left-0 w-1/2 translate-x-1/2 duration-150 ease-in"
        >
            <InformationCircleIcon class="w-6 h-6" />
            <span>Copied to clipboard!</span>
        </div>
    </div>
</template>
