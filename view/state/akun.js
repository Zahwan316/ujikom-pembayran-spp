import {create} from "zustand";

const useAkunStore = create((set) => ({
    akun:[],
    setakun:(data) => set(() => ({akun:data})),
    resetakun:() => set(() => ({akun:[]})),
    
    role:"",
    setrole:(data) => set(() => ({role:data})),
}));

export default useAkunStore