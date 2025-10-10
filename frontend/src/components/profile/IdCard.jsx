import { useStudentStore } from "../../stores/useStudentStore";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useCookieStore } from "../../stores/useCookieStore";

const IdCard = () => {
  let { idCard, loadingIdCard, student, avatarBlobUrl } = useStudentStore();
  const { campus } = useCookieStore();

  if (loadingIdCard || 0) {
    return (
      <div className="mx-auto h-[457px] grid grid-cols-1 md:grid-cols-2 p-2 gap-0.5 w-max bg-accent">
        <Skeleton className={"w-[350px] sm:w-[400px] h-full"} />
        <Skeleton className={"w-[350px] sm:w-[400px] h-full"} />
      </div>
    );
  }
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 p-1 sm:p-2 gap-0.5 w-max bg-white text-black">
      <IdCardFront
        campus={campus}
        idCard={idCard}
        student={student}
        avatarBlobUrl={avatarBlobUrl}
        className={"w-[350px] sm:w-[400px]"}
      />
      <IdCardBack
        campus={campus}
        idCard={idCard}
        student={student}
        className={"w-[350px] sm:w-[400px]"}
      />
    </div>
  );
};

const IdCardFront = ({ idCard, avatarBlobUrl, student, className, campus }) => {
  const banner = campus === "hill" ? "/gehu-banner.jpeg" : "/geu-banner.jpeg";
  return (
    <div
      className={cn(
        "id-card border-2 border-black w-[400px] text-[10px]",
        className
      )}
    >
      <table className="w-full h-full  border-collapse">
        <tbody>
          {/* Header with University Logo */}
          <tr>
            <td colSpan="3">
              <img src={banner} alt="Graphic Era Banner" />
            </td>
          </tr>

          {/* Main Content Row */}
          <tr>
            {/* Provisional ID Text (Vertical) */}
            <td
              className="w-4 text-center"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <div className=" tracking-wider  font-bold p-1 h-full flex items-center justify-center text-[8px]">
                PROVISIONAL ID CARD
              </div>
            </td>

            {/* Student Photo */}
            <td className="w-24 p-2">
              <div className="w-20 h-24 bg-gray-50 flex items-center justify-center">
                {idCard?.Photo || avatarBlobUrl ? (
                  <img
                    src={idCard?.Photo || avatarBlobUrl}
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
                <div className="font-bold ">{idCard?.StudentName}</div>
                <div className="font-bold ">{idCard?.CourseBranch}</div>
                <div className="space-y-0.5 ">
                  <div className="flex gap-2">
                    <span className="font-bold w-20">ADMISSION NO.</span>
                    <span className="ml-1">{idCard?.StudentID || student?.StudentID}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold w-20">BATCH</span>
                    <span className="ml-1">{idCard?.Batch}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold whitespace-nowrap">
                      FATHER'S NAME
                    </span>
                    <span className="ml-1">{idCard?.FatherName || student?.FatherHusName}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className="text-center  pb-2 font-semibold">
                {idCard?.StudentID || student?.StudentID}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const IdCardBack = ({ idCard, student, className, campus }) => {
  const website = campus === "hill" ? "www.gehu.ac.in" : "www.geu.ac.in";
  const phoneNo = campus === "hill" ? "0135-2645843" : "+91-135-2643421, 2642727";
  return (
    <div
      className={cn(
        "id-card border-2 border-black w-[400px] text-[10px]",
        className
      )}
    >
      <table className="w-full h-full border-collapse">
        <tbody>
          {/* Contact Information */}
          <tr>
            <td className="p-2 align-top">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-bold w-20">Contact No.</span>
                  <span>:</span>
                  <span className="ml-1">{idCard?.MobileNo || student?.MobileNO}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20">Blood Group</span>
                  <span>:</span>
                  <span className="ml-1">{idCard?.BloodGroup || "N/A"}</span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20">E-mail</span>
                  <span>:</span>
                  <span className="ml-1 break-all">
                    {idCard?.EmailID?.toLowerCase() || student?.Email?.toLowerCase()}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-bold w-20 flex-shrink-0">
                    Resi. Address
                  </span>
                  <span>:</span>
                  <span className="ml-1  leading-tight">
                    {idCard?.PermanentAddress || student?.PAddress}
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
                    <span className="ml-1">{idCard?.EmergencyContactNo || student?.FMobileNo}</span>
                  </div>

                  {/* Authority Signature */}
                  <div className="text-right -mt-4">
                    <div className="mb-1">
                      {idCard?.AuthoritySignature ? (
                        <img
                          src={idCard?.AuthoritySignature}
                          alt="Authority Signature"
                          className="h-8 w-[75px] inline-block object-fill"
                        />
                      ) : (
                        <div className="h-6 w-16 border border-gray-300 flex items-center justify-center">
                          <span className="text-muted-foreground ">Sign</span>
                        </div>
                      )}
                    </div>
                    <div className="font-bold">ISSUED BY</div>
                  </div>
                </div>
              </div>

              {/* Return Information */}
              <div className="text-center space-y-1 whitespace-nowrap">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="h-[1px] bg-blue-500 w-full" />
                  <div className="font-bold text-center">
                    If found please return to :
                  </div>
                  <div className="h-[1px] bg-blue-500 w-full" />
                </div>

                <div className="leading-tight">
                  <div className="font-bold text-[#0a0aff] my-1">
                    {campus === "hill"
                      ? "GEHU-Dehradun Campus"
                      : "Graphic Era (Deemed to be University)"}
                  </div>
                  <div>
                    Bell Road, Clement Town Dehradun, Uttarakhand India -248002
                  </div>
                  <div>
                    Phone No : {phoneNo}
                    </div>
                  <div className="mt-1">{website}</div>
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
