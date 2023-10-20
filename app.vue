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
    <div class="flex flex-col items-center gap-2 min-h-screen">
        <Navbar />
        <main class="flex justify-center flex-1">
            <NuxtPage />
        </main>
        <PageFooter />
    </div>
</template>
