<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Delete16Filled } from '@vicons/fluent'
import { useAccountsStore } from '@/stores/accounts';

const props = defineProps<{ accountId: string }>()

const store = useAccountsStore()

function handleClick() {
  store.removeAccount(props.accountId);
}

</script>

<template>
  <n-button @click="handleClick">
    <template #icon>
      <n-icon>
        <Delete16Filled />
      </n-icon>
    </template>
  </n-button>
</template>
