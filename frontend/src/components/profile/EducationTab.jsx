import { motion } from "framer-motion";
import { Progress } from "../ui/progress";
import { useStudentStore } from "../../stores/useStudentStore";

const EducationTab = ({tabContentVariants, textVariants}) => {
      const { student } = useStudentStore();
  return (
    <motion.div
      key="education"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-8"
    >
      <div className="space-y-8">
        <motion.div variants={textVariants}>
          <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
            Academic Performance
          </h3>
          <div className="space-y-6">
            <motion.div variants={textVariants}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">10th Grade</span>
                <span className="text-sm font-medium">{student["10"]}%</span>
              </div>
              <Progress value={student["10"]} />
            </motion.div>

            <motion.div variants={textVariants}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">12th Grade</span>
                <span className="text-sm font-medium">{student["10+2"]}%</span>
              </div>
              <Progress value={student["10+2"]} />
            </motion.div>

            <motion.div variants={textVariants}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Graduation</span>
                <span className="text-sm font-medium">
                  {student.Graduation}%
                </span>
              </div>
              <Progress value={student.Graduation} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationTab;
