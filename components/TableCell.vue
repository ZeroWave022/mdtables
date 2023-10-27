<script setup lang="ts">
const props = defineProps<{
    modelValue: TableCellData;
    cellId: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const modal = ref<null | { showModal: () => void }>(null);
const newCellData = ref({ ...props.modelValue });

const emitNewData = () => {
    emit("update:modelValue", { ...newCellData.value });
};

const resetData = () => {
    // Resets newCellData back to parent state, so changes that weren't applied do not persist
    newCellData.value = Object.assign({ ...props.modelValue }) as TableCellData;
};

const openModal = () => {
    // This is a UI function provided by daisyUI
    modal.value?.showModal();
    resetData();
};
</script>

<template>
    <button class="empty:block empty:w-6 empty:h-8 p-1.5" @click="openModal">
        {{ modelValue.content }}
    </button>
    <dialog ref="modal" class="modal">
        <div class="modal-box prose">
            <h3>Cell settings</h3>
            <div class="flex gap-3">
                <button
                    class="btn btn-sm btn-neutral"
                    :class="{ 'btn-info': newCellData.bold }"
                    @click="newCellData.bold = !newCellData.bold"
                >
                    Bold
                </button>
                <button
                    class="btn btn-sm btn-neutral"
                    :class="{ 'btn-info': newCellData.italic }"
                    @click="newCellData.italic = !newCellData.italic"
                >
                    Italic
                </button>
            </div>
            <label class="label label-text" :for="`cell-data-${cellId}`"
                >Cell data</label
            >
            <input
                :id="`cell-data-${cellId}`"
                v-model="newCellData.content"
                class="input input-bordered"
                autofocus
                autocomplete="off"
            />
            <div class="modal-action">
                <form method="dialog" class="flex gap-2">
                    <button class="btn btn-success" @click="emitNewData">
                        Apply
                    </button>
                    <button class="btn" @click="resetData">Cancel</button>
                </form>
            </div>
        </div>
    </dialog>
</template>
