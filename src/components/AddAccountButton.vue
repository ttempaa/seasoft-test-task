<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Add12Filled } from '@vicons/fluent'
import { useAccountsStore } from '@/stores/accounts'
import { AccountType } from '@/types/account'

const store = useAccountsStore()

function handleClick() {
  store.addAccount({
    marks: [],
    type: AccountType.LOCAL,
    login: '',
    password: '',
  })
}
</script>

<template>
  <n-button @click="handleClick">
    <template #icon>
      <n-icon>
        <Add12Filled />
      </n-icon>
    </template>
  </n-button>
</template>
