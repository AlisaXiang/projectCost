<template>
  <div>
    <div class="modal-backdrop show">
    </div>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content"
             :class="[ size ? 'modal-' + size : '']"
        >
            <div class="modal-header">
              <h4 class="modal-title">
                <slot name="header">modal-title</slot>
              </h4>
              <span class="modal-close" @click="$emit('close')">&times;</span>
            </div>

          <slot></slot>
          <slot name="table-top"></slot>

          <div class="modal-body"
               :class="[ direction ? 'modal-direction-' + direction : '']"
          >
            <slot name="body">
            </slot>
          </div>
          <slot name="table"></slot>
          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')" :type="'cancel'">取消</el-button>
              <el-button @click="$emit('modal')" type="normal">确定</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./modal.styl" lang="stylus" scoped></style>
<script>
export default {
  name: 'OcjModal',
  data () {
    return {}
  },
  props: {
    size: String,
    direction: String
  }
}
</script>
