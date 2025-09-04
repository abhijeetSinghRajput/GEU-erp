import React from "react";
import { useStudentStore } from "../../stores/useStudentStore";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

const IdCard = () => {
  const { idCard, loadingIdCard } = useStudentStore();
  if (loadingIdCard) {
    return (
      <div className="mx-auto h-[312px] grid grid-cols-1 md:grid-cols-2 p-2 gap-0.5 w-max bg-accent">
        <Skeleton className={"w-[400px] h-full"} />
        <Skeleton className={"w-[400px] h-full"} />
      </div>
    );
  }
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 p-2 gap-0.5 w-max bg-white text-black">
      <IdCardFront idCard={idCard} />
      <IdCardBack idCard={idCard} />
    </div>
  );
};

const IdCardFront = ({ idCard, className }) => {
  return (
    <div className={cn("id-card border-2 border-black w-[400px]", className)}>
      <table className="w-full h-full  border-collapse">
        <tbody>
          {/* Header with University Logo */}
          <tr>
            <td colSpan="3">
              <img src="./geu-banner.jpeg" />
            </td>
          </tr>

          {/* Main Content Row */}
          <tr>
            {/* Provisional ID Text (Vertical) */}
            <td
              className="w-4 text-center"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <div className="text-[10px] tracking-wider  font-bold p-1 h-full flex items-center justify-center">
                PROVISIONAL ID CARD
              </div>
            </td>

            {/* Student Photo */}
            <td className="w-24 p-2">
              <div className="w-20 h-24 border border-gray-300 bg-gray-50 flex items-center justify-center">
                {idCard?.Photo ? (
                  <img
                    src={`data:image/bmp;base64,${idCard?.Photo}`}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground ">PHOTO</span>
                )}
              </div>
            </td>

            {/* Student Details */}
            <td className="p-2 align-top">
              <div className="space-y-1">
                <div className="font-bold">{idCard?.StudentName}</div>
                <div className="font-bold ">{idCard?.CourseBranch}</div>
                <div className="space-y-0.5 text-[10px]">
                  <div className="flex gap-2">
                    <span className="font-bold w-20">ADMISSION NO.</span>
                    <span className="ml-1">{idCard?.StudentID}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold w-20">BATCH</span>
                    <span className="ml-1">{idCard?.Batch}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold whitespace-nowrap">
                      FATHER'S NAME
                    </span>
                    <span className="ml-1">{idCard?.FatherName}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className="text-center text-xs pb-2 font-semibold">
                {idCard?.StudentID}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const IdCardBack = ({ idCard, className }) => {
  return (
    <div className={cn("id-card border-2 border-black w-[400px]", className)}>
      <table className="w-full h-full text-[12px] border-collapse">
        <tbody>
          {/* Contact Information */}
          <tr>
            <td className="p-2 align-top">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-bold w-20">Contact No.</span>
                  <span>:</span>
                  <span className="ml-1">{idCard?.MobileNo}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20">Blood Group</span>
                  <span>:</span>
                  <span className="ml-1">{idCard?.BloodGroup}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20">E-mail</span>
                  <span>:</span>
                  <span className="ml-1 break-all">
                    {idCard?.EmailID.toLowerCase()}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20 flex-shrink-0">
                    Resi. Address
                  </span>
                  <span>:</span>
                  <span className="ml-1  leading-tight">
                    {idCard?.PermanentAddress}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20">Valid Through</span>
                  <span>:</span>
                  <span className="ml-1">{idCard?.ValidDate}</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold w-20 text-red-600">
                      Emergency Contact
                    </span>
                    <span>:</span>
                    <span className="ml-1">{idCard?.EmergencyContactNo}</span>
                  </div>

                  {/* Authority Signature */}
                  <div className="text-right">
                    <div className="mb-1">
                      {idCard?.AuthoritySignature ? (
                        <img
                          src={`data:image/bmp;base64,${idCard?.AuthoritySignature}`}
                          alt="Authority Signature"
                          className="h-8 inline-block"
                        />
                      ) : (
                        <div className="h-6 w-16 border border-gray-300 flex items-center justify-center">
                          <span className="text-muted-foreground ">Sign</span>
                        </div>
                      )}
                    </div>
                    <div className="font-bold ">ISSUED BY</div>
                  </div>
                </div>
              </div>

              {/* Return Information */}
              <div className="text-center space-y-1 whitespace-nowrap">
                <div className="font-bold ">If found please return to :</div>
                <div className=" leading-tight">
                  <div>Graphic Era (Deemed to be University)</div>
                  <div>
                    Bell Road, Clement Town Dehradun, Uttarakhand India -248002
                  </div>
                  <div>Phone No : +91-135-2643421, 2642727</div>
                  <div className="mt-1">www.geu.ac.in</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IdCard;
