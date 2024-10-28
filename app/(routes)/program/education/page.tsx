"use client";

import { useEffect, useState } from "react";
import CourseGridView from "./_components/course-grid";
import CourseModel, { CourseCategory } from "@/app/_models/course";
import { getCourses } from "@/app/_services/course";
import useDialogStore from "@/app/_utils/dialog/store";
import CourseItem from "./_components/course-item";

export default function EducationPage() {
  const [courseList, setCourseList] = useState<CourseModel[]>([]);
  const [activeCategory, setActiveCategory] = useState("home");
  const { openAlert } = useDialogStore();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getCourses(1, 100);
      if (error) {
        openAlert({
          title: "인기 클래스 가져오기 오류",
          description: error.message,
        });
        return;
      }
      setCourseList(data?.data ?? []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {Object.entries({ home: "홈", all: "전체", ...CourseCategory }).map(
          (category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category[0])}
              className={`min-w-16 px-4 py-2 rounded-full border ${
                category[0] === activeCategory
                  ? "bg-sub-6 border-2 border-sub-7 text-sub-7"
                  : "border-grayscale-8 text-grayscale-1 hover:bg-gray-100"
              }`}
            >
              {category[1]}
            </button>
          )
        )}
      </div>
      {activeCategory === "home" ? (
        <CourseHome courses={courseList} />
      ) : (
        <CourseGridView courses={courseList} category={activeCategory} />
      )}
    </div>
  );
}

const CourseHome = ({ courses }: { courses: CourseModel[] }) => {
  return (
    <div className="w-full space-y-6 pb-4">
      <h1 className="text-2xl font-semibold text-main-1">실시간 인기 클래스</h1>
      <div className="grid grid-cols-5 gap-4">
        {courses.slice(0, 5).map((course, i) => (
          <CourseItem key={i} number={i + 1} video={course} />
        ))}
      </div>
      <hr />
      <h1 className="text-2xl font-semibold text-main-1">MD Pick</h1>
      <div className="grid grid-cols-5 gap-4">
        {courses.slice(5, 10).map((course, i) => (
          <CourseItem key={i} number={i + 1} video={course} />
        ))}
      </div>
      <hr />

      <h1 className="text-2xl font-semibold text-main-1">자기계발 마스터</h1>
      <div className="grid grid-cols-5 gap-4">
        {courses.slice(10, 15).map((course, i) => (
          <CourseItem key={i} number={i + 1} video={course} />
        ))}
      </div>
    </div>
  );
};
