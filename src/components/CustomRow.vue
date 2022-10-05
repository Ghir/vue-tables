<template>
  <q-tr :props="rowProps">
    <q-td auto-width>
      <q-btn
        size="sm"
        color="accent"
        round
        dense
        :icon="rowProps.expand ? 'remove' : 'add'"
        @click="$emit('expand')"
        v-if="Object.keys(rowProps.row.kids).length > 0"
      />
    </q-td>

    <q-td v-for="col in rowProps.cols" :key="col.name" :props="rowProps">
      {{ rowProps.row.data[col.name] }}
    </q-td>

    <q-td auto-width>
      <q-btn
        size="sm"
        color="accent"
        round
        dense
        icon="remove"
        @click="$emit('delete')"
      />
    </q-td>
  </q-tr>

  <q-tr v-show="rowProps.expand" :props="rowProps">
    <q-td colspan="100%">
      <div class="text-left">
        <CustomTable
          v-for="key in Object.keys(rowProps.row.kids)"
          :title="key"
          :data="rowProps.row.kids[key].records"
          :paths="paths"
        />
      </div>
    </q-td>
  </q-tr>
</template>

<script setup lang="ts">
import CustomTable from "@/components/CustomTable.vue";

defineProps(["rowProps", "paths"]);
defineEmits(["expand", "delete"]);
</script>
