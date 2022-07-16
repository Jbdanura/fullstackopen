export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

export interface newCoursePartBase extends CoursePartBase{
    description: string;
}

export interface CourseNormalPart extends newCoursePartBase {
    type: "normal";
  }

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
export interface CourseSubmissionPart extends newCoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

export interface CourseBackPart extends newCoursePartBase{
    name: string;
    type: "special";
    requirements: string[];
}
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseBackPart