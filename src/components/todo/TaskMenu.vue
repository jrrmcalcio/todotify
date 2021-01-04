<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="dialog(item.dialog)"
          :disabled="$store.state.search && item.title === 'Sort'"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <edit-dialog
      :task="task"
      v-if="dialogs.edit"
      @cancel="dialogs.edit = false"
      @edited="dialogs.edit = false"
    />

    <due-date-dialog
      :task="task"
      v-if="dialogs.due"
      @cancel="dialogs.due = false"
      @saved="dialogs.due = false"
    />

    <delete-confirmation
      :task="task"
      v-if="dialogs.delete"
      @cancel="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DeleteConfirmation from './dialogs/DeleteConfirmation.vue'
import DueDateDialog from './dialogs/DueDateDialog.vue'
import EditDialog from './dialogs/EditDialog.vue'

export default {
  name: 'TaskMenu',

  components: { DeleteConfirmation, EditDialog, DueDateDialog },

  props: {
    task: { type: Object },
  },

  data() {
    return {
      items: [
        {
          title: 'Edit',
          icon: 'mdi-pencil',
          dialog: 'edit',
        },
        {
          title: 'Due date',
          icon: 'mdi-calendar',
          dialog: 'due',
        },
        {
          title: 'Sort',
          icon: 'mdi-sort',
          dialog: 'sort',
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          dialog: 'delete',
        },
      ],
      dialogs: {
        edit: false,
        due: false,
        delete: false,
      },
    }
  },

  methods: {
    dialog(dialog) {
      if (dialog !== 'sort') {
        this.dialogs[dialog] = true
        return
      }

      if (this.$store.state.search) {
        this.$store.commit('showSnackbar', 'Can not sort while searching')
        return
      }

      this.$store.commit('toggleSorting')
    },
  },
}
</script>
