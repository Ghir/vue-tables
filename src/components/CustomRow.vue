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
        v-if="hasKidTables"
      />
    </q-td>

    <q-td v-for="col in rowProps.cols" :key="col.name" :props="rowProps">
      {{ rowProps.row.data[col.name] }}
    </q-td>

    <q-td auto-width>
      <q-btn
        size="sm"
        color="negative"
        round
        dense
        icon="delete"
        @click="$emit('delete')"
      />
    </q-td>
  </q-tr>

  <q-tr v-show="rowProps.expand" :props="rowProps" v-if="hasKidTables">
    <q-td colspan="100%">
      <div class="text-left">
        <CustomTable
          v-for="kidTitle in Object.keys(rowProps.row.kids)"
          :key="kidTitle"
          :title="kidTitle"
          :data="rowProps.row.kids[kidTitle].records"
          :paths="paths"
        />
      </div>
    </q-td>
  </q-tr>
</template>

<script setup lang="ts">
import { computed } from "vue";

import CustomTable from "@/components/CustomTable.vue";

const componentProps = defineProps(["rowProps", "paths"]);
defineEmits(["expand", "delete"]);

const hasKidTables = computed<boolean>(() => {
  const { kids } = componentProps.rowProps.row;

  const parent = Object.keys(kids).find(
    (name: string) => kids[name].records.length > 0
  );

  return !!parent;
});
</script>
