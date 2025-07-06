<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NInput, NSelect } from 'naive-ui'
import { useAccountsStore } from '@/stores/accounts'
import { AccountType, type Account } from '@/types/account'
import RemoveAccountButton from '@/components/RemoveAccountButton.vue'

const marksSeparator = ';'
const accountTypeSelectOptions = [
  {
    value: AccountType.LOCAL,
    label: 'Локальный',
  },
  {
    value: AccountType.LDAP,
    label: 'LDAP',
  },
]

const props = defineProps<{ account: Account }>()
const store = useAccountsStore()
const localAccount = reactive({ ...props.account })
const stringMarks = ref(localAccount.marks.map((mark) => mark.text).join(`${marksSeparator} `))

function areInputsValid(): boolean {
  return (
    localAccount.login.length > 0 &&
    (localAccount.type === AccountType.LOCAL
      ? localAccount.password !== null && localAccount.password.length > 0
      : true)
  )
}

function prepareValues() {
  localAccount.marks = stringMarks.value
    .split(marksSeparator)
    .filter(Boolean)
    .map((mark) => ({ text: mark.trim() }))
  if (localAccount.type === AccountType.LDAP) {
    localAccount.password = ''
    localAccount.password = null
  }
}

function save() {
  if (!areInputsValid()) {
    return
  }
  prepareValues()
  store.updateAccount(props.account.id, {
    ...localAccount,
    id: props.account.id,
  })
}
</script>

<template>
  <tr>
    <td>
      <n-input
        v-model:value="stringMarks"
        @blur="save()"
        type="text"
        placeholder="Значение"
        maxlength="50"
      />
    </td>
    <td>
      <n-select
        v-model:value="localAccount.type"
        @update:value="save()"
        :options="accountTypeSelectOptions"
      />
    </td>
    <td>
      <n-input
        v-model:value="localAccount.login"
        @blur="save()"
        type="text"
        placeholder="Значение"
        maxlength="100"
        :status="localAccount.login.length > 0 ? 'success' : 'error'"
      />
    </td>
    <td>
      <n-input
        v-if="localAccount.type === AccountType.LOCAL"
        v-model:value="localAccount.password"
        @blur="save()"
        type="password"
        placeholder="Значение"
        maxlength="100"
        :status="
          localAccount.password !== null && localAccount.password.length > 0 ? 'success' : 'error'
        "
      />
    </td>
    <td>
      <remove-account-button :account-id="account.id" />
    </td>
  </tr>
</template>
