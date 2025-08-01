import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAttendanceStore = create((set, get)=>({
    attendance: null,
    isLoadingSubjects: false,
    isLoadingSubjectDetails: false,

    getAllAttendanceSubjects: async({RegID})=>{
        set({isLoadingSubjects: true});
        try {
            const res = await axiosInstance.get("/attendance", {
                params: {RegID}
            });
            set({attendance: res.data});
        } catch (error) {
            set({attendance: null});
            toast.error(error.message);
            console.log(error);
        } finally{
            set({isLoadingSubjects: false});
        }
    },

    getAttendanceBySubject: async(SubjectID, data)=>{
        set({isLoadingSubjectDetails: true});
        try {
            const res = await axiosInstance.post(`/attendance/${SubjectID}`, data);
            return res.data;
        } catch (error) {
            set({attendance: null});
            console.log(error.message);
            toast.error(error.message);
            return null;
        } finally{
            set({isLoadingSubjectDetails: false});
        }
    }
}));

