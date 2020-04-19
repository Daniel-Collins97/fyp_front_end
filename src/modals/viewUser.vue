<template>
  <b-modal
    v-model="showModal"
    hide-footer
    hide-header
  >
    <UserView :ctx="modalInfo"></UserView>
  </b-modal>
</template>

<script>
import UserView from '@/components/UserView';

export default {
  title: 'Player View',
  components: {
    UserView
  },
  data() {
    return {
      showModal: false,
      modalInfo: null,
    }
  },
  methods: {
    async openModal() {
      this.showModal = true;
    }
  }
}
</script>

<style lang='scss' scoped>
.modal-dialog {
  margin-top: 150px;
}

.modal-content {
  width: 450px;
  height: 350px;

  .modalContainer {
    margin: 0 10px 20px 20px;

    .modalTitle {
      text-align: center;
      text-transform: capitalize;
    }
  }
}
</style>
