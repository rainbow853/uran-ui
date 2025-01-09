import KLButton from "./KLButton.vue";
import KLIcon from "./KLIcon.vue";
import KLInput from "./KLInput.vue";
import KLNavBar from './KLNavBar.vue'
import KLPagination from "./KLPagination.vue";
import KLLocationDiv from './KLLocationDiv.vue'
import KLTransform from './KLTransform.vue'
import KLImageAnnotation from './KLImageAnnotation.vue'
import KLDialog from "./KLDialog.vue";
import KLCrosshair from "./KLCrosshair.vue";
import KLCameraImage from "./KLCameraImage/index.vue";
import KLPopoverList from "./KLPopoverList.vue";
import KLLocationPoint from "./KLLocationPoint.vue";



declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    KLButton: typeof KLButton;
    KLIcon: typeof KLIcon;
    KLInput: typeof KLInput;
    KLNavBar: typeof KLNavBar;
    KLPagination: typeof KLPagination;
    KLLocationDiv: typeof KLLocationDiv;
    KLTransform: typeof KLTransform;
    KLImageAnnotation: typeof KLImageAnnotation;
    KLDialog: typeof KLDialog;
    KLCrosshair: typeof KLCrosshair;
    KLCameraImage: typeof KLCameraImage;
    KLPopoverList: typeof KLPopoverList;
    KLLocationPoint: typeof KLLocationPoint;
  }
}