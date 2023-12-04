import {create} from "zustand"

const useItemStore = create((set) => ({
    spp:[],
    setspp:(data) => set(() => ({spp:data})),

    petugas:[],
    setpetugas:(data) => set(() => ({petugas:data})),

    refpetugas:[],
    setrefpetugas:(data) => set(() => ({refpetugas:data})),

    kelas:[],
    setkelas:(data) => set(() => ({kelas:data})),

    siswa:[],
    setsiswa:(data) => set(() => ({siswa:data})),

    pembayaran:[],
    setpembayaran:(data) => set(() => ({pembayaran:data})),
}))

export default useItemStore