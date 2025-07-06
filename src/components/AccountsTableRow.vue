<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { NInput, NSelect } from 'naive-ui'
import { useAccountsStore } from '@/stores/accounts'
import { AccountType, type Account } from '@/types/account';
import RemoveAccountButton from '@/components/RemoveAccountButton.vue'

const props = defineProps<{ account: Account }>()
const store = useAccountsStore()
const localAccount = reactive({ ...props.account })
const stringMarks = ref('')

const accountTypeSelectOptions = [
  {
    value: AccountType.LOCAL,
    label: 'Локальный',
  },
  {
    value: AccountType.LDAP,
    label: 'LDAP',
  }
]

function prepareAndUpdate(newValue: Account) {
  newValue.marks = stringMarks.value.split(';').map((mark) => ({ text: mark.trim() }))
  if (newValue.type === AccountType.LDAP) {
    localAccount.password = "";
    newValue.password = null;
  }
  store.updateAccount(props.account.id, {
    ...newValue,
    id: props.account.id,
  })
}

watch(
  () => ({ ...localAccount, stringMarks }),
  (newValue) => prepareAndUpdate(newValue),
  { deep: true }
)
</script>

<template>
  <tr>
    <td>
      <n-input v-model:value="stringMarks" type="text" placeholder="Значение" />
    </td>
    <td>
      <n-select v-model:value="localAccount.type" :options="accountTypeSelectOptions" />
    </td>
    <td>
      <n-input v-model:value="localAccount.login" type="text" placeholder="Значение" />
    </td>
    <td>
      <n-input v-if="localAccount.type === AccountType.LOCAL" v-model:value="localAccount.password" type="password"
        placeholder="Значение" />
    </td>
    <td>
      <remove-account-button :account-id="account.id" />
    </td>
  </tr>
</template>
