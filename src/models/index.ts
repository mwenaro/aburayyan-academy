import { ClassModel } from "./Class";
import { ExamModel } from "./Exam";
import { Mark } from "./Mark";
import { Responsibility } from "./Responsibility";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";
import { TestMark } from "./TestMarks";
import { User } from "./User";


export const registeredModels = {
    Subject,
    Class:ClassModel,
    Teacher,
    Exam : ExamModel,
    Mark,
    User,
    TestMark,
    Responsibility


}