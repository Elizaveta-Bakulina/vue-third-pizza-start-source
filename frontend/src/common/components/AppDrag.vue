<template>
	<div
		:draggable="draggable"
		@dragstart="onDragStart"
		@dragover.prevent
		@dragenter.prevent>
		<slot />
	</div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";

const props = defineProps({
	draggable: {
		type: Boolean,
		default: false,
	},
	dataTransfer: {
		type: Object,
		required: true,
	},
});
console.log('fdsfadsf')
const onDragStart = ({ dataTransfer }) => {
	const data = JSON.stringify(props.dataTransfer);
	dataTransfer.setData(DATA_TRANSFER_PAYLOAD, data);

};
</script>
