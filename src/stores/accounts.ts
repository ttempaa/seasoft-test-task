import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types/account'

const localStorageKey = 'accounts'

type StoreUtilFields = { isVirtual?: boolean }

export const useAccountsStore = defineStore('accounts', () => {
  const list = ref([] as (Account & StoreUtilFields)[])

  loadData()

  function saveData() {
    const json = JSON.stringify(list.value.filter((item) => !item.isVirtual))
    localStorage.setItem(localStorageKey, json)
  }

  function loadData() {
    try {
      const json = localStorage.getItem(localStorageKey)
      if (!json) return
      list.value = JSON.parse(json)
    } catch (e) {
      console.error('Failed to load data from localStorage', e)
    }
  }

  function addAccount(account: Omit<Account, 'id'>) {
    list.value.push({
      ...account,
      id: crypto.randomUUID(),
      isVirtual: true,
    })
    saveData()
  }

  function removeAccount(accountId: string) {
    list.value = list.value.filter((account) => account.id !== accountId)
    saveData()
  }

  function updateAccount(accountId: string, newData: Account) {
    const index = list.value.findIndex((account) => account.id === accountId)
    if (index !== -1) {
      list.value[index] = {
        ...list.value[index],
        ...newData,
        id: accountId,
      }
      if (list.value[index].isVirtual) {
        list.value[index].isVirtual = undefined
      }
      saveData()
    }
  }

  return { list, addAccount, removeAccount, updateAccount }
})
