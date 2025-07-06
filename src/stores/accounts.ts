import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types/account'

const localStorageKey = 'accounts'

export const useAccountsStore = defineStore('accounts', () => {
  const list = ref([] as Account[])

  loadData()

  function saveData() {
    const json = JSON.stringify(list.value)
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
    const newAccount: Account = { ...account, id: crypto.randomUUID() }
    list.value.push(newAccount)
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
      saveData()
    }
  }

  return { list, addAccount, removeAccount, updateAccount }
})
