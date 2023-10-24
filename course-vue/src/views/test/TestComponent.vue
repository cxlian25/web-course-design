<template>
  <div>
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
    <el-button type="primary" @click="save()">保存</el-button>
  </div>
</template>
<script lang="ts">
const defaultTime = new Date("2023-09-23");
import { defineComponent } from "vue";
import { formatDate } from "~/tools/comMethod";
export default defineComponent({
  name: "TestComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      value1: defaultTime,
      size: "small",
    };
  },
  methods: {
    save() {
      console.log(this.value1);
      console.log(formatDate(this.value1));
    },
  },
});
</script>
