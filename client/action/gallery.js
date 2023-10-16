// import axios from 'axios';
// import apiConfig from '../configs/api';

// export const getGallery = async () => {
//     const options = {
//         method: "GET",
//         url: `${apiConfig.url}/gallery`,
//     };
//     try {
//         const res = await axios(options);
//         return res.data
//     } catch (e) {
        
//         if (e?.response?.data) {
//             return e.response.data;
//         }
//         return {
//             error: "Something Went Wrong",
//         };
//     }
// }