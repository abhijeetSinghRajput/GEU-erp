import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAttendanceStore = create((set, get)=>({
    attendance: null,
    isLoadingAttendance: false,

    getAttendance: async({RegID})=>{
        set({isLoadingAttendance: true});
        try {
            const res = await axiosInstance.get("/attendance", {
                params: {RegID}
            });
            set({attendance: res.data});
        } catch (error) {
            set({attendance: null});
            console.log(error);
        } finally{
            set({isLoadingAttendance: false});
        }
    }
}));

