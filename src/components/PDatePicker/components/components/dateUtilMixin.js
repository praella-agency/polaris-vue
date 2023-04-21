import { ref } from 'vue';
import { getDateUtil } from "./util";

export default function useDateUtil() {
    const $dateUtil = ref(null);
    $dateUtil.value = getDateUtil('native');

    return { $dateUtil };
}
