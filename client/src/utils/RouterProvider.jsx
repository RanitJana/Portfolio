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
import ProjectCreate from "../../admin/pages/ProjectCreate/ProjectCreate.jsx";
import SkillCreate from "../../admin/pages/SkillCreate/SkillCreate.jsx";
import TimelineCreate from "../../admin/pages/TimelineCreate/TimelineCreate.jsx";
import MessagePreview from "../../admin/pages/MessagePreview/MessagePreview.jsx";
import ProfileEdit from "../../admin/pages/ProfileEdit/ProfileEdit.jsx";
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
        <Route path="" element={<Dashboard />}>
          <Route index path="" element={<ProfilePreview />} />
          <Route path="project/create" element={<ProjectCreate />} />
          <Route path="skill/create" element={<SkillCreate />} />
          <Route path="timeline/create" element={<TimelineCreate />} />
          <Route path="message" element={<MessagePreview />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
