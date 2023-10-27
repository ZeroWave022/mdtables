<script setup lang="ts">
import { markdownTable } from "markdown-table";
import {
    Cog6ToothIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
    data?: TableCellData[][];
    preparedData?: string[][] | null;
}>();

const align = useState<TableAlign>("align");
const removeEmptyRows = useState("removeEmptyRows", () => false);
const showingAlert = ref(false);
const modal = ref<null | { showModal: () => void }>(null);

const mdTable = computed(() => {
    if (props.preparedData) {
        return markdownTable(props.preparedData);
    } else if (!props.data) {
        return null;
    }

    let data: TableCellData[][];

    if (!removeEmptyRows.value) {
        data = filterEmptyRows(props.data).length === 0 ? [] : props.data;
    } else {
        data = filterEmptyRows(props.data);
    }

    return markdownTable(
        data.map((row) => row.map((cell) => applyFormatting(cell))),
        { align: align.value },
    );
});

const filterEmptyRows = (table: TableCellData[][]) => {
    const newTable = [];
    for (const row of table) {
        if (row.filter((cell) => cell.content === "").length !== row.length)
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
    if (!mdTable.value) return;
    navigator.clipboard
        .writeText(mdTable.value)
        .then(() => showAlert())
        .catch(() => {});
};

const setAlign = (newAlign: TableAlign) => {
    if (newAlign === align.value) return (align.value = null);
    align.value = newAlign;
};

const showAlert = () => {
    showingAlert.value = true;

    setTimeout(() => {
        showingAlert.value = false;
    }, 5000);
};

const openModal = () => modal.value?.showModal();
</script>

<template>
    <div v-if="mdTable && mdTable.length != 0" class="prose">
        <pre>{{ mdTable }}</pre>

        <div class="flex flex-col justify-center w-fit mx-auto gap-2">
            <button
                class="btn btn-outline btn-secondary"
                @click="copyToClipboard"
            >
                Copy to clipboard
            </button>
            <button class="btn btn-primary" @click="openModal">
                <Cog6ToothIcon class="w-6 h-6" />
                <span>Output Settings</span>
            </button>
        </div>

        <dialog id="table-output-settings-modal" ref="modal" class="modal">
            <div class="modal-box prose">
                <h2>Table Output Settings</h2>
                <strong class="mb-1">Alignment</strong>
                <div class="flex gap-2">
                    <button
                        class="btn btn-sm"
                        :class="{ 'btn-info': align == 'left' }"
                        @click="() => setAlign('left')"
                    >
                        Left-aligned
                    </button>
                    <button
                        class="btn btn-sm"
                        :class="{ 'btn-info': align == 'center' }"
                        @click="() => setAlign('center')"
                    >
                        Center-aligned
                    </button>
                    <button
                        class="btn btn-sm"
                        :class="{ 'btn-info': align == 'right' }"
                        @click="() => setAlign('right')"
                    >
                        Right-aligned
                    </button>
                </div>
                <p class="mb-1"><strong>Other options</strong></p>
                <div class="flex items-center gap-2">
                    <input
                        id="empty-rows"
                        v-model="removeEmptyRows"
                        type="checkbox"
                        class="checkbox checkbox-info"
                    />
                    <label for="empty-rows">Remove empty rows</label>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-neutral">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <div
            :class="
                !showingAlert ? 'opacity-0 invisible' : 'opacity-100 visible'
            "
            class="alert alert-info fixed bottom-[10vh] left-0 w-1/2 translate-x-1/2 duration-150 ease-in"
        >
            <InformationCircleIcon class="w-6 h-6" />
            <span>Copied to clipboard!</span>
        </div>
    </div>
    <p v-else class="text-center">No table generated: No data found</p>
</template>
