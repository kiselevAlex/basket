import {
    SET_CHECK_ITEM_DEL,
    SET_CHECK_ITEM_DEL_ALL,
    SET_CHECK_ITEM_DELDEL,
    SET_CHECK_ITEM_DELDEL_ALL
} from './../constants/BasketListDel'
import { SET_CODE_HEADER_DEL } from './../constants/BasketListDelHeader'
import {
    GET_BASKET_REQUEST,
    GET_BASKET_SUCCESS,
    GET_BASKET_SUCCESS_ERR
} from './../constants/Basket'

const initialState = {
    dataDel: [{
            ID: "1537406",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Влагодарность простая/Герб РФ",
            FULL_PRICE: 130,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333233,
            PRODUCT_ID: 22222,
            CHECKED: false
                                     },
        {
            ID: "1537405",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Глагодарность простая/Герб РФ",
            FULL_PRICE: 210,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333334,
            PRODUCT_ID: 22222,
            PROPERTY_ACODE19200_VALUE: 3,
            CHECKED: false
                                     },
        {
            ID: "1537404",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Длагодарность&quot; простая/Герб РФ&quot;",
            FULL_PRICE: 100,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 313333,
            PRODUCT_ID: 22222,
            CHECKED: false,
            PROPERTY_NEWPRODUCT_VALUE: 'да'
                                     },
        {
            ID: "1537403",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Алагодарность простая/Герб РФ",
            FULL_PRICE: 110,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333833,
            PRODUCT_ID: 22222,
            CHECKED: false,
            PROPERTY_SALELEADER_VALUE: 'да',
            PROPERTY_ACODE19200_VALUE: 50
                                     }
                                    ],
    dataDelDel: [{
            ID: "1537406",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Влагодарность простая/Герб РФ",
            FULL_PRICE: 130,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333233,
            PRODUCT_ID: 22222,
            CHECKED: false,
            PROPERTY_NEWPRODUCT_VALUE: 'да'
                                     },
        {
            ID: "1537405",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Глагодарность простая/Герб РФ",
            FULL_PRICE: 210,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333334,
            PRODUCT_ID: 22222,
            PROPERTY_ACODE19200_VALUE: 3,
            CHECKED: false
                                     },
        {
            ID: "1537404",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Длагодарность простая/Герб РФ",
            FULL_PRICE: 100,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 313333,
            PRODUCT_ID: 22222,
            CHECKED: false
                                     },
        {
            ID: "1537403",
            DETAIL_PICTURE_SRC: "/upload/resize_cache/iblock/bbc/110_110_1/bbc49a9b143bcc9ba15c538678d22422.jpg",
            DETAIL_PAGE_URL: "/catalog/464/36348/",
            NAME: "Алагодарность простая/Герб РФ",
            FULL_PRICE: 110,
            QUANTITY: 5,
            REST: 2,
            PROPERTY_CODE_VALUE: 333833,
            PRODUCT_ID: 22222,
            CHECKED: false
                                     }
                                    ],
    dataHeaderDel: {
        count: 1,
        code: '',
        tovarName: '',
        tovarCost: '',
        tovarId: ''
    },
    errore: '',
    fetching: false,
    selectall: false,
    selectdelall: false,
    sum: '0',
    nds: 0,
    URL_MAKE: '/adasd'
};

export default function Basket(state = initialState, action) {
    
    switch (action.type) {
            
    case GET_BASKET_REQUEST:
      return { ...state, fetching: true }

    case GET_BASKET_SUCCESS:
        {
            console.log(action.payload);
            let list = action.payload.AnDelCanBuy; 
            let listDel = action.payload.DelDelCanBuy; 
            let sum = action.payload.allSum; 
            let nds = action.payload.allVATSum; 
            for(let i = 0; i < list.length; i++){
                list[i].CHECKED = state.selectall;
            } 
            return { ...state, dataDel: list, dataDelDel: listDel, sum: sum, nds: nds, URL_MAKE: action.payload.URL_MAKE, fetching: false}
        }
    case GET_BASKET_SUCCESS_ERR:
        console.log(action.payload);
        return { ...state, errore: action.payload, fetching: false }   
            
    case SET_CHECK_ITEM_DEL:
        {
            let listDel = state.dataDel
            console.log(listDel);
            for(let i = 0; i < listDel.length; i++){
                if (listDel[i].ID == action.payload){
                    listDel[i].CHECKED = listDel[i].CHECKED ? false : true;
                    break;
                }
            } 
            return { ...state, dataDel: listDel, selectall: false }
        }
    case SET_CODE_HEADER_DEL:
      return { ...state, dataHeaderDel: { ...state.dataHeaderDel, code: action.payload } }
    
    case SET_CHECK_ITEM_DEL_ALL:
        {
            let listDel = state.dataDel;
            for(let i = 0; i < listDel.length; i++){
                listDel[i].CHECKED = action.payload;
            }
            return { ...state, dataDel: listDel, selectall: action.payload}
        }
    case SET_CHECK_ITEM_DELDEL:
        {
            let listDel = state.dataDelDel
            console.log('SET_CHECK_ITEM_DELDEL');
            console.log(listDel);
            for(let i = 0; i < listDel.length; i++){
                if (listDel[i].ID == action.payload){
                    listDel[i].CHECKED = listDel[i].CHECKED ? false : true;
                    break;
                }
            } 
            return { ...state, dataDelDel: listDel, selectdelall: false }
        }
    
    case SET_CHECK_ITEM_DELDEL_ALL:
        {
            let listDel = state.dataDelDel;
            for(let i = 0; i < listDel.length; i++){
                listDel[i].CHECKED = action.payload;
            }
            return { ...state, dataDelDel: listDel, selectdelall: action.payload}
        }
    default:
      return state;
  }
}