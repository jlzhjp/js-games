'use strict'

export default {
    template: `
        <div class="shade-conatiner">
            <div :class="['shade', { none: !show } ]">
                <slot name="shade-content"></slot>
            </div>
            <slot></slot>
        </div>
    `,
    props: {
        show: {
            type: Boolean,
            default: true,
        },
    },
}