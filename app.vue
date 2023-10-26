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
        <Navbar />
        <main class="flex flex-col items-center flex-1 gap-12">
            <NuxtPage />
        </main>
        <PageFooter />
    </div>
</template>
