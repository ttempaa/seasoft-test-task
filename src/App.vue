<script setup lang="ts">
import { NAlert, NSpace, NLayout, NLayoutHeader, NLayoutContent, NH1 } from 'naive-ui'
import AccountsTable from '@/components/AccountsTable.vue'
import AddAcccountButton from '@/components/AddAccountButton.vue'
</script>

<template>
  <n-layout>
    <n-layout-header>
      <n-h1>
        Учетные записи
        <AddAcccountButton />
      </n-h1>
    </n-layout-header>
    <n-layout-content>
      <n-space vertical>
        <n-alert type="info">
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель
          <code>;</code>
        </n-alert>
        <accounts-table />
      </n-space>
    </n-layout-content>
  </n-layout>
</template>
