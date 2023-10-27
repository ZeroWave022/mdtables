<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";

const darkModeOn = useState("darkModeOn", () => false);

onMounted(() => {
    const savedPreference = localStorage.getItem("darkModeOn");
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    // Use saved localStorage preference if available, else set to media query
    darkModeOn.value = savedPreference
        ? savedPreference === "on"
        : prefersDarkMode;

    localStorage.setItem("darkModeOn", darkModeOn.value ? "on" : "off");
});

/* Non-minified version of the script in useHead:
if (localStorage.getItem("darkModeOn")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("darkModeOn") == "on" ? "night" : "emerald");
} else {
    document.documentElement.setAttribute("data-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "emerald");
}
*/

useHead({
    script: [
        {
            innerHTML:
                "localStorage.getItem('darkModeOn')?document.documentElement.setAttribute('data-theme',localStorage.getItem('darkModeOn')=='on'?'night':'emerald'):document.documentElement.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme: dark)').matches?'night':'emerald');",
        },
    ],
});

const toggleTheme = () => {
    const oldPreference = localStorage.getItem("darkModeOn");
    const newPreference = oldPreference === "on" ? "off" : "on";

    darkModeOn.value = newPreference === "on";
    localStorage.setItem("darkModeOn", newPreference);
    document.documentElement.setAttribute(
        "data-theme",
        darkModeOn.value ? "night" : "emerald",
    );
};
</script>

<template>
    <button class="btn" @click="toggleTheme">
        <SunIcon v-if="darkModeOn" class="w-6 h-6" />
        <MoonIcon v-else class="w-6 h-6" />
    </button>
</template>
