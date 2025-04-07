import React, { useEffect, useState } from "react";
import StudentContent from "../../content/student-content/student-content";
import TeacherContent from "../../content/teacher-content/teacher-content";
import AdminContent from "../../content/admin-content/admin-content";

function Home({ userDetails }) {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (userDetails) {
      setUserRole(userDetails.role);
    }
  }, [userDetails]);

  return (
    <main>
      {/* {Object.entries(userDetails).map(([key, value]) => {
        return (
          <div key={key}>
            <span>
              {key}:{value}
            </span>
          </div>
        );
      })} */}

      {userRole === "student" ? (
        <StudentContent userDetails={userDetails} />
      ) : userRole === "lecturer" ? (
        <TeacherContent />
      ) : userRole === "admin" ? (
        <AdminContent />
      ) : (
        <div>Something went wrong go back to login</div>
      )}
    </main>
  );
}

export default Home;
