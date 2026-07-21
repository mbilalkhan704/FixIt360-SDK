import ComplaintApi from "./complaintApi.js";
import ComplaintImagesApi from "./complaintImagesApi.js";

export default {

    ...ComplaintApi,

    images: ComplaintImagesApi,

};