<script setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";

const darkModeOn = useState("darkModeOn");
</script>

<template>
    <nav class="navbar px-5 py-2.5">
        <div class="navbar-start gap-2">
            <div class="dropdown md:hidden">
                <label tabindex="0" class="btn btn-md btn-ghost">
                    <Bars3Icon class="w-6 h-6" />
                </label>
                <ul
                    tabindex="0"
                    class="dropdown-content z-10 menu p-2 shadow-md bg-base-200 rounded-box w-52"
                >
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li>
                        <NuxtLink to="/from-file">Create from file</NuxtLink>
                    </li>
                    <li><NuxtLink to="#">About</NuxtLink></li>
                </ul>
            </div>
            <NuxtLink to="/" class="flex items-center gap-2">
                <img
                    src="/md-logo.svg"
                    alt="Markdown logo"
                    class="w-8 h-auto"
                    :class="{ invert: darkModeOn }"
                />
                .mdTables
            </NuxtLink>
        </div>
        <div class="navbar-center hidden md:flex gap-5">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/from-file">Create from file</NuxtLink>
            <NuxtLink to="#">About</NuxtLink>
        </div>
        <div class="navbar-end">
            <ThemeToggle />
        </div>
    </nav>
</template>
