import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import ProjectPage from "../pages/Project.jsx";
import Error from "../pages/Error.jsx";
import Login from "../../admin/pages/Login/Login.jsx";
import Signup from "../../admin/pages/Signup/Signup.jsx";
import Base from "../pageSection/Base/Base.jsx";
import Admin from "../../admin/Admin.jsx";
import Dashboard from "../../admin/pages/Dashboard/Dashboard.jsx";
import ProfilePreview from "../../admin/pages/ProfilePreview/ProfilePreview.jsx";
import ProjectPreview from "../../admin/pages/ProjectPreview/ProjectPreview.jsx";
import ProjectShow from "../../admin/pages/ProjectShow/ProjectShow.jsx";
import ManageTimeline from "../../admin/pages/ManageTimeline/ManageTimeline.jsx";
import MessagePreview from "../../admin/pages/MessagePreview/MessagePreview.jsx";
import ProfileEdit from "../../admin/pages/ProfileEdit/ProfileEdit.jsx";
import ManageSkill from "../../admin/pages/ManageSkill/ManageSkill.jsx";
import Index from "../Index.jsx";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Index />}>
      <Route path="/" element={<App />}>
        <Route path="" element={<Base />} />
        <Route index path="404" element={<Error error={404} />} />
        <Route path=":id" element={<Home />} />
        <Route path=":id/project" element={<ProjectPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Error error={404} />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path=":id/" element={<Dashboard />}>
          <Route index path="" element={<ProfilePreview />} />
          <Route path="project/manage/" >
            <Route path="" element={<ProjectPreview />} />
            {/* <Route path="add" element={<ProjectPreview />} /> */}
            <Route path=":projectId/show" element={<ProjectShow />} />
            {/* <Route path=":projectId/edit" element={<ProjectPreview />} /> */}
          </Route>
          <Route path="skill/manage" element={<ManageSkill />} />
          <Route path="timeline/manage" element={<ManageTimeline />} />
          <Route path="message" element={<MessagePreview />} />
          <Route path="edit" element={<ProfileEdit />} />
          <Route path="*" element={<Error error={404} />} />
        </Route>
        <Route path="*" element={<Error error={404} />} />
      </Route>
    </Route>
  )
);

export default router;
