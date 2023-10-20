<script setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";
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
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                </ul>
            </div>
            <span>.mdTables</span>
        </div>
        <div class="navbar-center hidden md:flex gap-5">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
        <div class="navbar-end">
            <ThemeToggle />
        </div>
    </nav>
</template>
