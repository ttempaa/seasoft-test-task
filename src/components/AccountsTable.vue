<script setup lang="ts">
import { NTable } from 'naive-ui'
import { useAccountsStore } from '@/stores/accounts';
import AccountsTableRow from './AccountsTableRow.vue';

const accountsStore = useAccountsStore();
</script>

<template>
  <n-table :bordered="false" :single-line="true">
    <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
      </tr>
    </thead>
    <tbody>
      <accounts-table-row v-for="account in accountsStore.list" :account="account" :key="account.id" />
    </tbody>
  </n-table>
</template>
