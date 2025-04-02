import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP:[], },
    reducers: {
        themSP: (state,param)=> {
            let sp = param.payload;// tham số là sp = {'id':1, 'ten_sp'=> 'A'}
            let index = state.listSP.findIndex(s => s.id === sp.id);
            if(index===-1){ // sản phẩm chưa có trong giỏ hàng
                sp['so_luong'] = 1;
                state.listSP.push(sp);
            }
            else {
                state.listSP[index]['so_luong']++;
                console.log('Đã thêm sp. số SP= ', state.listSP.length);
                    <div style={{position:'fixed', top:'50%', zIndex:'2500'}}>{state.listSP.length}</div>
                
            }
            
        },
        sosanh:() => {
           
        },
        suaSL: (state,param) => {// tham số là mảng 2 phần tử id và sl. VD [5000, 3]
            let id = param.payload[0];
            let so_luong = param.payload[1];
            let index = state.listSP.findIndex(s => s.id === id);
            if(index !== -1){
                state.listSP[index].so_luong = Number(so_luong);
                console.log("Đã sửa sp ", param);
            }

        },
        xoaSP: (state, param)=> {
            let id = param.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            
            if(window.confirm('Bạn muốn xóa sản phẩm này?')){
                if(index !== -1) {
                    state.listSP.splice(index,1);
                };
            }
        }, 
        xoaGH: state => {state.listSP = []}
    }
})
export const {themSP, suaSL, xoaSP, xoaGH} = cartSlice.actions
export default cartSlice.reducer