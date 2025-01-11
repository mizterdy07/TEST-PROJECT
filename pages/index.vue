<template>
  <div>
    <button @click="toggleColorMode">
      Switch to {{ $colorMode.value === 'dark' ? 'Light' : 'Dark' }} Mode
    </button>
    <h1 class="text-4xl">Hello</h1>
    <Button @click="toggleApplications" label="Toggle Applications" />
    <div class="card">
      <TreeTable ref="refTreeTable" :expandedKeys="expandedKeys" :value="buildTreeDynamicProperty(customData, 0)"
        tableStyle="min-width: 50rem" scrollable scrollHeight="calc(100vh - 300px)">
        <Column field="Code" header="Code" expander></Column>
        <Column field="Name" header="Name">
          <template #body="{ node }">
            <div class="text-red-500">{{ node.data.Name }}</div>
            <!-- {{ console.log("===>>> Name >>>", node) }} -->
          </template>
        </Column>
        <Column field="EnglishName" header="EnglishName"></Column>
        <Column field="ScorePercent" header="ScorePercent"></Column>
        <Column field="Type" header="Type"></Column>
        <Column field="EvaluateFrom" header="EvaluateFrom"></Column>
        <Column field="EvaluateTo" header="EvaluateTo"></Column>
        <Column header="Actions" style="width: 20%">
          <template #body="slotProps">
            <Button label="View" @click="viewDetails(slotProps)" />
            <Button label="Edit" @click="editDetails(slotProps)" class="p-button-secondary" />
          </template>
        </Column>
      </TreeTable>
    </div>

    <!-- <div class="pt-5">
      <div class="card flex justify-center ">
        <AutoComplete v-model="value" :suggestions="items" @complete="search" class="border" />
      </div>
    </div> -->

  </div>
</template>

<script setup>
const { $colorMode } = useNuxtApp()

const toggleColorMode = () => {
  $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'
}
// const value = ref("");
// const items = ref([]);

// const search = (event) => {
//   items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
// }
import d from "../assets/json/exam_setup.json"

// const expandedKeys = ref({ '22': true, '25': true })
const refTreeTable = ref()
const expandedKeys = ref({})
const customData = ref(d)


const data = []

onMounted(() => {
  setTimeout(() => {
    console.log('------->>> refTreeTable >', refTreeTable.value)
    expandedKeys.value = getAllKeys(buildTreeDynamicProperty(customData.value, 0));

  }, 100);

})

// const expandedKeys = ref({});
const toggleApplications = () => {
  let _expandedKeys = { ...expandedKeys.value };

  if (_expandedKeys['22']) delete _expandedKeys['22'];
  else _expandedKeys['22'] = true;

  expandedKeys.value = _expandedKeys;
}

const getAllKeys = (data) => {
  const keys = {};
  data.forEach(item => {
    keys[item.key] = true; // Set the key as expanded
    if (item.children && item.children.length > 0) {
      Object.assign(keys, getAllKeys(item.children)); // Recursively get keys from children
    }
  });
  // console.log("-------> keys >>", keys)
  return keys;
};


function editDetails(data) {
  console.log('------> edit >', data)
}

function viewDetails(data) {
  console.log('------> view >', data)
}

let transformedData = data
  .filter(item => item.ParentId === 0) // Get top-level items
  .map(item => ({
    key: item.Id.toString(),
    data: {
      Code: item.Code,
      Name: item.Name,
      EnglishName: item.EnglishName,
      ScorePercent: item.ScorePercent,
      Type: item.Type,
      EvaluateFrom: item.EvaluateFrom,
      EvaluateTo: item.EvaluateTo,
      TotalSubject: item.TotalSubject,
      DbCode: item.DbCode
    },
    children: data
      .filter(child => child.ParentId === item.Id) // Get first-level children
      .map(child => ({
        key: child.Id.toString(),
        data: {
          Code: child.Code,
          Name: child.Name,
          EnglishName: child.EnglishName,
          ScorePercent: child.ScorePercent,
          Type: child.Type,
          EvaluateFrom: child.EvaluateFrom,
          EvaluateTo: child.EvaluateTo,
          TotalSubject: child.TotalSubject,
          DbCode: child.DbCode
        },
        children: data
          .filter(grandChild => grandChild.ParentId === child.Id) // Get second-level children
          .map(grandChild => ({
            key: grandChild.Id.toString(),
            data: {
              Code: grandChild.Code,
              Name: grandChild.Name,
              EnglishName: grandChild.EnglishName,
              ScorePercent: grandChild.ScorePercent,
              Type: grandChild.Type,
              EvaluateFrom: grandChild.EvaluateFrom,
              EvaluateTo: grandChild.EvaluateTo,
              TotalSubject: grandChild.TotalSubject,
              DbCode: grandChild.DbCode
            }
          }))
      }))
  }));


function buildTreeDynamicChild(data, parentId) {
  return data
    ?.filter(item => item?.ParentId === parentId)
    ?.map(item => ({
      key: item?.Id?.toString(),
      data: {
        Code: item?.Code,
        Name: item?.Name,
        EnglishName: item?.EnglishName,
        ScorePercent: item?.ScorePercent,
        Type: item?.Type,
        EvaluateFrom: item?.EvaluateFrom,
        EvaluateTo: item?.EvaluateTo,
        TotalSubject: item?.TotalSubject,
        DbCode: item?.DbCode
      },
      children: buildTreeDynamicChild(data, item?.Id) // Recursive call to find children
    }));
}

// Recursive function to build tree structure based on ParentId
function buildTreeDynamicProperty(data, parentId) {
  return data
    ?.filter(item => item?.ParentId === parentId)
    ?.map(item => {
      // Create a new object with all properties of the item
      const { Id, ParentId, ...rest } = item; // Exclude Id and ParentId if not needed in data
      return {
        key: Id?.toString(),
        data: rest, // Include all properties dynamically
        children: buildTreeDynamicProperty(data, item?.Id) // Recursive call to find children
      };
    });
}
</script>

<style lang="scss">
tr[aria-expanded] {
  background-color: #F6F6F6 !important;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.025) !important;
}

.p-icon {
  display: inline-block;
  vertical-align: baseline;
  width: 12px;
  height: 12px;
}

.p-treetable-header-cell {
  border-color: #F9FAFB !important;
}

.p-treetable-column-header-content {
  padding: 8px 10px 14px;
}

.p-treetable-column-title {
  color: #262626;
  font-weight: bold !important;
  font-size: 12px;
}

.p-treetable-tbody>tr>td {
  border-color: #F9FAFB !important;
}

.p-treetable-body-cell-content {
  color: #191919;
  font-size: 12px;
  gap: 6px !important;
  padding: 8px 10px;
}

.dark {
  tr[aria-expanded] {
    background-color: #3f3f3f !important;
  }

  tr:hover {
    background-color: rgba(255, 255, 255, 0.025) !important;
  }

  .p-treetable-tbody>tr>td {
    border-color: #F9FAFB !important;
  }

  .p-treetable-column-title {
    color: #ffffff;
  }

  .p-treetable-body-cell-content {
    color: #ffffff;
  }

}
</style>