'use strict'
export default {
    render(createElement) {
        if (this.show === 'none') {
            return null
        }
        return this.$slots[this.show]
    },
    props: {
        show:{
            type: String,
            default: 'none',
        },
    },
}