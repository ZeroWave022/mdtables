<script setup lang="ts">
    import { Cog6ToothIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';

    const props = defineProps<{
        columns: number;
        rows: number;
    }>();

    defineEmits<{
        (e: "settingsUpdate", columns: number, rows: number): void
    }>();

    const newColumns = ref(props.columns);
    const newRows = ref(props.rows);

    const modal = ref<null | { showModal: () => void }>(null);

    const openModal = () => modal.value?.showModal();
</script>

<template>
    <button class="btn btn-info" @click="openModal">
        <Cog6ToothIcon class="w-6 h-6" />
        <span>Table Settings</span>
    </button>

    <dialog id="table-settings-modal" ref="modal" class="modal">
        <div class="modal-box prose">
            <h3>Table Settings</h3>
            <div class="flex gap-5">
                <div>
                    <label for="columns" class="label label-text">Columns</label>
                    <input
                        id="columns"
                        v-model="newColumns"
                        class="input input-bordered"
                        name="columns"
                        type="number"
                        min="1"
                        max="50"
                        placeholder="5"
                        required
                    />
                </div>
                <div>
                    <label for="rows" class="label label-text">Rows</label>
                    <input
                        id="rows"
                        v-model="newRows"
                        class="input input-bordered"
                        name="rows"
                        type="number"
                        min="1"
                        max="50"
                        placeholder="5"
                        required
                    />
                </div>
            </div>
            <p v-if="newColumns < columns || newRows < rows" class="text-warning">
                <ExclamationCircleIcon class="w-8 h-8 inline"/>
                When removing rows/columns, any data in those table cells will be deleted
            </p>
            <div class="modal-action">
                <form method="dialog" class="flex gap-3">
                    <button class="btn btn-success" @click="$emit('settingsUpdate', newColumns, newRows)">
                        Apply
                    </button>
                    <button class="btn">
                        Close
                    </button>
                </form>
            </div>
        </div>
    </dialog>
</template>
