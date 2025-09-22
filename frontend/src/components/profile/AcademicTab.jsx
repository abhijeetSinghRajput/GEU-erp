import { motion } from "framer-motion";
import { useStudentStore } from "../../stores/useStudentStore";
import { Link } from "react-router-dom";

const AcademicTab = ({ tabContentVariants, textVariants }) => {
  const { student } = useStudentStore();
  return (
    <motion.div
      key="academic"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="space-y-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div className="text-sm" variants={textVariants}>
            <h3 className="font-medium text-muted-foreground uppercase mb-2">
              Enrollment Details
            </h3>
            <dl className="space-y-4">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-40 flex-shrink-0 font-medium text-muted-foreground">
                  Enrollment No
                </dt>
                <dd className="font-mono">{student.EnrollmentNo}</dd>
              </motion.div>
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-40 flex-shrink-0 font-medium text-muted-foreground">
                  University Roll No
                </dt>
                <dd className="font-mono">{student.PRollNo}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-40 flex-shrink-0 font-medium text-muted-foreground">
                  Registration Id
                </dt>
                <dd className="font-mono">{student.RegID}</dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={textVariants}>
            <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
              Contact Information
            </h3>
            <dl className="space-y-4">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                  Personal Email
                </dt>
                <dd className="text-sm">
                  <Link
                    href={`mailto:${student.Email}`}
                    className="text-primary hover:underline"
                  >
                    {student.Email?.toLowerCase()}
                  </Link>
                </dd>
              </motion.div>
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                  University Email
                </dt>
                <dd className="text-sm">
                  <Link
                    href={`mailto:${student.OfficialMailID}`}
                    className="text-primary hover:underline"
                  >
                    {student.OfficialMailID?.toLowerCase()}
                  </Link>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AcademicTab;
