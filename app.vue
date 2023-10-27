<script setup>
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `.mdTables: ${titleChunk}` : ".mdTables";
    },
    htmlAttrs: {
        lang: "en",
    },
});
</script>

<template>
    <div class="flex flex-col items-center gap-16 min-h-screen">
        <PageNavbar />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <PageFooter />
    </div>
</template>
